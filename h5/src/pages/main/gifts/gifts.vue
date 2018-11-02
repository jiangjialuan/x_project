<template>
    <div class="gifts">
      <div class="pointsList">
        <div class="box" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-immediate-check="false"
             infinite-scroll-distance="10">
          <div class="box-item  flex-row" v-for="(item,index) in tableData" @click="goDetail(item.id)">
            <div class="box-img flex-col">
              <img :src="item.image"/>
            </div>
            <div class="box-cont flex-col">
              <div class="box-title">{{item.name}}</div>
              <div class="originPrice">
                RM{{item.original_points}}
              </div>
              <div class="price flex-row">
                <span >NOW:</span>
                <mt-button class="exchange" @click.stop="exchange(item.id,item.need_points)">{{item.need_points}} CREDITS EXCHANGE</mt-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label v-if="parseInt(pagination.page)>=parseInt(pagination.total_page)&&tableData.length>0" class="noMore">Please look forward to more gifts.</label>
      </div>
      <label v-if="tableData.length<=0" class="noMore">No historical data.</label>
      <div class="iconGroup">
        <div class="flex-row" style="margin-bottom:0.6rem;">
          <div class="icon-item flex-row">
            <div class="icon-img">
              <img src="../../../img/main/index-fast.png"/>
            </div>
            <div class="icon-text">
              <p><span class="name">FAST</span>withdrawal</p>
              <p>Deposit >5 minutes</p>
              <p>withdrawal >15 minutes</p>
            </div>
          </div>
          <div class="icon-item  flex-row">
            <div class="icon-img">
              <img src="../../../img/main/index-fast.png"/>
            </div>
            <div class="icon-text">
              <p><span class="name">MULTIPLES</span>game</p>
              <p>Brings you the worlds most</p>
              <p>trusted casino products</p>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="icon-item flex-row">
            <div class="icon-img">
              <img src="../../../img/main/index-fast.png"/>
            </div>
            <div class="icon-text">
              <p><span class="name">SECURE</span>& privacy</p>
              <p>Enjoy games with a</p>
              <p>peace of mind</p>
            </div>
          </div>
          <div class="icon-item flex-row">
            <div class="icon-img">
              <img src="../../../img/main/index-fast.png"/>
            </div>
            <div class="icon-text">
              <p><span class="name">24/7</span>live chat support</p>
              <p>We serve one to one,24</p>
              <p>hours a day,7 days a week</p>
            </div>
          </div>
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
    </div>
</template>

<script>
    export default {
        name: "gifts",
      data(){
          return{
            tableData:[],
            pagination:{
              page:'',
              total_page:'',
            },
            userInfo:{},
            alertVisible:false
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
        getList(page){
          this.api.request({
            url:this.api.goods_list,
            params:{
              page:page
            }
          }).then((res)=>{
            this.pagination.page=page;
            this.pagination.total_page=res.total_page;
            if(this.tableData.length<=0){
              this.tableData=res.list;
            }else{
              this.tableData=this.tableData.concat(res.list);
            }
          });
        },
        //加载更多
        loadMore(){
          if(this.pagination.page<this.pagination.total_page){
            this.getList(parseInt(this.pagination.page)+1);
          }
        },
        //去详情
        goDetail(id){
          this.$router.push('/goods/detail/'+id);
        },
        //快捷兑换
        exchange(id,points){
          this.api.getUserInfo().then((res) => {
            this.userInfo = res;
            if (parseInt(this.userInfo.points) < parseInt(points)) {
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
  .gifts{
    .iconGroup{
      padding:0.3rem;
      flex-wrap:wrap;
      .icon-item{
        width:3.1rem;
        .icon-img{
          width:0.8rem;
          margin-right:0.12rem;
          img{
            width:0.8rem;
          }
        }
        .icon-text{
          width:2.7rem;
          font-size:0.2rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(99,92,41,1);
          text-align: left;
          p{
            width:2.7rem;
          }
          p:first-child{
            color:#9F9653;
            span{
              font-size:0.22rem;
              margin-right:0.1rem;
            }
          }
        }
      }
    }
    .pointsList{
      padding:0.3rem;
      .box-item{
        height:2.18rem;
        position:relative;
        padding-left:2.18rem;
        margin-bottom:0.2rem;
        .box-img{
          width:2.18rem;
          height:2.18rem;
          background:rgba(233,153,21,1);
          position:absolute;
          top:0px;
          left:0px;
          border-radius:8px 0px 0px 8px;
          img{
            max-width:1.72rem;
            height:1.72rem;
          }
        }
        .box-cont{
          height:2.18rem;
          width:100%;
          background:linear-gradient(90deg,rgba(233,153,21,1) 0%,rgba(234,222,146,1) 100%);
          border-radius:0px 8px 8px 0px;
          padding:0.2rem 0.2rem 0.2rem 0px;
          align-items: flex-start;
          .box-title{
            text-align: left;
            width:100%;
            height:0.6rem;
            font-size:0.3rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(70,0,0,1);
            line-height:0.3rem;
            overflow:hidden;
            word-break:break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            margin-bottom:0.18rem;
          }
          .originPrice{
            height:0.24rem;
            font-size:0.24rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:0.24rem;
            text-decoration: line-through;
            margin-bottom: 0.18rem;
          }
          .price{
            font-size:0.24rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            .exchange{
              height:0.6rem;
              background:linear-gradient(180deg,rgba(161,84,84,1) 0%,rgba(70,0,0,1) 100%);
              border-radius:0.08rem;
              font-size:0.24rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(255,255,255,1);
              overflow: hidden;text-overflow: ellipsis; white-space: nowrap;
              margin-left:0.08rem;
              width:3.7rem;
            }
          }
        }
      }
    }
    .game-bg {
      background: rgba(0, 0, 0, 1);
      opacity: 0.5;
      position: fixed;
      z-index: 999;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
    .game-alert {
      width: 6.3rem;
      height: 7.92rem;
      background: url("../../../img/payment-bg.png") no-repeat;
      background-size: cover;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -3.1rem;
      margin-top: -4rem;
      z-index: 1000;
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
