<template>
  <div>
    <h2>详情</h2>
    <el-card>
      <el-descriptions v-if="task" class="margin-top" :column="1" size="medium" border>
        <el-descriptions-item>
          <template slot="label">
            任务名称
          </template>
          {{ getFileName(task) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            任务状态
          </template>
          {{ status }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            任务大小
          </template>
          {{ total }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            下载进度
          </template>
          {{ percentage }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            下载地址
          </template>
          {{ uri }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            文件列表
          </template>
          <span v-for="file of task.files" :key="file.path">
            {{ file.path }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="task">
        <h4>区块信息</h4>
        <span v-for="i of Number(task.numPieces)" :key="i" class="piece" :class="{complete: bitfield[i - 1] == '1'}"></span>
      </div>
      <!-- <dl v-if="task">
        <dt>任务名称</dt>
        <dd>{{ getFileName(task) }}</dd>
        <dt>任务状态</dt>
        <dd>{{ status }}</dd>
        <dt>任务大小</dt>
        <dd>{{total}}</dd>
        <dt>下载进度</dt>
        <dd>{{ percentage }}</dd>
        <dt>下载地址</dt>
        <dd>{{ uri }}</dd>
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
      </dl> -->
    </el-card>
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
      uri: '',
      status: '',
      total: '',
      percentage: '',
    }
  },
  async mounted() {
    this.task = await this.aria2.tellStatus(this.$route.params.gid)
    this.uri = this.task.files[0].uris[0].uri
    if(this.task.status == 'paused') {
      this.status = '暂停'
    }else if ( this.task.status == 'active' ) {
      this.status = '下载中'
    }else if (this.task.status == 'completed') {
      this.status = '已完成'
    }
    this.total = (this.task.totalLength / (1024 ** 3)).toFixed(2) + ' GB'
    this.percentage = ((this.task.completedLength / this.task.totalLength) * 100).toFixed(2) + '%'
    // this.getUris(this.$route.params)
    // this.getSatus(this.$route.params)
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
    getSatus(task) {
      console.log(task)
      const data =  this.aria2.tellStatus(task.gid)
      // console.log(data)
    },
    async getUris(task) {
      const data = await this.aria2.getUris(task.gid)
      console.log(data[0].uri)
      // this.$nextTick(() => {
        // return data[0].uri
        this.uri = data[0].uri
      // })
    }
  },
  

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

.el-descriptions {
  margin-bottom:  15px;
}
</style>