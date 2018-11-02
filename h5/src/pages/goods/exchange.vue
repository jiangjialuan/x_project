<template>
  <div id="exchange">
    <!--积分兑换列表-->
    <div class="pointsList">
      <div class="box" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check="false"
           infinite-scroll-distance="10">
        <div class="box-item" v-for="(item,index) in tableData" @click="goDetail(item.id)">
          <div class="box-img">
            <img :src="item.image"/>
          </div>
          <div class="box-title">{{item.name}}</div>
          <div class="box-points">
            <div class="price">
              <img src="../../img/icon-c.png"/>
              <span >{{item.need_points}}</span>
            </div>
            <div class="originPrice">
              RM{{item.original_points}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <label v-if="parseInt(pagination.page)>=parseInt(pagination.total_page)&&tableData.length>0" class="noMore">Please look forward to more gifts.</label>
    </div>
    <label v-if="tableData.length<=0" class="noMore">No historical data.</label>
    <BottomBar :selected="selected"></BottomBar>
  </div>
</template>

<script>
  import BottomBar from '../../components/bottomBar.vue'
  export default {
    name: "index",
    data(){
      return{
        tableData:[],
        pagination:{
          page:'',
          total_page:'',
        },
        selected:'Exchange'
      }
    },
    components:{
      BottomBar
    },
    created(){
      this.getList(1);
    },
    methods:{
      //获取兑换列表
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
      }

    }
  }
</script>

<style lang="less">
  #exchange{
    padding-bottom:1rem;
    .pointsList{
      .title{
        height:0.52rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .icon-pre{
          width:0.1rem;
          height:0.52rem;
          background:rgba(157,51,142,1);
          border-radius:0px 0.58rem 0.58rem 0px;
          margin-right:0.3rem;
        }
        .title-c{
          font-size:0.48rem;
          font-weight:500;
          color:rgba(233,153,21,1);
          margin-right:0.2rem;
          line-height: 0.52rem;
        }
        .title-e{
          font-size:0.36rem;
          font-weight:400;
          color:rgba(233,153,21,1);
          line-height: 0.52rem;
        }
      }
      .box{
        padding:0.6rem 0rem 0rem 0.3rem;
        text-align: left;
        .box-item{
          width:3.3rem;
          display: inline-block;
          margin-right:0.3rem;
          margin-bottom:0.4rem;
          .box-img{
            width: 3.3rem;
            height:3.3rem;
            background:rgba(10,59,42,0.7);
            border-radius:8px;
            margin-bottom:0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              max-width: 3.3rem;
              max-height:3.3rem;
            }
          }
          .box-title{
            height:0.3rem;
            font-size:0.3rem;
            font-weight:400;
            color:rgba(255,255,255,1);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            line-height: 0.3rem;
            margin-bottom:0.2rem;
            text-align: left;
          }
          .box-points{
            text-align: left;
            line-height: 0.36rem;
            display: flex;
            justify-content: flex-start;
            font-size:0.3rem;
            .price{
              font-weight:500;
              color:rgba(233,153,21,1);
              font-size:0.28rem;
              height: 0.4rem;
              vertical-align: middle;
              width:1.85rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              word-wrap: break-word;
              display: block;
              line-height: 0.4rem;
            }
            .originPrice{
              text-decoration:line-through;
              color:#A18962;
              font-size:0.22rem;
              padding-left:0.2rem;
              width:1.49rem;
              display: block;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              word-wrap: break-word;
              text-align: right;
            }
            img{
              width:0.36rem;
              height:0.36rem;
              margin-right:0.16rem;
              vertical-align: middle;
            }
          }
        }

      }
    }
  }
</style>
