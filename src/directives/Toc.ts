import {ObjectDirective} from "@vue/runtime-core";
import VirtualScroll from 'virtual-scroll'

export const TocDirective:ObjectDirective = {
    mounted(ele:Element):void{
        ele.addEventListener('scroll',function (map) {
            console.log("!23");
        })
    }
}