<template>
    <div id="manager">
      <top></top>
      <div class="managerList"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-immediate-check="false"
           infinite-scroll-distance="10">
        <div class="item" v-for="(child,idx) in tableData">
          <div v-if="parseInt(idx)%2==0" class="icon pink" ></div>
          <div v-else-if="parseInt(idx)%5==0" class="icon red" ></div>
          <div v-else class="icon yellow" ></div>
          <div class="item-img">
            <img :src="child.logo"/>
          </div>
          <div class="item-cont">
            <p>{{child.name}}</p>
            <p>Username: {{child.account}}</p>
            <p>Password: {{child.password}}</p>
          </div>
        </div>
      </div>
      <label v-if="pagination.page>=pagination.total_page&&tableData.length>0" class="noMore">All historical data is loaded.</label>
      <label v-if="tableData.length<=0" class="noMore">No historical data.</label>
    </div>
</template>

<script>
  import top from '../../components/top-menue';
    export default {
        name: "manager",
      data(){
          return{
            tableData:[],
            pagination:{
              page:1,
              total_page:''
            },
          }
      },
      components: {
        top
      },
      created(){
        this.api.getUserInfo().then((res)=> {
          this.getList(1);
        });
      },
      methods:{
          //获取数据
        getList(page){
          this.api.request({
            url:this.api.my_account,
            params:{
              page:page
            },
          }).then((res)=>{
            if(this.tableData.length<=0){
              this.tableData=res.list;
            }else{
              this.tableData=this.tableData.concat(res.list);
            }
            this.pagination.page=page;
            this.pagination.total_page=res.total_page;
          });
        },
        //加载更多
        loadMore(){
          if(this.pagination.page<this.pagination.total_page){
            this.getList(parseInt(this.pagination.page)+1);
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  #manager{
    padding-top:1.06rem;
    .viewMore{
      width:2.18rem;
      height:0.6rem;
      border-radius:0.08rem;
      border:0.02rem solid rgba(220,147,23,1);
      color:rgba(220,147,23,1);
      margin-top:0.6rem;
      font-size:0.3rem;
    }
    .managerList{
      padding:0.6rem 0.3rem;

      .item{
        height:2.1rem;
        width:100%;
        background:rgba(255,255,255,0.1);
        border-radius:0.08rem;
        margin-bottom:0.3rem;
        display: flex;
        .icon{
          width:0.1rem;
          height:2.1rem;
          border-radius:8px 0px 0px 8px;
          &.pink{
            background:rgba(198,67,147,1);
          }
          &.yellow{
            background:rgba(233,153,21,1);
          }
          &.red{
            background:rgba(218,49,42,1);
          }
        }
        .item-img{
          padding:0.3rem;
          img{
            width:1.5rem;
            height:1.5rem;
            border-radius:0.08rem;
          }
        }
        .item-cont{
          color:#fff;
          font-size:0.28rem;
          display:flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
          p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width:4.5rem;
            text-align: left;
          }
          p:first-child{
            font-size:0.3rem;
            margin-bottom: 0.2rem;
          }
          p:nth-child(2){
            margin-bottom: 0.1rem;
          }
        }
      }
    }
  }

</style>
