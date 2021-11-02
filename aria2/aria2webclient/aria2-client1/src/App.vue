<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <div id="nav">
          <el-row>
              <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
              <!-- <el-select v-model="value" placeholder="请选择服务器"  @change="switchServer">
                <el-option
                  v-for="(server, idx) of servers"
                  :key="idx"
                  :label="server"
                  :value="server">
                  {{ server.name || server.host + ':' + server.port }}
                </el-option>
              </el-select> -->
              <select v-model="selectedServer" @change="switchServer" class="selectServers">
                <option v-for="(server, idx) of servers" :value="server" :key="idx">{{ server.name || server.host + ':' + server.port }}</option>
              </select>
              <span class="connctStatus">
                {{ connectionStatus }}
              </span>
          </el-row>
          <el-menu
            router
            default-active="/"
            class="el-menu-vertical-demo"
            background-color="#32373F"
            text-color="#fff"
            active-text-color="#409EFF">
            <el-menu-item index="/">
              <i class="el-icon-download"></i>
              <span>正在下载({{Number(globalStat.numWaiting) + Number(globalStat.numActive)}}）</span>
            </el-menu-item>
            <el-menu-item index="/completed">
              <i class="el-icon-check"></i>
              <span slot="title">已完成（{{globalStat.numStopped}}）</span>
            </el-menu-item>
            <el-menu-item index="/new">
              <i class="el-icon-document"></i>
              <span>新建下载</span>
            </el-menu-item>
            <el-menu-item index="/setting">
              <i class="el-icon-setting"></i>
              <span >设置</span>
            </el-menu-item>
            <el-menu-item index="/servers">
              <i class="el-icon-menu"></i>
              <span >服务器列表</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
            <router-view :aria2="aria2"  @servers-changed="servers = $event"/>
            <div class="global-stat">全局上传速度： {{ globalStat.uploadSpeed }}  全局下载速度：{{ globalStat.downloadSpeed }}</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aria2Client from './aria2-client.js'

export default {
  data() {
    let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
    return {
      globalStat: {},
      servers,
      selectedServer: null,
      connectionStatus: '连接中...',
      aria2: null,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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

.el-container {
  height: 100%;
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   height: 100%;
// }
.el-aside {
  background-color: #32373F;
  color: #fff;
  .el-menu {
    border-right: none;
  }
}
img {
  width: 50px;
  height: 50px;
}

.router-link-exact-active {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.router-link {
  text-decoration: none;
  color: #fff;
}
.el-header {
  background-color: #F7F7F7;
}

.el-main {
  background-color: #eaedf1;
  padding: 5px !important;
}

.selectServers {
  width: 50px;
  position: relative;
  top: -40px;
}
.connctStatus {
  position: relative;
  left:-57px;
  top: -10px;
}

.global-stat {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
}

.el-avatar {
  margin: 10px;
}

</style>
