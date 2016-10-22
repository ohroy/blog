import moment from 'moment'
import marked from 'marked'
import highlight from 'highlight.js'

moment.locale('Zh_cn');

marked.setOptions({
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});

export function fromNow(time) {
    return moment(time).fromNow();
}

export function md2html(md) {
    return marked(md);
}
