<template>
  <div class="completed">
    <h2>已完成</h2>
    <ul>
      <li v-for="task of tasks" :key="task.gid">
        {{ getFileName(task.files[0].path) }}  
        / 
        {{((task.completedLength / task.totalLength) * 100) | fixed }}%
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Completed',
  props: ['aria2'],
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
  async mounted() {
      this.tasks = await this.aria2.tellStopped(0, 1000)
      this.intervalId = setInterval(async () => {
        this.tasks = await this.aria2.tellStopped(0, 1000)
        console.log(this.tasks)
      },1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>
