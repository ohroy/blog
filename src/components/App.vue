<template>
<div id="app">
    <section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
        <a :href="'#list'">清风浦 lite</a>
      </h1>
                <h2 class="subtitle">
        更轻薄的博客。
      </h2>
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
                    <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
                </p>
                <p>
                    <a class="icon" href="https://github.com/jgthms/bulma">
                        <i class="fa fa-github"></i>
                    </a>
                </p>
            </div>
        </div>
    </footer>
</div>
</template>
