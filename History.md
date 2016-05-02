2.1.1 / 2016-05-02
==================

* 修复linux下路径大小写问题
* 更新依赖包


2.1.0 / 2016-04-09
==================

* 更新react, react-dom 到 v15.0.1
* 更新redux-form 到 v5.0.1
* 使用eslint 代码检查
* 弃用 react-addons-linked-state-mixin, 改成onChange/setState
* 修复logger中间件immutable数据转换
* 修复alert message背景色
* 修复navbar 小屏幕样式
* 修复navbar dropdown菜单


2.0.0 / 2016-03-28
==================

* 使用服务端渲染
* 弃用gulp
* 使用better-npm-run, npm-run-all, rimraf配合npm命令
* 使用axios代替isomorphic-fetch
* 增加promise redux中件间


1.4.0 / 2016-03-16
==================

* 更新redux-simple-router 到 react-router-redux
* 更新redux 到 3.3.1
* 更新react 到 0.14.7
* 更新react-router 到 2.0.1
* 弃用react-alert 使用 react-s-alert
* 重新设计消息提示组件.


1.3.1 / 2016-02-28
==================

* 修复webpack config, 没有设置publicPath项.

1.3.0 / 2016-02-28
==================

* 去掉sass文件, 使用独立css npm 安装包 =>  jackblog-sass
* 同时去掉node-sass, sass-loader等相关库
