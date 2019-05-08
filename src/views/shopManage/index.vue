<!--店铺管理页面-->
<template>
  <div id="shopManage">
    <div class="shopManage-title">店铺管理</div>
    <div class="shopManage-option">
      <!-- <div>
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div> -->
      <div id="add">
      	<el-button size="mini" type="primary" @click="exportInformation()">导出</el-button>
      </div>
      <div class="searchOption">
      
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="注册日期" end-placeholder="注册日期"></el-date-picker>
        </div>
        <div>
          <el-select size="mini" v-model="searchObj.platform" placeholder="所属平台" clearable>
            <el-option
              v-for="item in Plat"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
         <div>
          <el-input size="mini" v-model="searchObj.businesId" placeholder="商家ID" clearable></el-input>
        </div>
        <div>
          <el-select size="mini" v-model="searchObj.status" placeholder="店铺状态" clearable>
            <el-option
              v-for="item in statusFilter"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
       
      <!--   <div>
          <el-input size="mini" v-model="searchObj.telephone" placeholder="手机号" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.name" placeholder="店铺名称" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.wwid" placeholder="旺旺" clearable></el-input>
        </div> -->
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="shopManage-table">
      <el-table border ref="multipleTable" size="mini" :data="shopData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
       <el-table-column align="center" prop="id" label="店铺ID" width="80" fixed>
          <template slot-scope="scope">
            <span class="linkSpan" @click="toShopDetails(scope.row.id)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
         <el-table-column  align="center" prop="businessVM.id" label="商家ID" width="60" fixed></el-table-column>
          <el-table-column align="center" label="商家手机号" width="90" fixed>
          <template slot-scope="scope">
            <span class="">{{scope.row.businessVM?scope.row.businessVM.manager?scope.row.businessVM.manager.telephone:'':''}}</span>
          </template>
        </el-table-column>
          <el-table-column align="center" prop="link" label="店铺名称" width="">
          <template slot-scope="scope">
            <span class="linkSpan shopLink"  :title="scope.row.link"><a :href="scope.row.link">{{scope.row.name}}</a></span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="name" label="店铺名称"></el-table-column> -->
        <el-table-column align="center" prop="wwid" label="店铺旺旺ID"></el-table-column>
        <el-table-column align="center" prop="platform" label="所属平台"></el-table-column>
       <!--   <el-table-column align="center" prop="link" label="店铺网址" width="">
          <template slot-scope="scope">
            <span class="linkSpan shopLink" :data-clipboard-text="scope.row.link" :title="scope.row.link" @click="toCopy">复制链接</span>
          </template>
        </el-table-column> -->
          <el-table-column align="center" prop="intervalTime" label="接单间隔时间"  width="150">
          <template slot-scope="scope">
            <span>{{scope.row.intervalTime | dateParse}}</span>
          </template>
        </el-table-column>
       <el-table-column align="center" prop="bindTime" label="注册时间"  width="150">
          <template slot-scope="scope">
            <span>{{scope.row.bindTime | dateParse}}</span>
          </template>
        </el-table-column>
       
        <el-table-column align="center" prop="status" label="店铺状态" width="150">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='审核通过'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column>
         
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div class="iconDiv" title="修改" @click="handleEdit(scope.row)">
              <i class="fa fa-edit"></i>
            </div>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <div class="shopManage-page">
     <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog center  title="修改店铺信息" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="form" :rules="rules" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="店铺名称" prop="name" :label-width="formLabelWidth">
                <el-input clearable v-model="form.name" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
             <div class="col-sm-6">
              <el-form-item label="店铺旺旺ID" prop="wwid" :label-width="formLabelWidth">
                <el-input clearable v-model="form.wwid" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
             <div class="col-sm-6">
              <el-form-item label="所属平台" prop="platform" :label-width="formLabelWidth">
                <el-input clearable v-model="form.platform" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
             <div class="col-sm-6">
              <el-form-item label="店铺网址" prop="link" :label-width="formLabelWidth">
                <el-input clearable v-model="form.link" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
             <div class="col-sm-6">
              <el-form-item label="接单间隔时间" prop="intervalTime" :label-width="formLabelWidth">
                <el-input clearable v-model="form.intervalTime" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
             <div class="col-sm-6">
              <el-form-item label="发货人姓名" prop="sendoutTelephone" :label-width="formLabelWidth">
                <el-input clearable v-model="form.sendoutTelephone" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
              <!--  <div class="col-sm-6">
              <el-form-item label="发货人电话" prop="telephone" :label-width="formLabelWidth">
                <el-input clearable v-model="form.telephone" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div> -->
             <div class="col-sm-6">
              <el-form-item label="发货地址" prop="sendoutAddress" :label-width="formLabelWidth">
                <el-input clearable v-model="form.sendoutAddress" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
           
            <div class="col-sm-6">
               <el-form-item label="店铺状态" prop="rank" :label-width="formLabelWidth">
                <!-- <el-input clearable v-model="form.rank" auto-complete="off" size="mini"></el-input> -->
                <el-radio v-model="form.status" v-for="(item,index) in statusFilter" :key="index" :label="item.value">{{item.name}}</el-radio>
              </el-form-item>
            </div>
            <div class="col-sm-6">
             
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogSubmit">确定</el-button>
      </div>    
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '../../config'; 
import Clipboard from 'clipboard';
import service from '@/utils/request'

