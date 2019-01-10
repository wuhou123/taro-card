### 前言
本项目是基于 taro 和 taro-ui 的仿时光网的小程序学习项目，如果对您对此项目有兴趣，可以点 "Star" 支持一下 

项目中的接口使用的时光网的API，有侵犯时光网权益的嫌疑，若被告知需停止使用，本人会及时删除此页面与整个项目

**项目运行**

```
# 全局安装 taro 开发工具
npm install -g @tarojs/cli
# 克隆项目
git clone https://github.com/calabash519/taro-mtime.git
cd taro-mtime
# 安装依赖
npm i
# 小程序预览（需下载下载并打开微信开发者工具，选择预览项目根目录）
npm run dev:weapp
# H5 预览
npm run dev:h5
```

**文件目录**

```
├── dist              编译后文件
├── config            项目配置项
    ├── dev.js             
    ├── index.js           
    └── prod.js            
└── src
    ├── assets            外部资源
        ├── data          mock 数据
        └── images        图片资源
    └── pages             页面层 
        ├── coming-soon   即将上映
        ├── components    共用组件
        ├── hot-showing   正在热映
        ├── index         正在售票
        ├── user-center   用户中心
        ├── user-message  我的消息
        └── user-setting  个人资料
```

**功能列表**

- [x] 正在热映
- [x] 即将上映
- [x] 个人中心
- [x] 个人设置
- [x] 我的消息
- [ ] 电影详情页
- [ ] 个人设置项内容页
- [ ] 我的消息项内容页

**页面截图**

<img src="https://github.com/calabash519/taro-mtime/blob/master/screenshots/hot-showing.png"/>

<img src="https://github.com/calabash519/taro-mtime/blob/master/screenshots/coming-soon.png"/>

<img src="https://github.com/calabash519/taro-mtime/blob/master/screenshots/user-center.png"/>

<img src="https://github.com/calabash519/taro-mtime/blob/master/screenshots/user-setting.png"/>

<img src="https://github.com/calabash519/taro-mtime/blob/master/screenshots/user-message.png"/>

