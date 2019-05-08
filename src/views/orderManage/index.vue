<!--订单管理页面-->
<template>
  <div id="orderManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待接订单" name="waitOrder"></el-tab-pane>
      <el-tab-pane label="进行中订单" name="doingOrder"></el-tab-pane>
      <el-tab-pane label="已完成订单" name="finishOrder"></el-tab-pane>
      <el-tab-pane label="已撤销订单" name="cancelOrder"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config.js'

export default {
  name: 'orderManage',
  data(){
    return {
      activeName:'waitOrder'
    };
  },
  created(){
  },
  computed: {
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.$router.push('/orderManage/index/'+tab.name);
    }
  }
   
}
</script>
<style>
 #orderManage .el-tabs__header{
  margin-bottom: 14px!important;
 }
  #orderManage .el-tabs__header{
    margin:0;
  }
</style>
<style lang="scss" scoped>

</style>