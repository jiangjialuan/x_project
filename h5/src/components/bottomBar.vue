<template>
  <div class="bottomBar">
    <mt-tabbar v-model="selectb">
      <mt-tab-item id="Home" @click="gopage('/goods')">
        <img slot="icon" v-if="selected=='Home'" src="../img/icon/icon-home-select.png">
        <img slot="icon" v-else src="../img/icon/icon-home-unselect.png">
        Home
      </mt-tab-item>
      <mt-tab-item id="Lottery" @click="gopage('/lottery')">
        <img slot="icon" v-if="selected=='Lottery'" src="../img/icon/icon-lottery-select.png">
        <img slot="icon" v-else src="../img/icon/icon-lottery-unselect.png">
        Lottery
      </mt-tab-item>
      <mt-tab-item id="Exchange" @click="gopage('/exchange')">
        <img slot="icon" v-if="selected=='Exchange'" src="../img/icon/icon-change-select.png">
        <img slot="icon" v-else src="../img/icon/icon-change-unselect.png">
        Exchange
      </mt-tab-item>
      <mt-tab-item id="My" @click="gopage('/account')">
        <img slot="icon" v-if="selected=='My'" src="../img/icon/icon-my-select.png">
        <img slot="icon" v-else src="../img/icon/icon-my-unselect.png">
        My
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
    export default {
        name: "bottomBar",
      data(){
          return{
            selectb:this.selected
          }
      },
      props:['selected'],
      watch:{
        selectb:function(val,oldval){
          switch(val){
            case 'Home':
              this.$router.push('/goods');
              break;
            case 'Lottery':
              this.api.getUserInfo().then((res)=> {
                this.$router.push('/lottery');
              });
              break;
            case 'Exchange':
              this.$router.push('/exchange');
              break;
            case 'My':
              this.api.getUserInfo().then((res)=>{
                this.$router.push('/account');
              });
              break;
          }
        }
      },
      methods:{
        gopage(page){
          this.$router.push(page);
        }
      }
    }
</script>

<style lang="less">
  .bottomBar{
    background:rgba(255,255,255,1);
    height:0.97rem;
    position: fixed;
    left:0px;
    right:0px;
    bottom:0px;
    z-index:999;
    .mint-tabbar > .mint-tab-item.is-selected{
      background: none;
      color:#E99915;
    }
  .mint-tabbar{
    height:0.97rem;

  }
  .mint-tab-item{
    font-size:0.24rem;
    padding:0.09rem 0;
  .mint-tab-item-icon{
    width:0.48rem;
    height:0.48rem;
  }
  .mint-tab-item-label{
    font-size:0.24rem;
  }
  img{
    width:0.48rem;
    height:0.48rem;
  }
  }

  }
</style>
