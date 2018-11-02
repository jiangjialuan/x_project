<template>
    <div id="goodForm">
      <div>
        <el-form ref="form"  :model="form" class="demo-form-inline" label-width="120px">
          <el-form-item label="商品名称"  prop="name"  :rules="[{required: true, message: '请输入名称', trigger: 'change'}]">
            <el-input v-model="form.name" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="商品图"  id="goods_imgs"  prop="image"  :rules="[{required: true, message: '请选择图片', trigger: 'change'}]">
            <el-row>
              <draggable class="list-group" element="ul" v-model="form.image"  :move="onMove" @start="isDragging=true" @end="moveEnd">
                <transition-group type="transition" :name="'flip-list'">
                  <el-upload v-for="(element,index) in form.image" :key="'element'+index"
                             class="avatar-uploader"
                             accept="image/jpeg,image/jpg,image/png"
                             :action="uploadOptions.url"
                             :data="uploadOptions.data"
                             name="headpic[]"
                             :show-file-list="false"
                             :before-upload="handlePictureCardbefore"
                             :on-success="handlePictureCardSuccess">
                    <template v-if="element.url!=''&&element.url!=undefined">
                      <img  :src="element.url" class="avatar" @click="UploadIndex(index)">
                    </template>
                    <i v-else class="el-icon-plus avatar-uploader-icon" @click="UploadIndex(index)"></i>
                    <span class="avatar-del" @click="handlePictureCardRemove">
                    <span class="delitem">
                      <i class="el-icon-delete" :id="'del'+index"></i>
                    </span>
                  </span>
                  </el-upload>
                </transition-group>
              </draggable>
              <el-upload  v-if="form.image.length<5"
                                      class="avatar-uploader"
                                      accept="image/jpeg,image/jpg,image/png"
                                      :action="uploadOptions.url"
                                      :data="uploadOptions.data"
                                      name="headpic[]"
                                      :show-file-list="false"
                                      :before-upload="handlePictureCardbefore"
                                      :on-success="handlePictureCardSuccess">
              <i class="el-icon-plus avatar-uploader-icon" @click="UploadIndex(form.image.length)"></i>
            </el-upload>
              <div>2MB以内的JPG/PNG图片，建议尺寸 640 x 640 像素，最多5张,可以拖动进行排序。</div>
            </el-row>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="form.sell" placeholder="请选择">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品库存"  prop="stock"  :rules="[{required: true, message: '请输入库存', trigger: 'change'},{validator: validateprice, trigger: 'blur'}]">
            <el-input v-model="form.stock" style="width:300px;" ></el-input>
          </el-form-item>
          <el-form-item label="兑换所需积分"  prop="need_points"  :rules="[{required: true, message: '请输入兑换所需积分', trigger: 'change'},{validator: validateprice, trigger: 'blur'}]">
            <el-input v-model="form.need_points" style="width:300px;" ></el-input>
          </el-form-item>
          <el-form-item label="原价"  prop="original_points"  :rules="[{required: true, message: '请输入原价', trigger: 'change'},{validator: validateprice, trigger: 'blur'}]">
            <el-input v-model="form.original_points" style="width:300px;" ></el-input>
          </el-form-item>
          <el-form-item label="商品描述"  required="">
            <div style="width: 640px;">
              <UE :defaultMsg='form.desc' :config="config"  ref="ue" id="ue"></UE>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="footerSubmit"><el-button type="primary" @click="publish">立即发布</el-button></div>
      <cutPictur @comfirm="handlePictureCardSuccess" ref="cutPicture" :options="options"></cutPictur>
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
            options:{
              fixedNumber:[1,1]
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
            form:{
              id:this.$route.params.id?this.$route.params.id:'',
              name:'',
              image:[],
              sell:'1',
              stock:'',
              need_points:'',
              original_points:'',
              desc:'',
            },
          }
      },
      mounted(){
        if(this.$route.params.id){
          this.setData();
        }
      },
      /*computed:{
        desc(){
          this.$refs['ue'].setUEContent(this.form.desc);
        }
      },*/
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
        //图片拖动排序调整
        onMove({relatedContext, draggedContext}) {
          const relatedElement = relatedContext.element;
          const draggedElement = draggedContext.element;
          return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },
        //图片拖动排序结束
        moveEnd() {
          this.isDragging = false;
        },
        UploadIndex(index) {
          this.currentUploadIndex = index;
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
        //商品图片文件列表移除时触发事件
        handlePictureCardRemove(e) {
          e.stopPropagation();
          var index = parseInt(e.target.id.replace('del', ''));
          this.form.image.splice(index, 1);
        },
        //商品图片上传成功时触发的函数
        handlePictureCardSuccess(response, file, fileList) {
          if (this.currentUploadIndex == this.form.image.length) {
            this.form.image.push({
              url: this.api.photo_Server + response
            })
          } else {
            this.form.image[this.currentUploadIndex].url = this.api.photo_Server + response;
          }
          if (this.form.image.length > 0) {
            if (document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error').length > 0) {
              document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error')[0].remove();
            }
          }
        },
        //获取商品详情
        getDetail(){
          return new Promise((resolve,reject)=>{
            this.api.request({
              url:this.api.goods_detail,
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
            this.form.name=res.name;
            if(res.image.length>0) {
              res.image.forEach((item)=>{
                this.form.image.push({
                  url:item
                });
              })
            }
            this.form.sell=res.sell;
            this.form.stock=res.stock;
            this.form.need_points=res.need_points;
            this.form.original_points=res.original_points;
            this.form.desc=res.desc;
            this.$refs['ue'].setUEContent(res.desc);
          })
        },
        //商品发布
        publish(){
          this.$refs['form'].validate((valid)=>{
            if(valid){
              console.log(this.form);
              var smData=JSON.parse(JSON.stringify(this.form));
              smData.desc = this.$refs['ue'].getUEContent();
              if (smData.desc == '') {
                this.$message.error("详情不能为空！");
                return false;
              }
              if(this.form.image.length>0){
                smData.image=[];
                this.form.image.forEach((item)=>{
                  smData.image.push(item.url);
                });
              }
              this.api.request({
                url:this.api.store_goods,
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
                this.$router.push('/goods/list');
              });
            }
          });


        }
      }
    }
</script>

<style lang="less" scoped>
#goodForm{
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
    width: 148px;
    height: 148px;
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
