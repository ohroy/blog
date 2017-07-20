import {
    EventEmitter
} from 'events'
import Vue from 'vue'
const github = new EventEmitter()
const itemsCache = Object.create(null);
const githubURl = 'https://api.github.com/repos/rozbo/blog/issues';
const author='rozbo';
let listCache='';

github.getList = function() {
    return new Promise((resolve, reject) => {
        if(listCache!=''){
            resolve(listCache);
        }
        Vue.http.get(githubURl+'?creator='+author).then(
            (response) => {
                listCache=response.body;
                resolve(response.body);
            }, reject
        );
    });
}

github.getDetail = id => {
    return new Promise((resolve, reject) => {
        if (itemsCache[id]) {
            console.log("bycache");
            resolve(itemsCache[id])
        } else {
            Vue.http.get(githubURl + '/' + id).then(
                (response) => {
                    console.log(response);
                    itemsCache[id] = response.body;
                    console.log("by get");
                    resolve(itemsCache[id]);
                }, reject
            );
        }
    });
}

export {
    github
};
