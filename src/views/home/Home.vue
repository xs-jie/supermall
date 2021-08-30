<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <van-swipe :img="banners" @swiperImageLoad="swiperImageLoad"></van-swipe>
      <recommend-view :recommends="recommends" @recommendsImage="recommendsImage"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control"
                   @tabClick="tabClick"
                   ref="tabControl"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
    <!--    @click.native="" 监听整个组件的点击事件添加修饰符。native-->

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import VanSwipe from "@/components/common/swiper/VanSwipe";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";
import {debounce} from "@/common/utils";

import {getHomeMultidata, getHomeGoods} from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    VanSwipe,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: null,
      isTabFixed: false,
      saveY: 0,
      imgload: null
    }
  },

  created() {
    //请求轮播图和RecommentView中的数据
    this.getHomeMultidata()

    //  请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    //  1.监听item中图片加载完成
    //通过事件总线吧事件接受，$bus.$on
    //默认vue中是没有这个$bus事件总线的，需要在vue原型上添加
    // this.$bus.$on('itemImageLoad', () => {
    // //   // console.log('--------')
    //   this.$refs.scroll.refresh()
    //   })
    // 防抖动用法

    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.imgload = () => refresh()
    this.$bus.$on('itemImageLoad', this.imgload)

    //  2.获取tabControl的offsetTop
    //  所有组件都有一个属性$el: 用于获取组件中的元素
    //   console.log(this.$refs.tabControl.$el.offsetTop)


  },
  methods: {
    //  防抖动函数
    // debounce(func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     },delay)
    //   }
    // },

// 时间监听的相关方法
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      //保持两个tabControl一致
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;

    },
    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data.banner)
        // console.log(res.data.recommend)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list

      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        //把数组中的元素放到另一个数组中
        //数组[].push(...数组[])
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //调用scroll组件里面的finishPullUp方法，结束本次的上啦加载更多，
        //之后才能在进行下一次的上拉加载
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh()
      })
    },
    backtop() {
      console.log('回到顶部')
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // console.log(position)
      //判断backtop是否显示
      this.isShowBackTop = (-position.y) > 800

      //  2.决定tabcontrol是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      console.log('加载更多')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      console.log(this.tabOffsetTop)
    },
    recommendsImage() {
      this.$refs.scroll.refresh();
    }

  },
  // activated() {
  //   this.$refs.scroll.scrollTo(0, this.saveY, 0)
  //   this.$refs.scroll.refresh()
  // },
  //当前路由处于不活跃时
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

  //  取消全局事件的监听
  //  这里不能只传入事件，那样会导致所有这个事件的函数都失效，
  //  要再传入哪个确切的函数
    this.$bus.$off('itemImageLoad', this.imgload)
  }
}
</script>

<style scoped>

#home {
  position: relative;
  height: 100%;

}

.home-nav {
  background-color: var(--color-tint);
  color: #FFFFFF;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 5;
}

.content {

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  /*height: calc(100% - 92px);*/
  /*margin-top: 44px;*/
}


</style>
