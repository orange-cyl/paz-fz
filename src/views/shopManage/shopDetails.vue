<!--店铺详情页-->
<template>
  <div id="shopDetails">
    <div class="totalTitle shopDetails-title">
      <div>店铺详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div>
    <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">【基本信息】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>店铺ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.id}}</span>
          </el-col>
           <el-col :span="5"  class="marginSet">
            <span>商家ID：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{shopDetails.businessVM?shopDetails.businessVM.id:''}}</span>
          </el-col>
         
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>店铺名称：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.name}}</span>
          </el-col>
           <el-col :span="5"  class="marginSet">
            <span>商家手机：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{shopDetails.businessVM?shopDetails.businessVM.manager?shopDetails.businessVM.manager.telephone:'':''}}</span>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>绑定时间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.bindTime | dateParse}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>接单间隔时间：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
           <span>{{shopDetails.intervalTime | dateParse}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>店铺链接：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.link}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>旺旺ID：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{shopDetails.wwid}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>商家名称：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.businessVM?shopDetails.businessVM.username:''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>所属平台：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{shopDetails.platform}}</span>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="7"  class="marginSet">
            <span>发货人姓名：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{shopDetails.sendoutName}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>发货人电话：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{shopDetails.sendoutTelephone}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7"  class="marginSet">
            <span>发货地址：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span>{{shopDetails.sendoutProvince}}{{shopDetails.sendoutCity}}{{shopDetails.sendoutArea}}{{shopDetails.sendoutAddress}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config.js'
import service from '@/utils/request'
export default {
  name: 'shopDetails',
  data(){
    return {
      shopDetails:{}
    }
  },
  created(){
    console.log(this.$route.query.id)
    /* 通过id获取详细数据进行展示 */
    service.get('/store/findStoreById', {params:{id:this.$route.query.id}}).then((data) => {
      if(data.status==200){
        this.shopDetails = data.data.data;
      }else{
        config.errorTitle(this,data.status,'查找失败');
      }
    }).catch((error) => {
      this.$notify({title:'失败',type: 'error', message: '查找失败!'});
    })
  },
  computed: {
   
  },
  methods: {
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #shopDetails{
    font-size:14px;
    .shopDetails-title{
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
