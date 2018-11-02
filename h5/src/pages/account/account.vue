<template>
  <div id="account">
    <top></top>
    <!--<div class="logo-box">
      <img class="logo-img" src="../../img/logo.png"/>
      <p class="logo-text">{{userInfo.mobile_phone}}</p>
      <p class="box-points">
        <img src="../../img/icon-c.png"/>
        <span>Credit：{{userInfo.points}}</span>
      </p>
    </div>-->
    <div class="info-box">
      <p class="phone">HI, {{userInfo.mobile_phone}}</p>
      <p class="points">MY CREDITS: {{userInfo.points}}</p>
    </div>
    <div class="nav-box">
      <div class="item-box">
        <div class="item" @click="goAccount">CASINO ACCOUNTS MANAGEMENT</div>
      </div>
      <div class="item-box">
        <div class="item" @click="goPoints">CREDITS HISTORY</div>
        <div class="item-fege"></div>
        <div class="item" @click="goExchange">EXCHANGE HISTORY</div>
      </div>
      <div class="item-box">
        <div class="item" @click="modifyName()">
          <span>MY FULL NAME</span>
          <span class="fullname">{{userInfo.fullname}}</span>
        </div>
      </div>
    </div>
    <!--帐户管理-->
    <!--<div class="accout-box" @click="goAccount">
      <img src="../../img/chip-icon.png" class="accout-img"/>
      <p>Account Manager</p>
    </div>-->
    <!--快捷导航-->
    <!--<div class="quick-navigation">
      <div class="h-line"></div>
      <div class="navigations">
        <div class="navigation" @click="goPoints">
          <p>Credit history</p>
        </div>
        <div class="v-line"></div>
        <div class="navigation" @click="goExchange">
          <p>Exchange history</p>
        </div>
      </div>
      <div class="h-line"></div>
      <div class="navigations">
        <div class="navigation" @click="goCustomer">
          <p>Customer service</p>
        </div>
        <div class="v-line"></div>
        <div class="navigation" @click="goAboutus">
          <p>About us</p>
        </div>
      </div>
      <div class="h-line"></div>
    </div>-->
    <!--退出-->
    <div>
      <mt-button class="login-button" @click.native="logout">LOGOUT</mt-button>
    </div>
    <div class="game-bg" @click="closeAlert" v-if="alertVisible"></div>
    <div class="game-alert" v-if="alertVisible" :style="focusing?'top:0px':''">
      <div class="title">REMINDER</div>
      <!--<div class="text" v-if="parseInt(this.good_detail.stock)<=0"></div>-->
      <div class="text">
        <input type="text" v-model="form.fullname" @focus="comfocus"
               @blur="comblur"/>
      </div>
      <div class="btn">
        <mt-button @click="comfirmAlert">SUBMIT</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import top from '../../components/top-menue';

  export default {
    name: "account",
    data() {
      return {
        userInfo: {},
        selected: 'My',
        alertVisible:false,
        form:{
          fullname:'',
        },
        focusing:false,
      }
    },
    components: {
      top
    },
    created() {
      this.api.getUserInfo().then((res) => {
        this.userInfo = res;
        this.form.fullname=res.fullname;
      });
    },
    methods: {
      //input聚焦
      comfocus(e) {
        this.api.isAndroid().then((isAndroid) => {
          if (isAndroid) {
            this.focusing = true;
            /*document.getElementById('body-box').style.height = document.body.scrollHeight;
            setTimeout(() => {
              window.scrollTo({
                top: e.target.offsetTop - e.target.offsetHeight,
                behavior: "smooth"
              });
            }, 0)*/
          }
        })

      },
      comblur() {
        this.api.isAndroid().then((isAndroid) => {
          if (isAndroid) {
            this.focusing = false;
            /*window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            this.focusing = false;
            document.getElementById('body-box').style.height = 'auto';*/
          }
        });
      },
      //去联系客服
      goCustomer() {
        this.$router.push('/customer');
      },
      //去关于我们
      goAboutus() {
        this.$router.push('/aboutus');
      },
      //点击帐户管理
      goAccount() {
        this.$router.push('/account/manager');
      },
      //点击积分记录
      goPoints() {
        this.$router.push('/record/points');
      },
      //点击兑换记录
      goExchange() {
        this.$router.push('/record/exchange');
      },
      //点击退出
      logout() {
        this.$messagebox({
          confirmButtonText: 'Comfirm',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          title: 'Tips',
          message: 'Are you sure you want to quit?'
        }).then((action) => {
          if (action == 'confirm') {
            this.api.request({
              url: this.api.logout,
              method: 'post',
            }).then((res) => {
              this.$toast({
                message: 'Logout success！',
                iconClass: 'm-icon mintui-field-success'
              });
              this.$router.push('/login');
            });
          }

        });
      },
      //修改全名
      modifyName(){
        this.alertVisible=true;
      },
      //关闭弹框
      closeAlert() {
        this.alertVisible = false;
      },
      //提交弹框表单
      comfirmAlert(){
        if(this.form.fullname==''){
          this.$toast({
            message: 'Please fill in your full name！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }else{
          var smData=JSON.parse(JSON.stringify(this.form));
          this.api.request({
            url:this.api.edit_user,
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            data: this.qs.stringify(smData)
          }).then(res=>{
            this.$toast({
              message: 'Save successfully！',
              timeout: 1500,
              iconClass: 'success'
            });
            this.api.getUserInfo().then((res) => {
              this.userInfo = res;
              this.form.fullname=res.fullname;
            });
            this.alertVisible = false;
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #account {
    padding-bottom: 1.5rem;
    padding-top:1.06rem;
    .info-box{
      padding-top:0.8rem;
      p.phone{
        font-size:0.36rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(242,242,242,1);
        margin-bottom: 0.4rem;
      }
      p.points{
        font-size:0.4rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(232,221,148,1);
      }
    }
    .nav-box{
      padding:0.6rem 0.3rem 0.3rem;
      .item-box{
        border-radius:0.08rem;
        border:1px solid #999;
        margin-bottom:0.3rem;
        font-size:0.3rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(242,242,242,1);
        .item{
          height:0.85rem;
          line-height:0.85rem;
          padding:0px 0.3rem;
          text-align: left;
          position:relative;
          font-size:0.3rem;
          &:after{
            width: 0.15rem;
            height: 0.15rem;
            border:#999 solid;
            border-width: 1px 1px 0 0;
            transform: rotate(45deg);
            content: '';
            display: inline-block;
            position:absolute;
            right:0.3rem;
            margin-top:0.35rem;
            top:0px;
          }
          .fullname{
            float:right;
            padding-right:0.2rem;
            color:#999;
          }
        }
        .item-fege{
          width:100%;
          height:1px;
          background:#999;
        }
      }
    }
    .accout-box {
      margin: 0.4rem auto;
      width: 4.36rem;
      height: 1.04rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      border: 2px solid rgba(80, 185, 148, 0.5);
      padding-left: 1.4rem;
      position: relative;
      font-size: 0.3rem;
      color: #fff;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      display: flex;
      .accout-img {
        width: 1.34rem;
        height: 1.34rem;
        position: absolute;
        top: -0.12rem;
        left: -0.3rem;
      }
    }
    .logo-box {
      justify-content: center;
      flex-direction: column;
      padding: 0.78rem 0.2rem 0rem;
      .logo-img {
        width: 2.18rem;
        height: 2.18rem;
        margin-bottom: 0.2rem;
      }
      .logo-text {
        color: #E99915;
        font-size: 0.4rem;
        line-height: 0.48rem;
        &:nth-child(2) {
          margin-bottom: 0.2rem;
          color: #fff;
        }
      }
      .box-points {
        text-align: center;
        line-height: 0.36rem;
        display: flex;
        justify-content: center;
        span {
          font-weight: 500;
          color: rgba(233, 153, 21, 1);
          font-size: 0.28rem;
          height: 0.36rem;
          vertical-align: middle;
        }
        img {
          width: 0.36rem;
          height: 0.36rem;
          margin-right: 0.16rem;
          vertical-align: middle;
        }
      }

    }
    .game-bg {
      background: rgba(0, 0, 0, 1);
      opacity: 0.5;
      position: fixed;
      z-index: 999;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
    .game-alert {
      width: 6.3rem;
      height: 7.92rem;
      background: url("../../img/payment-bg.png") no-repeat;
      background-size: cover;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -3.1rem;
      margin-top: -4rem;
      z-index: 1000;
      .title {
        font-size: 0.36rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        padding-top: 3.55rem;
      }
      .text {
        font-size: 0.36rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding-top: 1.12rem;
        margin-bottom: 0.3rem;
        input{
          width: 5rem;
          height: 0.8rem;
          border-bottom:1px solid #999;
          line-height:0.8rem;
          font-size:0.36rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          border-radius:0px;
        }
      }
      .desc {
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 0.6rem;
      }
      .btn {
        text-align: center;
        padding: 0rem 0.15rem 0.15rem;
        display: flex;
        justify-content: center;
        button {
          width: 5rem;
          height: 0.8rem;
          background:linear-gradient(180deg,rgba(232,221,148,1) 0%,rgba(233,153,21,1) 100%);
          border-radius:0.08rem;
          font-size:0.32rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(70,0,0,1);

        }
      }
    }
    .login-button {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
      border-radius: 0.1rem;
      box-shadow:none;
      color: #fff;
      font-size: 0.3rem;
      height: 0.88rem;
      line-height: 0.88rem;
      width: 6.9rem;
      margin-top: 0.84rem;
    }
    .quick-navigation {
      .h-line {
        width: 100%;
        height: 2px;
        background: rgba(80, 185, 148, 0.5);
      }
      .v-line {
        width: 2px;
        height: 1.52rem;
        background: rgba(80, 185, 148, 0.5);
      }
      .navigations {
        justify-content: space-between;
        flex-direction: row;
        display: flex;
        align-items: center;
        .navigation {
          padding-left: 0.6rem;
          color: #fff;
          font-size: 0.3rem;
          text-align: left;
          align-self: center;
          flex: 1;
        }
      }

    }
  }

</style>
