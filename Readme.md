# blog lite v3

本项目是基于`github api`和`vue`实现的单页面博客。之前介绍过的，这里不再重复了，可以看之前的说明来了解。

## 之前的版本
* [v1](1.0.0.md)
* [v2](v2.md)


## 升级了什么?

本次升级是项目上线以来最大的重构，包含

* 界面ui重新设计
* 重新开放了评论功能，现在能直接评论了。
* `markdown`渲染引擎现在完全支持gfm了
* 重新设计的toc，现在可以随屏幕滚动了
* 其它小细节的改动

## 技术细节

得益于`github v3 api`的新特性，我们可以直接使用github渲染`markdown`了,这样，我们便可以彻底移除本地的[marked](https://github.com/chjj/marked) 
渲染引擎了。但这么做也带来了一些问题，比如我们可能没有之前那么自由来自定义一些markdown语法了。但同时的好处在于，它与github 完全同步，渲染一致。
从体验上来说，显然是更好。   

感谢开源项目 [gitment](https://github.com/imsun/gitment)提供的用`github issue`做评论的功能,我们使用了很多它的代码，之所以没有直接引入是因为需要修改太多的逻辑。  
感谢开源项目 [tocbot](https://github.com/tscanlin/tocbot)提供功能，从html中抽取`toc`
感谢github开源项目 [primer](https://github.com/primer/primer)提供github风格的ui框架
感谢github开源项目 [github-syntax-light](https://github.com/primer/github-syntax-light)提供github风格的代码高亮。