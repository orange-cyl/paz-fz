<!--商家详情页面-->
<template>
  <div id="businessDetails">
    <div class="totalTitle businessDetails-title">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import service from '@/utils/request'

export default {
  name: 'businessDetails',
  data(){
    return {
      businessDetails:{
        baseInfo:{
          id:10210101299,
          origin:'renqishi.com',
          time:'2019-02-12 08:20:21',
          phone:'18891913344',
          qq:'80950102',
          state:'正常',
        },
        accountInfo:{
          capital:'0.68',
          commission:'0.00',
        }
      }
    }
  },
  computed: {
      ...mapGetters(['businessData']),
  },
  created() {
// this.test()
  },
  methods: {
    /* 从全局中获取刷手的id,向后台要数据 */
      // test(){
      //         console.log('=======',this.businessData)
      //       },
    toBack(){
      this.$router.push('/recharge/index');
    }
  },
}
</script>
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
