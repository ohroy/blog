import marked from 'marked'
import Prism from 'prismjs'
import prism_php from 'prismjs/components/prism-php'
import prism_bash from 'prismjs/components/prism-bash'
import prism_line_num from 'prismjs/plugins/line-numbers/prism-line-numbers'


let toc = [];
let cache={};

+(function renderInit() {
    const renderer = new marked.Renderer();
    // highlight code
    renderer.code = code;
    renderer.heading = function(text, level) {
        toc.push({
            level,
            title: text
        })
        if(level==2){
            return `<h${level} id="${text}"><a href="#${text}">
        ${text}</a></h${level}>`
        }
        return `<h${level} id="${text}">
        ${text}</h${level}>`
    }
    marked.setOptions({
        renderer
    });
})()


export function code(code,lang='',line=false){
    const hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
        .replace(/{{/g, '<span>{{</span>');
    let lineNumClass='';
    if(line){
        lineNumClass=' line-numbers';
    }
    return `<pre class="language-${lang}${lineNumClass}"><code class="language-${lang}">${hl}</code></pre>`
}
function md2html(md) {
    let res=marked(md);
    return res;
}

export function rend(flag,src){
    if(!cache[flag]){
        toc=[];
        cache[flag]={};
        cache[flag].html=md2html(src);
        cache[flag].toc=tocList();
        cache[flag].summary=summary(src);
    }
    return cache[flag];

}


function summary(md) {
    return md2html(md)
        .replace(/<pre[\s\S]*>[\s\S]*<\/pre>/g, "[code]code[/code]")
        .replace(/<h[1-7][\s\S]*?>[\s\S]*?<\/h[1-7]>/g, "")
        .replace(/<(\/{0,1})code>/g, `[$1code]`)
        .replace(/<[^>]+>/g, " ")
        .replace(/\[(\/{0,1})code\]/g, `<$1code>`)
        .replace(/\n/g, "")
        .substr(0, 188) + "...";
}
function tocList() {
    let res = [];
    for (var i = 0; i < toc.length;) {
        if (toc[i].level == 2) {
            let lv2 = toc[i];
            lv2.sub = new Array();
            i++;
            while (i < toc.length) {
                if (toc[i].level == 3) {
                    lv2.sub.push(toc[i]);
                    i++;
                } else {
                    break;
                }
            }
            res.push(lv2);
        } else {
            i++;
        }
    }
    return res;
}

