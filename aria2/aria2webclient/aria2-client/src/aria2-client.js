const exp = require("constants")

class Aria2Client {
  constructor(options) {
    this.options = options
    this.websocket = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`)
    this.lastId = 1

    this.callbacks = {} //存放每个请求的回调函数

    

    this.websocket.addEventListener('message', e => {
      let data = JSON.parse(e.data)
      let callback = this.callbacks[data.id]
      delete this.callbacks[data.id]
      if(typeof callback == 'function'){
        callback(data)
      }
    })
    // this.websocket.addEventListener('connected', () => {
    //   this.connected = true
    // })
    // this.websocket.addEventListener('close', () => {
    //   this.connected = false
    // })
  }

  

  // addUri(...args) {
  //   return new Promise((resolve, reject) => {
  //     let id = this.lastId++
  //     this.callbacks[id] = function(data) {
  //       if(data.error) {
  //         reject(data.error)
  //       }else {
  //         resolve(data.result)
  //       }
  //     }
  //     this.websocket.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'aria2.addUri',
  //       params: [`token:${this.options.secret}`, ...args]
  //     }))
  //   })
  // }

  // //获取正在下载的
  // tellActive(...args) {
  //   return new Promise((resolve, reject) => {
  //     let id = this.lastId++
  //     this.callbacks[id] = function(data) {
  //       if(data.error) {
  //         reject(data.error)
  //       }else {
  //         resolve(data.result)
  //       }
  //     }
  //     this.websocket.send(JSON.stringify({
  //       jsonrpc: '2.0',
  //       id: id,
  //       method: 'aria2.tellActive',
  //       params: [`token:${this.options.secret}`, ...args]
  //     }))
  //   })
  // }
}

  ["addUri",
    "addTorrent",
    "getPeers",
    "addMetalink",
    "remove",
    "pause",
    "forcePause",
    "pauseAll",
    "forcePauseAll",
    "unpause",
    "unpauseAll",
    "forceRemove",
    "changePosition",
    "tellStatus",
    "getUris",
    "getFiles",
    "getServers",
    "tellActive",
    "tellWaiting",
    "tellStopped",
    "getOption",
    "changeUri",
    "changeOption",
    "getGlobalOption",
    "changeGlobalOption",
    "purgeDownloadResult",
    "removeDownloadResult",
    "getVersion",
    "getSessionInfo",
    "shutdown",
    "forceShutdown",
    "getGlobalStat",
    "saveSession"
  ].forEach(methodName => {
    Aria2Client.prototype[methodName] = function(...args) {
      return new Promise((resolve, reject) => {
      let id = this.lastId++
      this.callbacks[id] = function(data) {
        if(data.error) {
          reject(data.error)
        }else {
          resolve(data.result)
        }
      }
      this.websocket.send(JSON.stringify({
        jsonrpc: '2.0',
        id: id,
        method: `aria2.${methodName}`,
        params: [`token:${this.options.secret}`, ...args]
      }))
    })
    }
  })


export default Aria2Client