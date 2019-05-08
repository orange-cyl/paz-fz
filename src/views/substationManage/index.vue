<!--分站管理页面-->
<template>
  <div id="substationManage">
    <div class="substationManage-title">分站管理</div>
    <div class="substationManage-option">
      <div>
        <el-button type="primary" size="mini" @click="toAdd">新增</el-button>
      </div>
      <div>
        <el-input size="mini" v-model="search" placeholder="请输入搜索的内容" clearable></el-input>
      </div>
      <div>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <div class="substationManage-table">
      <el-table ref="multipleTable" :data="staffData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <!-- <el-table-column align="center" type="selection" width="30"></el-table-column> -->
        <el-table-column align="center" prop="user_name" label="负责人" width="65"></el-table-column>
        <el-table-column align="center" prop="phone" label="负责人手机号" width="110"></el-table-column>
        <el-table-column align="center" prop="realm_name" label="分站域名"></el-table-column>
        <el-table-column align="center" prop="station_name" label="分站名称" width="80"></el-table-column>
        <el-table-column align="center" prop="cost_price" label="成本价" width="65"></el-table-column>
        <el-table-column align="center" prop="selling_price" label="销售价" width="65"></el-table-column>
        <!-- <el-table-column align="center" prop="tg_price" label="推广分成" width="78"></el-table-column> -->
        <el-table-column align="center" prop="cz_account" label="充值账户"></el-table-column>
        <el-table-column align="center" prop="state" label="状态" width="65">
          <template slot-scope="scope">
              <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.state==1?'green':'red')"></span>{{scope.row.state==1?'正常':'停用'}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div class="iconDiv" title="修改" @click="handleEdit(scope.row)">
              <svg-icon icon-class="bianji"/>
            </div>
            <div v-if="scope.row.state==1" class="iconDiv" title="禁用" @click="handleForbidden(scope.row)">
              <svg-icon icon-class="jinyong"/>
            </div>
            <div v-else class="iconDiv" title="启用" @click="handleStart(scope.row)">
              <svg-icon icon-class="qiyong"/>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="substationManage-page">
      <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="200"></el-pagination>
    </div>
    <!-- 新增或修改分站信息模态框  -->
    <el-dialog center :title="dialogTitle" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :model="form" :rules="rules" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="负责人" prop="user_name" :label-width="formLabelWidth">
                <el-input clearable v-model="form.user_name" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="负责人手机号" prop="phone" :label-width="formLabelWidth">
                <el-input clearable v-model="form.phone" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="分站域名" prop="realm_name" :label-width="formLabelWidth">
                <el-input clearable v-model="form.realm_name" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="分站名称" prop="station_name" :label-width="formLabelWidth">
                <el-input clearable v-model="form.station_name" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="成本价" prop="cost_price" :label-width="formLabelWidth">
                <el-input clearable v-model="form.cost_price" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="销售价" prop="selling_price" :label-width="formLabelWidth">
                <el-input clearable v-model="form.selling_price" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-6">
              <el-form-item label="充值账户" prop="cz_account" :label-width="formLabelWidth">
                <el-input clearable v-model="form.cz_account" auto-complete="off" size="mini"></el-input>
              </el-form-item>
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
import { mapGetters } from 'vuex'

export default {
  name: 'substationManage',
  data(){
    return {
      form:{},
      formLabelWidth:'120px',
      /* 模态框的显示与隐藏 */
      dialogVisible:false,
      /* 模态框的标题 */
      dialogTitle:'新增分站信息',
      /* 当前页 */
      currentPage:1,
      search:'',
      staffData: [{
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:0
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:0
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:0
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      },{
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      }, {
        id:1001,
        user_name: '王小虎',
        phone: '13878787909',
        realm_name:'www.baidu.com',
        station_name:'人气王',
        cost_price:'0.5',
        selling_price:'0.8',
        cz_account:'6228480405712163333',
        state:1
      },],
      multipleSelection: [],
      // 表单验证
      rules:{
        user_name:[
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入负责人手机号', trigger: 'blur' },
          { min: 0, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        realm_name:[
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        station_name:[
          { required: true, message: '请输入分站名', trigger: 'blur' }
        ],
        cost_price:[
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        selling_price:[
          { required: true, message: '请输入销售价', trigger: 'blur' }
        ],
        cz_account:[
          { required: true, message: '请输入充值账号', trigger: 'blur' }
        ],
        state:[
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
   
  },
  methods: {
    /* 搜索 */
    handleSearch(){
      console.log(this.search);
    },
    /* 关闭模态框 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
    },
    /* 模态框点击确定 提交数据给后台*/
    dialogSubmit(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
      if(this.dialogTitle=="新增分站信息"){
        //提交后台新增
        console.log(this.form);
      }else{
        //提交后台修改
        console.log(this.form);
      }
    },
    /* 关闭模态框之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();
      done();
    },
    /* 新增 */
    toAdd(){
      this.dialogTitle = "新增分站信息";
      //新增默认的是启用的
      this.form = {
        state:1
      };
      this.dialogVisible = true;
      
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /* 复选框修改了之后 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /* 修改 */
    handleEdit(row) {
      this.dialogTitle = "修改分站信息";
      this.dialogVisible = true;
      this.form = {
        id:row.id,
        user_name:row.user_name,
        phone:row.phone,
        realm_name:row.realm_name,
        station_name:row.station_name,
        cost_price:row.cost_price,
        selling_price:row.selling_price,
        cz_account:row.cz_account,
        state:row.state
      };
    },
    /* 禁用 */
    handleForbidden(row) {
      console.log(row.id);
    },
    /* 启用 */
    handleStart(row){
      console.log(row.id);
    }
  },
}
</script>
<style lang="scss" scoped>
  #substationManage{
    .substationManage-title{
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
    .substationManage-option{
      margin-top:10px;
      overflow: hidden;
      &>div{
        float: left;
        margin-right:10px;
      }
    } 
    .substationManage-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv:first-child{
        margin-right: 10px;
      }
    } 
    .substationManage-page{
      margin-top:10px;
    }
  }
</style>
