<!--充值记录页面-->
<template>
  <div id="recharge">
    <div class="recharge-title">充值记录</div>
    <div class="recharge-option">
      <div id="add">
      	<el-button size="mini" type="primary" @click="exportInformation()">导出</el-button>
      </div>
      <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="提交日期" end-placeholder="提交日期"></el-date-picker>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.businesId" placeholder="商家ID" clearable></el-input>
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
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="recharge-table">
      <el-table border ref="multipleTable" size="mini" :data="rechargeData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column align="center" prop="id" label="充值编号" fixed></el-table-column>
        <el-table-column align="center" label="商家ID">
          <template slot-scope="scope">
              <span class="linkSpan" @click="toRechargeDetails(scope.row)">{{scope.row.businesId}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="开户名"></el-table-column>
        <el-table-column align="center" prop="bank" label="充值银行"></el-table-column>
        <el-table-column align="center" prop="money" label="充值金额"></el-table-column>
        <el-table-column align="center" label="提交时间" width="150">
          <template slot-scope="scope">
              <div>{{scope.row.commitTime | dateParse}}</div>
          </template>
        </el-table-column>
         <el-table-column align="center" label="审核时间" width="150">
          <template slot-scope="scope">
              <div>{{scope.row.checkTime | dateParse}}</div>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='审核通过'?'green':scope.row.status=='未审核'?'orange':'red')"></span>{{scope.row.status=='待审核'?'待审核':scope.row.status=='审核通过'?'审核通过':'审核未通过'}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow:ellipsis" :title="scope.row.reason">{{scope.row.reason}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="recharge-page">
       <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config'; 
import service from '@/utils/request'

export default {
  name: 'recharge',
  data(){
    return {
       enabledFilter:[{
        name:'审核通过',
        value:'审核通过'
      },{
        name:'待审核',
        value:'待审核'
      },{
        name:'审核未通过',
        value:'审核未通过'
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
      currentPage:1,
      searchObj:{
      },
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
   ...mapGetters(['userId','siteId','rechargeData'])
  },
   watch:{
    page:function(now,old) {
      this.loadAllBusiness();
    }
  },
  created(){
    this.loadAllRecharge()
  },
  methods: {
    ...mapActions(['getRecharge','searchRecharge','getBusinessManage','getBusinessManage']),
    loadAllRecharge(){
       let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          siteId:this.siteId
          }
         }  
      this.getRecharge(obj).then(r=>{
         this.total = r.data.data.total
      })
    },
    // 跳转到充值详情界面
    toRechargeDetails(row){
      //设置全局变量查找的id为row.id
      let obj={
          params:{
            page: 0,
          pageSize: 10,
          // siteId:this.siteId,
          id:row.businesId
          }
         }  
        this.getBusinessManage(obj).then(r=>{
      })
         this.$router.push({path: '/businessManage/businessDetails', query:{path:this.$route.path,id:row.id}});
      // this.$router.push('/recharge/rechargeDetails');
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
        id:this.searchObj.id,
        businesId:this.searchObj.businesId,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
      };
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      config.toDownLoad('/recharge/download',obj,'充值');
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
          pageSize: this.pagesize,
          siteId:this.siteId,
           id:this.searchObj.id,
        businesId:this.searchObj.businesId,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          // ...this.searchObj
          }
         }
      this.getRecharge(obj).then(r=>{
        this.total = r.data.data.total
      })
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
       this.page = val -1
    },
    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
}
</script>
<style lang="scss" scoped>
#recharge #add{
 float:left;
}
  #recharge{
    .recharge-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .recharge-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
         float: right;
        margin-right:10px;
      }
    } 
    .recharge-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
      
    } 
    .recharge-page{
      margin-top:10px;
    }
    
  }
</style>


