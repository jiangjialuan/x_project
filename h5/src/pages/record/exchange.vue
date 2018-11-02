<template>
  <div id="exchange" v-show="!loading">
    <top></top>
    <div class="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="10">
      <div class="item" v-for="(item,index) in tableData" @click="goDetail(item.id);">
        <div class="top" v-for="(child,idx) in item.goods">
          <div class="top-img"><img :src="child.image"/></div>
          <div class="top-cont">
            <p>{{child.goods_name}}</p>
            <p>Quantity: {{child.num}}</p>
            <p>{{item.use_points}} Credit</p>
          </div>
        </div>
        <div class="h-line"></div>
        <div class="bottom">
          <span>Time: {{item.create_time}}</span>
          <span v-if="item.shipping_status=='no'" class="yellow">Wait for the mail</span>
          <span v-else class="green">Have been mailed</span>
        </div>
      </div>
    </div>
    <label v-if="pagination.page>=pagination.total_page&&tableData.length>5" class="noMore">All historical data is
      loaded.</label>
    <label v-if="tableData.length<=0" class="noMore">No historical data.</label>
  </div>
</template>

<script>
  import top from '../../components/top-menue';
  export default {
    name: "exchange",
    data() {
      return {
        tableData: [],
        pagination: {
          page: 1,
          total_page: ''
        },
        loading: true,
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
          url: this.api.exchange_log,
          params: {
            page: page,
          }
        }).then((res) => {
          if (this.tableData.length <= 0) {
            this.tableData = res.list;
          } else {
            this.tableData=this.tableData.concat(res.list);
          }
          this.pagination.page = page;
          this.pagination.total_page = res.total_page;
          this.loading = false;
        })
      },
      //加载更多
      loadMore() {
        if (this.pagination.page < this.pagination.total_page) {
          this.getList(parseInt(this.pagination.page) + 1);
        }
      },
      //去详情
      goDetail(id) {
        this.$router.push('/exchange/detail/' + id);
      }
    }
  }
</script>

<style lang="less" scoped>
  #exchange {
    padding: 1.06rem 0.3rem 0.3rem;
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
      .item {
        height: 3.08rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.08rem;
        margin-bottom: 0.3rem;
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
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 1.68rem;
              max-height: 1.68rem;
              border-radius: 0.08rem;
            }
          }
          .top-cont {
            font-size: 0.3rem;
            color: #fff;
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
            }
            p:last-child {
              color: #E8DD94;
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
    }
  }

</style>
