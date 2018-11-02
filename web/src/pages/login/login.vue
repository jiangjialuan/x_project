<template>
<div id="login">
  <div class="login-box">
    <h3>登录</h3>

    <el-form ref="form" :model="form" label-width="60px"  style="width:400px;">
      <el-form-item label="帐号" prop="username" :rules="[{required: true, message: '请输入帐号', trigger: 'change'}]">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{required: true, message: '请输入密码', trigger: 'change'}]">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <div class="alignCenter"><el-button type="primary" @click="onSubmit">登录</el-button></div>
    </el-form>
  </div>
</div>
</template>

<script>
  import md5 from 'js-md5';
    export default {
        name: "login",
      data(){
          return {
            form:{
              username:'',
              password:'',
            }
          }
      },
      methods:{
        //登录
        onSubmit(){
          this.$refs['form'].validate((valid)=>{
            if(valid){
              var smData=JSON.parse(JSON.stringify(this.form));
              smData.password=md5(this.form.password);
              this.api.request({
                url:this.api.login,
                data:this.qs.stringify(smData),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                method:'post'
              }).then((res)=>{
                this.$message({
                  type:'success',
                  message:'登录成功！'
                });
                this.$router.push('/');
              });
            }
          });
        },
      }
    }
</script>

<style lang="less" scoped>

#login{
  background: linear-gradient(#303133, #000);
  color:#fff;
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content:center;
  .login-box {
      width:500px;
      height:300px;
      background: rgba(255, 255, 255,0.1);
      border-radius:25px;
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content:center;

      h3{
        color:#eee;
        font-size:24px;
        font-weight:normal;
      }
  }
}
</style>
