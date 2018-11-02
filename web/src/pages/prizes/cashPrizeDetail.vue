<template>
  <div id="cashPrizeDetail">
    <div>
      <div class="header">
        <h2>
          <span>订单号：{{formData.id}}</span>
        </h2>
      </div>
      <div class="main">
        <div class="order-item order-data clearfix">
          <div class="order-info">
            <h2 class="title">订单信息</h2>
            <div class="inner form-box">
              <div class="group">
                <p class="item">
                  <span class="label">中奖人：</span>{{formData.consignee}}
                </p>
                <p class="item">
                  <span class="label">领取时间：</span>{{formData.exchange_time||''}}
                </p>
              </div>
              <div class="group" >
                <p class="item">
                  <span class="label">抽奖所需积分：</span>{{formData.use_points}}
                </p>
                <p class="item">
                  <span class="label">联系方式：</span>{{formData.mobile_phone}}
                </p>
                <p class="item">
                  <span class="label">地址</span>{{formData.address}}
                </p>
              </div>
            </div>
          </div>
          <div class="order-state">
            <h2 class="title">订单状态</h2>
            <div class="inner">
              <div class="state-box" style="margin-top:0px;">
                <p class="state alignCenter">订单状态：<span class="strong state-text">{{formData.shipping_status=='no'?'未发货':'已发货'}}</span></p>
                <p class="opera alignCenter" v-if="formData.shipping_status=='no'"><el-button size="mini" type="primary" @click="finish_order(formData.id,formData.use_points)">标记为已发货</el-button></p>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-wrap">
          <table style="width:100%;" cellspacing="0" cellpadding="0" border="0" class="el-table el-table--border">
            <thead style="background-color: #f8f8f8;">
            <tr>
              <th class="is-leaf alignCenter" ><div class="cell">奖品</div></th>
              <th class="is-leaf alignCenter"><div class="cell">抽奖所需积分</div></th>
            </tr>
            </thead>
            <tr>
              <td>
                <div class="cell">
                  <div class="goods-content">
                    <div class="goods-img">
                      <img :src="formData.prize_image"  >

                    </div>
                    <div class="goods-info">
                      <p>{{formData.prize_name}}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td class="alignCenter">
                <div class="cell">{{formData.use_points}}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data(){
      return{
        orderId:this.$route.params.id,
        formData:{},
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      //获取订单详情
      getDetail(){
        var smData={
          id:this.orderId
        };
        this.api.request({
          url:this.api.user_prize_detail,
          /*method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },*/
          params: smData
        }).then((res)=>{
          this.formData=res;
        });
      },
      //兑换完成
      finish_order(id){
        this.$confirm('确认已发货了吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let smData={
            id:id,
          }
          this.api.request({
            url:this.api.finish_claim_prize,
            method:'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data:this.qs.stringify(smData)
          }).then((res)=>{
            this.$message({
              type:'success',
              message:'领奖成功！'
            });
            this.getList(this.pagination.page);
          })
        }).catch(() => {});
      },
    }
  }
</script>

<style lang="less" scoped>
  #cashPrizeDetail{
    color:#606266;
    font-size:13px;
    .left{
      display: inline-block;
      float:left;
    }
    .right{
      display: inline-block;
      float:right;
    }
    .header {
      background: #fff;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      margin-bottom: 20px;
      padding: 0 20px;
      h2 {
        font-size: 18px;
        font-weight: 400;
      }
    }
    .main {
      margin: 0!important;
      color:#909399;
      .order-data {
        margin-bottom: 30px;
        overflow: hidden;
      }
      .order-info, .order-state {
        position: relative;
        padding-bottom: 1000px;
        margin-bottom: -1000px;
        background-color: #fff;
      }
      .order-info {
        width: 450px;
        float: left;
      }
      .order-state {
        margin-left: 470px;
      }
      .order-data .title {
        padding: 10px 15px;
        font-size: 13px;
        border-bottom: 1px solid #ddd;
      }
      .order-data .inner {
        padding: 10px 15px;
      }
      .form-box .group {
        margin-bottom: 20px;
      }
      .form-box .item {
        margin-bottom: 5px;
        padding-left: 80px;
        word-break: break-all;
      }
      .form-box .label {
        float: left;
        position: relative;
        margin-left: -80px;
      }
      .form-box .item:after {
        display: table;
        content: "";
        clear: both;
      }
      li {
        list-style: none;
      }
      .state-box p {
        margin-bottom: 10px;
      }
      .pay-method {
        color: #999;
      }
      .strong{
        color:#30a5ff;
      }
    }
    .goods-content{
      width:240px;
      display: flex;
      .goods-img{
        width:60px;
        height:60px;
        margin-right:10px;
        display: inline-block;
        position: relative;
        img{
          width:60px;
          height:60px;
        }
      }
      .goods-info{
        width:160px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        p{
          overflow : hidden;
          text-overflow: ellipsis;
          align-items: center;
          justify-content: center;
          &.wname{
            margin-bottom:10px;
          }
          &.price{
            color:#f60;
            line-height: 20px;
            font-size:16px;
          }
        }
      }
    }
    .price{
      color:#f60;
      line-height: 40px;
      font-size:16px;
    }
    .alignCenter{
      text-align: center;
    }
    .order-detail-table .cell~.cell{
      width:20%;
    }
    .logis-axis {
      margin: 20px 0;
    }
    .logis-axis .title {
      padding: 20px 0 10px !important;
      font-size: 13px !important;;
      border-top: 1px solid #ddd;
      border-bottom: none !important;;
    }
    .logis-axis .item {
      position: relative;
      margin-top: 12px;
      padding: 0 20px 0 50px;
      overflow: hidden;
    }
    .logis-axis .item:before {
      width: 7px;
      height: 7px;
      position: absolute;
      top: 4px;
      left: 0;
      z-index: 2;
      content: "";
      background-color: #ccc;
      border-radius: 50%;
      margin: 3px;
    }
    .logis-axis .item:after {
      width: 0;
      height: 100%;
      position: absolute;
      top: 16px;
      left: 6px;
      z-index: 1;
      content: "";
      border-left: 1px solid #ddd;
    }
    .logis-axis .time {
      width: 140px;
      float: left;
      color: #888;
    }
    .logis-axis .desc {
      margin-left: 200px;
      color: inherit;
      word-break: break-all;
    }
    .logis-axis .item:last-child .desc {
      color: #f60;
    }
    .logis-axis .item:last-child:before {
      background-color: #000;
    }
  }
</style>

