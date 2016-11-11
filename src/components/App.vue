<template>
<div id="app">
    <section class="hero is-primary">
        <div class="hero-head">
            <div class="container">
                <nav class="nav">
                    <div class="nav-left">
                        <a class="nav-item is-brand" href="/#/list">
                            青枫浦 Lite
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    </section>
    <section class="section">
        <router-view class="view" keep-alive transition transition-mode="out-in">
        </router-view>
    </section>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <p>
                    <strong>simple blog</strong> by <a href="http://post.zz173.com">rozbo</a>.
                </p>
                <p>
                    say thanks to
                    <a class="icon" href="https://github.com/rozbo/blog">
                        <i class="fa fa-github"></i>
                    </a>
                </p>
            </div>
        </div>
    </footer>
</div>
</template>
<script>
export default {
    name: 'index',
    data: function() {
        return {
            subtitle: '青枫浦 Lite',
        }
    }
}
</script>
<style>
.footer {
    padding: 20px 20px 10px;
}

img {
    display: block;
}
</style>
