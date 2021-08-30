<template>
  <div class="bottom-bar">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
      <van-goods-action-icon :icon="star" text="收藏" @click="onClickIcon" :color="se"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import {GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant'

export default {
  name: "DetailBottomBar",
  components: {
    GoodsActionIcon,
    GoodsActionButton,
    GoodsAction
  },
  data() {
    return {
      star: 'star-o',
      se: null,
      flag: true
    }
  },
  methods: {
    onClickIcon() {
      console.log(1)
      if (this.flag){
        this.star = "star"
        this.se = "#f55000"

      }else {
        this.star = 'star-o'
        this.se = null
      }
      this.flag = !this.flag


    },
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
/*.bottom-bar{*/
/*  height: 49px;*/
/*  position: relative;*/
/*  bottom: 49px;*/
/*  background-color: #42b983;*/
/*}*/

.clickIcon{
  color: #ff5000;
}
</style>
