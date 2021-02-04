# 项目说明

## 代码托管
```
版本控制 Git  拉取代码前事项：
1、请确认本机是否安装git
2、确认配置账号具备权限拉取代码
3、执行git clone 项目地址
```

### 开发运行环境
```
1、请确认本机安装Node.js
2、请确认本机安装NPM包管理工具（一般安装Node会同步安装NPM）
3、在当前项目目录下执行 npm install安装依赖
4、在当前项目目录下执行 npm run start 运行项目
```

### 分环境配置
```
环境区分文件（根目录）
.env.production(生产)
.env.development(开发)
.env.qa(QA外网测试)
.env.uat(UAT预发布)
打包执行命令配置（package.json文件）
打包集成Jenkins，如无特殊需求禁止修改，否则可能导致发布失败
"scripts": {
    "dev": "vue-cli-service serve",
    "start": "vue-cli-service serve",
    "qa": "vue-cli-service build --mode qa --dest dist-qa",
    "uat": "vue-cli-service build --mode uat --dest dist-uat",
    "pro": "vue-cli-service build --mode production --dest dist-pro",
    "lint": "vue-cli-service lint"
}
```

### 项目目录
```
src
    assets          静态资源
    components      公共组件
    elements        elementUI
    Http
        interface   项目使用API地址
        apiPort     调用地址配置
        Export      导出方法
        Request     通用请求方法
        Upload      上传方法
    router
        routerList  项目路由配置
        index       路由入口
    util            工具类
    views           业务代码模块
    App.vue         根路由
    main.js         入口
```