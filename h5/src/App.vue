<template>
  <div>
    <div id="app">
      <router-view/>
    </div>
    <!--<div id="body" :style="'height:'+clientH+'px'"></div>-->
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        clientH: document.documentElement.clientHeight,
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
