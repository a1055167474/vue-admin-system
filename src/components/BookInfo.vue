<template>
  <div>
    <div style="margin-top: 20px">
      <el-form class="form" ref="form" :model="searchForm" label-width="80px">

            <el-form-item label="书名" >
              <el-input v-model="searchForm.name" ></el-input>
            </el-form-item>

            <el-form-item label="作者">
              <el-input v-model="searchForm.author"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="searchForm.description"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="searchForm.state" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

          <el-form-item label="上架时间">
            <el-date-picker
              v-model="searchForm.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <div style="float:right; margin-right: 15px;">
            <el-button type="primary" icon="el-icon-search" style="margin-left: 15px;height: 40px" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh-right" style="margin-left: 15px;height: 40px" @click="resetSearch">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" plain @click="insertForm()">新增</el-button>
          </div>
      </el-form>
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
        label="书名">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        align="center"
        width="60">
      </el-table-column>
      <el-table-column
        prop="description"
        label="备注"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="上架时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="当前状态"
        align="center"
        width="80">
        <template slot-scope="scope">{{ scope.row.state === 0 ? '可用' : '下架' }}</template>
      </el-table-column>
      <el-table-column
        prop="action"
        align="center"
        label="操作" width="230">
        <template slot-scope="scope">
          <i class="el-icon-edit btn-i" v-if="state1" @click="editForm(scope.row)" title="编辑"></i>
          <i class="el-icon-s-management btn-i" @click="borrowBook(scope.row)" title="借阅"></i>
          <i class="el-icon-delete btn-i red" v-if="state1" @click="confirmDelete(scope.row)" title="删除"></i>
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
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择" @change="change">
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
      tableLoading: false,
      dialogVisible: false,
      dialogName: '编辑',
      form: {
        id: '',
        name: '',
        author: '',
        amount: '',
        description: '',
        createTime: '',
        state: ''
      },
      type: 'insert',
      currentPage: 1,
      total: 0,
      searchForm: {
        id: '',
        name: '',
        author: '',
        description: '',
        state: '',
        value1: []
      },
      options: [{
        value: 0,
        label: '可用'
      }, {
        value: 1,
        label: '下架'
      }],
    }
  },
  computed: {
    state1 () {
      return Boolean(this.$store.state.userinfo.userRole)
    }
  },
  methods: {
    queryBook (param) {
      this.tableLoading = true
      http.queryBookList(
        {
          ...param,
          book:{
            name: this.searchForm.name,
            author: this.searchForm.author,
            description: this.searchForm.description,
            state: this.searchForm.state,
            createTime: this.searchForm.value1 === null ? '' : this.searchForm.value1[0] ,
            endTime: this.searchForm.value1 === null ? '' : this.searchForm.value1[1]
          },
          page:{
            page: this.currentPage,
            limit: 10
          }
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
    change() {
      console.log(this.form.state)
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
      http.deleteBookList({
        id: row.id
      }).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.queryBook()
      })
    },
    borrowBook (row) {
      this.$confirm('是否借阅该图书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.borrowOpt(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消借阅'
        })
      })
    },
    borrowOpt(row){
      http.borrowBook({
        bookId: row.id,
        amount: 1
      }).then(res => {
        this.$message({
          type: 'success',
          message: '借阅成功!'
        })
        this.queryBook()
      })
    },
    editForm (row) {
      this.dialogVisible = true
      this.dialogName = '编辑'
      this.form = JSON.parse(JSON.stringify(row))
      this.form.state = Number(this.form.state) === 0 ? '可用' : '下架';
      this.type = 'update'
    },
    updateTable (form) {
      if (typeof form.state !== 'number') {
        form.state = form.state === '可用' ? 0 : 1
      }
      http.updateBookList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.dialogVisible = false
        this.queryBook()
      })
    },
    insertForm () {
      this.type = 'insert'
      this.dialogName = '图书入库'
      this.dialogVisible = true
    },
    insertBook (form) {
      http.insertBookList({
        ...form
      }).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.dialogVisible = false
        this.queryBook()
      })
    },
    checkUpdateOrInsert (type, form) {
      if (type === 'update') {
        this.updateTable(form)
      } else {
        this.insertBook(form)
      }
    },
    resetForm () {
      this.form = {
        name: '',
        author: '',
        description: '',
        amount: '',
        state: ''
      }
      console.log(this.form)
    },
    handleCurrentChange (val) {
      let param = {
        pageNum: val - 1
      }
      this.queryBook(param)
    },
    resetSearch () {
      this.searchForm = {
        name: '',
        author: '',
        description: '',
        value1: '',
        state: ''
      }
      this.queryBook()
    },
    search () {
      this.queryBook()
    },
    logout () {
      http.logout().then(res => {
        this.$store.commit('logout')
        this.$router.replace('/login')
      })
    }
  },
  mounted () {
    this.queryBook()
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
  margin: 0 5px;
  color: #409EFF;
}

.red{
  color: #F56C6C;
}

</style>
