<template>
    <section>
        <div v-if="loading" class="panel features">
            <p>
                <i class="iconfont icon-loading if-spin if-3x if-main"></i></p>
            <p>{{status}}
            </p>
        </div>
        <div v-else class="docs-wrapper container">

            <v-affix offset="0">
            <section class="sidebar">
                <ul>
                    <template v-for="toc in detail.rend.toc">
                        <li>
                            <a v-smooth-scroll :href="'#'+toc.title" v-html="toc.title"></a>
                            <ul v-if="toc.sub.length>0">
                                <li v-for="sub in toc.sub">
                                    <a v-smooth-scroll :href="'#'+sub.title" v-html="sub.title"></a>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <li>
                        <a v-smooth-scroll href="#top">返回顶部</a>
                    </li>
                </ul>
            </section>
            </v-affix>
            <article>

                <transition appear name="bounce">
             <h1>{{detail.title}}</h1>
                </transition>

                <transition name="my" appear appear-active-class="overlay">
                <div v-html="detail.rend.html">
                </div>
                    </transition>

            </article>
        </div>
    </section>
</template>
<script>
import {
    github
} from '../helpers/github'
//import tocHelper from '../helpers/toc'
import {
    rend
} from '../helpers/render'

import vAffix from './Affix.vue'

export default {
    name: 'Detail',
    data() {
        return {
            loading: true,
            detail: {},
            status:'正在加载...',
        }
    },
    mounted() {
        if (this.loading)
            document.title = "loading ---- 青枫浦 Lite";
    },
    destroyed() {
        this.loading = true;
    },
    created() {
        let flag=this.$route.params.id;
        github.getDetail(flag).then(
            (res) => {
                this.status='正在解析...';
                this.loading = false;
                this.detail = res;
                this.detail.rend = rend(flag,this.detail.body);
                document.title = res.title;
            },
            (res) => {
                this.status='从服务端数据失败...';
            }
        );
    },
    components: {
        vAffix
    }
}

</script>

