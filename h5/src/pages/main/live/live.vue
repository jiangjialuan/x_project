<template>
    <div class="live">
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
              group:0
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
          this.$router.push('/live/detail/'+id);
        }
      }
    }
</script>

<style lang="less">
  .live{
    .pointsList{
      padding:0.3rem;
      .box-item{
        width:6.9rem;
        margin:0px auto 0.2rem;
        .box-img{
          width:6.9rem;
          border-radius:8px;
          height:2.68rem;
          background:rgba(0,0,0,1);
          img{
            max-width:6.9rem;
            border-radius:8px;
            max-height:2.68rem;
          }
        }
      }

    }
  }

</style>
