<template>
  <div>
    <p>
      welcome!
      <el-button @click="queryUser">确认</el-button>
      <el-button @click="insertForm()">新增</el-button>
      <el-button type="danger" plain @click="logout">退出</el-button>
    </p>
    <div style="width: 400px;margin-top: 20px;display: flex;justify-content:center;">
      <el-form ref="form" :model="searchForm" label-width="80px">
        <el-form-item label="姓名"  width="100px">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left: 15px;height: 40px" @click="search">搜索</el-button>
      <el-button type="primary" style="margin-left: 15px;height: 40px" @click="resetSearch">重置</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="tableLoading">
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年纪"
        width="180">
      </el-table-column>
      <el-table-column
        prop="length"
        label="长度">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="action"
        width="160"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="editForm(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="confirmDelete(scope.row)" type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      @close="resetForm"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年纪">
          <el-input type="number" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="长度">
          <el-input type="number" v-model="form.length"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkUpdateOrInsert(type, form)">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import http from '../http/api'

export default {
  name: 'Index',
  data () {
    return {
      tableData: [],
      tableLoading: false,
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        length: '',
        email: ''
      },
      type: 'insert',
      currentPage: 1,
      total: 0,
      searchForm: {
        name: ''
      }
    }
  },
  created () {
    // this.queryPhpUser();
  },
  methods: {
    queryPhpUser () {
      this.axios.post('/api/dbTest/insertUser', {
        name: 'chen1233',
        age: 23,
        email: '223333@qq.com',
        length: 18
      })
        .then(res => {
          if (res.data.status === 1) {
            this.$message.success('保存成功')
          } else {
            this.$message.warning(res.data.message)
          }
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          this.$message.error(err.message)
        })
    },
    queryUser (param) {
      this.tableLoading = true
      http.queryUserList(
        {
          ...param,
          filter: {
            name: this.searchForm.name
          }
        }
      ).then(res => {
        this.$message.success(res.message)
        this.tableData = res.data.data
        this.total = res.data.total
        this.tableLoading = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.tableLoading = false
      })
    },
    confirmDelete (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTable(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteTable (row) {
      http.deleteUserList({
        id: row.id
      }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.queryUser()
      })
    },
    editForm (row) {
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
      this.type = 'update'
    },
    updateTable (form) {
      http.updateUserList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.dialogVisible = false
        this.queryUser()
      })
    },
    insertForm () {
      this.type = 'insert'
      this.dialogVisible = true
    },
    insertUser (form) {
      http.insertUserList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.dialogVisible = false
        this.queryUser()
      })
    },
    checkUpdateOrInsert (type, form) {
      if (type === 'update') {
        this.updateTable(form)
      } else {
        this.insertUser(form)
      }
    },
    resetForm () {
      this.form = {
        name: '',
        age: '',
        length: '',
        email: ''
      }
      console.log(this.form)
    },
    handleCurrentChange (val) {
      let param = {
        pageNum: val - 1
      }
      this.queryUser(param)
    },
    resetSearch () {
      this.searchForm = {
        name: ''
      }
      this.queryUser()
    },
    search () {
      this.queryUser()
    },
    logout () {
      http.logout().then(res => {
        this.$store.commit('logout')
        this.$router.replace('/login')
      })
    }
  },
  mounted () {
    this.queryUser()
  }
}
</script>

<style scoped>

</style>
