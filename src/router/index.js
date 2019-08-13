import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/notfound'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'name',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
