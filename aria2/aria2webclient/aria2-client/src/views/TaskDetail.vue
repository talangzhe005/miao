<template>
  <div>
    <dl v-if="task">
      <dt>任务名称</dt>
      <dd>{{ getFileName(task) }}</dd>
      <dt>任务大小</dt>
      <dd></dd>
      <dt>进度</dt>
      <dd></dd>
      <dt>下载地址</dt>
      <dd></dd>
      <dt>文件列表</dt>
      <dd>
        <ul>
          <li v-for="file of task.files" :key="file.path">{{ file.path }}</li>
        </ul>
      </dd>
      <dt>区块信息</dt>
      <dd>
        <span v-for="i of Number(task.numPieces)" :key="i" class="piece" :class="{complete: bitfield[i - 1] == '1'}"></span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  props: ['aria2'],
  data() {
    return {
      task: null,
      bitfield: [],
    }
  },
  async mounted() {
    this.task = await this.aria2.tellStatus(this.$route.params.gid)
    this.bitfield = this.task.bitfield.split('').map(it => parseInt(it, 16).toString(2).padStart(4, '0')).join('').split('')
  },
  methods: {
    getFileName(task) {
      if(task.files?.[0].path) {
        return task.files[0].path.split('/').at(-1)
      } else {
        return task.files?.uris?.[0]?.url.split('/').at(-1) ?? '未知'
      }
    },
  }
}
</script>

<style lang="less" scoped>
.piece {
  width: 20px;
  height: 20px;
  margin: 2px;
  background-color: grey;
  display: inline-block;
  &.complete {
    background-color: green;
  }
}
</style>