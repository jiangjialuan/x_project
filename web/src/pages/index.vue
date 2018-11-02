<template>
<div id="home">
  <sidebar></sidebar>
  <top></top>
  <router-view class="childContainer"></router-view>
</div>
</template>

<script>
  import sidebar from './sidebar/sidebar.vue';
  import top from './top/top.vue';
    export default {
        name: "index",
      data(){
          return {

          }
      },
      components: {sidebar, top}
    }
</script>

<style lang="less">
#home{
  margin: 61px 0 0 0px;
  padding:20px;
  .childContainer {
    overflow: hidden;
  }
  .childContainer > * {
    margin: 30px;
  }
}
</style>
