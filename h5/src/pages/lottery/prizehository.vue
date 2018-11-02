<template>
  <div id="prizehository" v-show="!loading">
    <top></top>
    <div class="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="10">
      <div class="item" v-for="(item,index) in tableData" @click="goDetail(item.id)">
        <div class="top">
          <div class="top-img"><img :src="item.prize_image"/></div>
          <div class="top-cont">
            <p>{{item.prize_name}}</p>
            <p>Quantity: 1</p>
            <!--<p>{{item.use_points}} Credit</p>-->
          </div>
        </div>
        <div class="h-line"></div>
        <div class="bottom">
          <span>Time: {{item.create_time}}</span>
          <span v-if="item.received==1">
            <span v-if="item.shipping_status=='no'" class="yellow">Wait for the mail</span>
            <span v-else class="green">Have been mailed</span>
          </span>
          <span class="receive" @click.stop="goReceive(item.id)" v-else>Receive</span>
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
          url: this.api.user_prize_log,
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
      //去填写地址页
      goReceive(id) {
        this.$router.push('/lottery/comfirm/' + id);
      },
      //去详情
      goDetail(id) {
        this.$router.push('/lottery/detail/' + id);
      }
    }
  }
</script>

<style lang="less" scoped>
  #prizehository {
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
              color: #D8D8D8;
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
          .receive {
            width: 1.68rem;
            height: 0.52rem;
            color: rgba(255, 255, 255, 1);
            font-size: 0.28rem;
            line-height: 0.52rem;
            text-align: center;
            margin-top: -0.08rem;
            background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
            border-radius:0.08rem;
          }
        }
      }
    }
  }

</style>
