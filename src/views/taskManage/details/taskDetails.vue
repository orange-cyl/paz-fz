<!--任务详情页面 -->
<template>
  <div id="tTaskDetails">
   <div class="businessManage-title"></div>
    <!-- <div class="totalTitle taskDetails-title">
      <div>任务详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div> -->
     <div class="infoContent">
      <div class="baseInfo">
        <div class="infoTitle">【基本信息】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>任务ID：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.id}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商家ID：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.businesId}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>任务类型：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.taskType?taskDetails.taskType.name?taskDetails.taskType.name:'':''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>任务状态：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.status}}</span>
          </el-col>
        </el-row>

         <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>所属平台：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="">{{taskDetails.store?taskDetails.store.platform:''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>是否包邮：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.isPost}}</span>
          </el-col>
        </el-row>
         
         <el-row  :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>是否置顶：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.setTop}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>发布时间：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>审核时间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
         </div>


        <div class="goodsInfo">
        <div class="infoTitle">商品信息</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>商品名称：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.commodityName}}</span>
          </el-col>
         <el-col :span="5"  class="marginSet">
            <span>展示价：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.commodityPrice}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>链接：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.commodityLink}}</span>
          </el-col>
           <el-col :span="5"  class="marginSet">
            <span>主图：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span><img width="150px" height="150px" :src='taskDetails.commodityPhoto'></span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>成交价：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">{{taskDetails.evaluateTxt1}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>每单拍下数量：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.commodityNum}}</span>
          </el-col>
        </el-row>
      </div>
  

  <div class="findGoods">
        <div class="infoTitle">【如何找到商品】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>商品排序方式：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.findSortType}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>付款或收货人数：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan"></span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>价格区间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">{{taskDetails.findPriceBegin}}-{{taskDetails.findPriceEnd}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商品所在地：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.commodityRegion}}</span>
          </el-col>
        </el-row>
      </div>

 <div class="typeAndNum">
        <div class="infoTitle">【推广类型和单数】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>推广类型：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>搜索关键词：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.findKeywords}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>任务数量：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.sendOrderNum}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>指定内容：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>放单计划：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>从XXX时间开始，每隔{{taskDetails.sendOrderInterval | dateParse}}分钟放出{{taskDetails.sendOrderIntervalNum}}单，共放{{taskDetails.sendOrderNum}}单。</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
      </div>


<div class="businessRequst">
        <div class="infoTitle">【商家附加要求】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>上传图片:</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>任务文字备注:</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.findKeywords}}</span>
          </el-col>
        </el-row>
      </div>


       <div class="valueInfo">
        <div class="infoTitle">【增值服务】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>空包：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>加赏：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.reward=='是'?taskDetails.rewardMoney:taskDetails.reward}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>置顶：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.setTop}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>派给第一单接单的用户：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>派给15天内注册的用户：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span></span>
          </el-col>
        </el-row>
      </div>

        <div class="thoundous">
        <div class="infoTitle">【千人千面】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>地域限制：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.isUserRegion}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>性别限制：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.isUserGender}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>年龄限制：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.isUserAge}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>仅限钻级买号：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.isUserDiamond}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>仅限开通花呗用户：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span></span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>限制买号类目：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.isUserBuyCategory}}</span>
          </el-col>
        </el-row>
      </div>

<div class="moneyInfo">
        <div class="infoTitle">【费用信息】</div>
       
      </div>

      </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import service from '@/utils/request'
import config from '@/config'
export default {
  name: 'taskDetails',
  data(){
    return {
      activeName:'taskDetails',
      taskDetails:{}
    }
  },
  created(){
    // console.log(this.taskManageData[0].id)
    /* 通过任务id获取任务基本信息 */
    service.get('/task/findTaskDetailsById', {params:{id:this.taskDetailsId}}).then((data) => {
      if(data.status==200){
      // console.log(data.data.data)

        this.taskDetails = data.data.data;
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })
  },
  computed: {
     ...mapGetters(['taskManageData','taskDetailsId'])
  },
  methods: {
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #tTaskDetails{
     .businessManage-title{
      margin-top:10px;
      margin-bottom:10px;
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    font-size:14px;
    .tTaskDetails-title{
      overflow: hidden;
      &>div:first-child{
        float: left;
      }
      &>div:last-child{
        float: right;
      }
    }
    .infoContent{
      .typeAndNum,.baseInfo,.valueInfo,.goodsInfo,.findGoods,.businessRequst,.thoundous,.moneyInfo{
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

