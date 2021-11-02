<template>
  <div>
    <h2>管理服务器</h2>
    
    <el-dialog title="添加服务器" :visible.sync="dialogFormVisible" @closed="closedDialog">
      <el-form :model="newServer">
        <el-form-item label="Name" label-width="80px">
          <el-input v-model="newServer.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Host" label-width="80px">
          <el-input v-model="newServer.host" :min="1" :max="65535"></el-input>
        </el-form-item>
        <el-form-item label="Port" label-width="80px">
          <el-input-number v-model="newServer.port" auto-complete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="Secret" label-width="80px">
          <el-input type="password" v-model="newServer.secret" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addServer()">确 定</el-button>
      </div>
    </el-dialog>

    <el-card>
      <el-button type="primary" @click="dialogFormVisible = true; editIndex = -1">添加</el-button>
      <el-table
        :data="servers"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="name">
        </el-table-column>
        <el-table-column
          prop="host"
          label="host">
        </el-table-column>
        <el-table-column
          prop="port"
          label="port">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeServer(scope.$index)">删除</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editServer(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
  </div>
</template>

<script>
export default {
  data() {
    let servers = JSON.parse(localStorage.getItem('aria2Servers')) || []
    return {
      servers: servers, 
      dialogFormVisible: false,
      editIndex: -1, //当前正在编辑的下标，如果是-1 表示添加
      newServer: {
        name: '',
        host: '127.0.0.1',
        port: 6800,
        secret: '',
      }
    }
  },
  watch: {
    servers(servers) {
      localStorage.setItem('aria2Servers', JSON.stringify(servers))
      this.$emit('server-changed', this.servers)
    }
  },
  methods: {
    addServer() {
      if(this.editIndex == -1) {
        this.servers.push(this.newServer)
        this.newServer =  {
            name: '',
            host: '127.0.0.1',
            port: 6800,
            secret: '',
        }
      }else {
        // this.servers[this.editIndex] = this.newServer
        this.servers.splice(this.editIndex, 1, this.newServer)
        this.newServer =  {
            name: '',
            host: '127.0.0.1',
            port: 6800,
            secret: '',
        }
      }
      this.dialogFormVisible = false;
    },
    closedDialog() {
      this.newServer =  {
            name: '',
            host: '127.0.0.1',
            port: 6800,
            secret: '',
        }
    },
    async removeServer(idx) {
      try {
        await this.$confirm("确定要删除吗？")
        this.servers.splice(idx, 1)
      } catch(e) {
        if(e == 'cancel') {
          return
        }else {
          throw e 
        }
      }
      
    },
    editServer(idx) {
      this.editIndex = idx
      let targetServer = this.servers[idx]
      Object.assign(this.newServer, targetServer)
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>

</style>