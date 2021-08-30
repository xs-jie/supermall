<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="item in topImages">

          <img :src="item" alt="" @load="detailItemImageLoad">


      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
 import {Swipe, SwipeItem} from 'vant'

export default {
  name: "DetailSwiper",
  components: {
    Swipe,
    SwipeItem
  },
  props: {
    topImages:{
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    detailItemImageLoad() {
      // console.log(this.$bus)
      this.$bus.$emit('detailSwiperLoad')
    }
  }

}
</script>

<style scoped>
.van-swipe-item img{
  width: 100%;
}
.my-swipe{
  height: 300px;
}
</style>
