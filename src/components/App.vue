<template>
<div id="app" class="docs scotchified">
    <nav class="main">
        <div class="container">
            <a href="/list" class="brand">
                <span class="logo">
		</span> 青枫浦 Lite
            </a>

            <div class="responsive-sidebar-nav">
                <a href="#" class="toggle-slide menu-link btn">☰</a>
            </div>
        </div>
    </nav>
    <section class="section">
        <router-view class="view" keep-alive transition transition-mode="out-in">
        </router-view>
    </section>
    <footer class="main">
        <p>This is A simple blog light style.</p>
        <p class="less-significant">say thanks to <a href="https://github.com/rozbo">Github</a></p>
    </footer>
</div>
</template>
<script>
import * as css from '../style/main.css'
export default {
    name: 'app',
    data: function() {
        return {
            subtitle: '青枫浦 Lite',
        }
    }
}
</script>
