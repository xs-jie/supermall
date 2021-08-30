<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1"
      :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info-title{

  padding: 10px;

}
.n-price{
  font-size: 25px;
  color: var(--color-high-text);
}
.o-price{
  margin-top: 8px;
  text-decoration: line-through;
  color: #C7C7C7;
  margin-left: 10px;
}

.discount{
  margin-left: 5px;
  margin-top: 5px;
  color: #FFFFFF;
  background-color: var(--color-high-text);
  text-align: center;
  width: 60px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  border-radius: 30px;
}

.info-price{
  padding: 10px;
  display: flex;
  justify-content: left;
  padding-bottom: 20px;
}

.info-other{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #C7C7C7;
  padding: 10px;
  color: #C7C7C7;
  font-size: 10px;

}
.info-other span{
  /*width: 20%;*/
}

.info-services{

  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  margin-bottom: 20px;
}
.info-services img{
  display: block;
  width: 15px;
  height: 15px;
}
.info-services-item{
  display: flex;
  justify-content: center;
}
</style>
