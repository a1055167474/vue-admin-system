<template>
  <div>
    <div style="margin-top: 20px;height: 180px;" >
      <el-form class="form" ref="form" :model="searchForm" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="searchForm.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchForm.author"></el-input>
        </el-form-item>
        <el-form-item label="借用者">
          <el-input v-model="searchForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号"  width="150px">
          <el-input v-model="searchForm.phone"></el-input>
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
        <el-form-item label="借出时间">
          <el-date-picker
            v-model="searchForm.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归还时间">
          <el-date-picker
            v-model="searchForm.value2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="float: right; margin-right:15px">
        <el-button type="primary" icon="el-icon-search" style="margin-left: 15px;height: 40px" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" style="margin-left: 15px;height: 40px" @click="resetSearch">重置</el-button>
        <el-button type="primary" icon="el-icon-user" style="margin-left: 15px;height: 40px" @click="getCurrentUserBorrow">我的</el-button>
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
        prop="bookName"
        label="书名"
        width="">
      </el-table-column>
      <el-table-column
        prop="bookAuthor"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        align="center"
        width="60">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="借用者"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="借用时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="state"
        label="当前状态"
        align="center"
        width="80">
        <template scope="scope">
          <p v-if="scope.row.state === 0 ">未归还</p>
          <p v-if="scope.row.state === 1 ">已归还</p>
          <p v-if="scope.row.state === 2 ">挂失</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="returnTime"
        label="归还/挂失时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="action"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <i class="el-icon-circle-check btn-i" v-if="(Boolean(scope.row.state=== 0 ? 1 : 0))" @click="returnBook(scope.row)" title="归还"></i>
          <i class="el-icon-warning-outline btn-i red" v-if="(Boolean(scope.row.state=== 0 ? 1 : 0))" @click="lostReport(scope.row)" title="挂失"></i>
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

  </div>

</template>

<script>
  import http from '../http/api'

  export default {
    name: 'BorrowReturn',
    data () {
      return {
        tableData: [],
        dialogName: '',
        dialogVisible: false,
        tableLoading: false,
        currentPage: 1,
        total: 0,
        searchForm: {
          bookName: '',
          author: '',
          value1: '',
          value2: '',
          state: '',
          userName: '',
          phone: ''
        },
        form: {
          bookName: '',
          author: '',
          createTime: '',
          state: '',
          userName: '',
          phone: ''
        },
        options: [{
          value: '0',
          label: '未归还'
        }, {
          value: '1',
          label: '已归还'
        },{
          value: '2',
          label: '挂失'
        }],
      }
    },
    methods: {
      queryBorrowReturn (param) {
        this.tableLoading = true
        http.queryBorrowReturnList(
          {
            ...param,
            bookName: this.searchForm.bookName,
            bookAuthor: this.searchForm.author,
            userName: this.searchForm.userName,
            phone: this.searchForm.phone,
            state: this.searchForm.state,
            createTime: this.searchForm.value1 === null ? '' : this.searchForm.value1[0],
            endTime: this.searchForm.value1 === null ? '' : this.searchForm.value1[1],
            returnTime: this.searchForm.value2 === null ? '' : this.searchForm.value2[0],
            returnEndTime: this.searchForm.value2 === null ? '' : this.searchForm.value2[1],
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
      lostReport (row) {
        this.$confirm('是否确认挂失?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.lostReportBook(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消挂失'
          })
        })
      },
      lostReportBook (row) {
        http.lostReportBook1({
          id: row.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '挂失成功，请联系管理员进行处理!'
          })
          this.queryBorrowReturn()
        })
      },
      return (row) {
        http.returnBook1({
          id: row.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '归还成功'
          })
          this.queryBorrowReturn()
        })
      },
      returnBook (row) {
        this.$confirm('是否确认归还?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.return(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消归还'
          })
        })
      },
      handleCurrentChange (val) {
        let param = {
          pageNum: val - 1
        }
        this.queryBorrowReturn(param)
      },
      getCurrentUserBorrow (param) {
        this.tableLoading = true
        this.searchForm.userName = this.$store.state.userinfo.name
        this.searchForm.author =''
        this.searchForm.bookName = ''
        this.searchForm.state =''
        this.searchForm.phone=''
        this.searchForm.value1=''
        this.searchForm.value2=''
        http.queryBorrowReturnList(
          {
            ...param,
            bookName: this.searchForm.bookName,
            bookAuthor: this.searchForm.author,
            userName: this.searchForm.userName,
            phone: this.searchForm.phone,
            state: this.searchForm.state,
            createTime: this.searchForm.createTime,
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
      resetSearch () {
        this.searchForm = {
          bookName: '',
          author: '',
          value1: '',
          value2: '',
          state: '',
          userName: '',
          phone: ''
        }
        this.queryBorrowReturn()
      },
      search () {
        this.queryBorrowReturn()
      },
      logout () {
        http.logout().then(res => {
          this.$store.commit('logout')
          this.$router.replace('/login')
        })
      }
    },
    mounted () {
      this.queryBorrowReturn()
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
