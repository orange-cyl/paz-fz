<!--店铺绑定页面-->
<template>
  <div id="bBindShop">
      <div class="businessManage-title"></div>
      <div class="businessManage-table">

      <el-table border ref="multipleTable" size="mini" :data="businessDetails" tooltip-effect="dark" style="width: 100%">
       
        <!-- <el-table-column align="center" prop="username" label="姓名"></el-table-column> -->
        <el-table-column align="center" prop="ratio" label="订单分成比例" width=""></el-table-column>

        

        <el-table-column align="center" prop="accountCommission" label="账户余额" ></el-table-column>
        <!-- <el-table-column align="center" prop="manager.qq" label="QQ"></el-table-column> -->
        <el-table-column align="center" prop="historyOrderCount" label="推广商家数"></el-table-column>
        <el-table-column align="center" prop="finishedOrderCount" label="累计分成金额"></el-table-column>
       <!--  <el-table-column align="center" prop="link" label="店铺网址" width="">
          <template slot-scope="scope">
            <span class="linkSpan shopLink" :data-clipboard-text="scope.row.link" :title="scope.row.link" @click="toCopy">复制链接</span>
          </template>
        </el-table-column> -->
       <!--  <el-table-column align="center" prop="sendoutProvince" label="省"></el-table-column>
        <el-table-column align="center" prop="sendoutCity" label="市"></el-table-column>
        <el-table-column align="center" prop="sendoutArea" label="区/县"></el-table-column> -->

         <!-- <el-table-column align="center" prop="registerTime" label="注册时间" width="180">
          <template slot-scope="scope">
              <div>{{scope.row.registerTime | dateParse}}</div>
          </template>
        </el-table-column> -->
         <!-- <el-table-column align="center" prop="status" label="店铺审核状态" width="150">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='审核通过'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
     <div class="recharge-page" style="margin-top:20px;">
       <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config.js'
import Clipboard from 'clipboard';

import service from '@/utils/request'
export default {
  name: 'businessDetails',
  data(){
    return {
    	pagesize:10,
       page:0,
      total:10,
      businessDetails:[]
    }
  },
  created(){
    this.loadBusiness()
       
  },

  computed: {

   // ...mapGetters(['marketingData'])
...mapGetters(['userId','siteId','marketingData','promoterDetailsId'])
  },
  watch:{
    page:function(now,old) {
      this.loadBusiness();
    }
  },
  methods: {
  	 /* 分页页数更改之后 */
    handleCurrentChange(val) {
       this.page = val -1
    },
    // loadBusiness(){
    // 	let obj={
    //     params:{
    //       // status:'待接单',
    //       agentId:this.marketingData[0].id,
    //       page:this.page,
    //       pageSize: this.pagesize
    //     }
    //   }
    /* 通过商家id获取商家基本信息 */
   // service.get('/busines/pageQuery', obj).then((data) => {
   //  // console.log('=====',data)
   //    if(data.data.status==200){
   //      this.businessDetails = data.data.data.list;
   //    }else{
   //      config.errorTitle(this,data.status,'获取信息失败');
   //    }
   //  }).catch(() => {
   //    this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
   //  })
   //  },
   loadBusiness(){
      let obj={
        params:{
          // status:'待接单',
          
          page:this.page,
          pageSize: this.pagesize,
          agentId:this.promoterDetailsId,
          siteId:this.siteId
        }
      }
    /* 通过商家id获取商家基本信息 */
   service.get('/account/query', obj).then((data) => {
    // console.log('=====',data)
      if(data.data.status==200){
        // console.log(data.data)
        this.businessDetails = data.data.data.list;
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
    },
     /* 复制链接 */
    toCopy(){
      const shopClipboard = new Clipboard('.shopLink');
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
    .businessManage-title{
      margin-top:10px;
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
