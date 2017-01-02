<template>
<section class="panel features dark" id="features">
    <h1>落月博客        </h1>
    <p>白云一片去悠悠,青枫浦上不胜愁.</p>
    <div v-if="!loadOk" class="has-text-centered">

        <span class="icon is-large">
                <i class="fa fa-spinner fa-spin  fa-3x fa-fw"></i>
                </span>
    </div>
    <div v-else class="blocks stacked">
        <div class="block odd" v-for="item in details">
            <div class="text">
                <h2><a :title="item.title" :href="'/detail/'+item.number">{{item.title}}</a></h2>
                <p v-html="item.body"></p>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    github
} from '../helpers/github'
import {
    summary
} from '../helpers/render'
export default {
    name: 'List',
    data() {
        return {
            loadOk: false,
            items: []
        }
    },
    attached() {
        document.title = "青枫浦 Lite";
    },
    created() {
        github.getList().then(
            (res) => {
                this.items = res;
                this.loadOk = true;
            },
            (res) => {
                console.log(error);
            }
        )
    },
    computed: {
        details: function() {
            for (let item of this.items) {
                item.body = summary(item.body);
            }
            return this.items
        }

    }
}
</script>
