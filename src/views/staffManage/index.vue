<!--员工管理页面-->
<template>
  <div id="staffManage">
    <div class="staffManage-title">员工管理</div>
    <div class="staffManage-option">
      <div id="add">
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div>
      <!--  <div id="add">
        <el-button size="mini" type="primary" @click="exportInformation()">导出</el-button>
      </div> -->
      <div class="searchOption">
        <div>
          <el-input size="mini" v-model="searchObj.id" placeholder="员工ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.username" placeholder="用户名" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.telephone" placeholder="手机号" clearable></el-input>
        </div>
        <div>
          <el-select size="mini" v-model="searchObj.enabled" placeholder="状态" clearable>
            <el-option
              v-for="item in enabledFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="staffManage-table">
      <el-table border ref="multipleTable" size="mini" :data="staffManageData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column align="center" prop="id" label="员工ID"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="realname" label="真实姓名"></el-table-column>
        <el-table-column align="center" prop="telephone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="qq" label="QQ号"></el-table-column>
        <el-table-column align="center" prop="lastLoginTime" label="上次登录时间" width="150">
          <template slot-scope="scope">
              <div>{{scope.row.lastLoginTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="lastLoginIp" label="上次登录IP"></el-table-column>
         <el-table-column align="center" prop="enabled" label="状态">
          <template slot-scope="scope">
            <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.enabled==true?'green':'red')"></span>{{scope.row.enabled==true?'正常':'停用'}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="iconDiv" title="修改基础信息" @click="handleEdit(scope.row)">
              <!-- <svg-icon icon-class="bianji"/> -->
              <i class="fa fa-edit"></i>
            </div>
            <!-- <div class="iconDiv" title="修改密码" @click="handlePasswordEdit(scope.row)">
              <i class="fa fa-key"></i>
            </div>
            <div v-if="scope.row.enabled==true" class="iconDiv" title="禁用" @click="handleForbidden(scope.row)">
              <i class="fa fa-power-off" style="color:#F56C6C"></i>
            </div> -->
           <!--  <div v-else class="iconDiv" title="启用" @click="handleStart(scope.row)">
              <svg-icon icon-class="qiyong"/>
              <i class="fa fa-play-circle"></i>
            </div> -->
            <div class="iconDiv" title="查看日志" @click="handleStart(scope.row.id)">
              <i class="fa fa-building-o"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="staffManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- 新增或修改员工信息模态框 -->
    <el-dialog center  :title="dialogTitle" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="form" :rules="rules" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                <el-input clearable v-model="form.username" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="真实姓名" prop="realname" :label-width="formLabelWidth">
                <el-input clearable v-model="form.realname" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="手机号" prop="telephone" :label-width="formLabelWidth">
                <el-input clearable v-model="form.telephone" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="QQ" prop="qq" :label-width="formLabelWidth">
                <el-input clearable v-model="form.qq" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="登录密码" prop="password" :label-width="formLabelWidth">
                <el-input type="password" clearable v-model="form.password" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6" v-if="dialogTitle=='修改员工信息'">
              <el-form-item label="状态" prop="enabled" :label-width="formLabelWidth">
                <el-radio v-model="form.enabled" :label="true">正常</el-radio>
                <el-radio v-model="form.enabled" :label="false">停用</el-radio>
              </el-form-item>
             
            </div>
            <div class="col-sm-6">
              <el-form-item label="权限配置" prop="account" :label-width="addLabelWidth">
                <el-checkbox-group v-model="form.limitSet">
                  <!-- <el-checkbox label="首页">首页</el-checkbox> -->
                  <el-checkbox class="" label="员工">员工</el-checkbox>
                  <el-checkbox class="" label="推广员">推广员</el-checkbox>
                  <el-checkbox class="" label="商家">商家</el-checkbox>
                  <el-checkbox class="" label="任务">任务</el-checkbox>
                  <el-checkbox class="" label="订单">订单</el-checkbox>
                  <el-checkbox class="" label="店铺">店铺</el-checkbox>
                  <el-checkbox class="" label="充值">充值</el-checkbox>
                  <el-checkbox class="" label="消息">消息</el-checkbox>
                  <el-checkbox class="" label="分站">分站</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <!--  <el-col :span="12">
             
            </el-col> -->
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogSubmit">确定</el-button>
      </div>    
    </el-dialog>
   <!-- 禁用原因模态框 -->
    <!-- <el-dialog center title="禁用原因" :before-close="beforeClose" :visible.sync="forbiddenVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form v-model="forbiddenForm" ref="forbiddenForm" name="forbiddenForm">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="禁用原因" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入禁用原因" v-model="forbiddenForm.forbiddenReason">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleForbiddenCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogForbiddenSubmit">确定</el-button>
      </div>    
    </el-dialog> -->
    <!-- 修改密码模态框 -->
    <!-- <el-dialog center title="修改密码" :before-close="beforePasswordClose" :visible.sync="passwordVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form v-model="passwordForm" :rules="rules"  ref="passwordForm" name="passwordForm">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="修改密码" prop="password" :label-width="formLabelWidth">
                <el-input type="input" placeholder="请输入新密码" v-model="passwordForm.password">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handlePasswordCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogPasswordSubmit">确定</el-button>
      </div>    
    </el-dialog> -->
  </div>
</template>

<script>
import _ from 'lodash'
import {mapActions,mapGetters,mapMutations} from 'vuex';
import axios from '@/http/axios';
import config from '../../config';
import service from '@/utils/request'

export default {
  name: 'staffManage',
  data(){
    return {
      addLabelWidth:'100px',
      forbiddenVisible:false,
      form:{
         enabled:'正常',
          limitSet:[]
      },
      passwordVisible:false,
      passwordForm:{},
      forbiddenForm:{},
      formLabelWidth:'100px',
      /* 模态框的显示与隐藏 */
      dialogVisible:false,
      /* 模态框的标题 */
      dialogTitle:'新增员工信息',
      pagesize:10,
      /* 当前页 */
      page:0,
      total:10,
      searchObj:{
        enabled:''
      },
      enabledFilter:[{
        name:'正常',
        value:1
      },{
        name:'停用',
        value:0
      }],
      // staffData: [],
      multipleSelection: [],
        // 表单验证
      rules:{
        username:[
          { required: true, message: '请输入员工用户名', trigger: 'blur' }
        ],
        realname:[
          { required: true, message: '请输入员工真实姓名', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入员工密码', trigger: 'blur' }
        ],
         telephone:[
          { required: true, message: '请输入员工手机号', trigger: 'blur' }
        ],
         qq:[
          { required: true, message: '请输入员工qq号', trigger: 'blur' }
        ],
        enabled:[
          { required: true, message: '请选择员工状态', trigger: 'blur' }
        ]
      }
     
    };
  },
  computed: {
      ...mapGetters(['userId','siteId','staffManageData'])
  },
  created() {
     this.loadAllStaff();
  },
  watch:{
    page:function(now,old) {
      this.loadAllStaff();
    }
  },
  methods: {
     ...mapActions(['getStaffManage','addStaff','deleteStaff','searchStaff','startStaff','stopStaff']),

     // 加载所有的员工信息
     loadAllStaff() {
         let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          // enabled:this.searchObj.enabled,
          roleName:'管理员',
          siteId:this.siteId
          }
         }   
         // console.log('========0',this.siteId)      
        this.getStaffManage(obj).then(r=>{
          // this.staffData = r.data.data.list
          this.total = r.data.data.total
          // console.log(this.staffData)
        })
     },

    /* 搜索 */
    handleSearch(){
      this.page = 0
     let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          roleName:'管理员',
          siteId:this.siteId,
          ...this.searchObj
          }
         }    
      // console.log('2222222222',obj);
      this.getStaffManage(obj).then(r=>{
          this.total = r.data.data.total
      })
    },

    /* 关闭模态框 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
    },
    // handlePasswordCancle(){
    //   this.$refs['passwordForm'].resetFields();  //重置验证
    //   this.passwordVisible = false;
    // },

    // dialogPasswordSubmit(){   
    // this.$refs['passwordForm'].validate((valid) => {
    //       if (valid) {
    //          axios.post('/user/changePasswordDirect',this.passwordForm).then(r=>{
    //     if(r.data.status == 200){
    //       this.$notify({
    //         title: '修改成功',
    //         message: '这是一条成功的提示消息',
    //         type: 'success'
    //       })
    //     }else if(r.data.status == 500){
    //        this.$notify.error({
    //         title: '修改失败',
    //         message: '这是一条错误的提示消息'
    //       })
    //     }
    //     this.passwordVisible = false;
    //     this.loadAllStaff() 

    //   })
    //   this.passwordForm = {}
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     }); 
     
    // },
    /* 模态框点击确定 */
    dialogSubmit(){
       this.$refs['form'].validate((valid) => {
          if (valid) {
             this.form.siteId = this.siteId
     this.form.roleId = 1
     if(this.form.id){
      service.post('/user/saveOrUpdate',this.form).then(r=>{
           this.$notify({
            title: '修改成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        this.loadAllStaff()  
      }).catch(() => {
          this.$notify.error({
            title: '修改失败',
            message: '这是一条错误的提示消息'
          })
        })
     }else{
      delete this.form['enabled'];
      service.post('/user/saveOrUpdate',this.form).then(r=>{
           this.$notify({
            title: '保存成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
           this.loadAllStaff()
      }).catch(() => {
          this.$notify.error({
            title: '保存失败',
            message: '这是一条错误的提示消息'
          })
        })
     }
      
      this.dialogVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   

    },

    /* 关闭模态框之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();
      done();
    },
    beforePasswordClose(done){
        this.$refs['passwordForm'].resetFields();
          done();
    },
    /* 新增 */
    toAdd(){
      this.dialogTitle = "新增员工信息";
      this.form = {
        enabled:0
      };
      this.dialogVisible = true;
    },

    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val -1
    },

    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /* 编辑 */
    handleEdit(row) {
      this.dialogTitle = "修改员工信息";
      this.dialogVisible = true;
      this.form = _.cloneDeep(row);
    },
    // handlePasswordEdit(row) {
    //   this.passwordVisible = true;
    //   this.passwordForm.id = row.id;
    // },

    // 删除
    handleDelete(row){
      console.log(row.id);
      this.deleteStaff(row.id).then(r=>{

      })
    },

    /* 禁用 */
    handleForbidden(row) {
      // console.log(row.id);
       // this.forbiddenVisible = true;
      this.forbiddenForm = {
        id:row.id,
        enabled:false,
        forbiddenReason:''
      };
      this.changeEnabled(this.forbiddenForm,'禁用');
      // this.$refs['forbiddenForm'].resetFields();
    },
     /* 禁用模态框关闭之前 */
    // beforeForbiddenClose(done){
    //   this.$refs['forbiddenForm'].resetFields();
    //   done();
    // },
    /* 关闭禁用模态框 */
    // handleForbiddenCancle(){
    //   this.$refs['forbiddenForm'].resetFields();  //重置验证
    //   this.forbiddenVisible = false;
    // },
    /* 禁用模态框点击确定 */
   // dialogForbiddenSubmit(){
   //    this.changeEnabled(this.forbiddenForm,'禁用');
   //    this.$refs['forbiddenForm'].resetFields();  //重置验证
   //    this.forbiddenVisible = false;
   //  },
    /* 启用 */
    handleStart(id) {
    this.$router.push({path: '/staffManage/logs', query:{path:this.$route.path,id:id}});
      // console.log(row.status);
    },
     // 导出
    // exportInformation() {
    //   this.$confirm('将导出搜索的结果,确认要导出么？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then((res) => {
    //     let obj = {
    //     page: this.page,
    //     pageSize: this.pagesize,
    //     roleName:'管理员',
    //     siteId:this.siteId,
    //     id:this.searchObj.id,
    //     username:this.searchObj.username,
    //     telephone:this.searchObj.telephone,
    //   };
    //   /* 删除空属性 */
    //   for(let key in obj){
    //     if(!obj[key]&&obj[key]!==0){
    //       delete obj[key];
    //     }
    //   }
    //   config.toDownLoad('/user/download',obj,'员工');
    //     this.$notify({
    //       title: '成功',
    //       message: '正在下载...',
    //       type: 'success'
    //     })
    //   }).catch(() => {
    //     this.$notify.info({
    //       title: '消息',
    //       message: '已取消'
    //     })
    //   })
    // },
    /* 修改状态 */
    changeEnabled(obj,message){
      service.get('/user/changeEnabled',{params:obj}).then((data) => {
        this.$notify({title:'成功',type: 'success', message: message+'成功!'});
        this.loadAllStaff();
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#staffManage #add{
 float:left;
}
  #staffManage{
    .staffManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .staffManage-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
        float: right;
        margin-right:10px;
      }
    } 
    .staffManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
      .iconDiv:last-child{
        margin-left: 10px;
      }
    } 
    .staffManage-page{
      margin-top:10px;
    }
    
  }
</style>
