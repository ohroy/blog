import {http} from "@/helpers/utils";
import { config } from "@/config";
let listCache:Array<any> = [];
const itemsCache:any = {};
const author = config.user.name;
const githubURl = "/repos/" + author + "/" + config.user.repo + "/issues";
import {RGB} from "@/helpers/color"

const hasLabel = (issues, name) => {
  const lables = issues.labels;
  const now = lables.filter((v) => {
    return v.name === name;
  });
  return now.length > 0;
};
function processLabels(issue){
  const labels = issue.labels;
  labels.forEach(label => {
    // process label style
    const rgb = new RGB(label.color);
    label.style = 'backgroud:#'+label.color+';color:'+rgb.getFrontColorW3c();
    label.style = '--label-r:'+rgb.r+';'+'--label-g:'+rgb.g+';'+'--label-b:'+rgb.b;
  })
}


export function getList():Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    if (listCache.length > 0) {
      resolve(listCache);
    }
    http.get(githubURl, { creator: author }).then((response) => {
      const topTopics:Array<any> = [];
      const normalTopics:Array<any> = [];
      response.forEach((v) => {
        if (hasLabel(v, "hidden")) {
          return;
        }
        processLabels(v);
        if (hasLabel(v, "top")) {
          v.isTop = true;
          topTopics.push(v);
          return;
        }
        normalTopics.push(v);
      });
      listCache = topTopics.concat(normalTopics);
      resolve(listCache);
    }, reject);
  });
}


export function getDetail(id):any{
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      console.log("bycache");
      resolve(itemsCache[id]);
    } else {
      http.get(githubURl + "/" + id).then((response) => {
        itemsCache[id] = response;
        console.log("by get ---");
        resolve(itemsCache[id]);
      }, reject);
    }
  });
};