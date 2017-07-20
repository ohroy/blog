# blog lite 2.0


## 项目简介

这是一个基于[github api](https://api.github.com)与[vue](https://vue.org)的一个简单的博客。
它只有一个页面，利用`ajax`技术从`github`抓取到前台并实时呈现。  
做到了没有一句废话， 没有一点冗余。  
真正的**极简博客**

## 另请注意


这个项目一开始没有考虑做成产品对外，所以没有考虑主题化之类的。  
如果有哪位哥哥有空给加上主题模块，那要是服务大众的事儿呢！  


## 使用说明
- 安装nodejs&&npm
- 克隆本项目到你的本地
```shell
git clone https://github.com/Rozbo/blog
```
- 进入博客目录安装依赖
```shell
cd blog
npm install
```
- 修改源码中issue地址为你自己的
- 打包js并上传index.html和static目录
```shell
npm run build
```

## 上个版本
[1.0.0](1.0.0.md)


## 鸣谢列表

* [github](https://github.com)提供数据存储，网页访问等开放服务！
* [Vue](https://vue.org)提供数据驱动的前端web组件框架。
* [webpack](http://webpack.github.io/)提供模块打包技术
* [npm](https://www.npmjs.com/) 提供包管理服务
* [marked](https://github.com/chjj/marked) 提供markdown渲染支持
* [prismjs](https://prismjs.com)提供代码高亮支持


## 相对于1.0更新

此2.0对1.0有的非常多的改进,其中

- 更新vue 2 && webpack2
- 移除`bulma` 界面框架
- 移除`Font-Awesome`
- 移除`moment-js`
- 替换 `highlight.js`=>`prismjs`

这样做的好处是,减小了`872kb`的大小.
现在项目`js`,`css`,`html`,`font`,`img`共计只有`97kb`!

增加了如下

- 使用了更简洁的界面
- 使用`virtual server`来实现路由伪后端
- 使用`travis ci`来持续集成
- 自动抽取`toc`作为导航
- 另外一个小彩蛋是`春江花月夜`
