<template>
  <transition name="fade">
<section class="container-lg px-3" id="features">
    <div class="blankslate blankslate blankslate-clean-background">
        <h3 class="d-inline-block mr-2 mb-1">{{tip}}</h3>
    </div>
    <div v-if="loadOk" class="blocks stacked ">
        <hr class="mt-0 mb-4">
        <ul class="list-style-none border-left ml-3 pr-4" v-for="item in details">
            <li class="mb-4 clearfix">
            <div class="float-left d-inline-block border py-1 px-2 ml-n3 mr-2 bg-white" style="height: 32px; width: 32px; border-radius: 50%;">
                <svg height="16" class="octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock octicon octicon-clock mr-1" aria-label="clock" viewBox="0 0 14 16" version="1.1" width="14" role="img"><path fill-rule="evenodd" d="M8 8h3v2H7c-.55 0-1-.45-1-1V4h2v4zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path></svg>
            </div>
            <div class="overflow-hidden mt-1 pl-2">
                {{item.created_at|date_format}}
                <h4 class="lh-condensed mt-1">
                    <router-link :to="'/detail/'+item.number">{{item.title}}</router-link>
                </h4>
            </div>
        </li>
        </ul>

    </div>
</section>
  </transition>
</template>

<script>
import { github } from "../helpers/github";

import { config } from "../config";

import Tip from "../helpers/tip";

import Render from "../helpers/render";
export default {
  name: "List",
  data() {
    return {
      loadOk: false,
      items: [],
      status: "Loading...",
      loadingClass: "iconfont icon-loading if-spin if-3x if-main",
      title: config.site.name,
      tip: ""
    };
  },
  mounted() {
    Render.loading_start();
    document.title = config.site.name;
  },
  created() {
    github.getList().then(
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
    details: function() {
      return this.items;
    }
  }
};
</script>
