<template>
    <div id="appList">
      <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="form.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="getList(1)">筛选</el-button>
          </el-form-item>
        </el-form>
        <div class="tablePanel"><el-button type="primary"  @click="appCreate">新增APP</el-button></div>
        <el-table :data="tableData" stripe>
          <el-table-column  prop="name" label="名称"></el-table-column>
          <el-table-column  label="LOGO">
            <template slot-scope="scope">
              <img :src="scope.row.logo" width="60" height="60" v-if="scope.row.logo!=''"/>
            </template>
          </el-table-column>
          <el-table-column  prop="points_change" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
              <el-button type="text" @click="viewAccount(scope.row.id)">查看帐号</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!--分页-->
      <div class="alignCenter">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :current-page="pagination.page"
          :total="pagination.total"
          :page-size="pagination.page_size"
          @current-change="getList">
        </el-pagination>
      </div>

      <!--新增/编辑APP-->
      <el-dialog :title="appForm.id==''?'新增APP':'编辑'" :visible.sync="appFormVisible">
        <el-form :model="appForm" ref="appForm">
          <el-form-item label="名称" label-width="120" prop="name"  :rules="[{required: true, message: '请输入名称', trigger: 'change'}]">
            <el-input v-model="appForm.name" auto-complete="off" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item id="goods_imgs" label="LOGO" label-width="120" prop="logo"  :rules="[{required: true, message: '请上传商品图', trigger: 'change'}]">
          <el-upload
                      class="avatar-uploader"
                      accept="image/jpeg,image/jpg,image/png"
                      :action="uploadOptions.url"
                      :data="uploadOptions.data"
                      name="headpic[]"
                      :before-upload="handlePictureCardbefore"
                      :on-success="handlePictureCardSuccess">
            <img v-if="appForm.logo!=''" :src="appForm.logo" class="avatar" width="60" height="60">
            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
          </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="appFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="appFormComfirm">确 定</el-button>
        </div>
      </el-dialog>
      <cutPictur @comfirm="handlePictureCardSuccess" ref="cutPicture" :options="options"></cutPictur>
    </div>
</template>

<script>
  import cutPictur from '../../components/cutPicture.vue';
    export default {
        name: "list",
      components: {
        cutPictur,
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
            form:{
              name:'',
            },
            options:{
              fixedNumber:[1,1]
            },
            appForm:{
              name:'',
              logo:'',
              id:'',
            },
            appFormVisible:false,
            tableData:[],
            pagination:{
              page:1,
              total:0,
              page_size:20
            }
          }
      },
      created(){
        this.getList(1)
      },
      methods:{
        //获取列表
        getList(page){
          var smData = JSON.parse(JSON.stringify(this.form));
          smData.page = page;
          this.api.request({
            url: this.api.app_list,
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: this.qs.stringify(smData)
          }).then((res) => {
            this.tableData = res.list;
            this.pagination.page = res.page;
            this.pagination.total = res.total_count;
            this.pagination.page_size = res.per_page;
          });
        },
        //编辑APP
        edit(id){
          var smData={
            id:id
          };
          this.api.request({
            url:this.api.app_info,
            params:smData,
          }).then((res)=>{
            if(this.$refs['appForm'])
              this.$refs['appForm'].resetFields();
            this.appForm.name=res.name;
            this.appForm.id=res.id;
            this.appForm.logo=res.logo;
            this.appFormVisible=true;
          });
        },
        //新增APP
        appCreate(){
          this.appForm={
              name:'',
              logo:'',
              id:'',
          };
          if(this.$refs['appForm'])
            this.$refs['appForm'].resetFields();
          this.appFormVisible=true;
        },
        //新增/编辑App确认事件
        appFormComfirm(){
          this.$refs['appForm'].validate((valid)=>{
            if(valid){
              var smData=JSON.parse(JSON.stringify(this.appForm));
              this.api.request({
                url:this.api.store_app,
                method:'post',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                data:this.qs.stringify(smData)
              }).then((res)=>{
                this.$message({
                  type:'success',
                  message:'保存成功！'
                });
                this.getList(this.pagination.page);
                this.appFormVisible=false;
              })
            }
          });
        },
        //删除APP
        del(id){
          this.$confirm('此操作将永久删除该APP, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let smData={
              id:id,
            }
            this.api.request({
              url:this.api.del_app,
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              data:this.qs.stringify(smData)
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'删除成功！'
              });
              this.getList(this.pagination.page);
            })
          }).catch(() => {});
        },
        //查看帐号
        viewAccount(app_id){
          this.$router.push('/account/list/'+app_id);
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
          this.appForm.logo=this.api.photo_Server + response;
          if (this.appForm.logo!='') {
            if (document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error').length > 0) {
              document.getElementById('goods_imgs').getElementsByClassName('el-form-item__error')[0].remove();
            }
          }
        },

      }
    }
</script>

<style lang="less" scoped>
  #appList{
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
  }

</style>
