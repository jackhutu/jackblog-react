# jackblog react redux 版
[![Dependency Status](https://david-dm.org/jackhutu/jackblog-react-redux.svg)](https://david-dm.org/jackhutu/jackblog-react-redux) 
[![devDependency Status](https://david-dm.org/jackhutu/jackblog-react-redux/dev-status.svg)](https://david-dm.org/jackhutu/jackblog-react-redux#info=devDependencies)  

Jackblog 是使用 Node.js + MongoDB + 其它客户端框架开发的个人博客系统,前后端分离,仿简书模板.    
服务端有: [express 版](https://github.com/jackhutu/jackblog-api-express) , [koa 版](https://github.com/jackhutu/jackblog-api-koa)         
客户端有: [angular1.x 版](https://github.com/jackhutu/jackblog-angular1) , [angular2.x 版](https://github.com/jackhutu/jackblog-angular2) , [react redux 版](https://github.com/jackhutu/jackblog-react-redux) , [vue 版](https://github.com/jackhutu/jackblog-vue)    
移动端有: [react native 版](https://github.com/jackhutu/jackblog-react-native-redux)  
##### 此为客户端react redux版, 需要配合服务端使用. 

> 服务端任选一种, 请预先安装并启动服务端

### 开发

```
$ git clone git@github.com:jackhutu/jackblog-react-redux.git
$ cd jackblog-react-redux
$ npm install
$ npm run dev
```

### 目录结构

```
.
├── README.md           
├── dist                     // 项目build目录
├── logs                     // 生产环境日志目录
├── src                      // 生产目录
│   ├── actions              // redux action目录
│   ├── api                  // API 请求
│   ├── assets               // css 和图片资源
│   ├── components           // 组件
│   ├── reducers             // redux reducer目录
│   ├── store                // store配置
│   ├── util                 // 工具函数
│   └── client.js            // 客户端入口
│   └── config.js            // api url, cookie domain等配置文件
│   └── index.html           // 生产环境生成ejs文件
│   └── routes.js            // 路由配置
│   └── server.js            // 服务端渲染文件
├── webpack                  // Webpack配置目录
│   ├── webpack.config.dev.client.js        // 开发的客户端Webpack配置文件
│   ├── webpack.config.dev.server.js        // 开发的服务端渲染Webpack 配置文件
│   ├── webpack-config-prod.js              // 生产的Webpack 配置文件
├── History.md               // 更新日志
├── nodemon.json             // nodemon配置文件
├── process.json             // pm2配置文件
├── server.js                // 项目server入口文件
.
```

### 生产环境构建  
 
```
$ npm run build 或 npm run start
```

### 线上布署
```
$ pm2 start process.json
```
可参考[利用git和pm2一键布署项目到vps](http://jackhu.top/article/55cd8e00c6e998b817a930c7)

### License
MIT