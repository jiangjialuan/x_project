<template>
  <div id="exchangeSuccess">
    <top></top>
    <div class="cont">
      <img class="top-img" src="../../img/exchange-bg.png"/>
      <div class="cont-box">
        <div class="cont-img">
          <img src="../../img/success.png"/>
        </div>
        <p class="success-status">SUCCEEDED</p>
        <p class="success-desc">We will finish the delivery within 48 hours</p>
        <button class="detail-btn" @click="goDetail">DETAILS</button>
        <button class="success-btn" @click="goHome">HOME PAGE</button>
      </div>

    </div>
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "success",
    data() {
      return {}
    },
    components:{top},
    created() {
    },
    methods: {
      //goDetail
      goDetail() {
        if (this.$route.query.form) {
          this.$router.push('/lottery/detail/' + this.$route.params.id)
        } else
          this.$router.push('/exchange/detail/' + this.$route.params.id)
      },
      //去首页
      goHome() {
        this.$router.push('/goods')
      }
    }
  }
</script>

<style lang="less" scoped>
  #exchangeSuccess {
    padding: 1.66rem 0.4rem;
    .cont {
      width: 100%;
      height: 9.48rem;
      .top-img{
        width:6.7rem;
        height:1rem;
        margin:0px auto;
        display:block;
      }
      .cont-box{
        background:#fff;
        height:8.48rem;
        width:6.3rem;
        margin:-1px auto;
      }
      .cont-img {
        padding-top: 0.76rem;
        img {
          width: 2rem;
          height: 2rem;
        }
        margin-bottom: 0.36rem;
      }
      .success-status {
        color: #333333;
        font-size: 0.48rem;
        font-weight: 500;
        margin-bottom: 0.3rem;
      }
      .success-desc {
        color: #999999;
        font-size: 0.28rem;
        margin-bottom: 1rem;
      }
      .detail-btn{
        height:0.88rem;
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius:0.08rem;
        border:none;
        width: 5.7rem;
        color:rgba(255,255,255,1);
        font-size:0.36rem;
        margin-bottom:0.6rem;
      }
      .success-btn {
        width: 5.7rem;
        height: 0.88rem;
        font-size: 0.36rem;
        color:rgba(70,0,0,1);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        border: none;
        background:linear-gradient(180deg,rgba(232,221,148,1) 0%,rgba(233,153,21,1) 100%);
        border-radius:0.08rem;
      }
    }

  }

</style>
