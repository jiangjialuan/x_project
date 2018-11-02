<template>
  <div id="exchangeComfirm" :style="focusing?'padding-bottom:'+winH+'px;min-hegiht:'+winH+'px':'min-height:'+winH+'px'">
    <top></top>
    <div class="contoption">
      <div class="top">
        <div class="top-img"><img :src="detail.goods_img"/></div>
        <div class="top-cont">
          <p>{{detail.goods_name}}</p>
          <p>Quantity：{{detail.num}}</p>
          <p>{{detail.order_points}} Credit</p>
        </div>
      </div>

      <div class="h-line"></div>

      <div class="cont">
        <div class="title">
          <div class="icon"></div>
          <div><span>Receiving information</span><span>（Please fill in exactly）</span></div>
        </div>
        <div class="main">
          <div class="item">
            <div class="input-label">NAME</div>
            <input class="input-style" v-model="form.consignee" placeholder="please enter your name" @focus="comfocus"
                   @blur="comblur"></input>
          </div>
          <div class="item">
            <div class="input-label">PHONE</div>
            <input v-model="form.mobile_phone" type="tel" class="input-style" placeholder="please enter your phone number"
                   @focus="comfocus" @blur="comblur"></input>
          </div>
          <div class="item">
            <div class="input-label">ADDRESS</div>
            <input class="input-style" v-model="form.address"  placeholder="please enter your address"
                      @focus="comfocus" @blur="comblur"></input>
          </div>
        </div>
      </div>

      <div class="comfirmBtn">
        <mt-button @click="comfirmForm">CONFIRM</mt-button>
      </div>
      <!--<div class="game-bg" v-show="alertVisible" @click="alertVisible=false;code='';"></div>
      <div v-show="alertVisible" class="game-alert">

        <div class="title">身份验证</div>
        <div class="desc">为确保账户安全，请输入验证码</div>
        <div class="password">
          <input type="password" :value="code.length>=1?1:''" readonly/>
          <input type="password" :value="code.length>=2?2:''"  readonly/>
          <input type="password" :value="code.length>=3?3:''"  readonly/>
          <input type="password" :value="code.length>=4?4:''"  readonly/>
          <input type="password" :value="code.length>=5?5:''"  readonly/>
          <input type="password" :value="code.length>=6?6:''"  readonly/>
          <div class="cheng"></div>
        </div>
        &lt;!&ndash;userInfo.mobile_phone.substring(0,3)&ndash;&gt;
        <div class="text">验证码已发送至{{userInfo.mobile_phone}}</div>
        <div class="btn">
          <mt-button @click.native="comfirm">确定</mt-button>
        </div>
      </div>
      <input ref="content"  v-model="code"  type="tel" pattern="\d*" maxlength="6"  style="wdith:0px;height:0px; margin-left:-1000px;"/>-->
    </div>
    <!--<div class="bgoption" :style="'height:'+winH+'px'"></div>-->
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "comfirm",
    data() {
      return {
        detail: {},
        form: {},
        userInfo: {},
        focusing: false,
        winH: document.documentElement.clientHeight,
      }
    },
    components:{top},
    created() {
      this.api.getUserInfo().then((res) => {
        this.userInfo = res;
        this.getDetail();
      });
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
      //获取兑换信息
      getDetail() {
        var smData = {
          goods_id: this.$route.params.id
        }
        this.api.request({
          url: this.api.verify_order,
          method: 'post',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          data: this.qs.stringify(smData)
        }).then((res) => {
          this.detail = res;
        });
      },
      //提交兑换信息
      comfirmForm() {
        if (!this.form.consignee) {
          this.$toast({
            message: 'Please fill in your name！',
            iconClass: 'm-icon mintui-field-error',
          });
        } else if (!this.form.mobile_phone) {
          this.$toast({
            message: 'Please fill in your phone number！',
            iconClass: 'm-icon mintui-field-error',
          });
        } else if (!this.form.address) {
          this.$toast({
            message: 'Please fill in your address！',
            iconClass: 'm-icon mintui-field-error',
          });
        } else {
          this.comfirm();
        }
      },
      //发送验证码
      sendCode() {
        return new Promise((resolve, reject) => {
          this.api.request({
            url: this.api.get_order_code,
          }).then((res) => {
            this.$toast({
              message: 'Sent successfully！',
              iconClass: 'm-icon mintui-field-success',
            });
            resolve();
          }).catch(() => {
            reject();
          });
        });
      },

      //确认订单
      comfirm() {
        var smData = JSON.parse(JSON.stringify(this.form));
        this.api.request({
          url: this.api.submit_order,
          method: 'post',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          data: this.qs.stringify(smData)
        }).then((res) => {
          this.$toast({
            message: 'Exchange successfully！',
            iconClass: 'm-icon mintui-field-success',
          });
          this.$router.push('/exchange/success/' + res.id);
        }).catch((res) => {
        });
      }


    }
  }
