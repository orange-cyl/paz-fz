<!--商家详情页面-->
<template>
  <div id="businessDetails">
  <!-- {{activeName}} -->
  <div class="backDiv" @click="toBack">返回</div>
  <el-tabs type="card" style="overflow:hidden;" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推广员详情" name="marketingDetails">推广员详情</el-tab-pane>
      <el-tab-pane label="账户信息" name="voucher">账户信息</el-tab-pane>
      <el-tab-pane label="推广商家" name="business">推广商家</el-tab-pane>
      <el-tab-pane label="资金日志" name="money">资金日志</el-tab-pane>
      <!-- <el-tab-pane label="已完成订单" name="finishOrder">已完成订单</el-tab-pane>
      <el-tab-pane label="已撤销订单" name="cancelOrder">已撤销订单</el-tab-pane>
      <el-tab-pane label="绑定店铺" name="bindShop">绑定店铺</el-tab-pane>
      <el-tab-pane label="充值记录" name="voucher">充值记录</el-tab-pane> -->
      
      <!-- <el-tab-pane label="资金日志" name="money">资金日志</el-tab-pane> -->
    </el-tabs>
      <div class="tbl-content">
        <router-view></router-view>
    </div>
   <!--  <div class="totalTitle businessDetails-title">
      <div>商家详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div>
    <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">基本信息</div>
        <el-row>
          <el-col :span="4" class="marginSet">
            <span>商家ID：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].id}}</span>
          </el-col>
          <el-col :span="4" class="marginSet">
            <span>姓名：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].username?businessData[0].username:''}}</span>
          </el-col>
          </el-row>

          <el-row>
          <el-col :span="4" class="marginSet">
            <span>手机号：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].manager?businessData[0].manager.telephone?businessData[0].manager.telephone:'':''}}</span>
          </el-col>
          <el-col :span="4" class="marginSet">
            <span>QQ号：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].manager?businessData[0].manager.qq?businessData[0].manager.qq:'':''}}</span>
          </el-col>
          </el-row>

          <el-row>
          <el-col :span="4" class="marginSet">
            <span>状态：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].status?businessData[0].status:''}}</span>
          </el-col>
          <el-col :span="4" class="marginSet">
            <span>注册时间：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].registerTime | dateParse}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="accountInfo">
        <div class="infoTitle">账号信息</div>
        <el-row>
          <el-col :span="4" class="marginSet">
            <span>本金：</span>
          </el-col>
           <el-col :span="8" class="marginSet">
            <span>{{businessData[0].accountBj}}</span>
          </el-col>
          <el-col :span="4" class="marginSet">
            <span>佣金：</span>
          </el-col>
          <el-col :span="8" class="marginSet">
            <span>{{businessData[0].accountYj}}</span>
          </el-col>
        </el-row>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import service from '@/utils/request'

export default {
  name: 'marketing',
  data(){
    return {
      activeName:'marketing'
    }
  },
  computed: {
      ...mapGetters(['businessData']),
  },
  created() {

  },
  watch:{
    // activeName:function(now,old) {
    //   this.handleClick();
    // }
  },
  methods: {
    /* 从全局中获取刷手的id,向后台要数据 */
      test(){
              // console.log('=======',this.businessData)
            },
    handleClick(tab, event) {
      this.$router.push('/marketing/marketingDetails/'+tab.name);
    },
    toBack(){

       this.$router.push(this.$route.query.path);
      // this.$router.push('/businessManage/index');
    }
  },
}
</script>
<style type="text/css">
   .el-tabs--card > .el-tabs__header{
  margin-bottom: 14px!important;
 }
</style>
<style lang="scss" scoped>
 
  #businessDetails{
    font-size:14px;
    .businessDetails-title{
      overflow: hidden;
      &>div:first-child{
        float: left;
      }
      &>div:last-child{
        float: right;
      }
    }
    .accountInfo{
        .marginSet:nth-child(even){
          color:red;
        }
    }
    .infoContent{
      .baseInfo,.accountInfo{
        border-bottom:1px solid rgb(215, 215, 215);
        padding: 10px;
      }
      .infoTitle{
        font-size:18px;
        line-height: 20px;
        padding:10px 0;
      }
     
    }
  }
</style>
