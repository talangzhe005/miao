<template>
  <div class="downloading">
    <h2>正在下载</h2>
    <div>
      <button @click="execSelected('pause')">z暂停</button>
      <button @click="execSelected('unpause')">开始</button>
      <button @click="execSelected('remove')">删除</button>
      <button @click="selectAll">全选</button>
    </div>
    <ul>
      <li v-for="task of tasks" :class="{selected: selected.includes(task.gid)}" :key="task.gid" @click="toggleSelect(task)">
        <input type="checkbox" :checked="selected.includes(task.gid)">
        <span>{{ getFileName(task) }}</span>  
        / 
        <span>{{ getPercent(task) | fixed }}%</span>
        /
        <span>{{ task.downloadSpeed /1024  | fixed}}k/s</span>
        /
        <span>{{ task.status }}</span>
        /
        <!-- <button @click.stop="goDetail(task)">详情</button> -->
        <router-link @click.native.stop :to="{name: 'TaskDetail', params: {gid: task.gid},}">详情</router-link>
      </li>
    </ul>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      selected: [],
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
      for (let gid of this.selected) {
        await window.aria2[action](gid)
        this.updateList()
      }
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
      this.tasks = [
          ...await window.aria2.tellActive(), 
          ...await window.aria2.tellWaiting(0, 1000)
        ]
    },
    // goDetail(task) {
    //   this.$router.push('/task/' + task.gid)
    // }
  },
  mounted() {
    this.updateList()
    this.intervalId = setInterval(() => {
      this.updateList()
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
