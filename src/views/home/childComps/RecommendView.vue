<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="recommendsImage">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array
    }
  },
  methods: {
    recommendsImage() {
      this.$emit('recommendsImage')
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
    color: #000000;

  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    margin-bottom: 5px;
    width: 70px;
    height: 70px;
  }
</style>
