<template>
    <div class="promoList">
      <div>
        <div class="tablePanel"><el-button type="primary"  @click="create">新增PROMO</el-button></div>
        <el-table :data="tableData" stripe>
          <el-table-column  prop="title" label="名称"></el-table-column>
          <el-table-column  prop="cover" label="封面图片">
            <template slot-scope="scope">
              <img :src="scope.row.cover" width="60" height="60"/>
            </template>
          </el-table-column>
          <el-table-column  prop="update_time" label="添加时间"></el-table-column>
          <el-table-column   label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
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
        name: "index",
      data(){
          return{
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
          var smData = {};
          smData.page = page;
          this.api.request({
            url: this.api.promo_list,
            params:smData
          }).then((res) => {
            this.tableData = res.list;
            this.pagination.page = res.page;
            this.pagination.total = res.total_count;
            this.pagination.page_size = res.per_page;
          });
        },
        //创建新资讯
        create(){
          this.$router.push('/promo/create');
        },
        //编辑商品
        edit(id){
          this.$router.push('/promo/edit/'+id);
        },
        //删除资讯
        del(id){
          this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let smData={
              id:id,
            }
            this.api.request({
              url:this.api.del_promo,
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
        }
      }
    }
</script>

<style lang="less">
  .promoList{

  }

</style>
