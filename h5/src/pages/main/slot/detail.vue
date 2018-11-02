<template>
    <div class="slotDetail">
      <top></top>
      <div class="title">{{detail.title}}</div>
      <div class="img-banner flex-col">
        <img :src="detail.cover" />
      </div>
      <div class="desc vhtml" v-html="detail.desc"></div>
      <div class="download" v-if="detail.type==0"><a :href="isAndroid?detail.android_url:detail.ios_url" >DOWLOAD</a></div>
      <div class="download" v-else><a :href="detail.website_url" >PLAY</a></div>
    </div>
</template>

<script>
  import top from '../../../components/top-menue';
    export default {
        name: "detail",
      data(){
        return{
          detail: {},
          isAndroid:''
        }
      },
      created() {
        this.getDetail();
        this.api.isAndroid().then((isAndroid) => {
          if (isAndroid) {
            this.isAndroid=true;
          }else{
            this.isAndroid=false;
          }
        });
      },
      components: {
        top
      },
      methods:{
        //获取详情
        getDetail() {
          this.api.request({
            url: this.api.app_market_detail,
            params: {
              id: this.$route.params.id
            }
          }).then((res) => {
            this.detail = res;
            console.log(res);
          });
        },
      }
    }
</script>

<style lang="less">
  .slotDetail{
    padding:1.06rem 0.3rem 1.6rem;
    .title{
      max-height:1.12rem;
      font-size:0.4rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:0.56rem;
      margin-top:0.6rem;
      margin-bottom:0.4rem;
      overflow: 100%;
    }
    .img-banner{
      margin-bottom:0.3rem;
      text-align: center;
      img{
        max-width:100%;
      }
    }
    .vhtml {
      color: #F2F2F2 !important;
      font-size:0.3rem;
      text-align: left;
      margin-bottom:0.2rem;
      p, pre {
        width: 100%;
        overflow: auto;
        color: #F2F2F2 !important;

      }
      p{
        margin-bottom:0.3rem  !important;
      }
      span,table,td,th,tr,h1,h2,h3,h4,h5,h6,ul,li,ol,div,b,strong,i{
        color: #F2F2F2 !important;
        font-size:0.3rem !important;
      }
      img {
        max-width: 100%;
      }
    }
    .download {
      text-align: center;
      padding: 15px;
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: 0rem;
      background:rgba(0,0,0,0.65);
      box-shadow:0px -2px 10px 0px rgba(0,0,0,0.09);
      z-index: 99999;
      -webkit-overflow-scrolling: touch;
      a,a:visited,a:active,a:hover,a:link{
        width: 6.9rem;
        height: 0.8rem;
        background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
        border-radius: 0.08rem;
        font-size: 0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        box-shadow: none;
        display: block;
        line-height:0.8rem;
        text-decoration: none;
        margin: 0px auto;
      }
    }
  }

</style>
