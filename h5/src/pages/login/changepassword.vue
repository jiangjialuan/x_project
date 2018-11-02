<template>
  <div id="changepassword" :style="focusing?'padding-bottom:'+winH+'px;':''">
    <top></top>
    <!--<div class="logo-box" >
      <img class="logo-img" src="../../img/logo.png"/>
      <p class="logo-text">Change password</p>
    </div>-->
    <div class="form" direction="vertical">
      <div class="yd-input">
        <div class="input-label">MOBILE PHONE NUMBER</div>
        <input type="number"  placeholder="please enter your mobile phone number" pattern="\d*"  class="input-style" v-model="form.mobile_phone" @focus="comfocus"  @blur="comblur"/>
      </div>
      <!--<div class="flexBox">
        <p class="form-label">The phone number will be used as the user name.</p>
      </div>-->
      <div class="yd-input">
        <div class="input-label">VERIFICATION CODE</div>
        <div class="input-style flex-row" style="justify-content: space-between;" >
          <input  type="tel" placeholder="please enter the code" pattern="\d*"    v-model="form.code"  @focus="comfocus"  @blur="comblur"/>
          <div class="v-line"></div>
          <span class="sendbtn" @click="sendCode" >Get code</span>
        </div>
      </div>
      <div class="yd-input">
        <div class="input-label">SET NEW PASSWORD</div>
        <input type="password" placeholder="Password length is 6 to 12" pattern="\d*"   class="input-style" v-model="form.new_password" @focus="comfocus"  @blur="comblur"/>
      </div>
      <div class="flexBox"><mt-button  class="login-button" @click.native="submit">SUBMIT</mt-button></div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import top from '../../components/top-menue';
  export default {
    name: "login",
    data(){
      return {
        form:{
          code:'',
          mobile_phone:'',
          new_password:'',
        },
        start:false,
        focusing:false,
        winH:document.body.scrollHeight,
      }
    },
    components: {
      top
    },
    created(){
    },
    methods:{
      //input聚焦
      comfocus(e){
        this.api.isAndroid().then((isAndroid)=>{
          if(isAndroid){
            this.focusing=true;
            document.getElementById('body-box').style.height=document.body.scrollHeight;
            setTimeout(()=>{
              window.scrollTo({
                top: e.target.offsetTop-e.target.offsetHeight,
                behavior: "smooth"
              });
            },0)
          }
        })

      },
      comblur(){
        this.api.isAndroid().then((isAndroid)=> {
          if (isAndroid) {
            this.focusing = true;
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            this.focusing=false;
            document.getElementById('body-box').style.height='auto';
          }
        });
      },
//发送验证码
      sendCode(){
        if(this.form.mobile_phone){
          var smData={
            mobile_phone:this.form.mobile_phone,
            type:2
          };
          this.api.request({
            url:this.api.send_verification,
            method:'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            data:this.qs.stringify(smData)
          }).then((res)=>{
            this.$toast({
              message: 'Sent successfully！',
              timeout: 1500,
              iconClass: 'success'
            });
          })
          this.start=true;
        }else{
          this.$toast({
            message: 'Please fill in your phone number！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }
      },

      //登录
      submit(){
        if(this.form.mobile_phone==''){
          this.$toast({
            message: 'Please fill in your phone number！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }else if(this.form.code==''){
          this.$toast({
            message: 'Please fill in the verification code！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }else if(this.form.new_password=='') {
          this.$toast({
            message: 'Please fill in the password！',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }else if(this.form.new_password.length<6||this.form.new_password.length>12) {
          this.$toast({
            message: 'The password length is 6 to 12',
            timeout: 1500,
            iconClass: 'm-icon mintui-field-error'
          });
        }else{
            var smData=JSON.parse(JSON.stringify(this.form));
          smData.new_password = md5(smData.new_password);

            this.api.request({
              url:this.api.reset_password,
              method:'post',
              headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
              data:this.qs.stringify(smData)
            }).then((res)=>{
              this.$toast({
                message:'Reset password successful！',
                iconClass:'m-icon mintui-field-success'
              });
              setTimeout(()=>{
                this.$router.push('/login');
              },500);
            })
        }
      }
    },
  }
</script>

<style lang="less">
  #changepassword{
    padding:1.84rem 0.3rem 0rem;
    .vertical{
      flex-direction: column;
    }
    .logo-box{
      display: flex;
      justify-content:center;
      flex-direction:column;
      align-items: center;
      .logo-img{
        width:2.18rem;
        height:2.18rem;
        margin-bottom: 0.2rem;
      }
      .logo-text{
        color:#E99915;
        font-size:0.4rem;
        line-height: 0.48rem;
        &:nth-child(2){
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
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.6rem;
        .input-label {
          font-size: 0.3rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(242, 242, 242, 1);
          width: 100%;
          height: 0.3rem;
          line-height: 0.3rem;
          text-align: left;
          margin-bottom: 0.1rem;
        }
        .input-style {
          height: 0.8rem;
          width: 6.9rem;
          padding: 5px;
          background: transparent;
          font-size: 0.28rem;
          border-bottom: 1px solid #999999;
          color: #999;
          border-radius: 0px;
          input{
            height: 0.8rem;
            width: 4.5rem;
            background: transparent;
            font-size: 0.28rem;
            color: #999;
          }
        }
      }
      .login-button{
        height:0.88rem;
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius:0.1rem;
        line-height:0.88rem;
        font-size:0.3rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        box-shadow:none;
        width:6.9rem;
        margin:0.68rem auto 0.2rem;

      }
    }
    .v-line{
      width:0.02rem;
      height:0.4rem;
      background:#999;
      border-radius:0.02rem;
    }

  }
</style>

