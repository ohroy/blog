const Tip = {}
import { http } from '../helpers/utils'
Tip.getHitokoto = () => {
    return new Promise((resolve, reject) => {
        http.get("/", "c=g", "https://v1.hitokoto.cn").then(
            (response) => {
                resolve(response.hitokoto);
            }, reject
        );
    });
}
export default Tip 