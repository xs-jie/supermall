<template>
  <div class="tar-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
<!--    动态绑定样式，来决定字体的颜色-->
    <div :style="activeStyle">

<!--一般不会把属性放到插槽上，那样在替换的时候可能会导致属性没有了-->
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: false
    }
  },
  computed:{
    isActive() {
      //判断当前活跃路由的地址path是否与this.path匹配  -1 表示不匹配   ！== -1 表示匹配到了  return true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      //判断当前路由是否活跃，是的话就把color：this.activeColor 加到上面动态绑定的style上，使得实现文字颜色活跃变化
      return this.isActive ? {color:this.activeColor} : {}
    }

  },
  props:{
    //从父组件那里得到path和activeColror
    path:String,
    activeColor:{
      type:String,
      default:'blue',
    }
  },
  methods: {
    itemClick(){
      //用户路由跳转 $route表示当前活跃的路由
      this.$router.push(this.path).catch(err => err)
    //  catch(err => err) 解决重复导航问题
    }
  }
}
</script>

<style scoped>
@import "~assets/css/base.css";

.tar-bar-item {
  font-size: 14px;
  flex: 1;
  text-align: center;
  height: 49px;
  /*line-height: 49px;*/
}

.tar-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}


</style>
