<template>
  <transition name="fade">
    <section class="page" v-virtual-scroller>
      <div>
        <div v-if="loadOk" id="slogan">
          <a :href="profile.html_url" target="_blank">
            <img :src="profile.avatar_url" >
          </a>
          <h1>{{profile.login}}</h1>
          <p>{{ tip.tip }}</p>
        </div>
      <div v-if="loadOk"  id="posts">

              <router-link class="post" :to="'/detail/'+item.number" v-for="item in details"
                           v-bind:key="item.id">
                <h2>{{ item.title }}</h2>
                <div v-if="item.labels.length>0">
                  <span v-bind:style="label.style" v-for="label in item.labels" :key="label.id"># {{ label.name }}</span>
                </div>
                <p>{{ date_format(item.created_at) }}</p>
              </router-link>
      </div>
        <Footer></Footer>
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import { config } from "../config";
import Tip from "../helpers/tip";
import Render from "../helpers/render";
import { date_format } from "@/helpers/utils";
import {defineComponent} from "vue";
import { getList } from '@/helpers/api'
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "List",
  components: {Footer},
  loadOl:false,
  items:[],
  status: "Loading...",
  loadingClass: "iconfont icon-loading if-spin if-3x if-main",
  title: config.site.name,
  tip: {
    tip: "时光带有了一切，却唯独留下了我。",
    from: '佚名'
  },
  data() {
    return {
      loadOk: false,
      items:[] as any,
      status: "Loading...",
      loadingClass: "iconfont icon-loading if-spin if-3x if-main",
      title: config.site.name,
      tip: {
        tip: "时光带有了一切，却唯独留下了我。",
        from: '佚名'
      },
      detail:{} as any,
    }
  },
  mounted() {
    Render.loading_start();
    document.title = config.site.name;
  },
  created() {
    getList().then(
        res => {
          this.items = res;
          this.loadOk = true;
          Render.loading_end();
        },
        res => {
          this.status = `Error:${res.statusText}`;
          this.loadingClass = "iconfont icon-loading if-3x if-main";
        }
    );
    Tip.getHitokoto().then(res => {
      this.tip = res;
    });
  },
  computed: {
    profile(): any{
      return this.items[0].user;
    },
    createAt():string {
      return date_format(this.detail.created_at);
    },
    details: function ():[] {
      return this.items;
    }
  },
  methods: {
    date_format(date: string) {
      return date_format(date);
    }
  }
});
</script>
