<template>
    <div id="userList">
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
          <el-form-item>
            <el-button type="primary"  @click="getList(1)">筛选</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe>
          <el-table-column  prop="id" label="用户ID"></el-table-column>
          <el-table-column  prop="fullname" label="全名"></el-table-column>
          <el-table-column  prop="mobile_phone" label="手机号"></el-table-column>
          <el-table-column  prop="create_time" label="创建时间"></el-table-column>
          <el-table-column  prop="points" label="积分"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="modifyPoints(scope.row.id)">积分修改</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        name: "list",
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
      methods:{
          //获取列表
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.page=page;
          this.api.request({
            url:this.api.user_list,
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
        //修改积分

        modifyPoints(uid){
          this.$prompt('<p style="color:#66b1ff;">加分：直接输入数值（如：100）</p><p  style="color:#66b1ff;">减分：输入负值（如：-100）</p>', '修改积分', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString:true,
            cancelButtonText: '取消',
            inputPattern: /^[-+]?[0-9]+(\.[0-9]+)?$/,
            inputErrorMessage: '请输入数字'
          }).then(({ value }) => {
            this.modifyPointsResponce(uid,value);
          }).catch(()=>{});
        },
        modifyPointsResponce(uid,value){
          var smData={
            uid:uid,
            change_points:value
          };
          this.api.request({
            url:this.api.change_user_points,
            method:'post',
            data:this.qs.stringify(smData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then((res)=>{
            this.$message({
              type:'success',
              message:'修改成功！'
            });
            this.getList(this.pagination.page);
          });
        }
      }
    }
</script>

<style scoped>

</style>
