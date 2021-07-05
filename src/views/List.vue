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
          <div class="menu">
            <a target="_blank" href="https://github.com/rozbo">
              <ali-icon width="22" height="22" icon-name="github" icon-color="#F75280"><icon-github /></ali-icon>
            </a>
            <a href="/sponsor">
              <ali-icon width="22" height="22" icon-name="donate"><icon-donate /></ali-icon>
            </a>
            <a href="/about">
              <ali-icon width="22" height="22" icon-name="me" icon-color="#F75280"><icon-me /></ali-icon>
            </a>
          </div>
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
import IconMe from "@/components/icons/IconMe.vue";
import IconDonate from "@/components/icons/IconDonate.vue";
import IconGithub from "@/components/icons/IconGithub.vue";
import IconBase from "@/components/IconBase.vue";
import AliIcon from "@/components/AliIcon.vue";
export default defineComponent({
  name: "List",
  components: {
    Footer,
    // IconBase,
    // IconMoon,
    IconMe,
    AliIcon,
    IconGithub,
    IconDonate,
  },
  loadOl:false,
  items:[],
  status: "Loading...",
  loadingClass: "iconfont icons-loading if-spin if-3x if-main",
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
      loadingClass: "iconfont icons-loading if-spin if-3x if-main",
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
          this.loadingClass = "iconfont icons-loading if-3x if-main";
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