export default {
  name: 'shopManage',
  data(){
    return {
      Plat:[],
      dialogTitle:false,
       statusFilter:[{
        name:'待审核',
        value:'待审核'
      },{
        name:'审核通过',
        value:'审核通过'
      },{
        name:'审核未通过',
        value:'审核未通过'
      }],
       pagesize:10,
      /* 当前页 */
      page:0,
      total:10,
      searchObj:{
      },
      form:{},
      formLabelWidth:'100px',
      /* 模态框的显示与隐藏 */
      dialogVisible:false,
      /* 模态框的标题 */
      dialogTitle:'新增员工信息',
      /* 当前页 */
      currentPage:1,
      // shopData: [],
      multipleSelection: [],
      // 表单验证
      rules:{
        name:[
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        platform:[
          { required: true, message: '请输入所属平台', trigger: 'blur' }
        ],
        link:[
          { required: true, message: '请输入店铺网址', trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
      ...mapGetters(['userId','siteId','shopData'])
  },
  created(){
    this.loadAllShop()
    this.loadPlat()
  },
  methods: {
    ...mapActions(['getShopManage','searchShopManage']),
    loadPlat(){
        service.get('/store/findAllPlatforms').then(r=>{
          // console.log(r.data.data)
          this.Plat = r.data.data
        })
    },
     /* 模态框点击确定 */
    dialogSubmit(){
       this.$refs['form'].validate((valid) => {
     if (valid) {
     // this.form.siteId = this.siteId
     // this.form.roleId = 1
      service.post('/store/saveOrUpdate',this.form).then(r=>{
           this.$notify({
            title: '修改成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        this.loadAllShop()  
      }).catch(() => {
          this.$notify.error({
            title: '修改失败',
            message: '这是一条错误的提示消息'
          })
        })
      this.dialogVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    /* 关闭模态框之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();
      done();
    },
     handleEdit(row){
      this.dialogVisible = true;
      console.log(row)
      this.form = _.cloneDeep(row);
    },
     /* 关闭模态框 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
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
     /* 跳转到店铺详情页 */
    toShopDetails(id){
      this.$router.push({path: '/shopManage/shopDetails', query:{path:this.$route.path,id:id}});
    },
    // 加载所有的店铺信息
    loadAllShop(){
      let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          siteId:this.siteId
          }
         }  
      this.getShopManage(obj).then(r=>{
          // this.shopData = r.data.data.list
          this.total = r.data.data.total
      })
    },
  	// 导出
     exportInformation() {
      this.$confirm('确认要导出么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        let obj = {
        page: this.page,
          pageSize: this.pagesize,
        siteId:this.siteId,
        businesId:this.searchObj.businesId,
        telephone:this.searchObj.telephone,
        name:this.searchObj.name,
        wwid:this.searchObj.wwid,
        status:this.searchObj.status,
        beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
      };
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      config.toDownLoad('/store/download',obj,'店铺');
        this.$notify({
          title: '成功',
          message: '正在下载...',
          type: 'success'
        })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消'
        })
      })
    },
    /* 搜索 */
    handleSearch(){
       this.page = 0
     let obj={
          params:{
            siteId:this.siteId,
            page: this.page,
          pageSize: this.pagesize,
           businesId:this.searchObj.businesId,
        telephone:this.searchObj.telephone,
        name:this.searchObj.name,
        platform:this.searchObj.platform,
        wwid:this.searchObj.wwid,
        status:this.searchObj.status,
         beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          }
         }  
      this.getShopManage(obj).then(r=>{
          // this.shopData = r.data.data.list
          this.total = r.data.data.total
      })
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.page = val-1
    },
    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
}
</script>
<style lang="scss" scoped>
  #shopManage{
    #add{
      float:left;
    }
    .shopManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .shopManage-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
        float: right;
        margin-right:10px;
      }
    } 
    .shopManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
      
    } 
    .shopManage-page{
      margin-top:10px;
    }
    
  }
</style>



