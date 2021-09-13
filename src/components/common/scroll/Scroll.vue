<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },

  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {

      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType,
      click: true,
      // mouseWheel: true
    })
    //2.监听滚动的事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
    }


    //  3.监听上拉加载事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })

    // console.log(this.scroll)
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('---')
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
.wrapper {

}
</style>
