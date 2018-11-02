<template>
    <div id="accountList">
      <div>
        <!--<el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="form.mobile_phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getList(1)">筛选</el-button>
        </el-form-item>
      </el-form>-->
        <div class="tablePanel"><el-button @click="accoutCreate">新增帐号</el-button></div>
        <el-table :data="tableData" stripe>
          <el-table-column  prop="account" label="帐号"></el-table-column>
          <el-table-column  prop="password" label="密码"></el-table-column>
          <el-table-column  prop="mobile_phone" label="派发帐号">
            <template slot-scope="scope">
              <p v-if="scope.row.mobile_phone==''">无</p>
              <p v-else>{{scope.row.mobile_phone}}</p>
            </template>
          </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
              <el-button type="text" @click="distributeAccount(scope.row.id)" v-if="parseFloat(scope.row.uid)<=0">派发帐号</el-button>
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
      <!--新增/编辑帐号-->
      <el-dialog :title="accoutForm.id==''?'新增帐号':'编辑帐号'" :visible.sync="accoutFormVisible">
        <el-form :model="accoutForm" ref="accoutForm">
          <el-form-item label="帐号" prop="account" :rules="[{required: true, message: '请输入帐号', trigger: 'change'}]">
            <el-input v-model="accoutForm.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="[{required: true, message: '请输入密码', trigger: 'change'}]">
            <el-input v-model="accoutForm.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="accoutFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="accoutFormComfirm">确 定</el-button>
        </div>
      </el-dialog>

      <!--派发帐号-->
      <el-dialog title="派发帐号" :visible.sync="distributeTableVisible" :top="screeHeight<=800?(screeHeight-630)/2+'px':'15vh'">
        <div style="max-height: 400px; overflow: auto;"  @scroll.passive="getMore($event);">
        <el-table :data="distributeTable" style="width: 100%">
          <el-table-column  property="id" label="用户ID" ></el-table-column>
          <el-table-column  property="mobile_phone" label="手机号" ></el-table-column>
          <el-table-column  property="create_time" label="创建时间"></el-table-column>
          <el-table-column  property="points" label="积分"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-radio v-model="distributeForm.uid" :label="scope.row.id"></el-radio>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="distributeTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="distributeFormComfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            form:{
              app_id:this.$route.params.app_id,
            },
            tableData:[],
            accoutForm:{
              app_id:'',
              account:'',
              password:'',
              id:''
            },
            accoutFormVisible:false,
            distributeTableVisible:false,
            distributeTable:[],
            screeHeight:window.innerHeight,
            distributeForm:{
              uid:'',
              account_id:'',
            },
            pagination:{
              page:1,
              total:0,
              page_size:20
            },
            pagination2:{
              page:1,
              page_total:0,
            }
          }
      },
      created(){
        this.getList(1);
        this.getUserList(1);
      },
      methods:{
        //获取列表
        getList(page) {
          var smData = JSON.parse(JSON.stringify(this.form));
          smData.page = page;
          this.api.request({
            url: this.api.app_account_list,
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
        //新增帐号
        accoutCreate(){
          this.accoutForm={
            app_id:this.form.app_id,
            account:'',
            password:'',
            id:''
          };
          if(this.$refs['accoutForm'])
          this.$refs['accoutForm'].resetFields();
          this.accoutFormVisible=true;
        },
        edit(id){
          var smData={
            id:id,
          };
          this.api.request({
            url:this.api.app_account_info,
            params:smData,
          }).then((res)=>{
            this.accoutForm={
              app_id:this.form.app_id,
              account:res.account,
              password:res.password,
              id:res.id
            };
            this.accoutFormVisible=true;
          });
        },

        //新增/编辑确认事件
        accoutFormComfirm(){
          this.$refs['accoutForm'].validate((valid)=>{
            if(valid){
              var smData=JSON.parse(JSON.stringify(this.accoutForm));
              this.api.request({
                url:this.api.store_app_account,
                method:'post',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: this.qs.stringify(smData)
              }).then((res)=>{
                this.$message({
                  type:'success',
                  message:"保存成功！"
                });
                this.getList(this.pagination.page);
                this.accoutFormVisible=false;
              });
            }

          });

        },
        del(id){
          this.$confirm('此操作将永久删除该APP, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let smData={
              id:id,
            }
            this.api.request({
              url:this.api.del_app_account,
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
        //获取用户列表
        getUserList(page){
          var smData={
            mobile_phone:'',
          };
          smData.page=page;
          this.api.request({
            url:this.api.user_list,
            method:'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data:this.qs.stringify(smData)
          }).then((res)=>{
            this.distributeTable=this.distributeTable.concat(res.list);
            this.pagination2.page=res.page;
            this.pagination2.page_total=res.total_page;
          });
        },
        //下拉加载更多
        getMore(e){
          if(e.srcElement!=undefined){
            if (e.srcElement.scrollTop + e.srcElement.offsetHeight >= e.srcElement.scrollHeight) {
              if(parseInt(this.pagination2.page)<parseInt(this.pagination2.page_total)){
                this.getUserList(parseInt(this.pagination2.page)+1);
              }

            }
          }else{
            if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
              this.getUserList(parseInt(this.pagination2.page)+1);
            }
          }
        },
        //点击派发帐号
        distributeAccount(id){
          this.distributeForm={
            uid:'',
            account_id:id,
          };
          this.distributeTableVisible=true;
        },
        //派发帐号确认事件
        distributeFormComfirm(){
          if(this.distributeForm.uid==''){
            this.$message.error('请选择派发帐号');
          }else{
            var smData=JSON.parse(JSON.stringify(this.distributeForm));
            this.api.request({
              url:this.api.distribute_app_account,
              method:'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              data:this.qs.stringify(smData)
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'派发成功！'
              });
              this.getList(this.pagination.page);
              this.distributeTableVisible=false;
            });
          }
        }
      }
    }
</script>

<style lang="less" >
#accountList{
  .el-radio__label{
    display: none;
  }
}
</style>
