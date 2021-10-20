<template>
  <div class="downloading">
    <h2>正在下载</h2>
    <ul>
      <li v-for="task of tasks" :key="task.gid">
        {{ getFileName(task.files[0].path) }}  
        / 
        {{((task.completedLength / task.totalLength) * 100) | fixed }}%
        /
        {{ task.downloadSpeed /1024  | fixed}}k/s
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
    }
  },
  methods: {
    getFileName(path) {
      return path.split('/').at(-1)
      
    },
  },
  mounted() {
      this.intervalId = setInterval(async () => {
        this.tasks = await window.aria2.tellActive()
        console.log(this.tasks)
      },1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
};
</script>

<style scoped>

</style>
