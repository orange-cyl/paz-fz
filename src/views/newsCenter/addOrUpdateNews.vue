<!--消息中心页面-->
<template>
  <div id="newsCenter">
    <div class="totalTitle newsCenter-title">
      <div>消息中心</div>
      <div class="backDiv" @click="toBack">返回</div>
    </div>
    <!-- 新增或修改消息信息模态框 -->
    <el-form :model="form" :rules="rules" ref="form" name="form">
      <div class="row">
        <div class="col-sm-6">
          <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
            <el-input clearable v-model="form.title" auto-complete="off" size="mini"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-6">
          <el-form-item label="通知人群" prop="receiver" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.receiver" size="small">
              <el-checkbox label="business" checked >商家</el-checkbox>
              <!-- <el-checkbox label="scalpuser"></el-checkbox> -->
              <el-checkbox label="tgy">推广员</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="col-sm-6">
          <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
            <mavon-editor @save="saveContent" placeholde="请输入内容" defaultOpen="preview" v-model="form.content" :toolbars="toolbars"/>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class='dialogBottom' text-align='right'>
      <span class="infoSpan">注意：点击确定之前先点击编辑器中的&nbsp;&nbsp;<i style="color:#757575" class="fa fa-floppy-o"></i>&nbsp;&nbsp;图标</span>
      <el-button size='mini' type='primary' @click="handleSubmit">确定</el-button>
    </div>   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../config'
import service from '@/utils/request'
import axios from '@/http/axios'
export default {
  name: 'newsCenter',
  data(){
    return {
      title:'',
      form:{
        receiver:[]
      },
      formLabelWidth:'100px',
      rules:{
        title:[
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        receiver:[
          { required: true, message: '请选择通知人群', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      /* 富文本编辑器的图片图标删除 */
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    };
  },
  created(){
    // console.log(this.$route.query);
    this.title = this.$route.query.title;
    if(this.$route.query.title=='新增消息'){
      this.form = {
        receiver:[],
        content:'',
        contentSource:'',
      };
    }else{
      if(this.$route.query.news){
        this.form = this.$route.query.news;
        if(this.form.receiver){
          this.form.receiver = this.form.receiver.split(',');
        }else{
          this.form.receiver = [];
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userId','siteId'])
  },
  methods: {
    /* 保存数据 */
    handleSubmit(){
       this.$refs['form'].validate((valid) => {
          if (valid) {
             this.form.receiver = this.form.receiver.toString();
      this.form.userId = this.userId;
      this.form.siteId = this.siteId;
      service.post('/notice/saveOrUpdate', this.form).then((data) => {
        config.errorTitle(data.status,'保存失败');
        this.$refs['form'].resetFields();  //重置验证
        this.$notify({title:'成功',type: 'success', message: '保存成功!'});
        this.$router.push(this.$route.query.path);
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: '保存失败!'});
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    },
    /* 编辑区的保存 */
    saveContent(value,render){
      /* value是markdown格式  render是html格式*/
      this.form.content = value;
      this.form.contentSource = render;
    },
    /* 返回 */
    toBack(){
      this.$router.push(this.$route.query.path);
    }
  },
}
</script>
<style lang="scss" scoped>
  #newsCenter{
    .newsCenter-title{
      overflow: hidden;
      &>div:first-child{
        float: left;
      }
      &>div:last-child{
        float: right;
      }
    }
    .dialogBottom{
      text-align: right;
      .infoSpan{
        color:#F56C6C;
        position: relative;
        top:3px;
        right:10px;
      }
    }
  }
</style>
