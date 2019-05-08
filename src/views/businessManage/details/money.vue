<!--店铺绑定页面-->
<template>
  <div id="bBindShop">
      <div class="businessManage-title"></div>
      <div class="businessManage-table">

      <el-table border ref="multipleTable" size="mini" :data="businessDetails" tooltip-effect="dark" style="width: 100%">
       
        <el-table-column align="center" prop="id" label="变动时间"></el-table-column>
        <el-table-column align="center" prop="money" label="变动账户"></el-table-column>
        <el-table-column align="center" prop="bank" label="变动金额" ></el-table-column>
        <el-table-column align="center" prop="bank" label="账户余额" width=""></el-table-column>
        <el-table-column align="center" prop="bank" label="任务ID" width=""></el-table-column>
        <el-table-column align="center" prop="bank" label="订单ID" width=""></el-table-column>

        <!-- <el-table-column align="center" prop="commitTime" label="账户余额" width="250">
          <template slot-scope="scope">
              <div>{{scope.row.commitTime | dateParse}}</div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column align="center" prop="checkTime" label="审核时间" width="250">
          <template slot-scope="scope">
              <div>{{scope.row.checkTime | dateParse}}</div>
          </template>
        </el-table-column> -->
       <el-table-column align="center" label="备注" width="150">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow:ellipsis" :title="scope.row.reason">{{scope.row.reason}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="recharge-page" style="margin-top:20px;">
       <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
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
       pagesize:10,
       page:0,
      total:10,
      businessDetails:[]
    }
  },
  created(){
    this.loadVoucher()
  },
  computed: {
   ...mapGetters(['businessDetailsId'])

  },
  watch:{
    page:function(now,old) {
      this.loadVoucher();
    }
  },
  methods: {
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
       this.page = val -1
    },
    loadVoucher(){
      let obj={
        params:{
          businesId:this.businessDetailsId,
          page:this.page,
          pageSize: this.pagesize
        }
      }
      /* 通过商家id获取商家基本信息 */
   service.get('/recharge/query', obj).then((data) => {
    console.log('=====',data)
      if(data.data.status==200){
        this.businessDetails = data.data.data.list;
        this.total = data.data.data.total
      }else{
        config.errorTitle(this,data.status,'获取信息失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '获取信息失败!'});
    })

    },

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
