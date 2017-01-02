import marked from 'marked'
import Prism from 'prismjs'
import prism_php from 'prismjs/components/prism-php'
import prism_shell from 'prismjs/components/prism-shell'

let toc = [];

renderInit();

function renderInit() {
    const renderer = new marked.Renderer();
    // highlight code
    renderer.code = function(code, lang = '') {
        const hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
            .replace(/{{/g, '<span>{{</span>');
        return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
    }
    renderer.heading = function(text, level) {
        toc.push({
            level,
            title: text
        })
        return `<h${level} id="${text}"><a href="#${text}">
        ${text}</a></h${level}>`
    }
    marked.setOptions({
        renderer
    });
}




export function md2html(md) {
    toc = [];
    return marked(md);
}

export function summary(md) {
    return md2html(md)
        .replace(/<pre[\s\S]*>[\s\S]*<\/pre>/g, "[code]code[/code]")
        .replace(/<h[1-7][\s\S]*?>[\s\S]*?<\/h[1-7]>/g, "")
        .replace(/<(\/{0,1})code>/g, `[$1code]`)
        .replace(/<[^>]+>/g, " ")
        .replace(/\[(\/{0,1})code\]/g, `<$1code>`)
        .replace(/\n/g, "")
        .substr(0, 188) + "...";
}
export {
    toc
};
