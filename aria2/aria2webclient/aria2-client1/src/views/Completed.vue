<template>
  <div class="completed">
    <h2>已完成</h2>
    <el-card>
      <el-table
        :data="tasks"
        stripe
        style="width: 100%">
        <el-table-column
          prop="files[0].path"
          label="文件名"
        >
        </el-table-column>
        <el-table-column>
          <el-progress :percentage="100" status="success"></el-progress>
        </el-table-column>
        <el-table-column
          prop="status"
        >
        </el-table-column>
      </el-table>
    </el-card>
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
