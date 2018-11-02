<template>
  <div id="index">

    <!--奖池-->
    <div class="jackpot">
      <img src="../../img/logo-index.png" class="logo-img"/>
      <div>
        <p class="name">Jackpot</p>
        <p class="value">RM {{jackpot}}</p>
      </div>
      <div>
        <p class="name">Online</p>
        <p class="value">{{online}}</p>
      </div>
    </div>

    <!--lunbo-->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in banner" :key="index">
          <img :src="item.image"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--cashprizebtn-->
    <div class="cash_prize_btn">
      <img @click="golottery" src="../../img/index/cashprize.png"/>
    </div>
    <!--<div class="login">
      <img class="logo-img" src="../../img/logo.png"/>

      &lt;!&ndash;已登录&ndash;&gt;
      <div class="logined" v-if="userInfo">
        <div>
          <p class="phone">{{userInfo.mobile_phone}}</p>
          <p class="points">
            <img src="../../img/icon-c.png"/>
            <span>我的积分：{{userInfo.points}}</span>
          </p>
        </div>
        <div class="name" @click="goAccount">帐户</div>
      </div>
      <div class="no-login" v-else>
        <label class="login-title">Welcome！Enjoy yourself！</label>
        <button class="login-btn" @click="login"><img src="../../img/people-icon.png"/><span>登录</span></button>
      </div>
    </div>-->

    <!--积分兑换列表-->
    <div class="pointsList">
      <!--<div class="title">
        <span class="icon-pre"></span>
        <span class="title-c">Exchange prize</span>
        &lt;!&ndash;<span class="title-e">Exchange Gifts</span>&ndash;&gt;
      </div>-->
      <div class="box">
        <div class="box-item" v-for="(item,index) in tableData" @click="goDetail(item.id)" v-if="index<4">
          <div class="box-img">
            <img :src="item.image"/>
          </div>
          <div class="box-title">{{item.name}}</div>
          <div class="box-points">
            <div class="price">
              <img src="../../img/icon-c.png"/>
              <span>{{item.need_points}}</span>
            </div>
            <div class="originPrice">
              RM{{item.original_points}}
            </div>

          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="viewMore" @click="getMore"><span>View More</span></button>
    </div>
    <!--快捷导航-->
    <div class="quick-navigation">
      <div class="h-line"></div>
      <div class="navigations">
        <div class="navigation" @click="goCustomer">
          <p>Customer service</p>
        </div>
        <div class="v-line"></div>
        <div class="navigation" @click="goAboutus">
          <p>About us</p>
        </div>
      </div>
    </div>
    <BottomBar :selected="selected"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from '../../components/bottomBar.vue'

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        pagination: {
          page: '',
          total_page: ''
        },
        userInfo: '',
        selected: 'Home',
        jackpot: '',
        online: '',
        banner: [],
      }
    },
    components: {
      BottomBar
    },
    created() {
      this.getHomeData();
      //this.isLogin();
      this.getList(1);
      this.api.interval = setInterval(() => {
        this.getJackpotData();
      }, 1000);
    },
    methods: {
      //获取奖池，轮播图
      getHomeData() {
        this.api.request({
          url: this.api.home_data,
        }).then((res) => {
          this.banner = res.banner;
          this.jackpot = res.jackpot;
          this.online = res.online;
        });
      },
      getJackpotData() {
        this.api.request({
          url: this.api.home_data,
        }).then((res) => {
          this.jackpot = res.jackpot;
          this.online = res.online;
        });
      },
      //去抽奖页
      golottery() {
        this.api.getUserInfo().then((res)=> {
          this.$router.push('/lottery');
        });
      },
      //去联系客服
      goCustomer() {
        this.$router.push('/customer');
      },
      //去关于我们
      goAboutus() {
        this.$router.push('/aboutus');
      },
      //获取兑换列表
      getList(page) {
        this.api.request({
          url: this.api.goods_list,
          params: {
            page: page
          }
        }).then((res) => {
          this.pagination.page = page;
          this.pagination.total_page = res.total_page;
          if (this.tableData.length <= 0) {
            this.tableData = res.list;
          } else {
            this.tableData = this.tableData.concat(res.list);
          }
        });
      },
      //点击登录
      login() {
        this.$router.push('/login');
      },
      //点击更多
      getMore() {
        this.$router.push('/exchange')
      },
      //判断是否登录
      isLogin() {
        this.api.request({
          url: this.api.userinfo,
          data: {}
        }).then((res) => {
          if (res.state) {
          } else {
            //sessionStorage.setItem('userInfo',JSON.stringify(res));
            this.userInfo = res;
          }
        });
      },
      //去帐户
      goAccount() {
        this.$router.push('/account');
      },
      //去详情
      goDetail(id) {
        this.$router.push('/goods/detail/' + id);
      }

    }
  }
</script>

