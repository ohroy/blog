import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Detail from '../views/Detail.vue'
import List from '../views/List.vue'
import Error from '../views/Error.vue'
import Render from '../helpers/render.js'
const routes: Array<RouteRecordRaw> = [
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
},
{
  path: '/list',
  redirect: '/'
},
{
  path: '/',
  component: List
},
{
  name: 'detail',
  path: '/detail/:id',
  component: Detail
},
{
  path: '/:id(\\d+)',
  component: Detail
},
{
  path: '/sponsor',
  redirect:()=>({
    name: 'detail',
    params:{
      id:37
    }
  })
},
{
  path: '/:data(.*)',
  component: Error
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((_to, _form, next) => {
    Render.loading_end();
    next();
})
// router.afterEach((to, from) => {
//       // Render.loading_start();
// })

export default router
