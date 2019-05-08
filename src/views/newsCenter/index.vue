<!--消息中心页面-->
<template>
  <div id="newsCenter">
    <div class="totalTitle">消息中心</div>
    <div class="newsCenter-option">
      <div class="addBtn">
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div>
      <div class="searchOption">
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="创建日期" end-placeholder="创建日期"></el-date-picker>
        </div>
        <div>
          <el-select size="mini" v-model="searchObj.status" placeholder="状态" clearable>
            <el-option
              v-for="item in statusFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.title" placeholder="公告标题" clearable></el-input>
        </div>
        
        <div>
           <el-select size="mini" v-model="searchObj.receiver" placeholder="通知人群" clearable>
            <el-option
              v-for="item in users"
              :key="item"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="newsCenter-table">
      <el-table border size="mini" ref="multipleTable" :data="newsData" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" prop="receiver" label="通知人群">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.receiver=='business,scalpuser'">商家,刷手</div> -->
            <div v-if="scope.row.receiver=='商家'">商家</div>
            <!-- <div v-else-if="scope.row.receiver=='刷手'">刷手</div> -->
            <div v-else-if="scope.row.receiver=='推广员'">推广员</div>
            <div v-else-if="scope.row.receiver=='商家，推广员'">商家，推广员</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.createTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.checkTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div class="iconDiv" title="修改" @click="handleEdit(scope.row)">
              <i class="fa fa-edit"></i>
            </div>
            <div v-if="scope.row.status=='未发布'" class="iconDiv" title="发布" @click="handlePublish(scope.row)">
              <i class="fa fa-modx"></i>
            </div>
            <div v-if="scope.row.status=='已发布'" class="iconDiv" title="取消发布" @click="handleCancel(scope.row)">
              <i class="fa fa-ban" style="color:#F56C6C"></i>
            </div>
            <div class="iconDiv" title="删除" @click="handleDelete(scope.row)">
              <i class="fa fa-trash" style="color:#F56C6C"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="newsCenter-page">
      <el-pagination small background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config'
import service from '@/utils/request'
import axios from '@/http/axios'

export default {
  name: 'newsCenter',
  data(){
    return {
      users:[
      {
        name:'推广员',
        value:'推广员'
      }, {
        name:'商家',
        value:'商家'
      }
      ],
      /* 总共多少数据 */
      total:0,
      multipleSelection: [],
      /* 当前页 */
      currentPage:1,
      /* 当前修改的ID */
      searchObj:{
        searchTime:''
      },
      statusFilter:[{
        name:'未发布',
        value:'未发布'
      },{
        name:'已发布',
        value:'已发布'
      }],
    }
  },
  created(){
    this.findNewsData();
  },
  computed: {
    ...mapGetters(['userId','siteId','newsData'])
  },
  methods: {
    ...mapActions(['getNewsCenter']),
    /* 发布 */
    handlePublish(row){
      this.changeStatusNews({id:row.id,status:'已发布'},'发布');
    },
    /* 取消发布 */
    handleCancel(row){
      this.changeStatusNews({id:row.id,status:'未发布'},'取消发布');
    },
    /* 删除 */
    handleDelete(row){
      // console.log(row.id)
      service.get('/notice/deleteById',{params:{id:row.id}}).then((data) => {
        config.errorTitle(data.status,'删除失败!');
        this.$notify({title:'成功',type: 'success', message: '删除成功!'});
        this.findNewsData();
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: '删除失败!'});
      })
    },
    /* 搜索 */
    handleSearch(){
      this.findNewsData(1);
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.findNewsData(val);
    },
    /* 新增 */
    toAdd(){
      this.$router.push({path: '/newsCenter/addOrUpdateNews', query:{path:this.$route.path,name:'新增消息'}});
    },
    /* 修改 */
    handleEdit(row) {
      let news = _.cloneDeep(row);
      this.$router.push({path: '/newsCenter/addOrUpdateNews', query:{path:this.$route.path,name:'修改消息',news:news}});
    },
    /* 修改状态 */
    changeStatusNews(obj,message){
      service.get('/notice/changeStatus', {params:obj}).then((data) => {
        config.errorTitle(data.status,message+'失败!');
        this.$notify({title:'成功',type: 'success', message: message+'成功!'});
        this.findNewsData();
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
    /* 查找消息数据 */
    findNewsData(page){
      let obj = {  
        page:page?(page-1):(this.currentPage-1),
        pageSize:10,
        siteId:2,
        receiver:this.searchObj.receiver,
        title:this.searchObj.title,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):''
      }
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      this.getNewsCenter({params:obj}).then(r=>{
        this.total = r.data.data.total;
      })
      // axios.get('/notice/pageQuery', obj).then((data) => {
      //   config.errorTitle(data.status,'查找失败');
      //   this.newsData = data.data.list;
      //   this.total = data.data.total;
      // }).catch(() => {
      //   this.$notify({title:'失败',type: 'error', message: '查找失败!'});
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
  #newsCenter{
    .newsCenter-option{
      margin-top:10px;
      overflow: hidden;
      .addBtn{
        float: left;
      }
    } 
    .newsCenter-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv{
        margin-right:10px;
      }
      .iconDiv:last-child{
        margin-right:0;
      }
    } 
    .newsCenter-page{
      margin-top:10px;
    }
  }
</style>
