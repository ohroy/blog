import {ObjectDirective} from "@vue/runtime-core";
import VirtualScroll from 'virtual-scroll'

export const VirtualScrollDirective:ObjectDirective = {
    mounted(ele):void{
        const scroller = new VirtualScroll();
        let scrollY = 0;
        const [child] =  ele.children;
        scroller.on(e => {
            scrollY += e.deltaY
            scrollY = Math.max((child.scrollHeight - window.innerHeight) * -1, scrollY)
            scrollY = Math.min(0, scrollY);
            const myEvent = new CustomEvent('x-scroll', {
                detail:{
                    current:-scrollY || 0,
                    total:child.scrollHeight - window.innerHeight
                },
            });
            ele.dispatchEvent(myEvent);

            const style = `translateY(${scrollY}px) translateZ(0)`
            child.style.webkitTransform = style
            child.style.mozTransform = style
            child.style.msTransform = style
            child.style.transform = style
        })
    }
}