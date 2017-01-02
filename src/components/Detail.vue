<template>
<section>
    <div v-if="loading" class="has-text-centered">
        <span class="icon is-large">
  <i class="fa fa-spinner fa-spin  fa-3x fa-fw"></i>
</span>
    </div>
    <div v-else class="docs-wrapper container">

        <section class="sidebar">
            <ul v-for="toc in detail.toc">
                <li v-if="toc.level==2 || toc.level==3">
                    <a v-if="toc.level==2" :href="'#'+toc.title">{{toc.title}}</a>
                    <ul v-if="toc.level==3">
                        <li><a :href="'#'+toc.title">{{toc.title}}</a></li>
                    </ul>
                </li>
            </ul>
        </section>

        <article>
            <h1>{{detail.title}}</h1>
            <div v-html="detail.body"></div>
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
    toc,
    md2html
} from '../helpers/render'
export default {
    name: 'Detail',
    data() {
        return {
            loading: true,
            detail: {}
        }
    },
    attached() {
        if (this.loading)
            document.title = "loading ---- 青枫浦 Lite";
    },
    detached() {
        this.loading = true;
    },
    created() {
        github.getDetail(this.$route.params.id).then(
            (res) => {
                this.loading = false;
                this.detail = res;
                this.detail.body = md2html(this.detail.body);
                this.detail.toc = toc;
                document.title = res.title;
            },
            (res) => {
                this.loading = false;
                res = {
                    title: '加载失败',
                    content: '请稍后重试.'
                };
                this.detail = res;
            }
        );
    }
}
</script>
