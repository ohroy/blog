<template>
    <section>
        <div v-if="loading" class="panel features">
            <p>
                <i class="iconfont icon-loading if-spin if-3x if-main"></i></p>
            <p>{{status}}
            </p>
        </div>
        <div v-else class="docs-wrapper container">

            <section class="sidebar">
                <ul>
                    <template v-for="toc in detail.toc">
                        <li>
                            <a :href="'#'+toc.title" v-html="toc.title"></a>
                            <ul v-if="toc.sub.length>0">
                                <li v-for="sub in toc.sub">
                                    <a :href="'#'+sub.title" v-html="sub.title"></a>
                                </li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </section>

            <article>
                <h1>{{detail.title}}</h1>
                <div v-html="detail.body">
                </div>
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
    tocList,
    md2html
} from '../helpers/render'
export default {
    name: 'Detail',
    data() {
        return {
            loading: true,
            detail: {},
            status:'正在加载...',
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
                this.status='正在解析...';
                this.loading = false;
                this.detail = res;
                this.detail.body = md2html(this.detail.body);
                this.detail.toc = tocList();
                document.title = res.title;
            },
            (res) => {
                this.status='从服务端数据失败...';
            }
        );
    }
}

</script>

