<template>
  <div id="pointsRcord">
    <top></top>
    <div class="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="50">
      <div class="item" v-for="(child,idx) in tableData">
        <div class="left">
          <p v-if="child.type==1">{{parseInt(child.points_change)>0?'Official reward':'Official deduction'}}</p>
          <p v-if="child.type==2">Exchange prize</p>
          <p v-if="child.type==3">Prize draw</p>
          <!--<p v-if="child.type==1">{{parseInt(child.points_change)>0?'Official reward':'Official deduction'}}</p>
          <p v-if="child.type==2">Exchange gift</p>-->
          <p>{{child.create_time}}</p>
        </div>
        <div class="right reduce" v-if="child.type==3">{{child.points_change}}</div>
        <div class="right reduce" v-if="child.type==2">{{child.points_change}}</div>
        <div class="right add" v-if="child.type==1&&parseInt(child.points_change)>0">+{{child.points_change}}</div>
        <div class="right reduce" v-if="child.type==1&&parseInt(child.points_change)<=0">{{child.points_change}}</div>
      </div>
    </div>
    <p class="page-infinite-loading" v-if="loading">
        <span>
        <div class="mint-spinner-fading-circle circle-color-43" style="width: 0.3rem; height: 0.3rem;">
          <div class="mint-spinner-fading-circle-circle is-circle2"></div>
          <div class="mint-spinner-fading-circle-circle is-circle3"></div>
          <div class="mint-spinner-fading-circle-circle is-circle4"></div>
          <div class="mint-spinner-fading-circle-circle is-circle5"></div>
          <div class="mint-spinner-fading-circle-circle is-circle6"></div>
          <div class="mint-spinner-fading-circle-circle is-circle7"></div>
          <div class="mint-spinner-fading-circle-circle is-circle8"></div>
          <div class="mint-spinner-fading-circle-circle is-circle9"></div>
          <div class="mint-spinner-fading-circle-circle is-circle10"></div>
          <div class="mint-spinner-fading-circle-circle is-circle11"></div>
          <div class="mint-spinner-fading-circle-circle is-circle12"></div>
          <div class="mint-spinner-fading-circle-circle is-circle13"></div>
        </div>
        </span>
      加载中...
    </p>
    <label v-if="pagination.page>=pagination.total_page&&tableData.length>0" class="noMore">All historical data is
      loaded.</label>
    <label v-if="tableData.length<=0" class="noMore">No historical data.</label>

  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "points",
    data() {
      return {
        tableData: [],
        pagination: {
          page: 1,
          total_page: ''
        },
        loading: false

      }
    },
    components: {
      top
    },
    created() {
      this.api.getUserInfo().then((res) => {
        this.getList(1);
      });
    },
    methods: {
      //获取列表
      getList(page) {
        this.api.request({
          url: this.api.points_log,
          params: {
            page: page,
          }
        }).then((res) => {
          if (this.tableData.length <= 0) {
            this.tableData = res.list;
          } else {
            this.tableData = this.tableData.concat(res.list);
          }
          this.pagination.page = page;
          this.pagination.total_page = res.total_page;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      },
      //加载更多
      loadMore() {
        if (this.pagination.page < this.pagination.total_page) {
          this.loading = true;
          this.getList(parseInt(this.pagination.page) + 1);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #pointsRcord {
    padding-top:1.06rem;
    .viewMore {
      width: 2.18rem;
      height: 0.6rem;
      border-radius: 0.08rem;
      border: 0.02rem solid rgba(220, 147, 23, 1);
      color: rgba(220, 147, 23, 1);
      margin-top: 0.6rem;
      font-size: 0.3rem;
    }
    .list {
      padding: 0.3rem;
      .item {
        width: 100%;
        height: 1.68rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.08rem;
        padding: 0.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.3rem;
        .left {
          color: #fff;
          font-size: 0.3rem;
          text-align: left;
          p:first-child {
            margin-bottom: 0.2rem;
          }
          p:last-child {
            font-size: 0.24rem;
            color: #D8D8D8;
          }
        }
        .right {
          font-size: 0.4rem;
          &.reduce {
            color: #E99915;
          }
          &.add {
            color: #00FFAB;
          }
        }
      }
    }
    .page-infinite-loading {
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #ccc;
      font-size: 0.28rem;
      .circle-color-43 > div::before {
        background-color: #ccc;
      }
      div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.05rem;
      }
      .mint-spinner-fading-circle {
        position: relative
      }
      .mint-spinner-fading-circle-circle {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute
      }
      .mint-spinner-fading-circle-circle::before {
        content: " ";
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        border-radius: 100%;
        -webkit-animation: mint-fading-circle 1.2s infinite ease-in-out both;
        animation: mint-fading-circle 1.2s infinite ease-in-out both
      }
      .mint-spinner-fading-circle-circle.is-circle2 {
        -webkit-transform: rotate(30deg);
        transform: rotate(30deg)
      }
      .mint-spinner-fading-circle-circle.is-circle2::before {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s
      }
      .mint-spinner-fading-circle-circle.is-circle3 {
        -webkit-transform: rotate(60deg);
        transform: rotate(60deg)
      }
      .mint-spinner-fading-circle-circle.is-circle3::before {
        -webkit-animation-delay: -1s;
        animation-delay: -1s
      }
      .mint-spinner-fading-circle-circle.is-circle4 {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
      }
      .mint-spinner-fading-circle-circle.is-circle4::before {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s
      }
      .mint-spinner-fading-circle-circle.is-circle5 {
        -webkit-transform: rotate(120deg);
        transform: rotate(120deg)
      }
      .mint-spinner-fading-circle-circle.is-circle5::before {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s
      }
      .mint-spinner-fading-circle-circle.is-circle6 {
        -webkit-transform: rotate(150deg);
        transform: rotate(150deg)
      }
      .mint-spinner-fading-circle-circle.is-circle6::before {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s
      }
      .mint-spinner-fading-circle-circle.is-circle7 {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
      }
      .mint-spinner-fading-circle-circle.is-circle7::before {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s
      }
      .mint-spinner-fading-circle-circle.is-circle8 {
        -webkit-transform: rotate(210deg);
        transform: rotate(210deg)
      }
      .mint-spinner-fading-circle-circle.is-circle8::before {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s
      }
      .mint-spinner-fading-circle-circle.is-circle9 {
        -webkit-transform: rotate(240deg);
        transform: rotate(240deg)
      }
      .mint-spinner-fading-circle-circle.is-circle9::before {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s
      }
      .mint-spinner-fading-circle-circle.is-circle10 {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
      }
      .mint-spinner-fading-circle-circle.is-circle10::before {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s
      }
      .mint-spinner-fading-circle-circle.is-circle11 {
        -webkit-transform: rotate(300deg);
        transform: rotate(300deg)
      }
      .mint-spinner-fading-circle-circle.is-circle11::before {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s
      }
      .mint-spinner-fading-circle-circle.is-circle12 {
        -webkit-transform: rotate(330deg);
        transform: rotate(330deg)
      }
      .mint-spinner-fading-circle-circle.is-circle12::before {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s
      }
      @-webkit-keyframes mint-fading-circle {
        0%, 39%, 100% {
          opacity: 0
        }
        40% {
          opacity: 1
        }
      }
      @keyframes mint-fading-circle {
        0%, 39%, 100% {
          opacity: 0
        }
        40% {
          opacity: 1
        }
      }

    }
  }
</style>
