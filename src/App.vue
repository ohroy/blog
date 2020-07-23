<template>
  <div id="app" class="docs scotchified">
    <nav class="main mb-6">
      <div class="container-lg d-flex flex-justify-between pl-3">
        <router-link :to="'/list'" class="brand">
          <img :src="brand" />
          <span class="h1">青枫浦 Lite</span>
        </router-link>
      </div>
    </nav>
    <section id="top">
      <router-view></router-view>
    </section>
    <footer class="main container-lg">
      <p>
        This is A light style blog based on Vue with Github api, open source by
        <a
          href="https://github.com/rozbo"
        >rozbo</a>
      </p>
    </footer>
  </div>
</template>
<script>
import "@primer/css/index.scss";
import "./style/main.scss";
import "./style/nav.scss";
import "./style/footer.scss";
import * as brand from "./assets/svg/brand.svg";
export default {
  name: "app",
  data: function() {
    return {
      subtitle: "青枫浦 Lite",
      brand: brand
    };
  }
};
</script>

