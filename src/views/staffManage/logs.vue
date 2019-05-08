<!--日志内容页面-->
<template>
  <div id="logsManage">
    <div class="totalTitle">日志内容</div>
    <div class="backDiv" style="float:right;margin-top:-24px;" @click="toBack">返回</div>
    <div class="logsManage-option">
      <!-- <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="日志时间" end-placeholder="日志时间"></el-date-picker>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.userId" placeholder="操作人ID" clearable></el-input>
        </div>
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div> -->
    </div>
    <div class="logsManage-table">
      <el-table border size="mini" ref="multipleTable" :data="logsData" tooltip-effect="dark" style="width: 100%">
        <el-table-column fixed align="center" prop="id" label="日志ID" width="150"></el-table-column>
        <el-table-column fixed align="center" prop="userId" label="操作者ID" width="150"></el-table-column>
        <el-table-column fixed align="center" prop="actionContent" label="内容"></el-table-column>
        <el-table-column align="center" label="操作时间">
          <template slot-scope="scope">
            <div>{{scope.row.actionTime | dateParse}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <!--  <div class="logsManage-page">
      <el-pagination small background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config.js'
import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  name: 'logsManage',
  data(){
    return {
      /* 数据条数 */
      total:0,
      /* 当前页 */
      currentPage:1,
      searchObj:{},
      logsData:[],
    };
  },
  created(){
    if(this.$route.query.id){
      this.searchObj.userId = this.$route.query.id;
      this.findLogsData();
    }else{
      this.findLogsData();
    }
  },
  computed: {
    ...mapGetters(['siteId'])
  },
  methods: {
     toBack(){
      this.$router.push(this.$route.query.path);
    },
    /* 搜索 */
    handleSearch(){
      this.findLogsData(1);
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.findLogsData(val);
    },
    /* 查找所有的商户数据 */
    findLogsData(page){
      // let obj = {
      //   // page:page?(page-1):(this.currentPage-1),
      //   // pageSize:10,
      //   // siteId:this.siteId,
      //   id:this.searchObj.userId,
      //   beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
      //   endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
      // };
      // // console.log(obj)
      // /* 删除空属性 */
      // for(let key in obj){
      //   if(!obj[key]&&obj[key]!==0){
      //     delete obj[key];
      //   }
      // }
      service.get('/user/findUserDetailsById', {params:{id:this.$route.query.id}}).then((data) => {
        if(data.status==200){
          this.logsData = data.data.data.logs;
          // console.log(data.data.data.logs)
          // this.total = data.data.data.total;
        }else{
          config.errorTitle(this,data.status,'查找失败!');
        }
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: '查找失败!'});
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  #logsManage{
    .logsManage-option{
      margin-top:10px;
      overflow: hidden;
      .searchOption>div{
        margin-bottom:10px;
      }
    } 
    .logsManage-table{
      blogs-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
    } 
    .logsManage-page{
      margin-top:10px;
    }
  }
</style>


</style>
