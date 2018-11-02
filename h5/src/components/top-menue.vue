<template>
  <div class="top-menue">
    <div class="top">
      <div class="menue-btn" @click="openMenue">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="title-main" v-if="form==1">
        <div class="logo">
          <img src="../img/main/top-logo.png"/>
          <span>SEGA GAMING</span>
        </div>
        <div class="aboutus" @click="goAboutus">
          <img src="../img/main/top-about-us.png"/>
          <span>About Us</span>
        </div>
      </div>
      <div class="title-main" v-else><div class="pageName">{{pageName}}</div></div>
    </div>
    <div class="bg" v-show="show" @click="hideMenue"></div>
    <div class="menue-l" v-show="show">
      <div class="menue-item" @click="show=false">CLOSE MENU</div>
      <div class="menue-fege"></div>
      <div class="menue-item nologin" v-if="!login" @click="goPage('/register')" :class="active_menue=='REGISTER A NEW ACCOUNT'?'active':''">JOIN US</div>
      <div class="menue-item nologin"  v-if="!login" @click="goPage('/login')"  :class="active_menue=='PLEASE LOGIN'?'active':''">LOGIN</div>
      <div class="menue-item nologin"  v-if="login" @click="goPage('/account')"  :class="active_menue=='MY ACCOUNT'?'active':''">MY ACCOUNT</div>
      <div class="menue-item" @click="goPage('/main/index')"  :class="active_menue=='gifts'?'active':''">HOME</div>
      <div class="menue-item" @click="goPage('/main/promo')"  :class="active_menue=='promo'?'active':''">PROMO</div>
      <div class="menue-item" @click="goPage('/main/live')"  :class="active_menue=='live'?'active':''">LIVE</div>
      <div class="menue-item" @click="goPage('/main/slot')"  :class="active_menue=='slot'?'active':''">SLOT</div>
      <div class="menue-item" @click="goPage('/lottery')"  :class="active_menue=='BONUS WHEELS'?'active':''">LOTTERY</div>
      <div class="menue-item" @click="goPage('/customer')"  :class="active_menue=='24/7 SERVICE'?'active':''">24/7 SERVICE</div>
      <div class="menue-item" @click="goPage('/aboutus')"  :class="active_menue=='ABOUT US'?'active':''">ABOUT US</div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "top-menue",
      data(){
          return{
            active_menue:'home',
            show:false,
            login:'',
            pageName:'',
          }
      },
      props:['form'],
      created(){
          this.isLogin();
        this.activeMenue();
        this.pageName=this.$route.name;
      },
      watch:{
        $route(to,from){
          this.activeMenue();
          this.hideMenue();

        }
      },
      methods:{
        activeMenue(){
          var name=this.$route.name;
          if(name=='gifts'){
            this.active_menue='gifts';
          }
          if(name=='promo'){
            this.active_menue='promo';
          }
          if(name=='live'){
            this.active_menue='live';
          }
          if(name=='slot'){
            this.active_menue='slot';
          }
          if(name=='BONUS WHEELS'){
            this.active_menue='BONUS WHEELS';
          }
          if(name=='ABOUT US'){
            this.active_menue='ABOUT US';
          }
          if(name=='24/7 SERVICE'){
            this.active_menue='24/7 SERVICE';
          }
          if(name=='PLEASE LOGIN'){
            this.active_menue='PLEASE LOGIN';
          }
          if(name=='REGISTER A NEW ACCOUNT'){
            this.active_menue='REGISTER A NEW ACCOUNT';
          }
          if(name=='MY ACCOUNT'){
            this.active_menue='MY ACCOUNT';
          }
        },
        //页面跳转
        goPage(path){
          this.$router.push(path);
        },
        //打开菜单
        openMenue(){
          this.show=true;
        },
        //hideMenue
        hideMenue(){
          this.show=false;
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
        //goAboutus
        goAboutus(){
          this.$router.push('/aboutus');
        }
      },

    }
</script>

<style lang="less">
.top-menue{
  .top{
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    height:1.06rem;
    background:rgba(0,0,0,0.38);
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    z-index:998;
    .menue-btn{
      height:0.6rem;
      border-right:0.02rem solid #E8DD94;
      padding:0px 0.3rem;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      positon:absolute;
      left:0px;
      top:0px;
      width:1.24rem;
      .line{
        width:0.64rem;
        height:0.04rem;
        background:rgba(232,221,148,1);
        border-radius:4px;
      }
    }
    .title-main{
      display:flex;
      flex-direction: row;
      justify-content:space-between;
      align-items: center;
      position:absolute;
      left:1.24rem;
      top:0px;
      right:0px;
      height:1.06rem;
      .logo{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left:0.7rem;
        img{
          width:0.78rem;
          margin-right:0.2rem;
        }
        span{
          font-size:0.36rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(232,221,148,1);
        }
      }
      .aboutus{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right:0.52rem;
        img{
          width:0.52rem;
          margin-bottom:0.06rem;
        }
        span{
          font-size:0.22rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(232,221,148,1);
        }
      }
      .pageName{
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(242,242,242,1);
        padding-left:0.3rem;
        font-size:0.36rem;
      }
    }
  }
  .bg{
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background:rgba(0,0,0,0.65);
    z-index:9999;
  }
  .menue-l{
    position:fixed;
    top:0px;
    left:0px;
    bottom:0px;
    z-index:9999;
    width:4rem;
    background:rgba(41,42,42,1);
    .menue-item{
      height:1rem;
      padding-left:0.5rem;
      font-size:0.34rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(242,242,242,1);
      line-height:1rem;
      text-align:left;

      &.active{
        background:rgba(0,0,0,1);
      }
      &.nologin{
        color:#E8DD94;
      }
    }
    .menue-fege{
      width:4rem;
      height:0.04rem;
      background:rgba(233,153,21,1);
    }
  }
}
</style>
