<!--进行中订单页面-->
<!--待接订单页面-->
<template>
  <div id="waitOrder">
    <div id="orderManage">
    <div class="businessManage-title">进行中订单</div>
    <!-- <div class="totalTitle">订单管理</div> -->
    <div class="orderManage-option">
     
      <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="接单时间" end-placeholder="接单时间"></el-date-picker>
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
        <!-- <div>
          <el-input size="mini" v-model="searchObj.agentId" placeholder="推广员ID" clearable></el-input>
        </div> -->
        <div>
          <el-input size="mini" v-model="searchObj.scalpuserId" placeholder="买手ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.taobaoOrderId" placeholder="电商单号" clearable></el-input>
        </div>
      <!--   <div>
          <el-input size="mini" v-model="searchObj.scalpuserTaobao" placeholder="接单账号" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.commodityName" placeholder="商品名称" clearable></el-input>
        </div>
         -->
        <div>
          <el-select size="mini" v-model="searchObj.status" placeholder="订单状态" clearable>
            <el-option
              v-for="item in statusFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
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
 
    <div class="orderManage-table">
      <el-table border ref="multipleTable" size="mini" :data="orderData" tooltip-effect="dark" style="width: 100%">
        <el-table-column fixed align="center" prop="id" label="订单ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toOrderDetails(scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="taskId" label="任务ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toTaskDetails(scope.row.taskVM)">{{scope.row.taskVM.id}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed align="center" prop="businessId" label="商家ID" width="100">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toBusinessDetails(scope.row.taskVM)">{{scope.row.taskVM.businesId}}</span>
          </template>
        </el-table-column>
         <el-table-column  align="center" label="任务类型" width="150">
          <template slot-scope="scope">
              <span class="">{{scope.row.taskVM?scope.row.taskVM.taskType?scope.row.taskVM.taskType.name:'':''}}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" label="商品名称" width="110">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.commodityName">{{scope.row.taskVM?scope.row.taskVM.commodityName:''}}</div>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="jiedanTime" label="接单时间"  width="200">
          <template slot-scope="scope">
            <span>{{scope.row.jiedanTime | dateParse}}</span>
          </template>
        </el-table-column>
          <el-table-column align="center" prop="scalpuser.id" label="买手ID" width="100"></el-table-column>
          <el-table-column align="center" prop="bussinessDeposit" label="商家押金"></el-table-column>
       
        <el-table-column align="center" prop="bussinessCommission" label="佣金" width="80"></el-table-column>
        <el-table-column align="center" prop="userCommitMoney" label="买手付款"></el-table-column>    
        <el-table-column align="center" prop="businessRefund" label="商家返款"></el-table-column>
        <el-table-column align="center" prop="taobaoorderid" label="电商订单号" width="250"></el-table-column>
         <el-table-column align="center" prop="status" label="订单状态" width="95">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='已完成'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog center :title="dialogTitle+'原因'" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
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
    </el-dialog>
    <div class="staffManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config'; 
import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  name: 'orderManage',
  data(){
    return {
      typeFilter:[],
      formLabelWidth:'120px',
       dialogTitle:'审核不通过',
       dialogVisible:false,
      form:{
        reason:''
       },
      pagesize:10,
      /* 当前页 */
      page:0,
      total:10,
      searchObj:{
        state:''
      },
      statusFilter:[{
        name:'待操作',
        value:'待操作'
      },{
        name:'待返款',
        value:'待返款'
      },{
        name:'待评价',
        value:'待评价'
      },{
        name:'待确认',
        value:'待确认'
      }],
       // 禁用和审核不通过表单验证
      rules:{
        reason:[
          { required: true, message: '请输入原因', trigger: 'blur' }
        ]
      }
      // orderData: []
    };
  },
  computed: {
   ...mapGetters(['userId','siteId','orderData'])
  },
  created(){
    this.loadAllOrder()
     this.loadTaskType()
  },
  methods: {
    ...mapActions(['getOrderData','getBusinessManage','getTask']),
    ...mapMutations(['alterOrderDetailsId','alterBusinessDetailsId','alterTaskDetailsId']),

     loadTaskType(){
      service.get('/taskType/findAll').then(r=>{
        // console.log(r.data.data)
        this.typeFilter = r.data.data
      })
    },
    loadAllOrder(){
       let obj={ 
            page: this.page,
          pageSize: this.pagesize,
           siteId:this.siteId,
        orderId:this.searchObj.orderId,
        taskId:this.searchObj.taskId,
        businesId:this.searchObj.businesId,
        agentId:this.searchObj.agentId,
        scalpuserId:this.searchObj.scalpuserId,
        scalpuserTaobao:this.searchObj.scalpuserTaobao,
        commodityName:this.searchObj.commodityName,
        taobaoOrderId:this.searchObj.taobaoOrderId,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
      
         }   

        for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      this.getOrderData({params:obj}).then(r=>{
        // this.orderData = r.data.data.list
        this.total = r.data.data.total
      })
    },
      /* 模态框点击确定 */
    dialogSubmit(){
      let obj = {
        id:this.form.id,
        status:this.form.status,
        reason:this.form.reason,
        userId:this.form.userId    
      }
      // console.log('==========',obj)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.changeStatusTask(obj,this.dialogTitle);
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
        this.passVisible = false;
        this.loadAllOrder();
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
    /* 跳转到订单详情页 */
    toOrderDetails(row){
       this.alterOrderDetailsId(row.id)
      this.$router.push({path: '/orderManage/orderDetails', query:{path:this.$route.path,id:row.id}});
    },
    /* 跳转到任务详情页 */
    toTaskDetails(row){
      this.alterBusinessDetailsId(row.busines.id)

      this.alterTaskDetailsId(row.id)
      this.$router.push({path: '/taskManage/taskDetails', query:{path:this.$route.path,id:row.id}});
    },
    /* 跳转到商家详情页 */
    toBusinessDetails(row){
      /* 设置全局的订单id */
       this.alterBusinessDetailsId(row.businesId)
       
       this.$router.push({path: '/businessManage/businessDetails', query:{path:this.$route.path,id:row.id}});
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
        orderId:this.searchObj.orderId,
        taskId:this.searchObj.taskId,
        businesId:this.searchObj.businesId,
        agentId:this.searchObj.agentId,
        scalpuserId:this.searchObj.scalpuserId,
        scalpuserTaobao:this.searchObj.scalpuserTaobao,
        commodityName:this.searchObj.commodityName,
        taobaoOrderId:this.searchObj.taobaoOrderId,
        status:this.searchObj.status,
        startTime:this.searchObj.searchTime?this.searchObj.searchTime[0]:'',
        endTime:this.searchObj.searchTime?this.searchObj.searchTime[1]:'',
      };
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      config.toDownLoad('/order/download',obj,'订单');
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
       this.loadAllOrder();
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.page = val - 1
    },
  },
}
</script>
<style lang="scss" scoped>
#orderManage #add{
 float:left;
}
  #orderManage{
     .businessManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .orderManage-option{
      margin-top:10px;
      overflow: hidden;
       .searchOption>div{
        margin-bottom:10px;
      }
     
    } 
    .orderManage-table{
       margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
    } 
    .orderManage-page{
      margin-top:10px;
    }
  }
</style>


</style>
