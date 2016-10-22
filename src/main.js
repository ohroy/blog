import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import {
    md2html,
    fromNow
} from './filters'

import App from './components/App.vue'
import Detail from './components/Detail.vue'
import List from './components/List.vue'




// install router
Vue.use(Router)
    //ajax
Vue.use(Resource)
    // register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('md2html', md2html)
    // routing
var router = new Router()

router.map({
    '/detail/:id': {
        component: Detail
    },
    '/list': {
        component: List
    }
})

router.beforeEach(function() {
    window.scrollTo(0, 0);
})

router.redirect({
    '*': '/list'
})

router.start(App, '#app');
