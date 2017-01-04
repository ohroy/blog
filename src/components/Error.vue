<template>
    <section class="panel statement dark">
        <div class="content">
            <div class="browser-window">
                <div class="top-bar">
                    <div class="circles">
                        <div class="circle circle-red"></div>
                        <div class="circle circle-yellow"></div>
                        <div class="circle circle-green"></div>
                    </div>
                </div>
                <div class="window-content" v-html="codes">
                </div>
            </div>
        </div>

    </section>
</template>
<script>
import {
    code
} from '../helpers/render'
export default {
    name: 'Error',
    computed:{
    codes:function () {
        let str=
        `<?php

            //输出404状态
            header('HTTP/1.1 404 Not Found');
            header("status: 404 Not Found");
            //定义404数据
            $array=(
                'status'=>false,
                'code'=>404,
                'reason'=>'Not Found',
                'remark'=>'雾霾太大了,这个页面根本看不清.',
                'time'=>time(),
                'try'=>'/list',
                'contact'=>'rozbo'
            );
            //转换json
            $json2show=json_encode($array);
            //输出
            die($json2show);
        `;
        return code(str,'php',true);
        }
    }
}
</script>