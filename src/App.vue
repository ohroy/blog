<template>
    <div id="bar"></div>
    <router-view></router-view>
</template>
<script lang="ts">
import "github-markdown-css";
import "./style/main.scss";
import brand from "./assets/svg/brand.svg";
import {defineComponent} from "vue";
export default defineComponent({
  name: "app",
  data() {
    return {
      subtitle: "青枫浦 Lite",
      brand: brand
    };
  }
});
</script>

