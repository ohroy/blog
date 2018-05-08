<template>
    <section class="">
        <div v-if="loading" class="loading">
            <p>
                <i class="iconfont icon-loading if-spin if-3x if-main"></i></p>
            <p>{{status}}
            </p>
        </div>
        <div v-else class="container-lg px-3 d-flex">
            <article class="col-12 col-md-8">
                <h1 class="lh-condensed">
                    {{detail.title}}
                </h1>
                <ul class="d-flex flex-wrap mt-1 mb-2 list-style-none text-gray">
                    <li class="my-1 mr-4 no-wrap">
                        <svg height="16" class="octicon octicon-calendar mr-1" aria-label="calendar" viewBox="0 0 14 16" version="1.1" width="14" role="img"><path fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"></path></svg>
                        {{detail.created_at|date_format}}
                    </li>

                    <li class="my-1 mr-4 no-wrap">
                        <a class="d-flex flex-items-center text-gray no-underline" :href="detail.user.login|fill_user_url" >
                            <span class="d-inline-block v-align-middle overflow-hidden mr-1 rounded-1" style="width: 20px; height: 20px;"><img class="avatar avatar-small" :src="avatar" :alt="detail.user.login" data-proofer-ignore="true"></span>
                            <span>{{detail.user.login}}</span>
                        </a>
                    </li>

                </ul>
                <div ref="markdown_body" class="markdown-body" v-html="detail.body_html">
                </div>
            </article>
            <div class="d-none d-md-block col-md-3 offset-md-1">
                <nav ref="markdown_toc" id="markdown-toc" class="toc toc-right js-toc relative z-1 transition--300 absolute pa4 is-position-fixed"></nav>
            </div>
        </div>
        <div id="comments" class="container-lg mt-3 px-3 d-flex border-top">
        </div>
    </section>
</template>


<script>
    import 'github-syntax-light/lib/github-light.css'
    import * as gitment_css from '../style/gitment.css'
    import '../style/toc.scss'
    import "primer-markdown/index.scss";
import {
    github
} from '../helpers/github'
import Render from '../helpers/render'
import Gitment from '../directives/gitment'

import tocbot from 'tocbot'
export default {
    name: 'Detail',
    filters:{
        'fill_user_url':(v)=>{
            return 'https://github.com/'+v
        }
    },
    methods: {
    },
    computed:{
        avatar(){
            return this.detail.user.avatar_url + "&s=20"
        }
    },
    data() {
        return {
            loading: true,
            detail: {},
            status:'正在加载...',
            has_toc:false,
        }
    },
    mounted() {
    },
    beforeDestory () {
    },
    destroyed() {
        this.loading = true;
    },
    updated(){
        if(!this.had_toc&&!this.loading){
            Render.general_ids();
            tocbot.init({
                // Where to render the table of contents.
                tocSelector: '#markdown-toc',
                // Where to grab the headings to build the table of contents.
                contentSelector: '.markdown-body',
                // Which headings to grab inside of the contentSelector element.
                headingSelector: 'h1, h2, h3',
            });
            this.had_toc=true;
            let flag=this.$route.params.id;
            if (this.loading)
                document.title = "loading ---- 青枫浦 Lite";
            const gitment = new Gitment({
                id: flag, // optional
                meta:this.detail
            })
            gitment.render('comments');
        }
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


    }
}

</script>

