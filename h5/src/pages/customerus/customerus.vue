<template>
  <div id="customerus">
    <top></top>
    <img class="clock" src="../../img/img_about/clock.png"/>
    <p class="clock-text">24/7 SERVICE</p>
    <img class="del" src="../../img/img_about/del.png"/>
    <p class="del-t">Customer Service WhatsApp</p>
    <p class="del-p" @click="del">+6019-423 6828</p>
    <p class="del-dec">Long press copy the number</p>
    <!--<input type="text" value="+6014 - 921 7267" id="input1"/>-->
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "customerus",
    data() {
      return {}
    },
    components:{top},
    methods: {
      del() {
        /*var Url2=document.getElementById('input1');
        Url2.select(); // 选择对象

        document.execCommand("Copy"); // 执行浏览器复制命令
        alert('复制成功');*/
      }
    }
  }
</script>

<style lang="less">
  #customerus {
    color: #fff;
    font-size: 0.3rem;
    padding: 0.3rem;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    p {
      padding-top: 0.3rem;
      width: 100%;
      text-align: left;
      line-height: 0.6rem;
    }
    .clock {
      width: 1.28rem;
      margin: 1.78rem auto 0.46rem;
    }
    .clock-text {
      font-size: 0.48rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(242, 242, 242, 1);
      line-height: 0.48rem;
      margin-bottom: 1rem;
      width: 100%;
      text-align: center;
    }
    .del {
      width: 1.28rem;
      margin: 0px auto 0.4rem;
    }
    .del-t {
      font-size: 0.3rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(58, 195, 76, 1);
      line-height: 0.3rem;
      width: 100%;
      text-align: center;
    }
    .del-p {
      font-size: 0.48rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(58, 195, 76, 1);
      line-height: 0.48rem;
      width: 100%;
      text-align: center;
      text-decoration: underline;
    }
    .del-dec {
      font-size: 0.3rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #999;
      line-height: 0.3rem;
      width: 100%;
      text-align: center;
    }
  }
</style>
