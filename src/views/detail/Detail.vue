<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll1" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @infoImageLoad="infoImageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";

import Scroll from "@/components/common/scroll/Scroll";
import {debounce} from "@/common/utils";
import {mapActions} from 'vuex'
import {Toast} from "vant";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailImages: [],
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    console.log(this.iid)

    //  2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //  1.获取顶部轮播图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      //  2。获取商品的信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //  3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)


      //  4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      //  5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //  6.取出评论信息
      //  只取一条
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })


    //  3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //  4.给getThemeTopY赋值（对上this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 60)

  },
  mounted() {

    this.$bus.$on('detailSwiperLoad', () => {
      this.$refs.scroll1.refresh();
    })
  },
  methods: {
    ...mapActions(["addCart"]),
    infoImageLoad() {
      this.$refs.scroll1.refresh();
      //图片加载完后记录高度offsetTop
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll1.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(position) {
      // console.log(position)
      //  1.获取Y值
      const positionY = -position.y;
      // console.log(positionY)


      //2.positionY 和 主题中的值进行对比
      //   [0, 7938, 9120, 9450]
      //  hask做法： [0, 7938, 9120, 9450， Math_Max]
      //  positionY在 0 和 7938 之间， index = 0
      //  positionY在 =7938 和 9120 之间， index = 1
      //  positionY在 =9120 和 9450 之间， index = 2

      //  positionY 超出 9450 ， index = 3
      let length = this.themeTopYs.length
      //hack做法：直接在themeTopYs中给加上一个很大的数，就不用分情况判断了
      for (let i = 0; i < length - 1; i++) {
        if (this.currentUndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }


    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid


      //  2.将商品添加到购物车里面 (放到vuex中去)
      // this.$store.commit('addCart', product)
      // dispatch返回promise
      //   this.$store.dispatch('addCart', product).then(res => {
      //     console.log(res)
      //   })
      //  也可以vuex中的actions的方法映射到这个文件中
      //  import {mapActions} from 'vuex'
      //  在methods中 ...mapActons([])
      //  映射完后就可以这样写
      this.addCart(product).then(res => {
        Toast(res);
      })

    }
  }
}
</script>

<style scoped>
#detail {
  height: 100%;
  position: relative;
  z-index: 9;
  background-color: #FFFFFF;
  overflow: hidden;
}

.content {
  height: calc(100% - 60px);
  overflow: hidden;
  position: relative;


}
</style>
