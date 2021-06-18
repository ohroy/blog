import * as Vue from 'vue';
import App from './App.vue'
import router from './router'
import { VirtualScrollDirective} from "@/directives/VirtualScroll";
import {TocDirective} from "@/directives/Toc";
import Footer from '@/components/Footer.vue';
import Back from '@/components/Back.vue';
import Error from '@/views/Error.vue';
const app = Vue.createApp(App);
app.use(router);
app.component('Footer',Footer);
app.component('Back',Back)
app.directive('virtual-scroller',VirtualScrollDirective)
app.directive('toc',TocDirective)
app.mount('#app')