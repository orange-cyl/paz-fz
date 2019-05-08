<!--订单详情页面-->
<template>
  <div id="orderDetails">
    <!-- <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="basicInformation"></el-tab-pane>
      <el-tab-pane label="资金信息" name="moneyInformation"></el-tab-pane>
      <el-tab-pane label="操作信息" name="handleInformation"></el-tab-pane>
      <!-- <el-tab-pane label="已撤销订单" name="cancelOrder"></el-tab-pane> -->
    <!-- </el-tabs> -->
    <!-- 选项卡体部 -->
    <!-- <div class="tbl-content"> -->
        <!-- <router-view></router-view> -->
    <!-- </div> --> 
    <div class="totalTitle orderDetails-title">
      <div>订单详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div>
    <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">【基本信息】</div>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>订单ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.id}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>任务ID：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.taskId}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>任务类型：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.taskVM?(orderDetails.taskVM.taskType?orderDetails.taskVM.taskType.name:''):''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商家ID：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.taskVM?orderDetails.taskVM.busines?orderDetails.taskVM.busines.id:'':''}}</span>
          </el-col>
        </el-row>
      
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>任务类型：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.taskVM?orderDetails.taskVM.taskType?orderDetails.taskVM.taskType.name:'':''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商品名称：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.taskVM?orderDetails.taskVM.commodityName:''}}</span>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="7"  class="marginSet">
            <span>商品垫付押金：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.bussinessDeposit}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>佣金：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.bussinessCommission}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>买手ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.scalpuserId}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>撤销人：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.canceler}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>撤销时间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.chexiaoTime | dateParse}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>撤销原因：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{orderDetails.reason}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="accountInfo">
        <div class="infoTitle">【资金信息】</div>
         <el-row>
          <el-col :span="7"  class="marginSet">
            <span>商家支付本金：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{orderDetails.bussinessCapital}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商家支付佣金：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">￥{{orderDetails.bussinessCommission}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>商家垫付押金：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{orderDetails.bussinessDeposit}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>用户提交金额：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">￥{{orderDetails.userCommitMoney}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>返款金额：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{orderDetails.businessRefund}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="operateInfo">
        <div class="infoTitle">【操作信息】</div>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>电商订单号：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{orderDetails.taobaoorderid}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>实际支付金额：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">￥{{orderDetails.businessPayments}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>最近更新时间：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span>{{orderDetails.updateTime | dateParse}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>货比三家：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <img v-for="(item,index) in orderDetails.threeGoodsImage" :src="item.url" :key="index" alt="">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>浏览店铺及目标商品：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <img v-for="(item,index) in orderDetails.targetImage" :src="item.url" :key="index" alt="">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>聊天下单支付：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <img v-for="(item,index) in orderDetails.payImage" :src="item.url" :key="index" alt="">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>确认收货好评：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <img v-for="(item,index) in orderDetails.commentImage" :src="item.url" :key="index" alt="">
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config';
import axios from '@/http/axios'
import service from '@/utils/request'

export default {
  name: 'orderDetails',
  data(){
    return {
      activeName:'basicInformation',
      orderDetails:{}
    }
  },
  created(){
    /* 通过订单ID获取订单基本信息 */
    service.post('/order/findOrderDetailsById', {id:this.$route.query.id}).then((data) => {
      if(data.status==200){
        this.orderDetails = data.data.data;
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
  },
  computed: {
   
  },
  methods: {
    //  handleClick(tab, event) {
    //   this.$router.push('/orderManage/orderDetails/'+tab.name);
    // },
    /* 从全局中获取刷手的id,向后台要数据 */
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #orderDetails{
    font-size: 14px;
    .orderDetails-title{
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
    img{
      width: 50px;
      height:100px;
      margin-right:10px;
    }
  }
</style>
