<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="#ff8198">
<!--      路径起别名 更方便查找
      配置文件webpack.base.conf.js中
      alias: {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'views': resolve('src/views'),
      设置完后使用
      import的时候可以直接用别名  @/****
      assets/****等
      单一属性使用时，如img中的src引用时要在前面加波浪号
      ：  ~@/....
      :   ~assets/....

    }-->
      <img slot="item-icon" src="~assets/img/tabbar/首页.png">
      <img slot="item-icon-active" src="~assets/img/tabbar/首页1.png"/>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" active-color="#ff8198">
      <img slot="item-icon" src="~assets/img/tabbar/分类.png"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/分类1.png"/>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart"  active-color="#ff8198">
      <img slot="item-icon" src="~assets/img/tabbar/购物车.png"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/购物车1.png"/>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" active-color="#ff8198">
      <img slot="item-icon" src="~assets/img/tabbar/会员.png"/>
      <img slot="item-icon-active" src="~assets/img/tabbar/会员1.png"/>
      <div slot="item-text">会员中心</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabbar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
