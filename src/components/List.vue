<template>
<section class="panel features dark" id="features">
    <h1>落月博客</h1>
    <p>{{tip}}</p>
    <template v-if="!loadOk">
    <p>
        <i :class="loadingClass"></i>
    </p>
    <p>
        {{status}}
    </p>
    </template>
    <div v-else class="blocks stacked">

        <div class="block odd" v-for="item in details">
            <div class="text">
                <h2><router-link :to="'/detail/'+item.number">{{item.title}}</router-link>
                    </h2>
                <p v-html="item.rend.summary"></p>
            </div>
        </div>

    </div>
</section>
</template>

<script>
import {
    github
} from '../helpers/github'
import
    * as iconfont
 from '../style/iconfont.css'
import {
    rend
} from '../helpers/render'
import {
    getTip
} from '../helpers/tip'
export default {
    name: 'List',
    data() {
        return {
            loadOk: false,
            items: [],
            status:'Loading...',
            loadingClass:'iconfont icon-loading if-spin if-3x if-main'
        }
    },
    mounted() {
        document.title = "青枫浦 Lite";
    },
    created() {
        github.getList().then(
            (res) => {
                this.items = res;
                this.loadOk = true;
            },
            (res) => {
                this.status=`Error:${res.statusText}`;
                this.loadingClass='iconfont icon-loading if-3x if-main';
            }
        )
    },
    computed: {
        details: function() {
            for (let item of this.items) {
                item.rend = rend(item.number,item.body);
            }
            return this.items
        },
        tip:getTip
    }
}
</script>
