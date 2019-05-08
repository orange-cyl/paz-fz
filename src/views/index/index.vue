<!--首页-->
<template>
  <div id="index">
    <el-row :gutter="20" class="index-num">
      <el-col :span="6">
        <div class="index-num-one">
          <div>今日放单商家数：<span>320</span>家</div>
          <div>今日注册商家数：<span>28</span>家</div>
          <div>总注册商家数：<span>32</span>家</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-two">
          <div>今日放单量：<span>320</span>单</div>
          <div>进行中刷单：<span>28</span>单</div>
          <div>待接订单量：<span>32</span>单</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-three">
          <div>总注册推广员：<span>320</span>人</div>
          <div>总推广订单：<span>28</span>单</div>
          <div>总推广分成：<span>32</span></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="index-num-four">
          <div>今日收入：<span>320</span>元</div>
          <div>待结算收入：<span>28</span>元</div>
          <div>累计结算收入：<span>32</span>元</div>
        </div>
      </el-col>
    </el-row>
    <div class="index-curve">
      <div class="index-curve-option">
        <el-date-picker size='mini' v-model="searchTime" type="daterange" @change='searchChange' value-format="yyyy-MM-dd" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <span @click="changeTimeByOption(1)" class="dataOptions optionDay">本天</span>
        <span @click="changeTimeByOption(2)" class="dataOptions optionMonth">本月</span>
        <span @click="changeTimeByOption(3)" class="dataOptions optionQuarter">本年</span>
      </div>
      </div>
      <div class="index-curve-chart">
        <div id="indexContainer" style="min-width:400px;height:350px"></div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Highcharts from 'highcharts'
import conf from '../../config';
export default {
  name: 'Index',
  computed: {
   
  },
  data(){
    return {
      searchTime:conf.month()
    };
  },
  mounted() {
    this.toDraw();
  },
  methods:{
    // 点击本天 本周 本月 本季度
    changeTimeByOption(option){
      if(option==1){
        this.searchTime = conf.time();
      }else if(option==2){
        this.searchTime = conf.month();
      }else{
        this.searchTime = conf.year();
      }
      this.searchChange();
    },
    //查找某一时间的历史曲线
    searchChange(){
      console.log('时间发生改变');
    },
    //绘制历史曲线
    toDraw(){
      var chart = Highcharts.chart('indexContainer', {
  title: {
    text: '订单和商家数据'
  },
  subtitle: {
    // text: '数据来源：thesolarfoundation.com'
  },
   xAxis: {
          categories: ['3月13日','3月14日','3月15日','3月16日','3月17日','3月18日','3月19日','3月20日']
        },
  yAxis: {
    title: {
      text: ''
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      // pointStart: 10
    }
  },
  series: [{
    name: '当日发布订单量',
    data: [3, 5, 8, 9, 2, 1, 46, 77]
  }, {
    name: '当日注册商家数',
    data: [10, 50, 30, 15, 20, 27, 30, 44]
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
});
    }
  }
}
</script>

<style lang="scss" scoped>
  #index{
    /* 设置外边距 */
    .index-num{
      margin:5px 0 15px 0;
    }
    /* 设置4块idv统一的样式 */
    .index-num-one,.index-num-two,.index-num-three,.index-num-four{
      color: white;
      background:rgb(39, 169, 227);
      border-radius: 5px;
      padding:30px;
      &>div{
        margin-bottom:10px;
      }
    }
    .index-num-two{
      background:rgb(40, 183, 121);
    }
    .index-num-three{
      background:rgb(255, 183, 72);
    }
    .index-num-four{
      background:rgb(34, 85, 164);
    }
    .index-curve-option{
      margin-bottom:5px;
    }
    
  }
</style>