<style lang="less">
  #index {
    padding-bottom: 3.23rem;
    .jackpot {
      height: 0.98rem;
      background: rgba(10, 59, 42, 0.38);
      position: fixed;
      top: 0px;
      right: 0px;
      left: 0px;
      display: flex;
      z-index: 99;
      padding: 0.19rem 0.3rem;
      font-size: 0.32rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      .logo-img {
        width: 0.68rem;
      }
      .name {
        margin-bottom: 0.1rem;
      }
      .value {
        color: #E99915;
      }

    }
    .banner {
      height: 4.22rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .mint-swipe {
        width: 7.5rem;
        height: 4.22rem;
        img {
          width: 7.5rem;
          height: 4.22rem;
        }
      }
    }
    .cash_prize_btn {
      height: 4.18rem;
      margin-top: -0.6rem;
      position: relative;
      z-index: 2;
      img {
        height: 4.18rem;
      }
    }
    .login {
      position: fixed;
      top: 0px;
      right: 0px;
      left: 0px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 1.56rem;
      padding: 0rem 0.3rem;
      background: rgba(10, 59, 42, 0.85);
      margin-bottom: 0.6rem;
      .logo-img {
        width: 1.1rem;
        height: 1.1rem;
        margin-right: 0.2rem;
      }
      .no-login {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .login-btn {
          border: none;
          width: 1.3rem;
          height: 0.68rem;
          background: rgba(233, 153, 21, 1);
          border-radius: 0.1rem;
          color: #fff;
          font-size: 0.3rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 0rem 0.12rem;
          img {
            width: 0.3rem;
            height: 0.3rem;
            margin-right: 0.08rem;
          }
          span {
            display: inline-block;
          }
        }
        .login-title {
          font-size: 0.3rem;
          color: #E99915;
        }
      }
      .logined {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .phone {
          color: #fff;
          font-size: 0.3rem;
          text-align: left;
          margin-bottom: 0.05rem;
        }
        .points {
          font-size: 0.28rem;
          color: #E99915;
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 0.36rem;
            margin-right: 0.08rem;
          }
        }
        .name {
          color: #ccc;
          font-size: 0.28rem;
          &::after {
            display: inline-block;
            content: " ";
            height: 0.18rem;
            width: 0.18rem;
            border-width: 0.02rem 0.02rem 0 0;
            border-color: #ccc;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          }
        }
      }
    }
    .viewMore {
      width: 2.18rem;
      height: 0.6rem;
      border-radius: 0.08rem;
      border: 0.02rem solid rgba(220, 147, 23, 1);
      color: rgba(220, 147, 23, 1);
      margin-top: 0.6rem;
      font-size: 0.3rem;
      padding: 0px 0.1rem;
      span {
        display: inline;
        &::after {
          display: inline-block;
          content: " ";
          height: 0.15rem;
          width: 0.15rem;
          border-width: 0.02rem 0.02rem 0 0;
          border-color: rgba(220, 147, 23, 1);
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        }
      }
    }
    .noMore {
      width: 2.18rem;
      height: 0.6rem;
      border-radius: 0.08rem;
      color: rgba(220, 147, 23, 1);
      margin-top: 0.6rem;
      font-size: 0.3rem;
      padding: 0px 0.1rem;
      span {
        display: inline;
        &::after {
          display: inline-block;
          content: " ";
          height: 0.15rem;
          width: 0.15rem;
          border-width: 0.02rem 0.02rem 0 0;
          border-color: rgba(220, 147, 23, 1);
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        }
      }
    }
    .quick-navigation {
      display: flex;
      flex-direction: column;
      position: fixed;
      bottom: 0.97rem;
      left: 0px;
      right: 0px;
      height: 0.9rem;
      background: rgba(10, 59, 42, 0.85);
      .h-line {
        width: 100%;
        height: 2px;
        background: rgba(80, 185, 148, 0.5);
      }
      .v-line {
        width: 2px;
        height: 0.9rem;
        background: rgba(80, 185, 148, 0.5);
      }
      .navigations {
        justify-content: space-between;
        display: flex;
        align-items: center;
        .navigation {
          padding-left: 0.6rem;
          color: #fff;
          flex: 1;
          font-size: 0.3rem;
          text-align: left;
        }
      }

    }

    .pointsList {
      .title {
        height: 0.52rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .icon-pre {
          width: 0.1rem;
          height: 0.52rem;
          background: rgba(157, 51, 142, 1);
          border-radius: 0px 0.58rem 0.58rem 0px;
          margin-right: 0.3rem;
        }
        .title-c {
          font-size: 0.48rem;
          font-weight: 500;
          color: rgba(233, 153, 21, 1);
          margin-right: 0.2rem;
          line-height: 0.52rem;
        }
        .title-e {
          font-size: 0.36rem;
          font-weight: 400;
          color: rgba(233, 153, 21, 1);
          line-height: 0.52rem;
        }
      }
      .box {
        padding: 0.6rem 0rem 0rem 0.3rem;
        .box-item {
          width: 3.3rem;
          display: inline-block;
          margin-right: 0.3rem;
          margin-bottom: 0.4rem;
          .box-img {
            width: 3.3rem;
            height: 3.3rem;
            background: rgba(10, 59, 42, 0.7);
            border-radius: 8px;
            margin-bottom: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 3.3rem;
              max-height: 3.3rem;
            }
          }
          .box-title {
            height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 0.3rem;
            margin-bottom: 0.2rem;
            text-align: left;
          }
          .box-points {
            text-align: left;
            line-height: 0.36rem;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            font-size: 0.3rem;
            .price {
              font-weight: 500;
              color: rgba(233, 153, 21, 1);
              font-size: 0.28rem;
              height: 0.4rem;
              vertical-align: middle;
              width: 1.85rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: break-word;
              display: block;
              line-height: 0.45rem;
            }
            .originPrice {
              text-decoration: line-through;
              color: #A18962;
              font-size: 0.22rem;
              padding-left: 0.2rem;
              width: 1.49rem;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: break-word;
              text-align: right;
            }
            img {
              width: 0.36rem;
              height: 0.36rem;
              margin-right: 0.16rem;
              vertical-align: top;
            }
          }
        }

      }
    }
  }
</style>
