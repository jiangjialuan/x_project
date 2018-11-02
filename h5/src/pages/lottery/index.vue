<template>
    <div id="spin" class="lottery" :style="'height:'+winH+'px'">
      <top></top>
      <!--:style="'height:'+winH+'px'"-->
      <div class="bg-t"></div>
      <div class="bg-m"></div>
      <div class="bg-b">
        <div class="btns">
          <div class="spin" @click="cashPrize">
            <img :class="isSpin?'focus':''" src="../../img/lottery/lottery-spin-t.png"/>
          </div>
          <div class="mybonus" @click="goPrizeHository">
            <img src="../../img/lottery/lottery-my-bonus-t.png"/>
          </div>
          <div class="text1">{{need_points}} credit once</div>
          <div class="text2" id="poptext">
            <ul>
                <li v-for="(item,index) in user_prize_log" :key="index"  :class="{anim:animate==true}" :style="'margin-top:'+mtop+'px'" >
                  <span>{{item.mobile_phone}}</span>
                  <span>drew in the</span>
                  <span>{{item.prize_name}}</span>
                  <!--<span>{{item.create_time}}</span>-->
                </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="lotter-wheel">
        <div class="wheel-b"></div>
        <div class="wheel-t"></div>
        <div class="wheel" :style="{transform:rotate_angle}">

            <template v-for="(item,index) in list">
              <div class="prizeItem prize0" v-if="index==0">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize1" v-if="index==1">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize2" v-if="index==2">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize3" v-if="index==3">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize4" v-if="index==4">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize5" v-if="index==5">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize6" v-if="index==6">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
              <div class="prizeItem prize7" v-if="index==7">
                <p>{{item.name}}</p>
                <div class="imgBox"><img :src="item.image"/></div>
              </div>
            </template>
        </div>
      </div>
      <div class="points">
        My credit : {{userInfo.points}}
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
      <div class="game-bg" v-if="prizeVisible" ></div>
      <div class="prize-alert" v-if="prizeVisible">
          <div class="main">
            <div class="prizeImg">
              <img  :src="prize.prize_image"/>
            </div>

              <p class="rpizeName">{{prize.prize_name}}</p>
          </div>
          <div class="btn"  @click="goReceive(prize.user_prize_id)"></div>
      </div>
      <div class="disabled" v-if="disabled"></div>
    </div>
</template>

<script>
  import top from '../../components/top-menue';
  window.onresize = function(){
    var CH=document.body.clientHeight;
    var CW=document.body.clientWidth;
    document.getElementById('spin').style.height=CH+'px';
    var mH=CW*1206/750;
    if(CH<mH){
      document.getElementById('spin').style.minHeight=parseFloat(mH+20)+'px';
    }
  }

    export default {
        name: "index",
      data(){
          return{
            selected:'Lottery',
            winH:document.body.clientHeight,
            userInfo:{},
            need_points:'',
            list:[],
            user_prize_log:[],
            alertVisible:false,
            prizeVisible:false,
            prize:{},
            click_flag:true,
            result_angle:[360,315,270,225,180,135,90,45],
            rand_circle:6,//默认旋转的圈数
            result_index:1,//旋转的奖品下标
            rotate_angle:0,//旋转的角度
            start:0,//初始角度
            during_time:5,//延时
            animate:true,
            mtop:0,
            isSpin:'',
            disabled:false,
          }
      },
      components: {
        top
      },
      created(){
        this.api.getUserInfo().then((res)=>{
          this.userInfo=res;
          this.api.setH();
          this.getData();
          this.api.interval=setInterval(this.popInterval,2000);
        });
      },
      methods:{
          //获取奖品列表
        getData(){
          this.api.request({
            url:this.api.prize_list,
          }).then((res)=>{
            this.list=res.list;
            this.user_prize_log=res.user_prize_log;
            this.need_points=res.need_points;
          });
        },
          //去详情
        goPrizeHository(){
          this.$router.push('/lottery/hository');
        },
        hidePrize(){
          this.prizeVisible=false;
        },
        //点击抽奖
        cashPrize(){
          if (!this.click_flag) return;
          this.isSpin=true;
          clearInterval(this.api.interval);
          if(parseFloat(this.userInfo.points)<parseFloat(this.need_points)){
            this.alertVisible=true;
            this.isSpin=false;
          }else{
            this.disabled=true;
            this.click_flag=false;
            this.userInfo.points=parseInt(this.userInfo.points)-parseInt(this.need_points);
            this.draw().then(res=>{
              for(var i=0;i<this.list.length;i++){
                if(this.list[i].id==res.prize_id){
                  this.result_index=i;
                  break;
                }
              }
              var rotate_angle=this.start+
              this.rand_circle * 360 +
              parseInt(this.result_angle[parseInt(this.result_index)]) -
              this.start % 360;
              this.start=rotate_angle;
              this.rotate_angle = "rotate(" + rotate_angle + "deg)";
              setTimeout(()=>{
                if(res.prize_id=='8'){
                  this.$messagebox({
                    message:res.prize_name,
                    title:'Tips',
                    confirmButtonText:'Comfirm'
                  }).then((res)=>{

                  });
                }else{
                  this.prizeVisible=true;
                }
                this.prize=res;
                this.click_flag = true;
                this.userInfo.points=res.remain_points;
                this.api.interval=setInterval(this.popInterval,2000);
                this.isSpin=false;
                this.disabled=false;
              }, this.during_time * 1000 + 1500);
            }).catch(()=>{
              this.click_flag = true;
              this.isSpin=false;
              this.disabled=false;
            })
          }
        },
        //幸运抽奖
        draw(){
          return new Promise((resolve,reject)=>{
            this.api.request({
              url:this.api.lucky_draw,
            }).then(res=>{
              resolve(res);
            })
          });
        },
        //know
        know(){
          this.alertVisible=false;
        },
        //去填写地址页
        goReceive(id){
          this.$router.push('/lottery/comfirm/'+id);
        },
        //字幕
        popInterval(){
          var H=document.getElementById('poptext').offsetHeight;
          let con1 = document.getElementById('poptext');
          this.mtop=30;       
          this.animate=!this.animate; 
          setTimeout(()=>{           
            this.user_prize_log.push(this.user_prize_log[0]);           
            this.user_prize_log.shift();           
            this.mtop=0;         
            this.animate=!this.animate;
            },0);
        }
      }
    }
