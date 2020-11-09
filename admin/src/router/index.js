import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from 'views/Main.vue'
import Login from 'views/Login.vue'

import CategoryEdit from 'views/CategoryEdit.vue'
import CategoryList from 'views/CategoryList.vue'

import ItemEdit from 'views/ItemEdit.vue'
import ItemList from 'views/ItemList.vue'

import HeroEdit from 'views/HeroEdit.vue'
import HeroList from 'views/HeroList.vue'

import ArticleEdit from 'views/ArticleEdit.vue'
import ArticleList from 'views/ArticleList.vue'

import AdEdit from 'views/AdEdit.vue'
import AdList from 'views/AdList.vue'

import AdminUserEdit from 'views/AdminUserEdit.vue'
import AdminUserList from 'views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      //category
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      //item
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      //hero
      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/heros/list', component: HeroList },
      //Aricle
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },
      //ADs
      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },
      //Admin_User
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token)
    return next('/login')
  next()
})
export default router

