<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
  import MainTabbar from "@/components/content/MainTabbar";

  export default {
    name: "App",
    components: {
      MainTabbar
    },

    data() {
      return {}

    },
    mounted() {

    },

    methods: {},


  }
</script>

<style scoped>
  @import "assets/css/base.css";

  #app {
    height: 100%;
  }
</style>
