
import { config } from "../config";
import { http } from "./utils";

let itemsCache = Object.create(null);
const author = config.user.name;
const githubURl = "/repos/" + author + "/" + config.user.repo + "/issues";
let listCache:any[];

function hasLabel(issues, name):boolean {
  const lables = issues.labels;
  const now = lables.filter((v) => {
    return v.name === name;
  });
  return now.length > 0;
};

async function getList() :Promise<any[]>{
  return new Promise((resolve, reject) => {
    if (listCache != undefined) {
      resolve(listCache);
    }
    http.get(githubURl, { creator: author }).then((response) => {
      const topTopics = [];
      const normalTopics = [];
      response.forEach((v) => {
        if (hasLabel(v, "hidden")) {
          return;
        }
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
};

const getDetail = (id) => {
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
export const github  = {
  getDetail,
  getList,
  hasLabel
}

