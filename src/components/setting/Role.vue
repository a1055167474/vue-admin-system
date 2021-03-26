<template>
  <div>
    <div class="role-header">
      <el-page-header content="角色列表"></el-page-header>
      <el-button type="primary" @click.native="addRoleVisible=true">添加角色</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      v-loading="tableLoading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="唯一标识"
        width="180">
      </el-table-column>
      <el-table-column
        prop="menu"
        label="目录名称">
      </el-table-column>
      <el-table-column
        prop="creatorName"
        label="创建人名称">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="action"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="checkInfo(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增角色"
      :visible.sync="addRoleVisible"
      @close="resetForm"
      width="60%">
      <el-form ref="form" :rules="formRules" :disabled="formDisable" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input placeholder="请输入角色名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="flag">
          <el-input placeholder="请输入唯一编码" v-model="form.flag"></el-input>
        </el-form-item>
        <el-form-item label="角色目录" prop="menu">
          <el-input placeholder="请输入角色目录" v-model="form.menu"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input placeholder="请输入角色描述" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from '../../http/api'
export default {
  name: 'Role',
  data () {
    return {
      tableData: [],
      addRoleVisible: false,
      tableLoading: false,
      form: {
        name: '',
        flag: '',
        menu: '',
        description: ''
      },
      formDisable: false,
      formRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: '请输入唯一标识', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (/^[a-zA-Z]+$/.test(value) === false) {
              callback(new Error('情输入英文'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
        ],
        menu: [
          { required: true, message: '请输入角色菜单', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.queryRoleList()
  },
  methods: {
    addRole () {
      console.log(1)
    },
    handleClick (row) {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
        if (valid) {
          http.addRole(this.form).then(res => {
            this.addRoleVisible = false
            this.queryRoleList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.form = {
        name: '',
        flag: '',
        menu: '',
        description: ''
      }
      this.formDisable = false
    },
    queryRoleList () {
      this.tableLoading = true
      http.queryRoleList({}).then(res => {
        this.tableData = res.data.data
        this.tableLoading = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.tableLoading = false
      })
    },
    checkInfo (row) {
      this.form = row
      this.formDisable = true
      this.addRoleVisible = true
    },
    changeInfo (row) {
      this.form = row
      this.addRoleVisible = true
    }
  }
}
</script>

<style scoped>
.el-page-header /deep/{
  padding-bottom: 20px;
  line-height: 40px;
}
.role-header{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
