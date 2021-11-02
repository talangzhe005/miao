<template>
  <div>
    <h2>新建下载</h2>
    <el-card>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入下载链接"
        v-model="uris">
      </el-input>
      <div>
        <el-button type="primary" @click="start">确定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import parseTorrent from 'parse-torrent'

function getFileContent(file) {
  return new Promise((resole, reject) => {
    let fr = new FileReader()
    fr.onload = function() {
      let commaPos = fr.result.indexOf(',')
      resole(fr.result.slice(commaPos + 1))
    }
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
  
}
export default {
  name: 'NewTask',
  props: ['aria2'],
  data() {
    return {
      type: 'url',
      btIfo: null,
      btBase64: null,
      uris: '',
      selectedBtFile: [],
    }
  },
  methods: {
    async start() {
      let uris = this.uris.split('\n').map(it => it.trim())
      let taskIds = await this.aria2.addUri(uris)
      this.$router.push('/')
    },
    // async parseBtFile(e) {
    //   let file = e.target.files[0]
    //   let btFileBase64 = await getFileContent(file)

    //   let btFileBuffer = Buffer.from(btFileBase64, 'base64')
    //   let parsedTorrent = parseTorrent(btFileBuffer)
    //   console.log(parsedTorrent)
    //   this.btBase64 = btFileBase64
    //   this.btInfo = parsedTorrent
    //   this.type = 'bt'

    // },
    async startBtDownload() {
      await this.aria2.addTorrent(this.btBase64, [], {
        selectFile: this.selectedBtFile.join(',')
      })

      // this.$router.push('/')

    }
  }
}
</script>

<style scoped>
.el-button{
  margin-top: 10px;
}

</style>