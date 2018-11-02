<template>
  <div id="goodList">
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="form.mobile_phone" placeholder="手机号"></el-input>
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
        <el-form-item label="状态">
          <el-select v-model="form.sell" placeholder="请选择">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getList(1)">筛选</el-button>
        </el-form-item>
      </el-form>
      <div class="tablePanel"><el-button  type="primary"  @click="create">创建商品</el-button></div>
      <el-table :data="tableData" stripe>
        <el-table-column  prop="name" label="商品名称"></el-table-column>
        <el-table-column  label="商品图">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="60" hegiht="60"/>
          </template>
        </el-table-column>
        <el-table-column  prop="need_points" label="所需积分"></el-table-column>
        <el-table-column  prop="sale_num" label="兑换次数"></el-table-column>
        <el-table-column  prop="stock" label="库存"></el-table-column>
        <el-table-column  prop="update_time" label="更新时间"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            <el-button type="text" v-if="scope.row.sell==0" @click="changeStatus(scope.row.id)">上架</el-button>
            <el-button type="text" v-if="scope.row.sell==1" @click="changeStatus(scope.row.id)">下架</el-button>
          </template>
        </el-table-column>
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
    name: "list",
    data(){
      return{
        form:{
          mobile_phone:'',
          begin_time:'',
          end_time:'',
          sell:'-1'
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
      getList(page) {
        var smData = JSON.parse(JSON.stringify(this.form));
        smData.page = page;
        this.api.request({
          url: this.api.goods_list,
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
      //创建商品
      create(){
        this.$router.push('/goods/create');
      },
      //删除商品
      del(id){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let smData={
            id:id,
          }
          this.api.request({
            url:this.api.del_goods,
            method:'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data:this.qs.stringify(smData)
          }).then((res)=>{
            this.$message({
              type:'success',
              message:'删除成功！'
            });
            this.getList(this.pagination.page);
          })
        }).catch(() => {});
      },
      //上下架
      changeStatus(id){
        let smData={
          id:id,
        }
        this.api.request({
          url:this.api.change_status,
          method:'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data:this.qs.stringify(smData)
        }).then((res)=>{
          this.$message({
            type:'success',
            message:'操作成功！'
          });
          this.getList(this.pagination.page);
        })
      },
      //编辑商品
      edit(id){
        this.$router.push('/goods/edit/'+id);
      }

    }
  }
</script>

<style lang="less" scoped>
  #goodList{

  }
</style>
