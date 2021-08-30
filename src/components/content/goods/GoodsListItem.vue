<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div>
      <p class="message">{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      //通过事件总线吧事件发射出去，
      // console.log(this.$bus)
      //这个得判断一下是在哪里用到，如果实在首页那就发给首页刷新，
      //如果是在详情页，应该想办法发到详情页去，让详情页刷新
      //方法1： 可以通过路由进行判断
      // if(this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('发送给首页的事件')
      // }else if(this.$route.path.indexOf('/detail') ){
      //   this.$bus.$emit('发送给详情页的事件')
      // }
      //方法2： 只发出一个时间，然后监听home的deactivated事件，当离开home时，home就不执行收到的事件了
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item{
    width: 48%;
    padding-bottom: 30px;
    position: relative;

  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .message{
    /*一行显示，超出部分。。。*/
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
  .price{
    float: left;
    height: 25px;
    line-height: 25px;
  }
  .collect{
    float: right;
    margin-right: 5px;
    height: 25px;
    line-height: 25px;
  }
</style>
