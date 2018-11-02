<template>
    <div class="home">
      <sidebar></sidebar>
      <top></top>
      <user></user>
    </div>
</template>

<script>
  import sidebar from './sidebar/sidebar.vue';
  import top from './top/top.vue';
  import user from './user/list';
    export default {
        name: "home",
      components: {sidebar, top,user}
    }
</script>

<style lang="less">
  .home{
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
