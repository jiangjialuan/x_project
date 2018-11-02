<template>
    <div id="top" :style="levelList.length>1?'height:101px':'height:61px'">
      <!--<el-dropdown trigger="click" class="quit logo">
        <label class="name">admin</label>
        <i class="el-icon-back">退出</i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            <p @click="quit">退出</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <div class="logo">
        <label class="name">admin</label>
        <el-button type="text" class="el-icon-back" @click="logout">退出</el-button>
      </div>
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right" v-if="levelList.length>1">
        <el-breadcrumb-item class="breadcrumb-item" v-for="(item,index) in levelList" :key="index">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
    export default {
      name: "top",
      data(){
          return{
            levelList:[],
          }
      },
      created(){
        this.getBreadcrumb();
      },
      watch: {
        $route() {
          this.getBreadcrumb()
        }
      },
      methods:{
        getBreadcrumb() {//面包屑
          const matched = this.$route.matched.filter(item => item.name);
          this.levelList = matched;
        },
        logout(){
          this.$confirm('确定要退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.request({
              url:this.api.logout,
              method:'post',
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'成功退出！'
              });
              this.$router.push('/login');
            })
          }).catch(() => {});

        }
      }
    }
</script>

<style lang="less" scoped>
  #top{

    position: fixed;
    top:0px;
    left:0px;
    right:0px;
z-index: 2;
   // background:rgba(22,146,183,.85);
    .logo{
      height:61px;
      width:100%;
      border-bottom:1px solid #e5e5e5;
      text-align: right;
      line-height: 61px;
      padding-right:20px;
      background: #fff;
      .name{
        width:100px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
        vertical-align: middle;
      }
    }
    .breadcrumb{
      width:100%;
      height:40px;
      line-height: 40px;
      text-indent:2em;
      background: #f5f5f5;
    }
  }

</style>
