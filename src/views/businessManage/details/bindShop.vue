<!--店铺绑定页面-->
<template>
  <div id="bBindShop">
      <div class="businessManage-title"></div>
      <div class="businessManage-table">

      <el-table border ref="multipleTable" size="mini" :data="businessDetails" tooltip-effect="dark" style="width: 100%">
       
        <!-- <el-table-column align="center" prop="username" label="姓名"></el-table-column> -->
        <el-table-column align="center" prop="platform" label="所属平台" width=""></el-table-column>

        

        <el-table-column align="center" prop="name" label="店铺名称" ></el-table-column>
        <el-table-column align="center" prop="wwid" label="旺旺ID"></el-table-column>
        <!-- <el-table-column align="center" prop="sendoutTelephone" label="店铺电话"></el-table-column> -->
        <el-table-column align="center" prop="link" label="店铺网址" width="">
          <template slot-scope="scope">
            <span class="linkSpan shopLink" :data-clipboard-text="scope.row.link" :title="scope.row.link" @click="toCopy">复制链接</span>
          </template>
        </el-table-column>
       <!--  <el-table-column align="center" prop="sendoutProvince" label="省"></el-table-column>
        <el-table-column align="center" prop="sendoutCity" label="市"></el-table-column>
        <el-table-column align="center" prop="sendoutArea" label="区/县"></el-table-column> -->

         <el-table-column align="center" prop="bindTime" label="绑定时间" width="180">
          <template slot-scope="scope">
              <div>{{scope.row.bindTime | dateParse}}</div>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="status" label="店铺审核状态" width="150">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='审核通过'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column>
      </el-table>
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
      businessDetails:[]
    }
  },
  created(){
    /* 通过商家id获取商家基本信息 */
   service.get('/store/findStoreByBusinessId', {params:{businessId:this.businessDetailsId}}).then((data) => {
    // console.log('=====',data)
      if(data.data.status==200){
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
