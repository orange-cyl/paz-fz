<!--商家详情页面-->
<template>
  <div id="bDetails">
    <!-- <div class="totalTitle businessDetails-title">
      <div>商家详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div> -->
    <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">【基本信息】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>商家ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.id}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>名称：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.username}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>来源：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.site?businessDetails.site.domain:''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>注册时间：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.registerTime | dateParse}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>手机号：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.manager?businessDetails.manager.telephone:''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>QQ号：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.manager?businessDetails.manager.qq:''}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-if="businessDetails.promoter" :span="7"  class="marginSet">
            <span>邀请人ID：</span>
          </el-col>
          <el-col v-if="businessDetails.promoter" :span="5" class="marginSet">
            <span>{{businessDetails.promoter?businessDetails.promoter.id:''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>备注：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.comment}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>状态：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.status}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>用户等级：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.rank}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="accountInfo">
        <div class="infoTitle">【账号信息】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>本金余额：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{businessDetails.accountBj}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>佣金余额：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{businessDetails.accountYj}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>累计充值：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.cumulativeRecharge}}</span>
          </el-col>
          <!-- <el-col :span="5"  class="marginSet">
            <span>禁用原因：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.forbiddenReason}}</span>
          </el-col> -->
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config.js'
import service from '@/utils/request'
export default {
  name: 'businessDetails',
  data(){
    return {
      activeName:'businessDetails',
      businessDetails:{}
    }
  },
  created(){
    console.log(this.businessDetailsId)
    /* 通过商家id获取商家基本信息 */
   service.get('/busines/findBusinessDetailsById', {params:{id:this.businessDetailsId}}).then((data) => {
      if(data.status==200){
        this.businessDetails = data.data.data;
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
  },
  computed: {
    ...mapGetters(['businessDetailsId'])
  },
  methods: {
    /* 返回 */
    toBack(){
      this.$router.push(this.$route.query.path);
    },
  },
}
</script>
<style lang="scss" scoped>
  #bDetails{
    font-size:14px;
    .bDetails-title{
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