</script>

<style lang="less" scoped>
  #exchangeComfirm {
    padding-top:1.06rem;
    background:rgba(41,42,42,1);
    .contoption {
      z-index: 4;
      position: relative;
    }
    .bgoption {
      background: #fff;
      background-size: cover;
      position: fixed;
      top: 0px;
      right: 0px;
      left: 0px;
      z-index: 0;
      height: 100%;
      -webkit-overflow-scrolling: touch;
    }
    .top {
      padding: 0.3rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .top-img {
        width: 1.68rem;
        height: 1.68rem;
        background: rgba(28, 123, 92, 0.2);
        border-radius: 0.08rem;
        margin-right: 0.3rem;
        img {
          max-width: 1.68rem;
          max-height: 1.68rem;
          border-radius: 0.08rem;
        }
      }
      .top-cont {
        font-size: 0.3rem;
        text-align: left;
        p {
          width: 4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:first-child {
          margin-bottom: 0.2rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(242,242,242,1);
        }
        p:nth-child(2) {
          font-size: 0.28rem;
          margin-bottom: 0.2rem;
          color:rgba(153,153,153,1);
        }
        p:last-child {
          color:rgba(153,153,153,1);
        }
      }
    }
    .h-line {
      width: 100%;
      height: 0.2rem;
      background:rgba(34,34,34,1);
    }

    .cont {
      .title {
        padding: 0.3rem 0rem 0.6rem 0rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        div {
          display: flex;
        }
        .icon {
          width: 0.06rem;
          height: 0.32rem;
          background: #E8DD94;
          border-radius: 0px 0.06rem 0.06rem 0px;
          margin-right: 0.34rem;
        }
        color: #E8DD94;
        span:first-child {
          font-size: 0.3rem
        }
        span:last-child {
          font-size: 0.28rem;
        }
      }
      .main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .item {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 0.3rem;
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
      }

    }

    .comfirmBtn {
      text-align: center;
      margin-bottom: 0.3rem;
      button {
        width: 6.9rem;
        height: 0.8rem;
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius:0.08rem;
        /*margin-top: 0.88rem;*/
        font-size: 0.3rem;
        font-weight: 400;
        color:rgba(255,255,255,1);
        border:none;
        box-shadow: none;
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
        color: #fff;
        padding-top: 3.15rem;
        margin-bottom: 0.3rem;
      }

      .desc {
        font-size: 0.28rem;
        font-weight: 500;
        color: #fff;
        margin-bottom: 0.6rem;
      }

      .password {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.3rem;
        margin-bottom: 0.3rem;
        position: relative;
        .cheng {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
        }

        input {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 0.08rem;
          border: 1px solid rgba(102, 102, 102, 1);
          margin-right: 0.18rem;
          text-align: center;
        }
      }

      .text {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.3rem;
      }
      .btn {
        text-align: center;
        padding: 0rem 0.15rem 0.15rem;
        display: flex;
        justify-content: center;
        button {
          width: 5rem;
          height: 0.8rem;
          background: rgba(233, 153, 21, 1);
          border-radius: 0.44rem;
          font-size: 0.32rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);

        }
      }
    }
  }

</style>
