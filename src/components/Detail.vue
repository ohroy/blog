<template>
<div class="container">
    <div class="content">
        <div v-if="loading" class="has-text-centered">
            <span class="icon is-large">
  <i class="fa fa-spinner fa-spin  fa-3x fa-fw"></i>
</span>
        </div>
        <div v-else class="detail">
            <div class="detail-title">
                <p class="has-text-centered title is-4">{{detail.title}}</p>
            </div>
            <hr/>
            <div class="detail-body">{{{ detail.body | md2html}}}</div>

        </div>
    </div>
</template>
<script>
import {
    github
} from '../helpers/github'
//import tocHelper from '../helpers/toc'
export default {
    name: 'index',
    data() {
        return {
            loading: true,
            detail: {}
        }
    },
    attached() {
        if (this.loading)
            document.title = "loading ---- 青枫浦 Lite";
    },
    detached() {
        this.loading = true;
    },
    route: {
        data({
            to
        }) {
            console.log(this.loading);
            return github.getDetail(to.params.id).then(
                (res) => {
                    this.loading = false;
                    this.detail = res;
                    //this.detail.toc = tocHelper(res.body);
                    document.title = res.title;
                },
                (res) => {
                    this.loading = false;
                    res = {
                        title: '加载失败',
                        content: '请稍后重试.'
                    };
                    this.detail = res;
                }
            )
        }
    }
}
</script>
<style>
/*

Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax

base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401

*/

.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #383a42;
    background: #fafafa;
}

.hljs-comment,
.hljs-quote {
    color: #a0a1a7;
    font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
    color: #a626a4;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
    color: #e45649;
}

.hljs-literal {
    color: #0184bb;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
    color: #50a14f;
}

.hljs-built_in,
.hljs-class .hljs-title {
    color: #c18401;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
    color: #986801;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
    color: #4078f2;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}

.hljs-link {
    text-decoration: underline;
}

.detail-title {
    margin-bottom: 20px;
}
</style>
