<!--待接订单-->
<template>
  <div id="bBindShop">
      <div class="businessManage-title">待接订单</div>
      <div class="orderManage-option">
     
      <div class="searchOption">
       <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="创建时间" end-placeholder="创建时间"></el-date-picker>
        </div>
         <div>
          <el-input size="mini" v-model="searchObj.orderId" placeholder="订单ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.taskId" placeholder="任务ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.businesId" placeholder="商家ID" clearable></el-input>
        </div>
         <div>
          <el-select size="mini" v-model="searchObj.type" placeholder="任务类型" clearable>
            <el-option
              v-for="item in typeFilter"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>

      <div class="businessManage-table">

      <el-table border ref="multipleTable" size="mini" :data="businessDetails" tooltip-effect="dark" style="width: 100%">
      <el-table-column fixed align="center" label="创建时间"  width="200">
          <template slot-scope="scope">
            <span>{{scope.row.orderTime | dateParse}}</span>
          </template>
        </el-table-column>
      <el-table-column  align="center" prop="id" label="订单ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toOrderDetails(scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
       
        <!-- <el-table-column  align="center" prop="id" label="订单ID"></el-table-column> -->
        <el-table-column  align="center" prop="taskId" label="任务ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toTaskDetails(scope.row.taskVM)">{{scope.row.taskVM.id}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column  align="center" prop="taskType" label="任务类型"></el-table-column> -->
        <el-table-column  align="center" label="任务类型" width="150">
          <template slot-scope="scope">
              <span class="">{{scope.row.taskVM?scope.row.taskVM.taskType?scope.row.taskVM.taskType.name:'':''}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" prop="businessId" label="商家ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toBusinessDetails(scope.row.taskVM)">{{scope.row.taskVM.businesId}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bussinessDeposit" label="商品押金"></el-table-column>
        <el-table-column align="center" prop="bussinessCommission" label="佣金"></el-table-column>
        <!--  <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
           <div class="iconDiv" title="解除限制" @click="handleEdit(scope.row)">
              <i class="fa fa-edit"></i>
            </div>
            <div  class="iconDiv" title="撤销" @click="toCancel(scope.row)">
              <i class="fa fa-undo"></i>
            </div>
          </template>
        </el-table-column> -->
       
      </el-table>
    </div>
    <div class="recharge-page" style="margin-top:20px;">
       <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog center title="撤销原因" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="form" :rules="rules" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item prop="reason" label="撤销原因：" :label-width="formLabelWidth">
                <el-radio-group v-model="form.reason">
                  <el-radio label="找不到商品">找不到商品</el-radio>
                  <el-radio label="达不到商家要求">达不到商家要求</el-radio>
                  <el-radio label="不想做了">不想做了</el-radio>
                  <el-radio label="其它原因">其它原因</el-radio>
                </el-radio-group>
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
    <!--  <el-dialog center :title="dialogTitle+'原因'" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :rules="rules" :model="form" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item prop="reason" :label="dialogTitle+'原因'" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="dialogTitle+'原因'" v-model="form.reason">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogSubmit">确定</el-button>
      </div>    
    </el-dialog> -->
    <el-dialog center :title="dialogTitle" :visible.sync="dialogRemoveVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="removeForm" ref="removeForm" name="removeForm">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="任务ID：" :label-width="formLabelWidth">
                <span>{{removeForm.id}}</span>
              </el-form-item>
              <el-form-item label="解除限制：" :label-width="formLabelWidth">
                <!-- 如果选中，设置为否 -->
                <el-checkbox true-label="否" false-label="是" v-model="removeForm.isUserAge">解除年龄</el-checkbox>
                <el-checkbox true-label="否" false-label="是" v-model="removeForm.isUserGender">解除性别</el-checkbox>
                <el-checkbox true-label="否" false-label="是" v-model="removeForm.isUserRegion">解除地区</el-checkbox>
                <el-checkbox true-label="否" false-label="是" v-model="removeForm.isUserDiamond">解除钻</el-checkbox>
                <el-checkbox true-label="否" false-label="是" v-model="removeForm.isUserBuyCategory">解除类别</el-checkbox>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleRemoveCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogRemoveSubmit">确定</el-button>
      </div>    
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config.js'
import Clipboard from 'clipboard';

import service from '@/utils/request'
export default {
  name: 'businessDetails',
  data(){
    return {
         typeFilter:[],
      searchObj:{},
        removeForm:{},
       dialogRemoveVisible:false,
      formLabelWidth:'120px',
      form:{
        reason:''
       },
      dialogVisible:false,
      dialogTitle:'审核不通过',
       pagesize:10,
       page:0,
      total:10,
      businessDetails:[],
       rules:{
        reason:[
          { required: true, message: '请输入原因', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.loadVoucher()
    this.loadTaskType()
  },
  computed: {
     ...mapGetters(['userId','siteId','businessData','orderData'])

   // ...mapGetters(['businessData'])

  },
  watch:{
    page:function(now,old) {
      this.loadVoucher();
    }
  },
  methods: {
     ...mapActions(['getOrderData','getBusinessManage','getTask']),
    ...mapMutations(['alterOrderDetailsId','alterBusinessDetailsId','alterTaskDetailsId']),
      toOrderDetails(row){
       this.alterOrderDetailsId(row.id)
          
       this.$router.push({path: '/orderManage/orderDetails', query:{path:this.$route.path,id:row.id}});
    },
       /* 跳转到商家详情页 */
    toBusinessDetails(row){
      /* 设置全局的订单id */
       this.alterBusinessDetailsId(row.businesId)
       
       this.$router.push({path: '/businessManage/businessDetails', query:{path:this.$route.path,id:row.id}});
    },
     loadTaskType(){
      service.get('/taskType/findAll').then(r=>{
        // console.log(r.data.data)
        this.typeFilter = r.data.data
      })
    },
    handleSearch(){
       this.page = 0
        let obj={
        params:{
          status:'待接单',
          siteId:this.siteId,
          page:this.page,
          pageSize: this.pagesize,
          taskId:this.searchObj.taskId,
          orderId:this.searchObj.orderId,
          businesId:this.searchObj.businesId,
          beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          // ...this.searchObj
        }
      }
      /* 通过商家id获取商家基本信息 */
   service.get('/order/query', obj).then((data) => {
    // console.log('=====',data)
      if(data.data.status==200){
        this.businessDetails = data.data.data.list;
        this.total = data.data.data.total
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
    },
     /* 解除限制模态框关闭 */
    handleRemoveCancle(){
      this.dialogRemoveVisible = false;
    },
     /* 解除限制模态框确定 */
    dialogRemoveSubmit(){
      service.post('/task/saveOrUpdate', this.removeForm).then((data) => {
        if(data.status==200){
          this.$notify({title:'成功',type: 'success', message:'解除成功!'});
          this.dialogRemoveVisible = false;
          this.loadVoucher();
        }else{
          config.errorTitle(this,data.status,'解除失败!');
        }
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message:'解除失败'});
      })
    },
     /* 修改 */
    handleEdit(row) {
      this.dialogTitle = "解除限制";
      this.removeForm = _.cloneDeep(row);
      this.dialogRemoveVisible = true;
    },
    /* 模态框点击确定 */
    dialogSubmit(){
      /* 批量审核不通过 */
      this.$refs['form'].validate((valid) => {
        if (valid) {
          service.get('/order/changeStatus', {params:this.form}).then((data) => {
            if(data.status==200){
              this.$notify({title:'成功',type: 'success', message: '已撤销!'});
              this.loadVoucher();
              this.dialogVisible = false;
            }else{
              config.errorTitle(this,data.status,'撤销失败!');
            }
          }).catch(() => {
            this.$notify({title:'失败',type: 'error', message: '撤销失败!'});
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
     /* 修改状态 */
    changeStatusTask(obj,message){
      // console.log('==========',obj)
      service.get('/order/changeStatus', {params:obj}).then((data) => {
        config.errorTitle(data.status,message+'失败!');
        this.$notify({title:'成功',type: 'success', message: message+'成功!'});
        if(this.dialogTitle){
          this.$refs['form'].resetFields();  //重置验证
        }
        this.dialogVisible = false;
        // this.passVisible = false;
        this.loadVoucher();
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
     /* 模态框关闭 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
    },
     beforeClose(done){
      this.$refs['form'].resetFields();  //重置验证
      done();
    },
    /* 撤销订单 */
    toCancel(row){
      if(row.status == '已完成' || row.status == '已撤销'){
        this.$notify({
          title: '警告',
          message: '您已不能撤回此任务',
          type: 'warning'
        });
      }else{
      this.dialogTitle = '撤销';
      this.form.id = row.id
      this.form.status = '已撤销'
      this.form.userId = this.userId
      this.dialogVisible = true;
      // this.loadAllTask()
      }},
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
       this.page = val -1
    },
    loadVoucher(){
      let obj={
        params:{
          // siteId:this
          status:'待接单',
          siteId:this.siteId,
          // businesId:this.businessData[0].id,
          page:this.page,
          pageSize: this.pagesize
        }
      }
      /* 通过商家id获取商家基本信息 */
   service.get('/order/query', obj).then((data) => {
    // console.log('=====',data)
      if(data.data.status==200){
        this.businessDetails = data.data.data.list;
        this.total = data.data.data.total
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })

    },
     /* 跳转到任务详情页 */
    toTaskDetails(row){
      this.alterBusinessDetailsId(row.busines.id)

      this.alterTaskDetailsId(row.id)
      this.$router.push({path: '/taskManage/taskDetails', query:{path:this.$route.path,id:row.id}});
    },
     /* 复制链接 */
    toCopy(){
      const shopClipboard = new Clipboard('.linkClass');
      let vm = this;
      shopClipboard.on('success', function() {
        vm.$notify({title:'成功',type: 'success', message:'复制成功!'});
        shopClipboard.destroy();
      });
      shopClipboard.on('error', function() {
        vm.$notify({title:'失败',type: 'error', message:'复制失败!'});
        shopClipboard.destroy();
      });
    },
    /* 返回 */
    toBack(){
      this.$router.push(this.$route.query.path);
    },
  },
}
</script>
<style lang="scss" scoped>

  #bBindShop{
    .orderManage-option{
      overflow:hidden;
      padding-top:10px;
    }
    .businessManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
     .businessManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
    }
    font-size:14px;
    .bBindShop-title{
      overflow: hidden;
      &>div:first-child{
        float: left;
      }
      &>div:last-child{
        float: right;
      }
    }
    .infoContent{
      .baseInfo,.accountInfo{
        border-bottom:1px solid rgb(215, 215, 215);
        padding: 10px;
      }
      .infoTitle{
        line-height: 20px;
        padding:10px 0;
      }
    }
  }
</style>
