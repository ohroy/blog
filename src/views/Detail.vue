<template>
  <transition name="fade">

    <section class="page detail" v-virtual-scroller @x-scroll="scroll" v-toc>
      <div>
      <div id="post" v-if="!loading">
        <Back></Back>
        <h1>{{ detail.title }}</h1>
          <p>write at<span> {{ createAt }}</span>, by
            <span>
                {{ detail.user.login }}</span>
        <template v-if="detail.labels.length>0">
          , and tag with
          <template v-bind:style="label.style" v-for="(label,key) in detail.labels" :key="label.id"> #{{ label.name }}</template>
        </template>
          </p>
        <div ref="markdown_body" class="markdown-body" v-html="detail.body_html"></div>
      </div>

      <div id="comments" class="container-lg mt-3 px-3 d-flex border-top"></div>
        <Footer></Footer>
      </div>


    </section>
  </transition>

  <div id="markdown-toc" class="toc"></div>
</template>


<script lang="ts">
import "../style/gitment.scss";
import "../style/toc.scss";
import { getDetail }  from "../helpers/api";
import Render from "../helpers/render";
import Gitment from "../directives/gitment";
import { date_format } from "@/helpers/utils";
import tocbot from "tocbot";
import {defineComponent,onUpdated,onUnmounted,onMounted} from "vue";
import Footer from "@/components/Footer.vue";
import Back from "@/components/Back.vue";

export default defineComponent({
  name: "Detail",
  components: {Footer,Back},
  loading: true,
  status: "正在加载...",
  has_toc: false,
  methods: {
    scroll(event) {
      if(this.topBar!=null) {
        const {current, total} = event.detail;
        (this.topBar as any).style.width = `${(current / total) * 100}%`
      }
    }
  },
  computed: {
    userLink(): string {
      return "https://github.com/" + this.detail.user.login;
    },
    createAt():string {
      return date_format(this.detail.created_at);
    },
    avatar():string {
      return this.detail.user.avatar_url + "&s=20";
    }
  },
  data() {
    return {
      had_toc: false,
      loading: true,
      detail: {} as any,
      status: "正在加载...",
      has_toc: false,
      topBar: document.querySelector('#bar')
    };
  },
  mounted() {
    Render.loading_start();
  },
  unmounted() {
    this.loading = true;
  },
  watch: {
    detail: {
      handler(val, oldVal) {
        if (!this.loading) {
          let flag = this.$route.params.id;
          if (this.loading) document.title = "loading ---- 青枫浦 Lite";
          const gitment = new Gitment({
            id: flag, // optional
            meta: this.detail
          });
          gitment.render("comments");
        }
      }
    }
  },
  created() {
    let flag = this.$route.params.id;
      getDetail(flag).then(
        res => {
          this.status = "正在解析...";
          this.loading = false;
          this.detail = res;
          //this.detail.html = ''//rend(flag,this.detail.body);
          document.title = res.title;
          Render.loading_end();
        },
        res => {
          this.status = "从服务端数据失败...";
        }
    );
  }
});
</script>

