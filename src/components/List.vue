<template>
<div class="container">
    <div class="heading">
        <h1 class="title">博文列表</h1>
        <h2 class="subtitle">
到如今，年复一年，我不能停止怀念，怀念你，怀念从前。
      </h2>
    </div>
    <br/>
    <div class="content">
        <div v-if="!items.length">
            <span class="icon is-large">
  <i class="fa fa-spinner fa-spin  fa-3x fa-fw"></i>
</span>
        </div>
        <div v-else class="box">
            <article class="media" v-for="item in items">
                <figure class="media-left">
                    <p class="image is-64x64">
                        <a title={{item.user.login}} :href="item.user.html_url" target="_blank"><img :src="item.user.avatar_url">
                        </a>
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <a id="title" title={{item.title}} :href="'#/detail/'+item.number">{{item.title}}</a> <br/>由
                        <small>@{{item.user.login}}</small>更新于{{item.updated_at|fromNow}}
                    </div>
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item" v-for="label in item.labels">
                                <span class="tag" :style="'color:white;background-color:#'+label.color">
{{label.name}}
  </span></div>
                        </div>
                    </nav>

                </div>
                <div class="media-right">
                    <a target="_blank" href="{{item.html_url}}" class="button is-primary is-outlined">{{item.comments}}</a>
                </div>
            </article>

        </div>
    </div>
</div>
</template>

<script>
import github from '../helpers/github'
export default {
    name: 'LIst',
    data() {
        return {
            items: []
        }
    },
    created() {
        github.getList().then(
            (res) => {
                this.items = res;
                console.log(res);
            },
            (res) => {
                console.log(error);
            }
        )
    }
}
</script>
<style>
#title {
    font-size: 15px;
    text-decoration: none;
    border-bottom: 0px;
}
</style>
