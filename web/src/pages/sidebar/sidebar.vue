<template>
    <div id="sidebar">
      <el-menu
        :default-active="$route.path"
        active-text-color="#13D1BE"
        mode="horizontal"
        router
        class="el-menu-vertical-demo">
        <el-menu-item index="/user/index">
          <span slot="title">用户列表</span>
        </el-menu-item>
        <el-menu-item index="/points/record">
          <!--<i class="el-icon-menu"></i>-->
          <span slot="title">CREDITS记录</span>
        </el-menu-item>
        <el-menu-item index="/app/list">
          <span slot="title">帐号管理</span>
        </el-menu-item>
        <el-menu-item index="/goods/list">
          <span slot="title">GIFTS管理</span>
        </el-menu-item>
        <!--<el-submenu index="/goods/list">
          <template slot="title">我的商城</template>
          <el-menu-item index="/goods/list">GIFTS管理</el-menu-item>
        </el-submenu>-->
        <el-menu-item index="/order/list">
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="/prizes/prizelist">
          <template slot="title">LOTTERY管理</template>
          <el-menu-item index="/prizes/prizelist">奖品列表</el-menu-item>
          <el-menu-item index="/prizes/cashprizelist">中奖列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="/promo/index">
          <span slot="title">PROMO管理</span>
        </el-menu-item>
        <el-menu-item index="/live-slot/index">
          <span slot="title">LIVE&SLOT管理</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
      data(){
          return {

          }
      },
      created(){

      },
      methods:{
      }
    }
</script>

<style lang="less" scoped>
#sidebar{
  right:200px;
  height:61px;
  position:fixed;
  left:0px;
  top:0px;
  z-index:3
}
</style>
