import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "@/App";


const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: Detail

  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
