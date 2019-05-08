<!--申诉中心页面-->
<template>
  <div id="appealCenter">
    <div class="totalTitle">申诉中心</div>
    <div class="appealCenter-option">
      <div class="searchOption">
        <div>
          <el-input size="mini" v-model="searchObj.orderId" placeholder="订单ID" clearable></el-input>
        </div>
        <!-- <div>
          <el-select size="mini" v-model="searchObj.sponsorRole" placeholder="发起人" clearable>
            <el-option
              v-for="item in sponsorRole"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div>
          <el-select size="mini" v-model="searchObj.type" placeholder="申诉类型" clearable>
            <el-option
              v-for="item in appealTypes"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
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
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="appealCenter-table">
      <el-table size="mini" ref="multipleTable" :data="appealData" tooltip-effect="dark" style="width: 100%">
        <el-table-column align="center" prop="id" label="申诉ID" fixed></el-table-column>
        <el-table-column align="center" label="订单ID">
          <template slot-scope="scope">
            <div>{{scope.row.order?scope.row.order.id:''}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="申诉类型"></el-table-column>
        <el-table-column align="center" prop="userId" label="商家ID">
          <template slot-scope="scope">
            <div>{{scope.row.busines?scope.row.busines.id:''}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="beiId" label="刷手ID" width="90">
          <template slot-scope="scope">
            <div>{{scope.row.scalpUser?scope.row.scalpUser.id:''}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sponsorRole" label="发起人身份"></el-table-column>
        <el-table-column align="center" label="发起时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.commitTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申诉内容" width="110">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.comment">{{scope.row.comment}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <div><span :style="'display:inline-block;position:relative;top:-2px;right:5px;height:5px;width:5px;border-radius:50%;background:'+(scope.row.status=='通过'?'green':'red')"></span>{{scope.row.status}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.resolveTime | dateParse}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="处理结果" width="110">
          <template slot-scope="scope">
            <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.result">{{scope.row.result}}</div>
          </template>
        </el-table-column>
        
        
        
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
           <!-- <div v-if="scope.row.status=='待审核'" class="iconDiv" title="通过" @click="handlePass(scope.row)">
              <i class="fa fa-check-square"></i>
            </div>
            <div v-if="scope.row.status=='待审核'" class="iconDiv" title="驳回" @click="handleForbidden(scope.row)">
              <i class="fa fa-window-close" style="color:#F56C6C"></i>
            </div> -->
            <div class="iconDiv" title="通过" @click="handlePass(scope.row)">
              <i class="fa fa-check-square"></i>
            </div>
            <div class="iconDiv" title="驳回" @click="handleForbidden(scope.row)">
              <i class="fa fa-window-close" style="color:#F56C6C"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="appealCenter-page">
      <el-pagination small background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- 审核通过原因或未通过原因模态框 -->
    <el-dialog center :title="dialogTitle+'原因'" :before-close="beforeClose" :visible.sync="dialogVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form :rules="rules" :model="form" ref="form" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item prop="result" :label="dialogTitle+'原因'" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="dialogTitle+'原因'" v-model="form.result">
                </el-input>
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
import config from '../../config'
import service from '@/utils/request'
import axios from '@/http/axios'
export default {
  name: 'appealCenter',
  data(){
    return {
      dialogVisible:false,
      dialogTitle:'通过',
      formLabelWidth:'120px',
      form:{},
      /* 总共多少数据 */
      total:0,
      multipleSelection: [],
      /* 当前页 */
      currentPage:1,
      /* 当前修改的ID */
      searchObj:{
        searchTime:''
      },
      // sponsorRole:[{
      //   name:'商户',
      //   value:'商户'
      // },{
      //   name:'刷手',
      //   value:'刷手'
      // }],
      appealTypes:[{
        name:'任务操作类型',
        value:'任务操作类型'
      },{
        name:'资金问题',
        value:'资金问题'
      },{
        name:'其他问题',
        value:'其他问题'
      }],
      statusFilter:[{
        name:'待审核',
        value:'待审核'
      },{
        name:'通过',
        value:'通过'
      },{
        name:'驳回',
        value:'驳回'
      }],
      appealData:[],
      // 表单验证
      rules:{
        result:[
          { required: true, message: '请输入原因', trigger: 'blur' }
        ]
      },
    }
  },
  created(){
    this.findAppealData();
  },
  computed: {
    ...mapGetters(['siteId','userId'])
  },
  methods: {
    /* 通过 */
    handlePass(row){
      this.dialogTitle = '通过';
      this.dialogVisible = true;
      this.form = {
        id:row.id,
        status:'通过',
        result:'',
        userId:this.userId
      };
    },
    /* 驳回 */
    handleForbidden(row) {
      this.dialogTitle = '驳回';
      this.form = {
        id:row.id,
        status:'驳回',
        result:'',
        userId:this.userId
      };
      this.dialogVisible = true;
    },
    /* 模态框关闭之前 */
    beforeClose(done){
      this.$refs['form'].resetFields();  //重置验证
      done();
    },
    /* 模态框关闭 */
    handleCancle(){
      this.$refs['form'].resetFields();  //重置验证
      this.dialogVisible = false;
    },
    /* 模态框点击确定 */
    dialogSubmit(){
       this.$refs['form'].validate((valid) => {
          if (valid) {
           this.changeStatusAppeal(this.form,this.dialogTitle);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    /* 搜索 */
    handleSearch(){
      this.findAppealData(1);
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
      this.findAppealData(val);
    },
    /* 修改状态 */
    changeStatusAppeal(obj,message){
      service.get('/appeal/changeStatus', {params:obj}).then((data) => {
        config.errorTitle(data.status,message+'失败!');
        this.$notify({title:'成功',type: 'success', message: message+'成功!'});
        this.findAppealData();
        this.dialogVisible = false;
        this.$refs['form'].resetFields();  //重置验证
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: message+'失败!'});
      })
    },
    /* 查找消息数据 */
    findAppealData(page){
      let obj = {
        page:page?(page-1):(this.currentPage-1),
        pageSize:10,
        siteId:this.siteId,
        orderId:this.searchObj.orderId,
        sponsorRole:this.searchObj.sponsorRole,
        type:this.searchObj.type,
        status:this.searchObj.status,
      };
      /* 删除空属性 */
      for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
      service.get('/appeal/pageQuery', {params:obj}).then((data) => {
        // console.log('======',data.data.data.list)
        config.errorTitle(data.status,'查找失败');
        this.appealData = data.data.data.list;
        this.total = data.data.data.total;
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: '查找失败!'});
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  #appealCenter{
    .appealCenter-option{
      margin-top:10px;
      overflow: hidden;
      .addBtn{
        float: left;
      }
    } 
    .appealCenter-table{
      margin-top:10px;
      border-top:1px solid #ebeef5;
      .iconDiv{
        margin-right:10px;
      }
      .iconDiv:last-child{
        margin-right:0;
      }
    } 
    .appealCenter-page{
      margin-top:10px;
    }
  }
</style>
