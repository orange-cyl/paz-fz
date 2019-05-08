<!--任务详情页面 -->
<template>
  <div id="taskDetails">
    <div class="totalTitle taskDetails-title">
      <div>任务详情</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div>
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
            <span>{{taskDetails.busines.id}}</span>
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
            <span>商品名称：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.commodityName}}</span>
          </el-col>
        </el-row>

         <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>商品价格：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{taskDetails.commodityPrice}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>商品链接：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.commodityLink}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>每单数量：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.commodityNum}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>创建时间：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.createTime | dateParse}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>状态：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.status}}</span>
          </el-col>
         <el-col :span="5"  class="marginSet">
            <span>原因：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.reason}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>价格区间：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.findPriceBegin}}-{{taskDetails.findPriceEnd}}</span>
          </el-col>
           <el-col :span="5"  class="marginSet">
            <span>关键字：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.findKeywords}}</span>
          </el-col>
        </el-row>
         <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>发货地址：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.store?(taskDetails.store.sendoutProvince+' '+taskDetails.store.sendoutCity+' '+taskDetails.store.sendoutArea+' '+taskDetails.store.sendoutAddress):''}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>发货方式：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.sendType}}</span>
          </el-col>
        </el-row>
         <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>放单方式：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.sendOrderType}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>放单数量：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.sendOrderNum}}</span>
          </el-col>
        </el-row>
         <el-row v-if="taskDetails.sendOrderType=='间歇放单'" :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>间歇时长：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.sendOrderInterval}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>间歇放单数量：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.sendOrderIntervalNum}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>备注：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span>{{taskDetails.comment}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>本金：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span class="redSpan">￥{{taskDetails.capital}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>佣金：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.commission}}-->￥{{taskDetails.commission2capital}}</span>
          </el-col>
        </el-row>
         <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>合计：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span class="redSpan">￥{{taskDetails.cost}}</span>
          </el-col>
        </el-row>
       <div class="valueInfo">
        <div class="infoTitle">【增值服务】</div>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>任务置顶：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.setTop}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>额外佣金：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span class="redSpan">{{taskDetails.reward=='是'?taskDetails.rewardMoney:taskDetails.reward}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>文字评价：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.isEvaluateTxt}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>图片评价：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.isEvaluateImg}}</span>
          </el-col>
        </el-row>
        <el-row v-if="taskDetails.isEvaluateTxt=='是'" :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>文本评价1：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.evaluateTxt1}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>文本评价2：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.evaluateTxt2}}</span>
          </el-col>
        </el-row>
        <el-row v-if="taskDetails.isEvaluateTxt=='是'" :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>文本评价3：</span>
          </el-col>
          <el-col :span="5" class="marginSet">
            <span>{{taskDetails.evaluateTxt3}}</span>
          </el-col>
          <el-col :span="5"  class="marginSet">
            <span>文本评价4：</span>
          </el-col>
          <el-col :span="7" class="marginSet">
            <span>{{taskDetails.evaluateTxt4}}</span>
          </el-col>
        </el-row>
        <el-row v-if="taskDetails.isEvaluateTxt=='是'" :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>文本评价5：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span>{{taskDetails.evaluateTxt5}}</span>
          </el-col>
        </el-row>
        <el-row v-if="taskDetails.isEvaluateImg=='是'" :gutter="10">
          <el-col :span="7"  class="marginSet">
            <span>图片：</span>
          </el-col>
          <el-col :span="17" class="marginSet">
            <span>
              <img style="width:200px;height:100px" :src="taskDetails.evaluateImg1" alt="">
              <img style="width:200px;height:100px" :src="taskDetails.evaluateImg2" alt="">
              <img style="width:200px;height:100px" :src="taskDetails.evaluateImg3" alt="">
            </span>
          </el-col>
        </el-row>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config';
import axios from '@/http/axios'
export default {
  name: 'taskDetails',
  data(){
    return {
      taskDetails:{
        sendout:{},
        busines:{}
      }
    }
  },
  created(){
    console.log(this.$route.query.id)
    /* 通过id获取详细数据进行展示 */
    axios.get('/task/findTaskDetailsById', {params:{id:this.$route.query.id}}).then((data) => {
      if(data.status==200){
        this.taskDetails = data.data.data;
        // console.log(this.taskDetails)
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
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #taskDetails{
    font-size:14px;
    .taskDetails-title{
      overflow: hidden;
      &>div:first-child{
        float: left;
      }
      &>div:last-child{
        float: right;
      }
    }
    .infoContent{
      .baseInfo,.valueInfo{
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
