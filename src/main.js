import Vue from 'vue'
import Router from 'vue-router'
import AnchorScroll from './directives/anchor-scroll'

import App from './components/App.vue'
import Detail from './components/Detail.vue'
import List from './components/List.vue'
import Error from './components/Error.vue'
import Filter from './filters/index'
import Render from "./helpers/render";
Vue.filter('date_format', Filter.date_format)

// install router
Vue.use(Router);
//ajax
Vue.use(AnchorScroll);


const routes = [
    {
        path: '/list',
        redirect: '/'
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/:id(\\d+)',
        component: Detail
    },
    {
        path: '/',
        component: List,
    },
    {
        path: '*',
        component: Error,
    }
]



var router = new Router({
    base: __dirname,
    routes: routes,
    mode: 'history'
})
router.beforeEach((to, form, next) => {
    Render.loading_end();
    next();
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
