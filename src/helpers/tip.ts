import { http } from "../helpers/utils";
interface TipDetail {
  tip: string;
  from: string;
}
export default class Tip {
  public static getHitokoto(): Promise<TipDetail> {
    return new Promise((resolve, reject) => {
      http.get("/", "c=g", "https://v1.hitokoto.cn").then((response:any) => {
        resolve({ tip: response.hitokoto, from: response.from });
      }, reject);
    });
  }
}
