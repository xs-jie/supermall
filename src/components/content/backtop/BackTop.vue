<template>
  <div class="back-top">
    <img src="~assets/img/backtop.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
    background-color: #FFFFFF;
    border-radius: 50%;
  }
  .back-top img{
    width: 40px;
    height: 40px;
  }
</style>
