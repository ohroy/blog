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

                    <transition-group appear name="list" tag="ul">
                    <!--<li v-for="(toc,index) in detail.rend.toc" v-bind:key="index">-->
                        <!--<a v-smooth-scroll :href="'#'+toc.title" v-html="toc.title"></a>-->
                        <!--<ul v-if="toc.sub.length>0">-->
                            <!--<li v-for="sub in toc.sub">-->
                                <!--<a v-smooth-scroll :href="'#'+sub.title" v-html="sub.title"></a>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</li>-->
                    </transition-group>
                <ul>
                    <li>
                        <a v-smooth-scroll href="#top">返回顶部</a>
                    </li>
                </ul>

            </section>
            </v-affix>
            <article>
                <div class="Subhead">
                    <div class="Subhead-heading">{{detail.title}}</div>
                </div>



                <div class="markdown-body" v-html="detail.body_html">
                </div>


            </article>
        </div>
        <div id="comments">
        </div>
    </section>
</template>
<style scoped lang="scss">
    @import "primer-markdown/index.scss";
</style>

<script>
    import 'github-syntax-light/lib/github-light.css'
    import * as gitment_css from '../style/gitment.css'
import {
    github
} from '../helpers/github'



import Gitment from '../directives/gitment'

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
        let flag=this.$route.params.id;
        if (this.loading)
            document.title = "loading ---- 青枫浦 Lite";
        const gitment = new Gitment({
            id: flag, // optional
            meta:this.detail
        })
        gitment.render('comments')
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
                //this.detail.html = ''//rend(flag,this.detail.body);
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

