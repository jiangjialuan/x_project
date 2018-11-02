<template>
    <div class="bottomFix">
      <mt-button class="btn" @click="goPage('/customer')">
        <img src="../img/main/bottom-service.png"/>
        <span>24/7 SERVICE</span>
      </mt-button>
      <mt-button class="btn" @click="goPage('/login')" v-if="!login">
        <img src="../img/main/bottom-accout.png"/>
        <span>LOGIN</span>
      </mt-button>
      <mt-button class="btn" @click="goPage('/account')" v-else>
        <img src="../img/main/bottom-accout.png"/>
        <span>MY ACCOUNT</span>
      </mt-button>
    </div>
</template>

<script>
    export default {
        name: "bottom",
      data(){
          return{
            login:'',
          }
      },
      created(){
          this.isLogin();
      },
      methods:{
        //页面跳转
        goPage(path){
          this.$router.push(path);
        },
        //判断是否登录
        isLogin() {
          this.api.request({
            url: this.api.userinfo,
            data: {}
          }).then((res) => {
            if (res.state) {
              this.login=false;
            } else {
              this.login=true;
              //sessionStorage.setItem('userInfo',JSON.stringify(res));
            }
          });
        },
      }
    }
</script>

<style lang="less">
.bottomFix{
  position:fixed;
  z-index:998;
  bottom:0px;
  left:0px;
  right:0px;
  height:1.08rem;
  background:rgba(0,0,0,0.65);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  display:flex;
  .btn{
    width:3.2rem;
    height:0.78rem;
    background:linear-gradient(180deg,rgba(232,221,148,1) 0%,rgba(233,153,21,1) 100%);
    border-radius:0.08rem;
    line-height:0.78rem;
    padding:0px;
    .mint-button-text{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    img{
      width:0.5rem;
      margin-right:0.15rem;
    }
    span{
      font-size:0.3rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(70,0,0,1);
    }
  }
}
</style>
