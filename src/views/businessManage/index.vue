<!--商户管理页面-->
<template>
  <div id="businessManage">
    <div class="businessManage-title">商家管理</div>
    <div class="businessManage-option">
      <!-- <div>
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div> -->
      <div id="add">
      	<el-button size="mini" type="primary" @click="exportInformation()">导出</el-button>
      </div>
       <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="注册时间" end-placeholder="注册时间"></el-date-picker>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.id" placeholder="商家ID" clearable></el-input>
        </div>
        <!-- <div>
          <el-input size="mini" v-model="searchObj.qq" placeholder="QQ" clearable></el-input>
        </div> -->
        <div>
          <el-input size="mini" v-model="searchObj.telephone" placeholder="手机号" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.agentId" placeholder="推广员ID" clearable></el-input>
        </div>
        
        <div>
          <el-select size="mini" v-model="searchObj.rank" placeholder="用户等级" clearable>
            <el-option
              v-for="item in rankFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select size="mini" v-model="searchObj.status" placeholder="状态" clearable>
            <el-option
              v-for="item in enabledFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div>
          <el-select class="orderRulesSelect" size="mini" v-model="searchObj.order" placeholder="排序规则" clearable>
            <el-option
              v-for="item in orderRules"
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
    <div class="businessManage-table">
      <el-table border ref="multipleTable" size="mini" :data="businessData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
       
        <el-table-column align="center" prop="id" label="商家ID" fixed>
          <template slot-scope="scope">
            <span class="linkSpan" @click="toDetails(scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="username" label="姓名"></el-table-column> -->
        <el-table-column align="center" prop="manager.telephone" label="手机号" width="90"></el-table-column>
        <el-table-column align="center" prop="manager.qq" label="QQ" width="100"></el-table-column>
        <el-table-column align="center" prop="accountBj" label="本金余额"></el-table-column>
        <el-table-column align="center" prop="accountYj" label="佣金余额"></el-table-column>

        <el-table-column align="center" prop="cumulativeRecharge" label="累计充值"></el-table-column>

         <el-table-column align="center" prop="promoter.id" label="邀请ID">
          <template slot-scope="scope">
           <div class="linkSpan" @click="toTgyDetails(scope.row.promoter)"> {{scope.row.promoter?scope.row.promoter.id:''}}</div>
           <!--  <div style="float:right" class="iconDiv" title="修改推广员ID" @click="handleEdit(scope.row)">
              <i class="fa fa-edit"></i>
            </div> -->
          </template>
        </el-table-column>
         <el-table-column align="center" prop="registerTime" label="注册时间" width="180">
          <template slot-scope="scope">
              <div>{{scope.row.registerTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="rank" label="用户等级"></el-table-column>
        <!-- <el-table-column align="center" prop="freeCheck" label="任务免审"></el-table-column> -->
         <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='正常'?'green':'red')"></span>{{scope.row.status=='正常'?'正常':'停用'}}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="promoter.username" label="推广员"></el-table-column> -->
        <el-table-column align="center" label="备注" width="110">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.forbiddenReason">{{scope.row.forbiddenReason}}</div>
          </template>
        </el-table-column>
      
      
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div class="iconDiv" v-if="scope.row.manager" title="修改" @click="handle(scope.row)">
              <i class="fa fa-edit"></i>
            </div>
            <div v-if="scope.row.status=='正常'" class="iconDiv" title="禁用" @click="handleForbidden(scope.row)">
              <i class="fa fa-power-off" style="color:#F56C6C"></i>
            </div>
            <div v-if="scope.row.status=='停用'" class="iconDiv" title="启用" @click="handleStart(scope.row)">
              <i class="fa fa-play-circle"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <div class="staffManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
     <!-- 修改模态框 -->
    <el-dialog center title="修改信息" :before-close="beforeAgentClose" :visible.sync="agentVisible" width="50%" position="middle">
    <!-- {{formInformation}} -->
     <div class='dialogCenter'>
        <el-form :model="formInformation" :rules="rules" ref="formInformation" name="formInformation">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="手机号" prop="telephone" :label-width="formLabelWidth">
                <el-input clearable v-model="formInformation.telephone" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="QQ号" prop="qq" :label-width="formLabelWidth">
                <el-input clearable v-model="formInformation.qq" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="用户等级" prop="rank" :label-width="formLabelWidth">
                 <el-select size="mini" v-model="formInformation.rank" placeholder="用户等级" clearable>
            <el-option
              v-for="item in rankFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-select size="mini" v-model="formInformation.status" placeholder="状态" clearable>
            <el-option
              v-for="item in enabledFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="备注" prop="forbiddenReason" :label-width="formLabelWidth">
                <el-input clearable v-model="formInformation.forbiddenReason" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleAgentCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogAgentSubmit">确定</el-button>
      </div>    
    </el-dialog>
    <!-- 修改推广员id -->
    <el-dialog center :title="dialogTitle" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="form" :rules="rules" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="推广员ID" prop="agentId" :label-width="formLabelWidth">
                <el-input clearable v-model="form.agentId" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogSubmit">确定</el-button>
      </div>    
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import service from '@/utils/request'
import axios from '@/http/axios';
import config from '../../config';
export default {
  name: 'businessManage',
  data(){
    return {
      formInformation:{},
      agentVisible:false,
      rankFilter:[{
        name:'新手上路',
        value:'新手上路'
      },{
        name:'普通用户',
        value:'普通用户'
      },{
        name:'高级用户',
        value:'高级用户'
      }],
      orderRules:[{
        name:'时间升序',
        value:'时间升序'
      },{
        name:'时间降序',
        value:'时间降序'
      },{
        name:'本金余额升序',
        value:'本金余额升序'
      },{
        name:'本金余额降序',
        value:'本金余额降序'
      },{
        name:'累计充值升序',
        value:'累计充值升序'
      },{
        name:'累计充值降序',
        value:'累计充值降序'
      }],
       enabledFilter:[{
        name:'正常',
        value:'正常'
      },{
        name:'停用',
        value:'停用'
      }],
      pagesize:10,
       page:0,
      total:10,
      form:{},
      formLabelWidth:'100px',
      /* 模态框的显示与隐藏 */
      dialogVisible:false,
      /* 模态框的标题 */
      dialogTitle:'新增员工信息',
      /* 当前页 */
      searchObj:{
      },
      // staffData: [],
      multipleSelection: [],
      // 表单验证
      rules:{
        agentId:[
          { required: true, message: '请输入推广员ID', trigger: 'blur' }
        ],
      
      },
    };
  },
  computed: {
    ...mapGetters(['userId','siteId','businessData'])
  },
  created(){
    this.loadAllBusiness()
  },
   watch:{
    page:function(now,old) {
      this.loadAllBusiness();
    }
  },
  methods: {
    ...mapActions(['getBusinessManage','searchBusinessManage','getMarketing']),
    ...mapMutations(['alterTaskDetailsId','alterSubStationDetailsId','alterBusinessDetailsId']),
    // 获取所有的商家信息
    loadAllBusiness(){
      let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          siteId:this.siteId
          }
         }  
      this.getBusinessManage(obj).then(r=>{
        // this.staffData = r.data.data.list
        this.total = r.data.data.total
      })
    },
    handleForbidden(row) {
      this.changeStatus({id:row.id,status:'停用',forbiddenReason:''},'停用');
    },

    toTgyDetails(row){
        let obj={
          params:{
            page: 0,
          pageSize: 10,
           roleName:'推广员',
           siteId:this.siteId,
           id:row.id
          }
         }  
         this.getMarketing(obj).then(r=>{
        })

         this.$router.push({path: '/marketing/marketingDetails', query:{path:this.$route.path,id:row.id}});
         
      // console.log(row.id);
      // this.$router.push('/marketing/marketingDetails');
    },
     /* 启用 */
    handleStart(row){
      this.changeStatus({id:row.id,status:'正常',forbiddenReason:''},'启用');
    },
    /* 更改状态-启用还是禁用 */
    changeStatus(obj,message){
       service.post('/busines/modifyBusinesStatus', obj).then((data) => {
        if(data.status==200){
          this.$notify({title:'成功',type: 'success', message: message+'成功!'});
          this.loadAllBusiness();
          // this.forbiddenVisible = false;
        }else{
          config.errorTitle(this,data.status,message+'失败!');
        }
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
    // 修改确定
     dialogAgentSubmit(){
      
       this.formInformation.roleId = 1;
       this.formInformation.siteId = this.siteId
      this.$refs['formInformation'].validate((valid) => {
        if (valid) {
          service.post('/busines/saveOrUpdate', this.formInformation).then((data) => {
            if(data.status==200){
              this.agentVisible = false;
              this.$refs['formInformation'].resetFields();  //重置验证
              this.$notify({title:'成功',type: 'success', message: '更新成功!'});
              this.loadAllBusiness();
            }else{
              config.errorTitle(this,data.status,'更新失败');
            }
          }).catch(() => {
            this.$notify({title:'失败',type: 'error', message: '更新失败!'});
          })
        } else {
          return false;
        }
      })

    },
    // 修改取消
    handleAgentCancle(){
      this.agentVisible = false;
    },
    beforeAgentClose(done){
      done();
    },
     /* 跳转到详情页 */
    toDetails(row){
      //设置全局变量查找的id为row.id
      //  let obj={
      //     params:{
      //       page: 0,
      //     pageSize: 10,
      //     siteId:this.siteId,
      //     id:row.id
      //     }
      //    }  
      //    this.getBusinessManage(obj).then(r=>{
      // })
         this.alterBusinessDetailsId(row.id);
      this.$router.push({path: '/businessManage/businessDetails', query:{path:this.$route.path,id:row.id}});
      // this.$router.push('/businessManage/businessDetails');
    },
  	// 导出
     exportInformation() {
      this.$confirm('确认要导出么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        let obj = {
        page: this.page,
        pageSize: this.pagesize,
        siteId:this.siteId,
        id:this.searchObj.id,
        qq:this.searchObj.qq,
        telephone:this.searchObj.telephone,
        agentId:this.searchObj.agentId,
        status:this.searchObj.status,
        rank:this.searchObj.rank,
      };
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      config.toDownLoad('/busines/download',obj,'商家');
        this.$notify({
          title: '成功',
          message: '正在下载...',
          type: 'success'
        })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消'
        })
      })
    },
    /* 搜索 */
    handleSearch(){
       this.page = 0
      let obj={
          params:{
            siteId:this.siteId,
            page: this.page,
          pageSize: this.pagesize,
        id:this.searchObj.id,
        telephone:this.searchObj.telephone,
        agentId:this.searchObj.agentId,
        status:this.searchObj.status,
        rank:this.searchObj.rank,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          // ...this.searchObj
          }
         }
         /* 传递排序规则 */
      if(this.searchObj.order=='时间升序'){
        obj.params.orderField = 'pb.register_time';
        obj.params.orderType = 'asc';
      }else if(this.searchObj.order=='时间降序'){
        obj.params.orderField = 'pb.register_time';
        obj.params.orderType = 'desc';
      }else if(this.searchObj.order=='本金余额升序'){
        obj.params.orderField = 'pb.account_bj';
        obj.params.orderType = 'asc';
      }else if(this.searchObj.order=='本金余额降序'){
        obj.params.orderField = 'pb.account_bj';
        obj.params.orderType = 'desc';
      }else if(this.searchObj.order=='累计充值升序'){
        obj.params.orderField = 'pb.account_bj';
        obj.params.orderType = 'asc';
      }else if(this.searchObj.order=='累计充值降序'){
        obj.params.orderField = 'pb.account_bj';
        obj.params.orderType = 'desc';
      }else{
        obj.params.orderField = '';
        obj.params.orderType = '';
      }
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      this.getBusinessManage(obj).then(r=>{
        // this.staffData = r.data.data.list
        this.total = r.data.data.total
        // console.log('22222222',this.staffData)
      })
    },

    /* 关闭模态框 */
    handleCancle(){

      this.dialogVisible = false;
    },
    /* 模态框点击确定 */
    dialogSubmit(){
       this.$refs['form'].validate((valid) => {
          if (valid) {
            service.post('/busines/modifyAgentId',this.form).then(r=>{
        if(r.data.status == 500){
          this.$notify({title:'失败',type: 'error', message:'推广员ID输入有误，请重新输入!'});
        }if(r.data.status == 200){
          this.dialogVisible = false;
          this.$notify({title:'成功',type: 'success', message: '修改推广员成功!'});
          this.loadAllBusiness();
        }
      }).catch(() => {
         this.dialogVisible = false;
          this.$notify.error({
            title: '修改失败',
            message: '这是一条错误的提示消息'
          })
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       // console.log('==============',this.form.agentId)
       
     
    },
    /* 关闭模态框之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();
      done();
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.page = val -1
    },
    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /* 编辑 推广员*/
    handleEdit(row) {
      // console.log(row)
      this.dialogTitle = "修改推广员ID";
      this.dialogVisible = true;
      this.form = {
        id:row.id,
        agentId:row.promoter.id,
        siteId:this.siteId
      };
      // console.log(this.form.agentId)
    },
    /* 编辑*/
    handle(row) {
      // console.log(row)
      // this.dialogTitle = "修改信息";
      this.agentVisible = true;
      if(row.manager){
        this.formInformation = _.cloneDeep(row.manager);
      }else{
        this.formInformation = {};
      }
      
      // console.log(this.form.agentId)
    },
    
  },
}
</script>
<style lang="scss" scoped>
#businessManage #add{
 float:left;
}
  #businessManage{
    .businessManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .businessManage-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
        float: right;
        margin-right:10px;
      }
    } 
    .businessManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
      
    } 
    .businessManage-page{
      margin-top:10px;
    }
  }
</style>

