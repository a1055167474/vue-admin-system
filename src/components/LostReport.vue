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
        <el-form-item label="借用时间">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
        <el-form-item label="挂失时间">
          <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div style="float: right; margin-right: 100px;">
        <el-button type="primary" icon="el-icon-search" style="margin-left: 15px;height: 40px" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" style="margin-left: 15px;height: 40px" @click="resetSearch">重置</el-button>
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
        label="书名">
      </el-table-column>
      <el-table-column
        prop="bookAuthor"
        label="作者">
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="借出时间"
        width="180">
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
        label="挂失时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="action"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleLostReport(scope.row)" type="primary" plain size="small">线下处理</el-button>
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
    name: 'LostReport',
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
          createTime: '',
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
        value1: '',
        value2: ''
      }
    },
    methods: {
      queryLostReport (param) {
        let i = this.$store.state.userinfo.userRole
        if(i){
          this.tableLoading = true
          http.queryLostReport(
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
        }else {
          this.$message.error('您不是管理员，没有权限');
        }

      },
      handleLostReport1 (row) {
        http.handleLostReport2({
          id: row.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '归还成功'
          })
          this.queryLostReport()
        })
      },
      handleLostReport (row) {
        this.$confirm('是否确认已处理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleLostReport1(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      handleCurrentChange (val) {
        let param = {
          pageNum: val - 1
        }
        this.queryLostReport(param)
      },
      resetSearch () {
        this.searchForm = {
          name: '',
          author: '',
          description: '',
          createTime: '',
          state: ''
        }
        this.queryLostReport()
      },
      search () {
        this.queryLostReport()
      },
      logout () {
        http.logout().then(res => {
          this.$store.commit('logout')
          this.$router.replace('/login')
        })
      },
      getUserInfo () {
        http.getUserInfo().then(res => {
          // this.$message.success(res.message)
          this.$store.commit('set_userInfo', res.result)
          console.log(res.result)
          this.$store.commit('set_isLogin', true)
        })
      }
    },
    mounted () {
      let i = this.$store.state.userinfo.userRole
      if(i){
        this.queryLostReport()
      }else {
        this.$message.error('您不是管理员，没有权限');
      }
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

</style>
