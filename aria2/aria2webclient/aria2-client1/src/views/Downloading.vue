<template>
  <div>
    <h2>正在下载</h2>
    <div>
      <el-card>
        <el-row>
          <el-col :span="8">
            <el-button type="primary" plain @click="execSelected('pause')">暂停</el-button>
            <el-button type="warning" plain @click="execSelected('unpause')">开始</el-button>
            <el-button type="info" plain @click="execSelected('remove')">删除</el-button>
            <!-- <el-button type="info" plain >全选</el-button> -->
          </el-col>
          <el-col :span="1">
            <span class="search">搜索:</span>
          </el-col>
          <el-col :span="10">
              <el-input v-model="searchText" placeholder="请输入内容"></el-input>
          </el-col>
          <!-- <button @click="execSelected('pause')">z暂停</button>
          <button @click="execSelected('unpause')">开始</button>
          <button @click="execSelected('remove')">删除</button>
          <button @click="selectAll">全选</button> -->
        </el-row>
      
        <el-table
          :data="visibleTasks"
          style="width: 100%"
          border  
          stripe
          @select="toggleSelect"
          ref="multipleTableClinicRoom"
          @select-all="selectAll"
          @row-click="handleClickTableRow"
        >
          <el-table-column
            type="selection"
            :checked="true"
            width="55"
            
            >
          </el-table-column>
          <el-table-column
          prop="files[0]"
          label="文件名"
          :formatter="getFileName"
          >
          </el-table-column>
          <el-table-column
            prop="completedLength"
            label="下载进度"
            sortable
            >
            <template slot-scope="scope">
              <el-progress :percentage="Number(((scope.row.completedLength / scope.row.totalLength) * 100).toFixed(2))" ></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            prop="downloadSpeed"
            label="速度"
            :formatter='getSpeed'
            sortable
            >
            
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="gid"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="goDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Downloading",
  props: ['aria2'],
  data() {
    return {
      tasks: [],
      selected: [],
      searchText: '',
      progressPercent: 0,
      
    }
  },
  watch: {
    aria2() {
      this.tasks = []
      this.updateList()
    },
    // getprogressPercent() {
    //   return this.progressPercent = 
    // }
  },
  computed: {
    visibleTasks() {
      if(this.searchText == '') {
        return this.tasks
      } else {
        return this.tasks.filter(it => {
          return it.files[0].path.toLowerCase().includes(this.searchText)
        })
      }
    }
  },
  methods: {
    async execSelected(action) {
      if (action == 'remove') {
        try{
          await this.$confirm('确定删除吗？')
        } catch (e) {
          return 
        }
      }

      let selectedTask = this.tasks.filter(task => {
        return this.selected.includes(task.gid)
      })
      for (let task of selectedTask) {
        try {
          if(action == 'pause' && task.status == 'paused') {
            continue
          }
          if(action == 'unpause' && task.status == 'active') {
            continue
          }
        
          await this.aria2[action](task.gid)
        } catch (e) {
          this.$alert(e.message)
        }
      }
        this.updateList()
    }, 
    
    selectAll() {
      if (this.selected.length == this.tasks.length) {
        return this.selected = []
      }
      this.selected = this.tasks.map(it => it.gid)
    },
    toggleSelect(selection, row) {
      console.log('toggleSelect')
      console.log(selection,row)
      console.log(this.visibleTasks)
      let idx = this.selected.indexOf(row.gid)
      if(idx == -1) {
        this.selected.push(row.gid)
      }else {
        this.selected.splice(idx, 1)
      }
    },
    getFileName(row) {
      // console.log('bbb',row)
      if(row.files?.[0].path) {
        // console.log(row.files[0].path)
        return row.files[0].path.split('/').at(-1)
      } else {
        return row.files?.uris?.[0]?.url.split('/').at(-1) ?? '未知'
      }
    },

    // getFileName(files) {
    //   if(files?.[0].path) {
    //     return files[0].path.split('/').at(-1)
    //   } else {
    //     return files?.uris?.[0]?.url.split('/').at(-1) ?? '未知'
    //   }
    // },
    //获取下载速度百分比
    getPercent(row) {
      console.log('ddd')
      if (row.completedLength == 0) {
        return this.progressPercent = 0
      }else {
        return this.progressPercent = ((row.completedLength / row.totalLength) * 100).toFixed(2)
      }
    },
    async updateList() {
      try {
        this.tasks = [
          ...await this.aria2.tellActive(),
          ...await this.aria2.tellWaiting(0, 100)
        ]

        this.visibleTasks.forEach(row => {
          if(this.selected.indexOf(row.gid) >= 0) {
        // 等表格数据加载完成后
            this.$nextTick(() => {
            // 注意：toggleRowSelection(item, true) 中 item 必须是行数据
              this.$refs.multipleTableClinicRoom.toggleRowSelection(row,true);
            })
          }
        })

      } catch(e) {
        this.tasks = []
        throw e
      }
    },
    goDetail(task) {
      console.log(task)
      this.$router.push('/task/' + task.gid)
    },
    // cellClick(row) {
    //   console.log("cellClick", row)
    // },
    getSpeed(row) {
      // console.log("ccc", row)
      // return (row.completedLength / row.totalLength * 100).toFixed(2) + '%'
      // return (row.completedLength / row.totalLength * 100).toFixed(2)
      return (row.downloadSpeed /1024).toFixed(2) + 'k/s'
    },
    
    checkSelectable(row, selected) {
      console.log("checkSelectbal")
      console.log(this.selected)
      this.visibleTasks.forEach(row => {
        if(this.selected.indexOf(row.gid) >= 0) {
          this.$refs.multipleTableClinicRoom.toggleRowSelection(row,true);
        }
      })
      //return selected = this.selected.includes(row.gid)
    },
    handleClickTableRow(row,event,column) {
      this.toggleSelect(null, row)
    }
  },
  mounted() {
    
    this.intervalId = setInterval(async () => {
      try{
        await this.updateList()
      } catch(e) {
        if(e == 'WS_CONNECTION_ERROR') {
          clearInterval(this.intervalId)
        } else {
          throw e
        }
      }
    },1000)
    
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
};
</script>

<style scoped>
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
}
.el-table {
  margin-top: 15px;
}
.search {
  display: inline-block;
  line-height: 40px;
}
</style>