<template>
    <div class="main">
      <top form="1"></top>
      <!--lunbo-->
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item.image"/>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!--uqd奖池-->
      <div class="jackpot">
        <div class="name flex-col">
          <p>PROGRESSIVE</p>
          <p>JACKPOT</p>
        </div>
        <div class="jackpotNumber flex-row">
          <div class="number-name">RM</div>
          <div class="numbers flex-row">
            <span class="bg">{{jackpot[0]}}</span>
            <span class="bg">{{jackpot[1]}}</span>
            <span class="bg">{{jackpot[2]}}</span>
            <span class="fege">,</span>
            <span class="bg">{{jackpot[3]}}</span>
            <span class="bg">{{jackpot[4]}}</span>
            <span class="bg">{{jackpot[5]}}</span>
            <span class="fege">,</span>
            <span class="bg">{{jackpot[6]}}</span>
            <span class="bg">{{jackpot[7]}}</span>
            <span class="bg">{{jackpot[8]}}</span>
          </div>
        </div>
        <div class="vline"></div>
        <div class="online">
          <p>{{online}}</p>
          <p>Online</p>
        </div>
      </div>
      <!--菜单-->
      <div class="menue-h flex-row">
        <div class="menue-item flex-col" @click="menueChange('gifts')">
          <img class="icon" src="../../img/main/menu-gifts.png">
          <span>GIFTS</span>
          <img v-if="active_menue=='gifts'" class="active" src="../../img/main/menu-active-icon.png"/>
        </div>
        <div class="menue-fege"><div></div></div>
        <div class="menue-item flex-col"  @click="menueChange('promo')">
          <img class="icon"  src="../../img/main/menu-promo.png">
          <span>PROMO</span>
          <img  v-if="active_menue=='promo'"  class="active" src="../../img/main/menu-active-icon.png"/>
        </div>
        <div class="menue-fege"><div></div></div>
        <div class="menue-item flex-col" @click="menueChange('live')">
          <img class="icon"  src="../../img/main/menu-live.png">
          <span>LIVE</span>
          <img  v-if="active_menue=='live'"  class="active" src="../../img/main/menu-active-icon.png"/>
        </div>
        <div class="menue-fege"><div></div></div>
        <div class="menue-item flex-col" @click="menueChange('slot')">
          <img class="icon"  src="../../img/main/menu-slot.png">
          <span>SLOT</span>
          <img  v-if="active_menue=='slot'"  class="active" src="../../img/main/menu-active-icon.png"/>
        </div>
        <div class="menue-fege"><div></div></div>
        <div class="menue-item flex-col" @click="menueChange('lottery')">
          <img class="icon"  src="../../img/main/menu-lottery.png">
          <span>LOTTERY</span>
          <img  v-if="active_menue=='lottery'"  class="active" src="../../img/main/menu-active-icon.png"/>
        </div>
      </div>
      <router-view class="chidpage"></router-view>
      <bottom></bottom>
    </div>
</template>

<script>
  import top from '../../components/top-menue';
  import bottom from '../../components/bottom'
    export default {
        name: "index",
      data(){
          return{
            banner: [],
            jackpot: '',
            online: '',
            active_menue:'gifts'
          }
      },
      components:{top,bottom},
      created(){
        this.activeMenue();
        this.getHomeData();
        this.api.interval = setInterval(() => {
          this.getJackpotData();
        }, 1000);
      },
      watch:{
        $route(to,from){
          console.log(to);
          this.activeMenue();
        }
      },
      methods:{
          //设置activeMenue
        activeMenue(){
          var name=this.$route.name;
          if(name=='gifts'){
            this.active_menue='gifts';
          }
          if(name=='promo'){
            this.active_menue='promo';
          }
          if(name=='live'){
            this.active_menue='live';
          }
          if(name=='slot'){
            this.active_menue='slot';
          }
          if(name=='lottery'){
            this.active_menue='lottery';
          }
        },
      //获取奖池，轮播图
        getHomeData() {
          this.api.request({
            url: this.api.home_data,
          }).then((res) => {
            this.banner = res.banner;
            var jackpot=res.jackpot;
            var len=res.jackpot.toString().length;
            if(len<9){
              for(var i=0;i<9-len;i++){
                jackpot='0'+res.jackpot;
              }
            }
            this.jackpot = jackpot;
            this.online = res.online;
          });
        },
        getJackpotData() {
          this.api.request({
            url: this.api.home_data,
          }).then((res) => {
            var jackpot=res.jackpot;
            var len=res.jackpot.toString().length;
            if(len<9){
              for(var i=0;i<9-len;i++){
                jackpot='0'+res.jackpot;
              }
            }
            this.jackpot = jackpot;
            this.online = res.online;
          });
        },
        //菜单变更
        menueChange(pageName){
          this.active_menue=pageName;
          if(pageName=='gifts'){
            this.$router.push('/main/index');
          }
          else if(pageName=='promo'){
            this.$router.push('/main/promo');
          }
          else if(pageName=='live'){
            this.$router.push('/main/live');
          }
          else if(pageName=='slot'){
            this.$router.push('/main/slot');
          }
          else if(pageName=='lottery'){
            this.api.getUserInfo().then((res)=> {
              this.$router.push('/lottery');
            });
          }
        }
      }
    }
</script>

<style lang="less">
  .main{
    padding-bottom:1.1rem;
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
        .mint-swipe-indicator{
          background:none;
          opacity:1;
          border:0.02rem solid rgba(255,255,255,1);
          width:0.16rem;
          height:0.16rem;
          &.is-active{
            background:#fff;
            opacity:1;
          }
        }
      }
    }
    .jackpot{
      margin:-0.18rem 0.3rem 0.06rem 0.3rem;
      height:0.8rem;
      padding:0px 0.14rem;
      background:rgba(233,153,21,1);
      border-radius:0.2rem 0.2rem 0px 0px;
      position:relative;
      z-index:999;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .name{
        font-size:0.34rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        p:first-child{
          font-size:0.22rem;
        }
      }
      .jackpotNumber{

        .number-name{
          font-size:0.3rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin-right:0.17rem;
        }
        .numbers{
          .bg{
            display: inline-block;
            width:0.3rem;
            height:0.46rem;
            line-height:0.46rem;
            color:#3F0202;
            font-size:0.3rem;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            background:url("../../img/main/jackpot-bg.png") no-repeat;
            background-size:cover;
            margin-right:0.01rem;
          }
          .fege{
            font-size:0.3rem;
            font-family:PingFangSC-Medium;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
        }
      }
      .vline{
        width:0.02rem;
        height:0.6rem;
        background:rgba(232,221,148,0.35);
      }
      .online{
        font-size:0.22rem;
        font-family:PingFangSC-Medium;
        color:rgba(255,255,255,1);
        p:first-child{
          font-size:0.3rem;
        }
      }
    }


    .menue-h{
      height:1.2rem;
      background:linear-gradient(180deg,rgba(232,221,148,1) 0%,rgba(233,153,21,1) 100%);
      .menue-item{
        min-width:1.4rem;
        position:relative;
        height:1.2rem;
        img.icon{
          height:0.48rem;
          margin-bottom:0.08rem;
        }
        img.active{
          position:absolute;
          bottom:0px;
          left:50%;
          margin-left:-0.15rem;
          width:0.3rem;
          height:0.16rem;
        }
        span{
          font-size:0.24rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }
      .menue-fege{
        width:2px;
        height:1.2rem;
        background:rgba(41,42,42,1);
        div{
          width:1px;
          height:1.2rem;
          background:rgba(255,242,23,1);
        }
      }
    }
    .chidpage{}

  }

</style>