</script>

<style lang="less" >
  @keyframes gelatine{
  from {margin-top:-0.46rem;}
  to {margin-top:-0.36rem;}
  }
#spin{
  padding-top:1.06rem;
  .disabled{
    position:fixed;
    top:0px;
    left:0px;
    bottom:0px;
    right:0px;
    z-index:9999999;
  }
  .bg-t{
    position:absolute;
    top:1.16rem;
    left:0px;
    right:0px;
    height:3.32rem;
    background: url("../../img/lottery/lottery-t.png") no-repeat top;
    background-size:cover;
  }
  .bg-m{
    position:absolute;
    left:0px;
    right:0px;
    bottom:0px;
    top:3.42rem;
    background: url("../../img/lottery/lottery-m.png") repeat center;
    background-size:contain;
  }
  .bg-b{
    position:absolute;
    left:0px;
    right:0px;
    bottom:0rem;
    height:3.17rem;
    background: url("../../img/lottery/lottery-b.png") no-repeat center;
    background-size:cover;
    .btns{
      width:100%;
      height:3.17rem;
      position: relative;
    }
    .spin{
      position:absolute;
      right:2.78rem;
      bottom:1.3rem;
      width:2.35rem;
      height:1.43rem;
      background: url("../../img/lottery/lottery-spin-b.png") no-repeat center;
      background-size:cover;
      text-align: center;
      img{
        width:1.93rem;
        margin-top:-0.46rem;
        &.focus{
          animation: gelatine 100ms ;
        }
      }
    }
    .mybonus{
      position: absolute;
      right:0.7rem;
      bottom:1.3rem;
      background: url("../../img/lottery/lottery-my-bonus-b.png") no-repeat center;
      background-size:cover;
      text-align: center;
      width:1.6rem;
      height:0.96rem;
      img{
        width:1.2rem;
        margin-top:-0.2rem;
      }

    }
    .text1{
      position:absolute;
      bottom:1rem;
      left:0px;
      right:0px;
      color:rgba(255,255,255,1);
      font-size:0.28rem;
      text-align: center;
    }
    .text2{
      position:absolute;
      bottom:0.15rem;
      left:0px;
      right:0px;
      color:rgba(218,219,102,1);
      font-size:0.26rem;
      text-align: center;
      height:0.46rem;
      overflow: hidden;
      ul,li{
        list-style: none;
        margin:0px;
        padding:0px;
      }
      li{
        height:0.46rem;
        line-height: 0.46rem;
      }
      .anim{
         transition: all 0.5s;
       }

    }
  }
  .lotter-wheel{
    position:absolute;
    z-index:9;
    top:1.36rem;
    width:6.5rem;
    left:50%;
    margin-left:-3.25rem;
    height:6.5rem;
    margin: 0px atuo;
    padding:0px;
    .wheel{
      width:6.5rem;
      height:6.5rem;
      margin: 0px;
      padding:0px;
      position: relative;
      transition:transform 6s ease-in-out;
      background: url("../../img/lottery/lottery-block.png") no-repeat center;
      background-size:cover;
    }
    .wheel-b{
      position:absolute;
      left:50%;
      margin-top:-1.37rem;
      top:50%;
      width:2.74rem;
      height:2.74rem;
      margin-left:-1.37rem;
      background: url("../../img/lottery/lottery-block-c.png") no-repeat center;
      background-size:cover;
      z-index:99;
    }
    .wheel-t{
      position:absolute;
      top:50%;
      left:50%;
      width:5.8rem;
      height:1.82rem;
      margin-left:-2.9rem;
      margin-top:-1.5rem;
      background: url("../../img/lottery/lottery-block-t.png") no-repeat center;
      background-size:contain;
      z-index:99;
    }
    .prizeItem{
      width:1.5rem;
      text-align: center;
      height:1.13rem;
      position:absolute;
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        width:1.5rem;
        height:0.23rem;
        line-height: 0.23rem;
        margin-bottom:0.1rem;
        font-size:0.23rem;
        color:#fff;
      }
      .imgBox{
        width:0.84rem;
        height:0.84rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin:0px auto;
        img{
          max-width:0.84rem;
          max-height:0.84rem;
        }
      }

    }
    .prize0{
      top:0.9rem;
      left:50%;
      margin-left:-0.75rem;
    }
    .prize7{
      top:1.44rem;
      left:50%;
      margin-left:-2rem;
      transform:rotate(315deg);
    }
    .prize6{
       top:2.7rem;
       left:50%;
       margin-left:-2.6rem;
       transform:rotate(270deg);
     }
    .prize5{
      top:3.9rem;
      left:50%;
      margin-left:-2rem;
      transform:rotate(225deg);
    }
    .prize4{
      bottom:0.9rem;
      left:50%;
      margin-left:-0.75rem;
      transform:rotate(180deg);
    }
    .prize3{
      top:4rem;
      left:50%;
      margin-left:1.85em;
      transform:rotate(135deg);
    }
    .prize2{
      top:2.7rem;
      left:50%;
      margin-left:1rem;
      transform:rotate(90deg);
    }
    .prize1{
      top:1.44rem;
      left:50%;
      margin-left:0.5rem;
      transform:rotate(45deg);
    }








  }
  .points{
    position:absolute;
    z-index:99;
    top:8rem;
    left:0.87rem;
    right:0.87rem;
    height:0.8rem;
    background: url("../../img/lottery/lottery-points.png") no-repeat center;
    background-size:cover;
    color:rgba(218,219,102,1);
    font-size:0.32rem;
    text-align: center;
    line-height: 0.8rem;
  }
  .prize-alert{
    width:5.54rem;
    height:10.3rem;
    position:fixed;
    top:50%;
    left:50%;
    margin-left:-2.77rem;
    margin-top:-5.15rem;
    z-index:10000;
    text-align: center;
    .main{
      width:5.54rem;
      height:8.8rem;
      background: url("../../img/lottery/lottery-alert.png") no-repeat;
      background-size: cover;
      position: relative;
      .prizeImg{
        position:absolute;
        top:4.55rem;
        width:2.42rem;
        height:2.42rem;
        border-radius: 50%;
        left:50%;
        margin-left:-1.21rem;
        img{
          max-width: 2.42rem;
          max-height:2.42rem;
          border-radius: 50%;
        }
      }
      .rpizeName{
        position:absolute;
        top:7.47rem;
        left:0px;
        right:0px;
        text-align: center;
        font-size:0.4rem;
        color:#fff;
      }
    }
    .btn{
      width:3rem;
      height:1.1rem;
      background: url("../../img/lottery/receive.png") no-repeat;
      background-size: cover;
      margin:0.4rem auto 0px;
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
    background: url("../../img/payment-bg.png") no-repeat;
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
