<template>
    <div id="cashprize">
        <div class="price">
          <el-form ref="form"  :model="form" class="demo-form-inline" label-width="120px" >
            <el-row   v-for="(item,index) in form.prizes" :key="index">
              <el-col :span="24" style="margin-bottom: 20px;"><div class="grid-content bg-purple-dark">奖品{{index+1}}</div></el-col>
              <el-form-item label="奖品名"  :prop="'prizes.'+index+'.name'"  :rules="[{required: true, message: '请输入名称', trigger: 'change'}]">
                <el-input v-model="item.name" style="width:300px;"></el-input>
              </el-form-item>
              <el-form-item label="奖品图" :id="'goods_imgs'+index"  :prop="'prizes.'+index+'.image'"  :rules="[{required: true, message: '请选择奖品图', trigger:'change'}]">
                <el-upload
                  class="avatar-uploader"
                  accept="image/jpeg,image/jpg,image/png"
                  :action="uploadOptions.url"
                  :data="uploadOptions.data"
                  name="headpic[]"
                  :before-upload="handlePictureCardbefore"
                  :on-success="handlePictureCardSuccess">
                  <img v-if="item.image!=''" :src="item.image" class="avatar" @click="UploadIndex(index)" width="60" height="60">
                  <i v-else class="el-icon-plus avatar-uploader-icon" @click="UploadIndex(index)"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="中奖概率"  :prop="'prizes.'+index+'.rate'"  :rules="[{required: true, message: '请输入中奖概率', trigger: 'change'}]">
                <el-input v-model="item.rate" type="number" style="width:300px;"></el-input>%
              </el-form-item>
            </el-row>

          </el-form>
          <div class="footerSubmit"><el-button type="primary" @click="publish">立即保存</el-button></div>
        </div>
      <cutPictur @comfirm="handlePictureCardSuccess" ref="cutPicture" :options="options"></cutPictur>
    </div>
</template>

<script>
  import cutPictur from '../../components/cutPicture.vue';

    export default {
        name: "index",
      data(){
          return{
            uploadOptions: {
              url: this.api.upload_img,
              data: {
                path_code: '32',
                data_type: 'html'
              }
            },
            options:{
              fixedNumber:[1,1]
            },
            currentIndex:'',
            form:{
              prizes:[
                {
                name:'',
                image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                rate:'',
              },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
                {
                  name:'',
                  image:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                  rate:'',
                },
              ]
            }
          }
      },
      components: {
        cutPictur
      },
      created(){
        this.getList();
      },
      methods:{
          //获取列表
        getList(){
          this.api.request({
            url:this.api.prize_list,
          }).then((res)=>{
            if(res.length>=8)
            this.form.prizes=res;
          })
        },
        publish(){
          this.$refs['form'].validate((valid)=>{
            if(valid){
             var rates=parseFloat(parseFloat(this.form.prizes[0].rate)+
               parseFloat(this.form.prizes[1].rate)+
               parseFloat(this.form.prizes[2].rate)+
               parseFloat(this.form.prizes[3].rate)+
               parseFloat(this.form.prizes[4].rate)+
               parseFloat(this.form.prizes[5].rate)+
               parseFloat(this.form.prizes[6].rate)+
               parseFloat(this.form.prizes[7].rate));
             console.log(rates);
             if(rates!=100){
                this.$message.error('奖品1~8的中奖概率和必须等于100！');
              }else{
               let smData={};
               smData.json=this.form.prizes;
               this.api.request({
                 url:this.api.store_prize,
                 method:'post',
                 headers: {
                   'Content-Type': 'application/x-www-form-urlencoded',
                 },
                 data:this.qs.stringify(smData)
                 //data:smData,
               }).then((res)=>{
                 this.$message({
                   type:'success',
                   message:'保存成功！'
                 });
               })
              }
            }
          });

        },UploadIndex(index) {
          this.currentIndex = index;
        },

        handlePictureCardSuccess(response){
          this.form.prizes[this.currentIndex].image=this.api.photo_Server + response;
          if (this.form.prizes[this.currentIndex].iamge!='') {
            if (document.getElementById('goods_imgs'+this.currentIndex).getElementsByClassName('el-form-item__error').length > 0) {
              document.getElementById('goods_imgs'+this.currentIndex).getElementsByClassName('el-form-item__error')[0].remove();
            }
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
      }
    }
</script>

<style lang="less" scoped>
  #cashprize{
    padding-bottom:50px;
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
      background: #99a9bf;
      color:#fff;
      line-height: 36px;
      padding-left:10px;
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
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;
      position: relative;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      line-height: 146px;
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
      width: 148px;
      height: 148px;
      line-height: 146px;
      vertical-align: top;
    }
    .avatar {
      width: 146px;
      height: 146px;
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
