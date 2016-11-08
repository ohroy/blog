## 项目简介

这是一个基于[github api](https://api.github.com)与[vue](https://vue.org)的一个简单的博客。
它只有一个页面，利用`ajax`技术从`github`抓取到前台并实时呈现。  
做到了没有一句废话，没有一点冗余。  
真正的**极简博客**

## 鸣谢列表

* [github](https://github.com)提供数据存储，网页访问等开放服务！
* [Vue](https://vue.org)提供数据驱动的前端web组件框架。
* [bulma](http://bulma.io/) 提供界面框架
* [webpack](http://webpack.github.io/)提供模块打包技术
* [npm](https://www.npmjs.com/) 提供包管理服务
* [marked](https://github.com/chjj/marked) 提供markdown渲染支持
* [highlight.js](https://github.com/isagalaev/highlight.js)提供代码高亮支持
* [moment](https://github.com/moment/moment/)提供时间处理支持

## 更新历史

### 11/8/2016
1. 更新到webpack2
2. 修正es6语法
3. 由于webpack2已经对`es6`语法支持，移除`es6-promise`依赖
4. 打包时忽略`moment.js`的其他语言文件。
由于`moment.js`中引用语言文件是使用
```
require('./locale/' + name)
```
使用变量进行的引用，`webpack`(即使是最新版)也无法准确识别可能的语言文件，因此会忽略变量部分，将整个目录全部打包。
5. 更新`babel`配置以适应最新`webpack`

### 11/2/2016
1. 修改`marked`表格输出格式
2. 分离`master`分支和`gh-pages`分支
3. 修改命令`npm run build`的逻辑

### 10/26/2016
1. 精简界面内容
2. 优化`markdown`

### 10/22/2016
1. 托管项目到`github`
