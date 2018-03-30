# 平常金服SAAS系统（贷前）

产品、进件页面字段配置

## 特性

* 专业的设计支持: [ICE Design](https://alibaba.github.io/ice/design.html)
* 成熟的基础组件: [ICE Component](https://alibaba.github.io/ice/#/component/button)
* 丰富的业务模块: [ICE Block](https://alibaba.github.io/ice/#/block)
* 完善的开发工具: [iceworks](https://alibaba.github.io/ice/#/iceworks)

## 目录结构

```
ice-design-pro
├── dist        // 打包资源
├── mock        // 模拟数据
├── public      // 静态资源
├── src
│   ├── components  // 公共组件
│   ├── layouts     // 通用布局
│   ├── pages       // 页面
│   ├── index.js    // 应用入口
│   ├── navs.js     // 导航配置
│   └── routes.jsx  // 路由配置
├── tests           // 测试
├── .editorconfig    // 代码风格配置
├── .eslintignore    // eslint 忽略目录配置
├── .eslintrc        // eslint 配置
├── .generator.json  // 区块配置
├── package.json     // package-lock.json
├── package.json     // package.json
└── README.md        // 项目说明
```

## 使用

1.  (推荐) GUI 工具使用: 下载 [iceworks](https://alibaba.github.io/ice/#/iceworks)

2.  Cli 命令使用:

```bash
$ npm start      // 启动预览服务器
$ npm run build  // 构建 dist
$ node generate  // 生成代码相关的文件
$ node create-module xx // 添加一个新的模块
```
