<!--任务管理页面-->
<template>
  <div id="taskManage">
    <div class="totalTitle">任务管理</div>
    <div class="taskManage-option" style="float:right;margin:10px;margin-top:20px;">
      <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="创建日期" end-placeholder="创建日期"></el-date-picker>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.id" placeholder="任务ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.businesId" placeholder="商家ID" clearable></el-input>
        </div>
        <!-- <div>
          <el-input size="mini" v-model="searchObj.telephone" placeholder="手机号" clearable></el-input>
        </div> -->
        
        <div>
          <el-select size="mini" v-model="searchObj.status" placeholder="任务状态" clearable>
            <el-option
              v-for="item in stateFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select class="taskTypeSelect" size="mini" v-model="searchObj.taskTypeId" placeholder="任务类型" clearable>
            <el-option
              v-for="item in task_type"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="taskManage-table">
      <el-table border ref="multipleTable" size="mini" :data="taskManageData" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" prop="id" label="任务ID" fixed>
          <template slot-scope="scope">
              <span class="linkSpan" @click="toTaskDetails(scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务类型" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.taskType?scope.row.taskType.name:''}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="撤销" width="80">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toCancel(scope.row)">撤销</span>
          </template>
        </el-table-column> -->
         <el-table-column align="center" label="商家ID" width="85">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toBusinessDetails(scope.row.busines?scope.row.busines.id:'')">
                {{scope.row.busines?scope.row.busines.id:''}}
              </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商家手机">
          <template slot-scope="scope">
              <span>{{(scope.row.busines&&scope.row.busines.manager)?scope.row.busines.manager.telephone:''}}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" label="商品名称" width="110">
          <template slot-scope="scope">
            <div class="linkSpan linkClass" style="width:100px;overflow:hidden;white-space: nowrap;text-overflow:ellipsis" :title="scope.row.commodityName"><a :href="scope.row.commodityLink">{{scope.row.commodityName}}</a></div>
          </template>
        </el-table-column>
       <!-- <el-table-column align="center" label="商品链接" width="80">
          <template slot-scope="scope">
            <span class="linkSpan linkClass" :data-clipboard-text="scope.row.commodityLink" :title="scope.row.commodityLink" @click="toCopy">复制链接</span>
          </template>
        </el-table-column> -->
         
        <el-table-column align="center" prop="commodityNum" label="订单量"></el-table-column>
        <el-table-column align="center" prop="commodityPrice" label="本金"></el-table-column>
        <el-table-column align="center" prop="commission" label="佣金"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"  width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateParse}}</span>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="status" label="任务状态">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='已完成'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="任务备注" width="110">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.comment">{{scope.row.comment}}</div>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <div class="iconDiv" v-if="scope.row.status !=='待支付' && scope.row.status !=='已完成' && scope.row.status !=='已撤销'" title="解除限制" @click="handleEdit(scope.row)">
              <i class="fa fa-edit"></i>
            </div>
            <div class="iconDiv" v-if="scope.row.status =='待放单' || scope.row.status =='进行中'" title="撤销" @click="toCancel(scope.row)">
              <i class="fa fa-undo"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="taskManage-page">
     <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- 撤销原因模态框 -->
    <el-dialog center :title="dialogTitle+'原因'" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :rules="rules" :model="form" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
            <el-form-item prop="" label="撤销提示:" :label-width="formLabelWidth">
               <span>只能撤销待放单，当前任务待放单32单</span>
              </el-form-item>
               <el-form-item prop="" label="撤销类型:" :label-width="formLabelWidth">
               <span>待放单</span>
              </el-form-item>
              <el-form-item prop="reason" :label="dialogTitle+'原因:'" :label-width="formLabelWidth">
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
    <!-- 新增和修改模态框 -->
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
import config from '../../config'; 
import axios from '@/http/axios'; 
import service from '@/utils/request'

