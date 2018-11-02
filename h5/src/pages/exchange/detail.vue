<template>
  <div id="exchangeDetail">
    <top></top>
    <div class="address">
      <div class="icon">
        <img src="../../img/address-icon.png"/>
      </div>
      <div class="add-detail">
        <p><span>{{detail.consignee}}</span><span>{{detail.mobile_phone}}</span></p>
        <p>{{detail.address}}</p>
      </div>
    </div>
    <div class="cont">
      <div class="top" v-for="(child,index) in detail.goods" :key="index">
        <div class="top-img"><img :src="child.image"/></div>
        <div class="top-cont">
          <p>{{child.goods_name}}</p>
          <p>Quantity: {{child.num}}</p>
          <p>{{child.goods_points}} Credit</p>
        </div>
      </div>
      <div class="h-line"></div>
      <div class="bottom">
        <span>{{detail.create_time}}</span>
        <span v-if="detail.shipping_status=='no'" class="yellow">Wait for the mail</span>
        <span v-else class="green">Have been mailed</span>
      </div>
    </div>
    <div class="sn">
      <span>Serial number</span>
      <span>{{detail.sn}}</span>
    </div>
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "detail",
    data() {
      return {
        detail: {}
      }
    },
    components:{top},
    created() {
      this.getDetail();
    },
    methods: {
      //获取详情
      getDetail() {
        this.api.request({
          url: this.api.exchange_detail,
          params: {
            id: this.$route.params.id
          }
        }).then((res) => {
          this.detail = res;
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  #exchangeDetail {
    padding: 1.36rem 0.3rem 0.3rem;
    color:rgba(255,255,255,1);
    .address {
      width: 100%;
      height: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.08rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0.2rem;
      .icon {
        padding: 0.45rem 0.3rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .add-detail {
        text-align: left;
        p {
          width: 5.4rem;
        }
        p:first-child {
          font-size: 0.3rem;
          margin-bottom: 0.2rem;
          color:#D8D8D8;
          span:first-child {
            margin-right: 0.6rem;
          }
        }
        p:last-child {
          color: #D8D8D8;
          font-size: 0.28rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .cont {
      width: 100%;
      height: 3.08rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.08rem;
      margin-bottom: 0.2rem;
      .h-line {
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.2);
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
          }
          p:nth-child(2) {
            font-size: 0.28rem;
            margin-bottom: 0.2rem;
            color:#D8D8D8;
          }
          p:last-child {
            color:#E8DD94;
          }
        }
      }
      .bottom {
        padding: 0.2rem 0.3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.28rem;
        color: #D8D8D8;
        .yellow {
          color: #EAA22C;
        }
        .green {
          color: #00FFAB;
        }
      }
    }

    .sn {
      width: 100%;
      height: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.08rem;
      padding: 0.34rem 0.3rem;
      font-size: 0.3rem;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      span:first-child {
        margin-right: 0.3rem;
      }
    }
  }

</style>
