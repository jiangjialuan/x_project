<template>
  <div id="live-slot-form">
    <div>
      <el-form ref="form"  :model="form" class="demo-form-inline" label-width="130px">
        <el-form-item label="应用名称"  prop="title"  :rules="[{required: true, message: '请输入名称', trigger: 'change'}]">
          <el-input v-model="form.title" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="封面图片"  id="goods_imgs"  prop="cover"  :rules="[{required: true, message: '请选择图片', trigger: 'change'}]">
          <el-upload
            class="avatar-uploader"
            accept="image/jpeg,image/jpg,image/png"
            :action="uploadOptions.url"
            :data="uploadOptions.data"
            name="headpic[]"
            :show-file-list="false"
            :on-success="handlePictureCardSuccess"
            :before-upload="handlePictureCardbefore">
            <img v-if="form.cover!=''" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">请选择图片</i>
          </el-upload>
          <div>2MB以内的JPG/PNG图片，建议为690px * 268px。</div>
        </el-form-item>
        <el-form-item label="应用分组" prop="group" :rules="[{required: true, message: '请选择分组', trigger: 'change'}]">
          <el-select v-model="form.group" placeholder="请选择">
            <el-option label="SLOT" value="1"></el-option>
            <el-option label="LIVE" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用类型" prop="type" :rules="[{required: true, message: '请选择类型', trigger: 'change'}]">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="WEB/H5" value="1"></el-option>
            <el-option label="APP" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.type==1" label="H5/WEB链接"  prop="website_url"  :rules="[{required: true, message: '请输入H5/WEB链接', trigger: 'change'}]">
          <el-input v-model="form.website_url" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type==0" label="Android下载链接"  prop="android_url"  :rules="[{required: true, message: '请输入Android下载链接', trigger: 'change'}]">
          <el-input v-model="form.android_url" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type==0" label="Ios下载链接"  prop="ios_url"  :rules="[{required: true, message: '请输入Ios下载链接', trigger: 'change'}]">
          <el-input v-model="form.ios_url" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item  label=""  style="margin-top:-15px;" >
          <div>提示：填写链接时要加上http://或者https://等协议</div>
        </el-form-item>
        <el-form-item label="应用详情"  required="">
          <div style="width: 640px;">
            <UE :defaultMsg='form.desc' :config="config"  ref="ue" id="ue"></UE>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footerSubmit"><el-button type="primary" @click="publish">保存</el-button></div>
    <cutPictur @comfirm="handlePictureCardSuccess" :options="options" ref="cutPicture"></cutPictur>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import cutPictur from '../../components/cutPicture.vue';
  import UE from '../../components/ue.vue';
  export default {
    name: "goodForm",
    components: {
      draggable,
      cutPictur,
      UE
    },
    data(){
      return{
        uploadOptions: {
          url: this.api.upload_img,
          data: {
            path_code: '32',
            data_type: 'html'
          }
        },
        currentUploadIndex:'',
        config: {
          toolbars: [['Source', 'Bold', 'italic', 'underline', 'forecolor', 'fontfamily', 'fontsize', 'justifyleft', 'justifycenter', 'justifyright', 'simpleupload']],
          enableAutoSave: false,
          enableContextMenu: false,
          elementPathEnabled: false,
          wordCountMsg: '{#count} / 10000',
          wordOverFlowMsg: '请不要超过10000个字符',
          autoHeightEnabled: true,
          scaleEnabled: false,
          zIndex: 1,
          autoFloatEnabled: true,
          initialFrameWidth: null,
          initialFrameHeight: 500,
        },
        options:{
          fixedNumber:[690,268]
        },
        form:{
          id:this.$route.params.id?this.$route.params.id:'',
          title:'',
          cover:[],
          desc:'',
          type:'',
          group:'',
          android_url:'',
          website_url:'',
          ios_url:''
        },
      }
    },
    mounted(){
      if(this.$route.params.id){
        this.setData();
      }
    },
    methods:{
      //验证数字大于0
      validateprice (rule, value, callback){
        var reg=/^[0-9]+(\.\d+)?$/;
        if (!reg.test(value)) {
          callback(new Error('必须大于等于0'))
        }else{
          callback()
        }
      },
      //商品图片上传前触发函数
      handlePictureCardbefore(file) {
        if (file.size / 1024 / 1024 > 2) {
          this.$message.error("上传图片不能大于2M");
          return false;
        }
        if (file.type == 'image/jpeg') {
          //return true;
          this.$refs['cutPicture'].open(file);
          return false;
        } else if (file.type == 'image/png') {
          // return true;
          this.$refs['cutPicture'].open(file);
          return false;
        } else if (file.type == 'image/jpg') {
          // return true;
          this.$refs['cutPicture'].open(file);
          return false;
        } else {
          this.$message.error("请上传图片");
          return false;
        }
      },
      //商品图片上传成功时触发的函数
      handlePictureCardSuccess(response, file, fileList) {
        this.form.cover=this.api.photo_Server + response;
        if (this.form.cover.length > 0) {
          if (document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error').length > 0) {
            document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error')[0].remove();
          }
        }
      },
      //获取商品详情
      getDetail(){
        return new Promise((resolve,reject)=>{
          this.api.request({
            url:this.api.app_market_detail,
            params:{
              id:this.form.id
            }
          }).then((res)=>{
            resolve(res);

          })
        });

      },
      //setData
      setData(){
        this.getDetail().then((res)=>{
          this.form.cover=res.cover;
          this.form.title=res.title;
          this.form.desc=res.desc;
          this.form.type=res.type;
          this.form.group=res.group;
          this.form.website_url=res.website_url;
          this.form.android_url=res.android_url;
          this.form.ios_url=res.ios_url;
          this.$refs['ue'].setUEContent(res.desc);
        })
      },
      //商品发布
      publish(){
        this.$refs['form'].validate((valid)=>{
          if(valid){
            var smData=JSON.parse(JSON.stringify(this.form));
            smData.desc = this.$refs['ue'].getUEContent();
            if (smData.desc == '') {
              this.$message.error("应用详情不能为空！");
              return false;
            }
            this.api.request({
              url:this.api.store_app_market,
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              data:this.qs.stringify(smData)
            }).then((res)=>{
              this.$message({
                type:'success',
                message:"保存成功！"
              });
              this.$router.push('/live-slot/index');
            });
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  #live-slot-form{
    text-align:left;
    .list-group{
      display: inline-block;
      padding:0px;
    }
    #goods_imgs{
      text-align:left;
    }
    .avatar-uploader .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin:0px;
      border:none;
      vertical-align: top;
      &:hover .avatar-del{
        opacity: 1;
      }
    }
    .avatar-uploader{
      vertical-align: middle;
      overflow: hidden;
      background-color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      width: 690px;
      height: 268px;
      margin: 0 8px 8px 0;
      display: inline-block;
      position: relative;
    }
    .avatar-del{
      position: absolute;
      width: 34px;
      height: 34px;
      top: 0;
      right: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;

      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
      .delitem{
        position: static;
        font-size: inherit;
        color: inherit;
        i.el-icon-delete{
          font-family: element-icons!important;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          vertical-align: baseline;
          display: inline-block;
          -webkit-font-smoothing: antialiased;
        }
        &::after{
          display: inline-block;
          content: "";
          height: 100%;
          vertical-align: middle;
        }
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 690px;
      height: 268px;
      line-height: 268px;
      vertical-align: top;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 690px;
      height: 268px;
      line-height: 268px;
      vertical-align: top;
    }
    .avatar {
      width: 690px;
      height: 268px;
      display: block;
    }
    .footerSubmit {
      background-color: rgba(0, 0, 0, 0.4);
      height: 50px;
      line-height: 50px;
      position: fixed;
      left: 0px;
      right: 0;
      bottom: 0;
      text-align: center;
      z-index: 10000;
      margin:0px;
    }
  }
</style>
