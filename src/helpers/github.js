import {
    EventEmitter
} from 'events'
import Vue from 'vue'
const github = new EventEmitter()
const itemsCache = Object.create(null);
export default github



github.getList = function() {
    return new Promise((resolve, reject) => {
        Vue.http.get('https://api.github.com/repos/jamesfancy/jamesfancy.github.io/issues').then(
            (response) => {
                resolve(response.body);
            }, (response) => {
                reject();
            }
        );
    });
}

github.getDetail = id => {
    return new Promise((resolve, reject) => {
        if (itemsCache[id]) {
            console.log("bycache");
            resolve(itemsCache[id])
        } else {
            Vue.http.get('https://api.github.com/repos/jamesfancy/jamesfancy.github.io/issues/' + id).then(
                (response) => {
                    itemsCache[id] = response.body;
                    console.log("by get");
                    resolve(itemsCache[id]);
                }, reject
            );
        }
    });
}
