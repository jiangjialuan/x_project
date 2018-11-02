<template>
  <div id="goodDetail">
    <top></top>
    <div class="contoption">
      <div class="swipe">
        <mt-swipe autoplay="3000">
          <mt-swipe-item v-for="(item,index) in good_detail.image" :key="index">
            <img :src="item">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="cont">
        <p class="title">{{good_detail.name}}</p>
        <p class="points">
          <span>{{good_detail.need_points}} Credit</span>
          <span>RM {{good_detail.original_points}}</span>
        </p>
      </div>
      <div class="h-line"></div>
      <div class="body">
        <div class="title">Prize details</div>
        <div class="detail vhtml" v-html="good_detail.desc"></div>
        <!--<div class="title">Cash flow</div>
        <div class="detail">
          <p>1、用户点击【马上兑换】，即可兑换成功 </p>
          <p>2、填写地址以便顺利收到商品 </p>
          <p>3、包邮 </p>
        </div>
        <div class="title">注意事项</div>
        <div class="detail">
          <p>1、全国发货（港澳台除外）</p>
          <p>2、客服电话：13000000000；QQ：1479244994</p>
          <p>3、客服服务时间：周一至周六9:00-21:00</p>
          <p>4、在兑换过程中有任何问题，请及时咨询客服。</p>
        </div>-->
      </div>
      <div class="comfirmBtn">
        <mt-button @click="comfirm(good_detail.id)">IMMEDIATELY CHANGE</mt-button>
      </div>

    </div>
    <div class="game-bg" v-if="alertVisible"></div>
    <div class="game-alert" v-if="alertVisible">
      <div class="title">REMINDER</div>
      <!--<div class="text" v-if="parseInt(this.good_detail.stock)<=0"></div>-->
      <div class="text">You don't have enough credits!</div>
      <div class="desc">Please contact customer service for credits</div>
      <div class="btn">
        <mt-button @click="know">GOT IT</mt-button>
      </div>
    </div>
    <!--<div class="bgoption" :style="'height:'+clientH+'px'"></div>-->
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "detail",
    data() {
      return {
        good_detail: {},
        alertVisible: false,
        userInfo: {},
        clientH: document.documentElement.clientHeight,
      }
    },
    components:{top},
    created() {
      this.getDetail(this.$route.params.id);
    },
    methods: {
      //获取商品详情
      getDetail(id) {
        this.api.request({
          url: this.api.goods_detail,
          params: {
            id: id
          }
        }).then((res) => {
          this.good_detail = res;
        });
      },
      //确认兑换
      comfirm(id) {
        //||parseInt(this.good_detail.stock)<=0
        this.api.getUserInfo().then((res) => {
          this.userInfo = res;
          if (parseInt(this.userInfo.points) < parseInt(this.good_detail.need_points)) {
            this.alertVisible = true;
          } else {
            this.$router.push('/exchange/comfirm/' + id);
          }
        });

      },
      //点击知道了
      know() {
        this.alertVisible = false;
      }
    }
  }
</script>

<style lang="less">
  #goodDetail {
    padding-bottom: 1rem;
    padding-top:1.06rem;
    -webkit-overflow-scrolling: touch;
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
    .swipe {
      background: #292A2A;
      height: 7.5rem;
      width: 100%;
      .mint-swipe-indicator.is-active {
        background: #fff !important;
        border: 1px solid #fff;
        opacity: 1;

      }
      .mint-swipe-indicator {
        background: none;
        border: 1px solid #fff;
        opacity: 1;
      }
      img {
        max-height: 7.5rem;
        max-width: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      .mint-swipe-items-wrap, .mint-swipe {
        height: 7.5rem;
        width: 100%;
      }
      .mint-swipe-item, .mint-swipe-item.is-active {
        line-height: 7.5rem;
      }
    }

    .body {
      padding-bottom: 0.9rem;
      .title {
        padding: 0.3rem;
        font-weight: bold;
        color: #F2F2F2;
        font-size: 0.3rem;
        text-align: left;

      }
      .detail {
        padding: 0rem 0.3rem 0.3rem;
        text-align: left;
        line-height: 0.4rem;
        font-size: 0.28rem;
        color: #F2F2F2 !important;
        font-size:0.3rem !important;
      }
      .vhtml {
        p, pre {
          width: 100%;
          overflow: auto;
          color: #F2F2F2 !important;

        }
        p{
          margin-bottom:0.2rem  !important;
        }
        span,table,td,th,tr,h1,h2,h3,h4,h5,h6,ul,li,ol,div,b,strong,i{
          color: #F2F2F2 !important;
          font-size:0.3rem !important;
        }
        img {
          max-width: 100%;
        }
      }
    }
    .cont {
      padding: 0.3rem;
      .title {
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(242,242,242,1);
        font-size: 0.36rem;
        text-align: left;
        margin-bottom: 0.3rem;
        word-break:break-all;
      }
      .points {
        text-align: left;
        span:first-child {
          font-weight: 500;
          color: #E8DD94;
          font-size: 0.32rem;
          margin-right: 0.3rem;
        }
        span:last-child {
          font-weight: 400;
          color: #999;
          font-size: 0.24rem;
          text-decoration: line-through;
        }
      }

    }
    .h-line {
      width: 100%;
      height: 0.2rem;
      background: #222222;
    }
    .comfirmBtn {
      text-align: center;
      padding: 15px;
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: 0rem;
      background:rgba(0,0,0,0.65);
      box-shadow:0px -2px 10px 0px rgba(0,0,0,0.09);
      z-index: 999;
      -webkit-overflow-scrolling: touch;
      button {
        width: 6.9rem;
        height: 0.8rem;
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius: 0.08rem;
        font-size: 0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        box-shadow: none;
      }
    }
    .game-bg {
      background: rgba(0, 0, 0, 1);
      opacity: 0.5;
      position: fixed;
      z-index: 9999;
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
      z-index: 10000;
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
  }

</style>
