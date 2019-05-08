<!--商家详情页面-->
<template>
  <div id="tBusinessDetails">
  <div class="businessManage-title"></div>
  <div class="businessManage-table">

      <el-table border ref="multipleTable" size="mini" :data="businessDetails" tooltip-effect="dark" style="width: 100%">
       
        <el-table-column  align="center" prop="id" label="店铺ID"></el-table-column>
        <el-table-column  align="center" prop="businesId" label="商家ID">
        </el-table-column>
        <el-table-column  align="center" prop="platform" label="所属平台"></el-table-column>
        <el-table-column  align="center" prop="name" label="店铺名称"></el-table-column>
        <el-table-column  align="center" prop="taskId" label="掌柜名称"></el-table-column>
        <el-table-column  align="center" prop="taskId" label="店铺网址"></el-table-column>
        <el-table-column  align="center" prop="taskId" label="店铺地址"></el-table-column>
        <el-table-column  align="center" prop="taskId" label="店铺电话"></el-table-column>

         <el-table-column align="center" prop="jiedanTime" label="注册时间" width="150">
          <template slot-scope="scope">
              <div>{{scope.row.jiedanTime | dateParse}}</div>
          </template>
        </el-table-column>
        
        <el-table-column align="center" prop="dianfu" label="店铺状态"></el-table-column>
       <!--  <el-table-column align="center" prop="payments" label="用户付款"></el-table-column>
        <el-table-column align="center" prop="refund" label="商家返款"></el-table-column>
        <el-table-column align="center" prop="taobaoorderid" label="淘宝订单号" width="180"></el-table-column> -->
      <!--  <el-table-column  align="center" label="商品链接" width="80">
          <template slot-scope="scope">
            <span class="linkSpan linkClass" :data-clipboard-text="scope.row.taskVM?scope.row.taskVM.commodityLink:''" :title="scope.row.taskVM?scope.row.taskVM.commodityLink:''" @click="toCopy">复制链接</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- <div class="totalTitle businessDetails-title">
      <div>商家详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div> -->
    <!-- <div class="infoContent">
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
            <span>推广员ID：</span>
          </el-col>
          <el-col v-if="businessDetails.promoter" :span="5" class="marginSet">
            <span>{{businessDetails.promoter?businessDetails.promoter.id:''}}</span>
          </el-col>
          <el-col v-if="businessDetails.master" :span="5"  class="marginSet">
            <span>商家师傅ID：</span>
          </el-col>
          <el-col v-if="businessDetails.master" :span="7" class="marginSet">
            <span>{{businessDetails.master?businessDetails.master.id:''}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>任务审核时间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>--</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>级别：</span>
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
            <span>状态：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{businessDetails.status}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>禁用原因：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{businessDetails.forbiddenReason}}</span>
          </el-col>
        </el-row>
      </div>
    </div> -->
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
      businessDetails:[]
    }
  },
  created(){
    /* 通过商家id获取商家基本信息 */
   service.get('/store/findStoreByBusinessId', {params:{businessId:this.businessDetailsId}}).then((data) => {
      if(data.status==200){
        // console.log(data.data.data)
        this.businessDetails = data.data.data;
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
  },
  computed: {
    ...mapGetters(['businessData','businessDetailsId'])
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
  #tBusinessDetails{
    .businessManage-title{
      margin-top:10px;
      margin-bottom:10px;
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    font-size:14px;
    .tBusinessDetails-title{
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
