<template>
  <div id="home">
    <router-view class="childContainer"></router-view>
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {}
    },
  }
</script>

<style lang="less">
  #home {
    margin: 61px 0 0 0px;
    padding: 20px;
    .childContainer {
      overflow: hidden;
    }
    .childContainer > * {
      margin: 30px;
    }
  }
</style>
