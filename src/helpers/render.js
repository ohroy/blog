
let toc = [];
let cache={};






// function summary(md) {
//     return md2html(md)
//         .replace(/<pre[\s\S]*>[\s\S]*<\/pre>/g, "[code]code[/code]")
//         .replace(/<h[1-7][\s\S]*?>[\s\S]*?<\/h[1-7]>/g, "")
//         .replace(/<(\/{0,1})code>/g, `[$1code]`)
//         .replace(/<[^>]+>/g, " ")
//         .replace(/\[(\/{0,1})code\]/g, `<$1code>`)
//         .replace(/\n/g, "")
//         .substr(0, 188) + "...";
// }
// function tocList() {
//     let res = [];
//     for (var i = 0; i < toc.length;) {
//         if (toc[i].level == 2) {
//             let lv2 = toc[i];
//             lv2.sub = new Array();
//             i++;
//             while (i < toc.length) {
//                 if (toc[i].level == 3) {
//                     lv2.sub.push(toc[i]);
//                     i++;
//                 } else {
//                     break;
//                 }
//             }
//             res.push(lv2);
//         } else {
//             i++;
//         }
//     }
//     return res;
// }

