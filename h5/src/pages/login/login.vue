<template>
  <div id="login" :style="focusing?'padding-bottom:'+winH+'px;':''">
    <top></top>
    <!--<div class="logo-box">
      <img class="logo-img" src="../../img/logo.png"/>
      <p class="logo-text">Please Login</p>
    </div>-->
    <div class="form" direction="vertical">
      <div class="yd-input">
        <div class="input-label">USER NAME</div>
        <input type="number" class="input-style" maxlength="7" placeholder="The phone number you use when you register" pattern="\d*"
               v-model="form.mobile_phone" @focus="comfocus" @blur="comblur"/>
      </div>
      <!--<div class="flexBox">
        <p class="form-label">User name is the phone number you use when you register.</p>
      </div>-->
      <div class="yd-input">
        <div class="input-label">PASSWORD</div>
        <input type="password" placeholder="please enter your password" pattern="\d*"  class="input-style" v-model="form.password"
               @focus="comfocus" @blur="comblur"/>
      </div>
      <div class="flexBox">
        <p class="forgotpassword"><span @click="forgetPassword">Forgot password ?</span></p>
      </div>
      <div class="flexBox">
        <mt-button class="login-button" @click.native="submit">LOGIN</mt-button>
      </div>
      <div style="text-align: center;width:100%; margin-bottom:0.2rem;">
        <mt-button @click="goRegister" class="register">Register a new account</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import top from '../../components/top-menue';
  export default {
    name: "login",
    data() {
      return {
        form: {
          mobile_phone: '',
          password: ''
        },
        start: false,
        focusing: false,
        winH: document.body.scrollHeight,
      }
    },
    components: {
      top
    },
    created() {
    },
    methods: {
      //input聚焦
      comfocus(e) {
        this.api.isAndroid().then((isAndroid) => {
          if (isAndroid) {
            this.focusing = true;
            document.getElementById('body-box').style.height = document.body.scrollHeight;
            setTimeout(() => {
              window.scrollTo({
                top: e.target.offsetTop - e.target.offsetHeight,
                behavior: "smooth"
              });
            }, 0)
          }
        })

      },
      comblur() {
        this.api.isAndroid().then((isAndroid) => {
          if (isAndroid) {
            this.focusing = true;
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            this.focusing = false;
            document.getElementById('body-box').style.height = 'auto';
          }
        });
      },
//发送验证码
      sendCode() {
        if (this.form.mobile_phone) {
          var smData = {
            mobile_phone: this.form.mobile_phone,
          };
          this.api.request({
            url: this.api.send_verification,
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            data: this.qs.stringify(smData)
          }).then((res) => {
            this.$toast({
              message: 'Sent successfully！',
              timeout: 1500,
              iconClass: 'success'
            });
          })
          this.start = true;
        } else {
          this.$toast({
            message: 'Please fill in your phone number！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }
      },

      //登录
      submit() {
        if (this.form.mobile_phone == '') {
          this.$toast({
            message: 'Please fill in your phone number！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        } else if (this.form.password == '') {
          this.$toast({
            message: 'Please fill in the password！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        } else {
          var smData = JSON.parse(JSON.stringify(this.form));
          smData.password = md5(smData.password)
          this.api.request({
            url: this.api.login,
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            data: this.qs.stringify(smData)
          }).then((res) => {
            this.$toast({
              message: 'Successful login!',
              iconClass: 'm-icon mintui-field-success'
            });
            setTimeout(() => {
              this.$router.push('/main/index');
            }, 500);
          });
        }
      },
      //去注册
      goRegister() {
        this.$router.push('/register');
      },
      //忘记forgetPassword
      forgetPassword() {
        this.$router.push('/change_password');
      }
    },
  }
</script>

<style lang="less">
  #login {
    padding: 1.87rem 0.3rem 0rem;
    .vertical {
      flex-direction: column;
    }
    .forgotpassword {
      font-size: 0.28rem;
      margin-bottom: 0.6rem;
      text-align: right;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      padding-top: 0.4rem;
    }
    .logo-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
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
        }
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .yd-input {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.6rem;
        .input-label {
          font-size:0.3rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(242,242,242,1);
          width:100%;
          height:0.3rem;
          line-height:0.3rem;
          text-align:left;
          margin-bottom: 0.1rem;
        }
        .input-style {
          height: 0.8rem;
          width: 6.9rem;
          padding: 5px;
          background:transparent;
          font-size: 0.28rem;
          border-bottom:1px solid #999999;
          color:#999;
          border-radius:0px;
        }
      }
      .flexBox {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .form-label {
        color: rgba(216, 216, 216, 1);
        font-size: 0.24rem;
        text-align: left;
        margin-bottom: 0.4rem;
      }
      .form-cell {
        height: 0.88rem;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(80, 185, 148, 0.5);
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .login-button {
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.3rem;
        height: 0.88rem;
        line-height: 0.88rem;
        margin-top: 0rem;
        width: 6.9rem;
        box-shadow:none;
      }
      .register {
        background:linear-gradient(180deg,rgba(232,221,148,1) 0%,rgba(233,153,21,1) 100%);
        border-radius: 0.1rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(70,0,0,1);
        font-size: 0.3rem;
        height: 0.72rem;
        line-height: 0.72rem;
        margin-top: 0.6rem;
        width: 3.6rem;
      }
      .sendbtn {
        background: none;
        height: 0.4rem;
        padding: 0rem 0.3rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    /*.line {
      width: 0.02rem;
      height: 0.4rem;
      background: rgba(80, 185, 148, 0.5);
      border-radius: 0.02rem;
    }*/

  }
</style>
