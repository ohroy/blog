<template>
<div id="app" class="docs scotchified">
    <nav class="main">
        <div class="container">

            <router-link :to="'/list'" class="brand">
                青枫浦 Lite</router-link>
        </div>
    </nav>
    <section class="section" id="top">
        <router-view>
        </router-view>
    </section>
    <footer class="main container">
        <p>This is A simple blog light style.</p>
        <p class="less-significant">say thanks to <a href="https://github.com/rozbo">Github</a></p>
    </footer>
</div>
</template>
<script>
import "primer/index.scss";
import "primer-layout/index.scss";
import "../style/nav.scss";
import "../style/footer.scss";
export default {
    name: 'app',
    data: function() {
        return {
            subtitle: '青枫浦 Lite',
        }
    }
}
</script>
