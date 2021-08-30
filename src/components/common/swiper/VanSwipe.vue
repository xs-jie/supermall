<template>
  <div class="swiper">
<!--    每个 SwipeItem 代表一张轮播卡片，可以通过 autoplay 属性设置自动轮播的间隔。-->
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
      <van-swipe-item v-for="item in img">
        <a href="#">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// import Vue from 'vue'
import {Swipe, SwipeItem} from 'vant'


// Vue.use(Swipe)
// Vue.use(SwipeItem)

export default {
  name: "Swiper",
  components: {
    Swipe,
    SwipeItem
  },
  date() {
    return {
      isLoad: false
    }
  },
  props:{
    img:{
      type:Array,

    }
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>
.van-swipe-item img{
  width: 100%;
}
</style>
