<template>
  <div class="downloading">
    <h2>正在下载</h2>
    <div>
      <button @click="execSelected('pause')">z暂停</button>
      <button @click="execSelected('unpause')">开始</button>
      <button @click="execSelected('remove')">删除</button>
      <button @click="selectAll">全选</button>
      搜索: <input type="text" v-model="searchText" />
    </div>
    <ul>
      <li v-for="task of visibleTasks" :class="{selected: selected.includes(task.gid)}" :key="task.gid" @click="toggleSelect(task)">
        <input type="checkbox" :checked="selected.includes(task.gid)">
        <span>{{ getFileName(task) }}</span>  
        / 
        <span>{{ getPercent(task) | fixed }}%</span>
        /
        <span>{{ task.downloadSpeed /1024  | fixed }}k/s</span>
        /
        <span>{{ task.status }}</span>
        /
        <!-- <button @click.stop="goDetail(task)">详情</button> -->
        <router-link @click.native.stop :to="{name: 'TaskDetail', params: {gid: task.gid},}">详情</router-link>
      </li>
    </ul>
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-table
      :data="visibleTasks"
      style="width: 100%"
    >
      <el-table-column
        prop="gid"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="completedLength"
        label="下载进度"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="downloadSpeed"
        label="进度"
        :formatter='getSpeed'
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Downloading",
  props: ['aria2'],
  data() {
    return {
      tasks: [],
      selected: [],
      searchText: '',
    }
  },
  watch: {
    aria2() {
      this.tasks = []
      this.updateList()
    }
  },
  computed: {
    visibleTasks() {
      if(this.searchText == '') {
        return this.tasks
      } else {
        return this.tasks.filter(it => {
          return it.files[0].path.toLowerCase().includes(this.searchText)
        })
      }
    }
  },
  methods: {
    //暂停
    // pauseSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.pause(gid)
    //   }
    // },
    // //开始
    // unpauseSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.unpause(gid)
    //   }
    // },
    // //删除
    // removeSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.remove(gid)
    //   }
    // },
    
    // 对选中的任务执行某种操作： 开始，暂停，删除
    async execSelected(action) {
      if (action == 'remove') {
        try{
          await this.$confirm('确定删除吗？')
        } catch (e) {
          return 
        }
      }

      let selectedTask = this.tasks.filter(task => {
        return this.selected.includes(task.gid)
      })
      for (let task of selectedTask) {
        try {
          if(action == 'pause' && task.status == 'paused') {
            continue
          }
          if(action == 'unpause' && task.status == 'active') {
            continue
          }
        
          await this.aria2[action](task.gid)
        } catch (e) {
          this.$alert(e.message)
        }
      }
        this.updateList()
    }, 
    
    selectAll() {
      if (this.selected.length == this.tasks.length) {
        return this.selected = []
      }
      this.selected = this.tasks.map(it => it.gid)
    },
    toggleSelect(task) {
      let idx = this.selected.indexOf(task.gid)
      if(idx == -1) {
        this.selected.push(task.gid)
      }else {
        this.selected.splice(idx, 1)
      }
    },

    getFileName(task) {
      if(task.files?.[0].path) {
        console.log(task.files[0].path)
        return task.files[0].path.split('/').at(-1)
      } else {
        return task.files?.uris?.[0]?.url.split('/').at(-1) ?? '未知'
      }
    },
    //获取下载速度百分比
    getPercent(task) {
      if (task.completedLength == 0) {
        return '0'
      }else {
        return (task.completedLength / task.totalLength) * 100
      }
    },
    async updateList() {
      try {
        this.tasks = [
          ...await this.aria2.tellActive(),
          ...await this.aria2.tellWaiting(0, 100)
        ]
      } catch(e) {
        this.tasks = []
        throw e
      }
    },
    // goDetail(task) {
    //   this.$router.push('/task/' + task.gid)
    // }

    getSpeed(row) {
      return (row.completedLength / row.totalLength * 100).toFixed(2) + '%'
    }
  },
  mounted() {
    this.intervalId = setInterval(async () => {
      try{
        await this.updateList()
      } catch(e) {
        if(e == 'WS_CONNECTION_ERROR') {
          clearInterval(this.intervalId)
        } else {
          throw e
        }
      }
    },1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
};
</script>

<style lang="less" scoped>
  ul {
    list-style: none;
  }
  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &.selected {
      background-color: #ddd;
    }
    &:hover {
      background-color: #eee;
    }
  }
</style>
