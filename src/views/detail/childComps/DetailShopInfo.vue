<template>
  <div class="shop-info" >
    <div class="info-title">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="info-other">
      <div class="info-sells">
        <div>{{shop.sells | sellCountFilter}}</div>
        <span>总销量</span>
      </div>
      <div class="info-goods-count">
        <div>{{shop.goodsCount}}</div>
        <span>全部宝贝</span>
      </div>
      <div class="info-score">
        <div class="info-score-item" v-for="item in shop.score">
          <span>{{item.name}}</span>
          <span  :class="{red: item.isBetter}" class="start">{{item.score}}</span>
          <span v-if="item.isBetter" class="good">高</span>
          <span v-else class="bad">低</span>
        </div>

      </div>
    </div>
    <div class="btn">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }

    }
  },
  computed: {

  },
  filters: {
    sellCountFilter: function(value) {
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
.shop-info{
  margin-bottom: 20px;
}
.btn{
  position: relative;
  border-radius: 10px;
  background-color: #dad9d9;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 60%;
  left: 50%;
  transform: translateX(-50%);
}
.info-title{

  border-top: 3px solid #C7C7C7;
  display: flex;
  padding: 10px;
  height: 60px;
  width: 100%;

}
.info-title img{
  border-radius: 50%;
  border:1px solid #C7C7C7;
  display: block;
  flex: 1;


}
.info-title span{
  flex: 9;
  line-height: 40px;
  padding-left: 10px;
}

.info-other{
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: left;
  font-size: 8px;
  height: 80px;
}
.info-sells{
  display: flex;
  justify-content: space-around;
  flex-flow: column;
  flex: 1;
}
.info-sells :nth-child(1) {
  font-weight: bold;
  font-size: 15px;
}
.info-goods-count :nth-child(1) {
  font-weight: bold;
  font-size: 15px;

}
.info-goods-count{
  display: flex;
  justify-content: space-around;
  flex-flow: column;
  flex: 1;

}
.info-score{
  text-align: left;
  flex: 2;
  display: flex;
  flex-flow: column;
  padding-left: 30px;
  justify-content: space-between;
  border-left: 1px solid #C7C7C7;
}
.info-score-item{
  display: flex;
  justify-content: space-between;
}

.good{
  background-color: var(--color-tint);
  color: #FFFFFF;
}
.bad {
  background-color: #42b983;
  color: #FFFFFF;

}
.red{
  color: var(--color-tint);
}

</style>
