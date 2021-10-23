<template>
  <div id="app">
    <div class="main">
      <div id="nav">
        <select v-model="selectedServer" @change="switchServer">
          <option v-for="(server, idx) of servers" :value="server" :key="idx">{{ server.name || server.host + ':' + server.port }}</option>
        </select>
        {{ connectionStatus }}
        <router-link to="/">正在下载({{Number(globalStat.numWaiting) + Number(globalStat.numActive)}}）</router-link>
        <router-link to="/completed">已完成（{{globalStat.numStopped}}）</router-link>
        <router-link to="/new">新建下载</router-link>
        <router-link to="/setting">设置</router-link>
        <router-link to="/servers">服务器列表</router-link>
      </div>
      <router-view :aria2="aria2"  @servers-changed="servers = $event"/>   
    </div>
    <div class="global-stat">全局上传速度： {{ globalStat.uploadSpeed }}  全局下载速度：{{ globalStat.downloadSpeed }}</div>
  </div>
</template>

<script>
import Aria2Client from './aria2-client.js'
import Vue from 'vue'

export default {
  data() {
    let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
    return {
      globalStat: {},
      servers,
      selectedServer: null,
      connectionStatus: '连接中...',
      aria2: null,
    }
  },
  methods: {
    async switchServer() {
      console.log('switch server...')
      console.log('关闭现有的服务器。。。')
      this.aria2?.close()

      this.globalStat = {}
      this.connectionStatus = '连接中...'
      let aria2 = new Aria2Client(this.selectedServer)
      // Vue.prototype.aria2= aria2

      this.aria2 = aria2
      try {
        console.log(111)
        await aria2.ready()
        this.connectionStatus = '已连接'
      } catch(e) {
        console.log(222)
        this.connectionStatus = '连接失败'
      }
    },
    startIntervalUpdate() {
      this.intervalId = setInterval(async () => {
      try{
        this.globalStat = await this.aria2.getGlobalStat()
      }catch(e) {
        if(e == 'WS_CONNECTION_ERROR') {
          clearInterval(this.intervalId)
        }else {
          throw e
        }
      }
    }, 1000)
    }
  },
  async mounted() {
    this.selectedServer = this.servers[0]
    this.switchServer()
    this.globalStat = await this.aria2.getGlobalStat()
    
  },
  watch: {
    aria2() {
      this.startIntervalUpdate()
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
}
</script>

<style lang="less">
.main  {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;

  h2 {
    margin: 0;
  }
}

#nav {
  width: 180px;
  border-right: 1px solid;
  padding: 10px;
  flex-grow: 0;
  flex-shrink: 0;
  a {
    display: block;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.global-stat {
  text-align: right;
}
</style>
