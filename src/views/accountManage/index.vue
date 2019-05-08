<!--账户管理-->
<template>
  <div id="accountManage">
    <div class="accountManage-title">分站财务</div>
    <div class="accountManage-option">
      <!-- <div>
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div> -->
      <div id="add">
      	<el-button size="mini" type="primary" @click="exportInformation()">导出</el-button>
      </div>
      
        <!-- <div>
          <el-input size="mini" v-model="searchObj.businessId" placeholder="商家ID" clearable></el-input>
        </div> -->
        <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="交易日期" end-placeholder="交易日期"></el-date-picker>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.orderId" placeholder="订单ID" clearable></el-input>
        </div>
         <div>
          <el-input size="mini" v-model="searchObj.agentId" placeholder="推广员ID" clearable></el-input>
        </div>
         <!-- <div>
          <el-input size="mini" v-model="searchObj.orderId" placeholder="订单ID" clearable></el-input>
        </div> -->
        <div>
          <el-select size="mini" v-model="searchObj.type" placeholder="类型" clearable>
            <el-option
              v-for="item in rankFilter"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      <div>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    </div>
    <div class="accountManage-table">
      <el-table border ref="multipleTable" size="mini" :data="accountData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column align="center" prop="transactionTime" label="交易时间" width="150">
          <template slot-scope="scope">
              <div>{{scope.row.transactionTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型"></el-table-column>
        <el-table-column align="center" prop="balance" label="账户"></el-table-column>
      <el-table-column label="收益所属订单" align="center" width="100">
       <template slot-scope="scope">
              <div v-if="scope.row.type == '订单利润'">{{scope.row.orderId}}</div>
          </template>
      </el-table-column>
        <!-- <el-table-column align="center" prop="orderId" label="收益所属订单"></el-table-column> -->
        <el-table-column align="center" prop="transactionMoney" label="收益金额"></el-table-column>
        <el-table-column align="center" prop="scalpuserId" label="推广员ID"></el-table-column>
        <el-table-column align="center" prop="transactionMoney" label="推广员分成"></el-table-column>

        <el-table-column align="center" prop="balance" label="分站余额"></el-table-column>
        <el-table-column label="备注" align="center" width="200" fixed="right" style="position:relative;">
        <template slot-scope="scope">
        <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.comment"  class="iconDiv" > {{scope.row.comment}}<span style="color:blue;cursor: pointer;position:absolute;right:10px;" @click="toNote(scope.row)">备注</span></div>
       
        </template>
      </el-table-column>
        <!-- <el-table-column align="center" prop="comment" label="备注"></el-table-column> -->
 <!-- <el-table-column label="备注" align="center" width="200" fixed="right">
        <template slot-scope="scope">
        <div style="color:blue;cursor: pointer;"  class="iconDiv" title="备注" @click="toNote(scope.row)">备注</div>
        {{scope.row.comment}}
        </template>
      </el-table-column> -->
        <!-- <el-table-column align="center" prop="info" label="交易信息"></el-table-column> -->
        <!-- <el-table-column align="center" prop="agentId" label="推广员ID"></el-table-column> -->
       
      </el-table>
    </div>
    <el-dialog center title="备注" :visible.sync="noteVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form v-model="form" ref="forbiddenForm" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" placeholder="请输入备注原因" v-model='form.comment'>
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
    </el-dialog>
    <div class="accountManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config'; 
import service from '@/utils/request'
import axios from '@/http/axios'; 
export default {
  name: 'accountManage',
  data(){
    return {
      noteVisible: false,
       formLabelWidth: '100px',
      
      form: {comment:''},
      rankFilter:[
      '订单利润',
      '分站提现'
      ],

      pagesize:10,
      /* 当前页 */
      page:0,
      total:10,
      form:{},
      formLabelWidth:'100px',
      /* 模态框的显示与隐藏 */
      dialogVisible:false,
      /* 模态框的标题 */
      dialogTitle:'新增员工信息',
      /* 当前页 */
      searchObj:{},
      accountData: [],
      multipleSelection: [],
      // 表单验证
      rules:{
        name:[
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入员工手机号', trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
   ...mapGetters(['userId','siteId'])
  },
  created(){
    this.loadAllAccount();
  },
   watch:{
    page:function(now,old) {
      this.loadAllAccount();
    }
  },
  created() {
     this.loadAllAccount();
  },
  methods: {
        ...mapActions(['getAccountManage','searchAccountManage','changenote']),
         dialogForbiddenSubmit() {
      // let obj={
          
      //       id:this.form.id,
      //       comment:this.form.comment
          
      //    }
      //    console.log("11111",obj)
       this.changenote(this.form).then(r=>{
        // console.log('mmm',r.data)
        if(r.data.status == 200){
           this.$notify({
            title: '提交成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        this.loadAllAccount()
      }else{
        this.$notify.error({
            title: '提交失败',
            message: '这是一条错误的提示消息'
          })
      }
          
      }).catch(() => {
          this.$notify.error({
            title: '提交失败',
            message: '这是一条错误的提示消息'
          })
        })
      this.form = {}
      this.noteVisible = false;
    },
     // 模态框点击取消
    handleForbiddenCancle() {
      this.form = {}
      this.noteVisible = false;
    },
    
 // 显示备注模态框
    toNote(row) {
     this.form = {
      id:row.id
     }
      this.noteVisible = true
    },
    // 加载所有的账户信息
    loadAllAccount(){
       let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
           siteId:this.siteId
          }
         }  
      this.getAccountManage(obj).then(r=>{
        this.accountData = r.data.data.list
          this.total = r.data.data.total
      })
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
            siteId:this.siteId,
          pageSize: this.pagesize,
          agentId:this.searchObj.agentId,
          orderId:this.searchObj.orderId,
          type:this.searchObj.type,
           beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
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
            page: this.page,
            siteId:this.siteId,
          pageSize: this.pagesize,
          orderId:this.searchObj.orderId,
          type:this.searchObj.type,
          agentId:this.searchObj.agentId,
           beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          
          }
         } 
          /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      this.getAccountManage(obj).then(r=>{
        this.accountData = r.data.data.list
          this.total = r.data.data.total
      })
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
     this.page = val - 1
    },
    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
   
  },
}
</script>
<style lang="scss" scoped>
#accountManage #add{
 float:left;
}
  #accountManage{
    .accountManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .accountManage-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
        float: right;
        margin-right:10px;
      }
    } 
    .accountManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
      
    } 
    .accountManage-page{
      margin-top:10px;
    }
    
  }
</style>




