<template>


  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>


</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import cartList from "./childComps/CartList";
import BottomBar from "@/views/cart/childComps/BottomBar";


import {mapGetters} from 'vuex';

export default {
  name: "Cart",
  components: {
    NavBar,
    cartList,
    BottomBar

  },
  computed: {
    // cartList() {
    //   return this.$store.getters.cartList
    // },
    // cartCount() {
    //   return this.$store.getters.cartCount
    // },
    // cartLength() {
    //   return this.$store.state.cartList.length
    // }
    //  使用store里面的getters里面的方法
    // import {mapGetters} from 'vuex'
    //  这样吧store中getters解构成computed里面的方法
    //  ...mapGetters(['cartLength', 'cartList'])
    //也可给解构的方法重新命名
    ...mapGetters({
      length: 'cartCount',

    })
  }
}
</script>

<style scoped>
#cart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
  height: calc(100% - 44px - 50px - 45px);
}
</style>
