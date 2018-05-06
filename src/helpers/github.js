import {
    EventEmitter
} from 'events'
import {config} from '../config'
import { http } from '../helpers/utils'
const github = new EventEmitter()
let itemsCache = Object.create(null);
const author=config.user.name;
const githubURl = '/repos/'+author+'/'+config.user.repo+'/issues';
let listCache='';

github.getList = function() {
    return new Promise((resolve, reject) => {
        if(listCache!=''){
            resolve(listCache);
        }
        http.get(githubURl,{'creator':author}).then(
            (response) => {
                listCache=response;
                resolve(response);
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
            http.get(githubURl + '/' + id).then(
                (response) => {
                    itemsCache[id] = response;
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
