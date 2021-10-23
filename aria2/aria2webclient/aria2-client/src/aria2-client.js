class Aria2Client {
  constructor(options) {
    this.options = options
    this.websocket = new WebSocket(`ws://${options.host}:${options.port}/jsonrpc`)
    //解决websocket 没有连接上 得不到数据报错,所有方法等promise  resolve以后再执行
    this.connectPromise = new Promise((resolve, reject) => {
      this.websocket.addEventListener('open', () => {
        resolve()
      })
      this.websocket.addEventListener('error', (e) => {
        reject('WS_CONNECTION_ERROR')
      })
    })
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
  ready() {
    return this.connectPromise
  }
  close() {
    this.websocket.close()
    return new Promise((resolve, reject) => {
      this.websocket.addEventListener('close', () => {
        resolve()
      })
      this.websocket.addEventListener('error', (e) => {
        reject(e)
      })
    })
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
      return this.connectPromise.then(() => {
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
    })
    }
  })


export default Aria2Client