import Clipboard from 'clipboard';
export default {
  name: 'taskManage',
  data(){
    return {
      task_type:[],
      statusFilter:[{
        name:'待支付',
        value:'待支付'
      },{
        name:'待审核',
        value:'待审核'
      },{
        name:'审核通过',
        value:'审核通过'
      },{
        name:'审核未通过',
        value:'审核未通过'
      },{
        name:'进行中',
        value:'进行中'
      },{
        name:'已完成',
        value:'已完成'
      },{
        name:'已撤销',
        value:'已撤销'
      }],
      formLabelWidth:'120px',
       form:{
        reason:''
       },
      dialogVisible:false,
      dialogTitle:'审核不通过',
      dialogRemoveVisible:false,
       pagesize:10,
      /* 当前页 */
      page:0,
      removeForm:{},
      total:10,
      searchObj:{
        state:''
      },
      stateFilter:[{
        name:'待支付',
        value:'待支付'
      },{
        name:'待放单',
        value:'审核未通过'
      },{
        name:'进行中',
        value:'进行中'
      },{
        name:'已完成',
        value:'已完成'
      },{
        name:'已撤销',
        value:'已撤销'
      }],
      // 禁用和审核不通过表单验证
      rules:{
        reason:[
          { required: true, message: '请输入原因', trigger: 'blur' }
        ]
      }
      // taskData: []
    };
  },
  computed: {
         ...mapGetters(['userId','siteId','taskManageData'])
  },
  watch:{
    page:function(now,old) {
      this.loadAllTask();
    }
  },
  created(){
    this.loadAllTask();
    service.get('/taskType/findAll').then((data) => {
      if(data.status==200){
        this.task_type = data.data.data;
      }else{
        config.errorTitle(this.data.status,'获取任务类型失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取任务类型失败!'});
    })
  },
  methods: {
    ...mapActions(['getTask','searchTask','getShopManage','getBusinessManage']),
    ...mapMutations(['alterOrderDetailsId','alterBusinessDetailsId','alterTaskDetailsId']),

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
          this.loadAllTask();
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
     /* 复制链接 */
    toCopy(){
      const clipboard = new Clipboard('.linkClass');
      let vm = this;
      clipboard.on('success', function() {
        vm.$notify({title:'成功',type: 'success', message:'复制成功!'});
        clipboard.destroy();
      });
      clipboard.on('error', function() {
        vm.$notify({title:'失败',type: 'error', message:'复制失败!'});
        clipboard.destroy();
      });
    },
    /* 模态框关闭之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();  //重置验证
      done();
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
      service.get('/task/changeStatus', {params:obj}).then((data) => {
        config.errorTitle(data.status,message+'失败!');
        this.$notify({title:'成功',type: 'success', message: message+'成功!'});
        if(this.dialogTitle){
          this.$refs['form'].resetFields();  //重置验证
        }
        this.dialogVisible = false;
        this.passVisible = false;
        this.loadAllTask();
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
     /* 模态框关闭 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
    },
    // 加载所有的任务
    loadAllTask(){
        let obj={
          params:{
          page: 0,
          pageSize: 10,
          siteId:this.siteId
          }
         }  
      this.getTask(obj).then(r=>{
          this.total = r.data.data.total
      })
    },
     /* 撤销 */
    toCancel(row){
      
      this.dialogTitle = '撤销';
      this.form.id = row.id
      this.form.status = '已撤销'
      this.form.userId = this.userId
      this.dialogVisible = true;
      // this.loadAllTask()
      
      // this.forms = {
      //   id:row.id,
      //   status:'撤销',
      //   reason:this.form.reason,
      //   userId:this.userId
      // };
       
      // axios.get('/task/changeStatus',this.form).then(r=>{
      //    this.$notify({title:'成功',type: 'success', message:'撤销成功!'});
      // }).catch(r=>{
      //   this.$notify({title:'失败',type: 'error', message:'撤销失败!'});
      // })
   
    },
    /* 跳转到任务详情页 */
    toTaskDetails(row){
      // let obj={
      //     params:{
      //     page: this.page,
      //     pageSize: this.pagesize,
      //     siteId:this.siteId,
      //     id: row.id
      //     }
      //    }  
       this.alterBusinessDetailsId(row.busines.id)

      this.alterTaskDetailsId(row.id)
      this.$router.push({path: '/taskManage/taskDetails', query:{path:this.$route.path,id:row.id}});
      // this.$router.push('/taskManage/taskDetails');
    },
    /* 跳转到商家详情页 */
    toBusinessDetails(row){
       this.alterBusinessDetailsId(row)
       this.$router.push({path: '/businessManage/businessDetails', query:{path:this.$route.path,id:row.id}});
    },
    /* 搜索 */
    handleSearch(){
     this.page = 0
     let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          siteId:this.siteId,
           id:this.searchObj.id,
        businesId:this.searchObj.businesId,
        // telephone:this.searchObj.telephone,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
        taskTypeId:this.searchObj.taskTypeId

          }
         }   
       this.getTask(obj).then(r=>{
       
          this.total = r.data.data.total
      })
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.page = val-1
    },
  },
}
</script>
<style lang="scss" scoped>
  #taskManage{
    .taskManage-option{
      margin-top:10px;
      overflow: hidden;
      .batchBtn{
        float: left;
      }
    } 
    .taskManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
    } 
    .taskManage-page{
      margin-top:10px;
    }
  }
</style>
