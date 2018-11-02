<template>
    <div id="record">
      <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="form.mobile_phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="getList(1)">筛选</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe>
          <el-table-column  prop="id" label="用户ID"></el-table-column>
          <el-table-column  prop="mobile_phone" label="手机号"></el-table-column>

          <el-table-column  label="积分来源">
            <template slot-scope="scope">
              <p v-if="scope.row.type==1">{{parseFloat(scope.row.points_change)>0?'官方派发':'官方扣减'}}</p>
              <p v-if="scope.row.type==2">积分兑换</p>
              <p v-if="scope.row.type==3">抽奖消费</p>
            </template>
          </el-table-column>
          <el-table-column  prop="points_change" label="积分变动"></el-table-column>
          <el-table-column  prop="create_time" label="创建时间"></el-table-column>
        </el-table>

      </div>
      <!--分页-->
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
        name: "record",
      data(){
        return {
          form:{
            mobile_phone:'',
            begin_time:'',
            end_time:''
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
      methods: {
        //获取列表
        getList(page) {
          var smData = JSON.parse(JSON.stringify(this.form));
          smData.page = page;
          this.api.request({
            url: this.api.user_points,
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: this.qs.stringify(smData)
          }).then((res) => {
            this.tableData = res.list;
            this.pagination.page = res.page;
            this.pagination.total = res.total_count;
            this.pagination.page_size = res.per_page;
          });
        },
      }
    }
</script>

<style lang="less" scoped>
#record{

}
</style>
