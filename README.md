<div align='center'>

  <img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/logo.png' width=340 height=220>

![](https://img.shields.io/badge/vue-2.5.2-blue.svg)
![](https://img.shields.io/badge/license-MIT-orange.svg)
![](https://img.shields.io/badge/echarts-4.1.0-yellow.svg)
![](https://img.shields.io/badge/iView-3.1.3-green.svg)
![](https://img.shields.io/badge/axios-0.18.0-red.svg)

</div>

# Erek-Ticket-Manage

## 介绍

`Erek-Ticket-Manage` 是基于 [Vue-Erek-Manage](https://github.com/PDKSophia/vue-erek-manage) 快速开发的订单后台管理系统，该订单后台管理系统为博主的毕业设计～小程序端请看这边 👉 [erek-ticket](https://github.com/PDKSophia/erek-ticket)

## 实现目标

- 查询管理
  - 简单查询
  - 订单号查询
- 订单管理
  - 飞机票订单
  - 火车票订单
  - 大巴票订单
  - 电影票订单
- 飞机管理
  - 新增机场站点
  - 新增航班信息
  - 飞机列表
- 火车管理
  - 新增车站站点
  - 新增班次信息
  - 火车列表
- 汽车管理
  - 新增车站站点
  - 新增车次信息
  - 汽车列表
- 电影管理 (暂定)
  - 影院管理
    - 新增影院
    - 所有影院
  - 电影管理
    - 上映电影
    - 所有电影
- 城市管理
  - 新增城市
  - 城市列表
- 部门管理
- 个人中心
- ...
- ...

## 项目环境

```javascript
    1 . Node.js is v10.6.0

    2 . Vue-cli is v3.0.0

    3 . 其他依赖请看 package.json

```

## 使用

```javascript
  1. git clone https://github.com/PDKSophia/erek-ticket-manage

  2. cd erek-ticket-manage

  3. npm install

  4. npm run serve
```

## 文件架构

```
·
├── package.json
│ 
├── public                              打包的数据
│ 
├── src
│   ├── assets                          图片等资源文件
│   │
│   ├── components                      框架自带的组件
│   │    ├─BadgeComponents              封装的Badge组件，实例: 个人中心
│   │    ├─DividerComponents            封装的Divider组件
│   │    ├─EchartsCardComponents        封装的卡片数据组件
│   │    ├─EchartsComponents
│   │    │    ├─Line                    封装的折线图组件
│   │    │    ├─Pie                     封装的饼图组件
│   │    │    ├─Radar                   封装的雷达图组件
│   │    │    └─ ...
│   │    ├─FloatButtonComponents        封装的圆圈按钮组件
│   │    ├─FormComponents
│   │    │    ├─LoginForm               封装的登陆表单组件
│   │    │    └─ ...
│   │    ├─HigherOrderComponents
│   │    │    ├─HOC-EchartCard          封装的数据卡片中间层组件
│   │    │    ├─HOC-EchartLine          封装的折线图中间层组件
│   │    │    ├─HOC-EchartPie           封装的饼图中间层组件
│   │    │    ├─HOC-EchartRadar         封装的雷达图中间层组件
│   │    │    └─ ...
│   │    ├─PageComponents
│   │    │    ├─Index                   封装的部分页面组件
│   │    │    └─ ...
│   │    ├─ProfileTableComponents
│   │    │    ├─BaseTable               封装基本详情页中的Table组件
│   │    │    ├─AdvanceTable            封装高级详情页中的Table组件
│   │    │    └─ ...
│   │    ├─ScaleCardComponents          封装的带有放大的卡片组件
│   │    ├─StarCardComponents           封装的带有星星的卡片组件
│   │    └─ ...
│   │
│   ├── js
│   │    ├─app
│   │    │  ├─admin-menu-config.js      管理员可视菜单栏权限
│   │    │  ├─bread-config.js           面包屑配置
│   │    │  ├─global-config.js          全部的部分配置
│   │    │  ├─index-config.js           项目首页配置
│   │    │  ├─user-menu-config.js       普通用户可视菜单栏权限
│   │    │  └─ ...
│   │    ├─echarts
│   │    │  ├─line-config.js            折线图配置
│   │    │  ├─pie-config.js             饼图配置
│   │    │  ├─radar-config.js           雷达图配置
│   │    │  └─ ...
│   │    ├─mock
│   │    │  ├─dashboard.js              仪表盘mock本地数据
│   │    │  ├─department.js             部门管理mock本地数据
│   │    │  ├─user.js                   个人中心mock本地数据
│   │    │  ├─index.js
│   │    │  └─ ...
│   │    ├─utils
│   │    │  ├─utils.js                  全局封装处理函数
│   │    │  ├─vue-token.js              缓存数据文件
│   │    │  └─ ...
│   │    └─ ...
│   │
│   ├── router
│   │    ├─index.js                     框架自带的路由
│   │    ├─main.js                      订单后台管理配置的路由
│   │    └─ ...
│   │
│   ├── TicketComponents                订单后台管理引用的组件
│   │         ├─CommonComponents
│   │         ├─FormComponents
│   │         │    ├─Department
│   │         │    └─ ...
│   │         ├─FrameComponents
│   │         │    ├─List
│   │         │    └─ ...
│   │         └─ ...
│   │
│   ├── service
│   │    ├─index.js                     整合所有的api文件
│   │    ├─api.js                       线上api
│   │    ├─mock.js                      本地mock api
│   │    ├─request.js                   全局封装的request请求
│   │    └─ ...
│   │
│   ├── store                           vuex模块化
│   │
│   │
│   ├── view
│   │    ├─Ticket
│   │    │   ├─Home                     首页
│   │    │   ├─Login                    登陆页
│   │    │   ├─Dashboard                仪表盘
│   │    │   ├─Search                   查询管理
│   │    │   ├─Order                    订单管理
│   │    │   ├─Plane                    飞机管理
│   │    │   ├─Train                    火车管理
│   │    │   ├─Bus                      汽车管理
│   │    │   ├─City                     城市管理
│   │    │   ├─Department               部门管理
│   │    │   ├─User                     个人中心
│   │    │   └─ ...
│   │    └─ ...
│   │
│   └─
│ 
├── main.js
│ 
├── App.vue
│ 
└─
```

## 页面展示

<img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/cover-1.png'>

---

<img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/cover-2.png'>

---

<img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/cover-3.png'>

---

<img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/cover-4.png'>

---

<img src='https://github.com/PDKSophia/erek-ticket-manage/raw/master/image/cover-5.png'>

---

## 吐槽一哈

在做图表、数据卡片的时候，在思考，如何让用户使用起来更加方便简介，想在 `Echarts组件` 和用户使用的 `xx组件` 之间做一层封装，用户只需要传递数据即可，至于其他的默认配置就在中间一层配置就好，这时候，就想到 `React` 大法的好处了，想到 `高阶组件` 的好处了，并不是说 Vue 不能用高阶组件，而是我不会在 Vue 中写简单的高阶组件，心累

---

## 其他链接

blog: https://github.com/PDKSophia/blog.io

juejin: https://juejin.im/user/594ca8a35188250d892f4139

pro-ant-design: https://pro.ant.design/index-cn

---

Copyright © 2018 by PDK

If you have any questions, please contact me 1063137960@qq.com
