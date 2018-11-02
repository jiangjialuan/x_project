<template>
<div id="cashPrizeList">
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="form.mobile_phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="全部" value="all"></el-option>
          <el-option label="已发货" value="sended"></el-option>
          <el-option label="未发货" value="nosend"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.begin_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        至
        <el-date-picker
          v-model="form.end_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="getList(1)">筛选</el-button>
      </el-form-item>
    </el-form>
    <div>
      <table style="width:100%;" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <th class="th" width="27%" style="min-width:266px;">奖品</th>
          <th class="th" width="13%">领取时间</th>
          <th class="th" width="20%" >中奖人信息</th>
          <th class="th" width="20%">发货状态</th>
          <th class="th" width="20%">抽奖消费积分</th>
        </tr>
      </table>
      <el-card v-if="tableData.length>0" class="box-card" shadow="never" v-for="(item,index) in tableData" :key="'order'+index" >
        <div slot="header" class="clearfix">
          <span>订单号：{{item.id}}</span>
          <el-button style="float: right; padding: 3px 0" type="text"  @click="goDetail(item.id)">查看详情</el-button>
        </div>
        <table style="width:100%;" cellspacing="0" cellpadding="0" border="0" class="el-table--border">
          <tr>
            <td class="td" width="27%">
              <div class="cell">
                <div class="goods-header">
                  <div class="goods-image">
                    <img alt="" :src="item.prize_image" width="60" height="60">
                  </div>
                  <div class="goods-info">
                    <p class="goods-info-title">{{ item.prize_name}}</p>
                  </div>
                </div>
              </div>
            </td>
            <td class="td" width="13%">
              <div class="cell">
                <p v-if="item.exchange_time">{{item.exchange_time}}</p>
                <p v-else>无</p>
              </div>
            </td>
            <td class="td" width="20%" >
              <div class="cell">
                <p class="name" v-if="item.consignee">{{item.consignee}}</p>
                <p class="tel" v-if="item.mobile_phone">{{item.mobile_phone}}</p>
                <p class="address" v-if="item.address">
                  {{item.address}}
                </p>
                <p v-else>无</p>
              </div>
            </td>
            <td class="td" width="20%" >
              <div class="cell">
                <p class="state"><span class="state-text">{{item.shipping_status=='no'?'未发货':'已发货'}}</span></p>
                <p class="state" v-if="item.shipping_status=='no'"><el-button size="mini" @click="finish_order(item.id)">标记为已发货</el-button></p>
              </div>
            </td>
            <td class="td" width="20%">
              <div class="cell">
                <p>{{item.use_points}}</p>
              </div>
            </td>
          </tr>
        </table>
      </el-card>
      <div v-if="tableData.length<=0" class="el-table__empty-block"><span class="el-table__empty-text">暂无数据</span></div>
    </div>
    <!--分页-->

  </div>
  <div class="alignCenter">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :current-page="pagination.page"
      :total="pagination.total"
      :page-size="pagination.page_size"
      @current-change="getList">
    </el-pagination>
  </div>
</div>
</template>

<script>
    export default {
        name: "cashPrize",
      data(){
          return{
            form:{
              status:'all',
              mobile_phone:'',
              begin_time:'',
              end_time:'',
            },
            tableData:[],
            pagination:{
              page:1,
              total:0,
              page_size:20
            }
          }
      },
      created(){
        this.getList(1)
      },
      methods:{
//获取列表
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.page=page;
          this.api.request({
            url:this.api.user_prize_list,
            method:'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data:this.qs.stringify(smData)
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=res.page;
            this.pagination.total=res.total_count;
            this.pagination.page_size=res.per_page;
          });
        },
        goDetail(id){
          this.$router.push('/prizes/cashprizedetail/'+id);
        },
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
  #cashPrizeList{
    .el-card__body{
      padding:0px;
    }
    .td {
      line-height: 23px;
      border-bottom: 1px solid #ebeef5;
      background: #fff;
      padding: 12px 0px;
      font-size: 14px;
      color: #909399;
      text-align: center;
    }
    .th {
      line-height: 23px;
      border-bottom: 1px solid #ebeef5;
      background: #fff;
      padding: 12px 0px;
      font-size: 14px;
      color: #909399;
    }
    .box-card{

      margin-bottom: 10px;
      &.is-never-shadow{
        box-shadow:none;
      }
      .el-card__header{
        background: #f8f8f8;
        padding:10px 20px;
      }
    }
    .goods-header {
      display: flex;
      flex-direction: row;
      align-content: center;
      .goods-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 15px;
      }
    }
    .goods-info-title{
      text-align: left;
      position: relative; line-height: 20px; max-height: 40px;overflow: hidden;
      width:180px;
      &.trickleOut::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%);
      }
    }
    .goods-info{
      width:100%;
      justify-content: center;
      display: flex;
      flex-direction: column;
      p{
        overflow : hidden;
        text-overflow: ellipsis;
        align-items: center;
        justify-content: center;
        line-height: 20px;
        &.wname{
          margin-bottom: 10px;
        }
        &.price{
          color:#f60;
          font-size:16px;
        }
      }
    }
  }
</style>
