<template>
    <div class="promoDetail">
      <top></top>
      <div class="title">{{detail.title}}</div>
      <div class="img-banner">
        <img :src="detail.cover" />
      </div>
      <div class="desc vhtml" v-html="detail.desc"></div>
    </div>
</template>

<script>
  import top from '../../../components/top-menue';
    export default {
        name: "detail",
      data(){
          return{
            detail: {}
          }
      },
      created() {
        this.getDetail();
      },
      components: {
        top
      },
      methods:{
        //获取详情
        getDetail() {
          this.api.request({
            url: this.api.promo_detail,
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
 .promoDetail{
    padding:1.06rem 0.3rem 0.3rem;
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
      p, pre {
        width: 100%;
        overflow: auto;
        color: #F2F2F2 !important;

      }
      p{
        text-indent:2em;
      }
      span,table,td,th,tr,h1,h2,h3,h4,h5,h6,ul,li,ol,div,b,strong,i{
        color: #F2F2F2 !important;
      }
      img {
        max-width: 100%;
      }
    }
  }

</style>
