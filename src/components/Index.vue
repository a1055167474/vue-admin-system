<template>
  <div>
    <div style="margin-top: 20px">
      <el-form class="form" ref="form" :model="searchForm" label-width="80px">
        <el-form-item label="姓名"  width="100px">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="searchForm.account"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="searchForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.userRole" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间"  width="100px">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div style="float:right;margin-right:15px">
        <el-button type="primary" style="margin-left: 15px;height: 40px" @click="search">搜索</el-button>
        <el-button type="primary" style="margin-left: 15px;height: 40px" @click="resetSearch">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" plain @click="insertForm()">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="tableLoading">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userRole"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="action"
        align="center"
        width="220"
        label="操作">
        <template slot-scope="scope">
<!--          <el-button @click="editForm(scope.row)" type="primary" plain size="small">编辑</el-button>-->
          <i class="el-icon-edit btn-i" @click="editForm(scope.row)" title="编辑"></i>
          <i class="el-icon-switch-button btn-i" @click="editForm(scope.row)" title=""></i>
          <el-button v-if="Boolean(scope.row.state)"  @click="editForm(scope.row)" type="primary" plain size="small">激活</el-button>
          <el-button v-if="!Boolean(scope.row.state)" @click="editForm(scope.row)" type="warning" plain size="small">停用</el-button>
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
      :title= dialogName
      :visible.sync="dialogVisible"
      @close="resetForm"
      width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input autocomplete="off" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.userRole" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
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
      state: 0,
      tableLoading: false,
      dialogVisible: false,
      dialogName: '编辑',
      form: {
        name: '',
        account: '',
        phone: '',
        password: '',
        userRole: ''
      },
      type: 'insert',
      currentPage: 1,
      total: 0,
      searchForm: {
        name: '',
        account: '',
        phone: '',
        userRole: '',
        createTime: '',
        endTime: ''
      },
      options: [{
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '管理员'
      }],
      value: '',
      value1: ''
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
          name: this.searchForm.name,
          account: this.searchForm.account,
          phone: this.searchForm.phone,
          userRole: this.searchForm.userRole,
          createTime: this.searchForm.createTime,
          endTime: this.searchForm.endTime,
          page: this.currentPage,
          size: 10
        }
      ).then(res => {
        this.$message.success(res.message)
        this.tableData = res.result
        this.total = res.total
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
      this.dialogName = '编辑'
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
      this.dialogName = '新增'
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

  .form{
    width: 100%;
  }
  .form .el-form-item /deep/{
    width: 33%;
    float: left;
  }

  .btn-i{
    cursor: pointer;
    font-size: 25px;
    color: #409EFF;
  }
</style>
