<template>
    <div class="slot">
      <div class="pointsList">
        <div class="box" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-immediate-check="false"
             infinite-scroll-distance="10">
          <div class="box-item  flex-col" v-for="(item,index) in tableData" @click="goDetail(item.id)">
            <div class="box-img"><img :src="item.cover"/></div>
          </div>
        </div>
      </div>
      <div>
        <label v-if="parseInt(pagination.page)>=parseInt(pagination.total_page)&&tableData.length>0" class="noMore">All data has been loaded.</label>
      </div>
      <label v-if="tableData.length<=0" class="noMore">No historical data.</label>
    </div>
</template>

<script>
    export default {
        name: "promo",
      data(){
          return{
            tableData:[],
            pagination:{
              page:'',
              total_page:'',
            },
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
        getList(page){
          this.api.request({
            url:this.api.app_market_list,
            params:{
              page:page,
              group:1
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
          this.$router.push('/slot/detail/'+id);
        }
      }
    }
</script>

<style lang="less">
  .slot{
    .pointsList{
      padding:0.3rem;
      .box-item{
        width:6.9rem;
        margin:0px auto 0.2rem;
        .box-img{
          width:6.9rem;
          background:#000;
          border-radius:8px 8px 8px 8px;
          height:2.68rem;
          img{
            border-radius:8px;
            max-height:2.68rem;
          }
        }
        .box-text{
          width:100%;
          background:rgba(0,0,0,1);
          height:0.72rem;
          line-height:0.72rem;
          font-size:0.24rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }

    }
  }

</style>
