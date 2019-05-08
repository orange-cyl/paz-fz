<!--刷手详情页面-->
<template>
  <div id="brushDetails">
    <!-- <div class="totalTitle brushDetails-title">
      <div>推广员详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div> -->
    <!-- {{brushDetails}} -->
    <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">【基本信息】</div>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>推广员ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{brushDetails.id}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>用户名：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{brushDetails.username}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>QQ：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{brushDetails.qq}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>手机号：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{brushDetails.telephone}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>微信号：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{brushDetails.wxid}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>注册时间：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{brushDetails.registerTime | dateParse}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>上次登录时间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{brushDetails.lastLoginTime | dateParse}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>状态：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{brushDetails.status}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>备注：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{brushDetails.forbiddenReason}}</span>
          </el-col>
          
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import service from '@/utils/request'
import axios from '@/http/axios'
import config from '@/config';
export default {
  name: 'brushDetails',
  data(){
    return {
      brushDetails:{
        /* sifu:{} */
      }
    }
  },
  computed: {
   ...mapGetters(['userId','siteId','marketingData','promoterDetailsId'])
  },
  created(){
    // console.log(this.$route.query.id)
    /* 通过刷手id获取刷手基本信息 */
    service.get('/user/findUserDetailsById', {params:{id:this.promoterDetailsId}}).then((data) => {
      if(data.status==200){
        this.brushDetails = data.data.data;
        // console.log(this.brushDetails)
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
  },
  methods: {
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #brushDetails{
    font-size:14px;
    .brushDetails-title{
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
