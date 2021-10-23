<template>
  <div>
    <h2>新建下载</h2>
    <input type="file" accept=".torrent" hidden multiple @change="parseBtFile"  id="bt-file-select">
    <label for="bt-file-select">选择BT种子</label>
    <input type="file" hidden id="meta-file-select">
    <label for="meta-file-select">选择Metalink种子</label>
    <div v-if="type == 'bt'">
      <div>请选择要下载的文件（ctrl键多选）：</div>
      <select multiple v-model="selectedBtFile"> 
        <option v-for="(file, idx) of btInfo.files" :value="idx" :key="idx">{{file.name}}</option>
      </select>
      <div>
        <button @click="startBtDownload">开始下载</button>
      </div>
    </div>
    
    <div v-if="type == 'url'">
      <div>
        <textarea v-model="uris" name="" id="" cols="50" rows="10"></textarea>
      </div>
      <button @click="start">确定</button>
    </div>

    
    <div v-if="type == 'meta'"></div>
  </div>
</template>

<script>
import parseTorrent from 'parse-torrent'

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
    async parseBtFile(e) {
      let file = e.target.files[0]
      let btFileBase64 = await getFileContent(file)

      let btFileBuffer = Buffer.from(btFileBase64, 'base64')
      let parsedTorrent = parseTorrent(btFileBuffer)
      console.log(parsedTorrent)
      this.btBase64 = btFileBase64
      this.btInfo = parsedTorrent
      this.type = 'bt'

    },
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
label {
  border: 1px solid;
  border-radius: 3px;
  background-color: #fff;
}
select {
  height: 300px;
  width:500px;
}
</style>