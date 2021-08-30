import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  //mutation唯一的目的就是修改state中数据的状态
  //mutation中每一个方法的竟可能完成的事件单一
  //复杂操作最好写到actions中去
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = false

      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //1.查找之前是否有这个商品
        let oldProduct = null;
        //for循环方式查找
        // for (item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item
        //   }
        // }
        //数组函数find查找
        oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //2.判断oldProduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else {
          payload.count = 1;
          // state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve('添加商品成功')
        }
      })



    }
  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    },

  },
  modules: {}
})
