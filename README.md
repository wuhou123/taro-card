# taro+taro-ui+云开发项目手册

:rocket: 这是一个taro+taro-ui+云开发项目，主要使用ui（taro-ui），taro框架搭建，多端适配，后端使用的腾讯小程序云开发。

最近在掘金上看云开发的文档，发现了一篇mpvue的项目示例，觉得比较好，就用taro重新写了一遍，体验了一把云开发流程,现在发布查看的是真实数据。

:point_down:扫码体验吧:

![小程序](http://wuhou123.cn/gh_e6768a538d0b_258.jpg)

taro-card文档地址 : [<font size=4>document</font>](https://wuhou123.gitee.io/vuepress/taros/getting-started/)

# 项目结构

```
├── dist              编译后文件
├── config            项目配置项
    ├── dev.js             
    ├── index.js           
    └── prod.js            
└── src
    ├── assets            外部资源
        ├── data          json数据
        └── images        图片资源
    └── app.js            cloud初始化等
    └── pages             页面层 
        ├── coming-soon   *页面
        ├── components    *页面
        ├── index         *页面
        └── user-center   *页面
└── static
    ├── functions          云函数文件
```

# 安装*调试

```
# 全局安装 taro 开发工具
npm install -g @tarojs/cli

# 安装依赖
npm i

# 小程序预览（需下载下载并打开微信开发者工具，选择预览项目根目录）
npm run dev:weapp

# H5 预览
npm run dev:h5

# 百度
npm run dev:swan

# 支付宝
npm run dev:alipay
```

# 云函数开发说明

以当前项目页面使用中的云函数流程来讲解云函数开发的基本流程，学习更多，还是参看小程序官方文档，了解更多。

## 祝福页面-用户信息相关查询、存储

祝福页面获取新用户的openid,根据该标识存储用户信息，最后展示

* 获取用户user云函数文件：

```
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
```

调用该方法获取当前用户的openid，调用处理：

```
getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.setState({
            openId:res.result.openid
        })
        that.getIsExist()
      })
}

```

接着判断当前用户是否已经存在于数据库中，即getIsExist()方法，更多数据库的api可以看下官方文档：

```
getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.state.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        } else {
          wx.showToast({
            title:'您已经送过祝福了~'
        })
        }
      })
}
```

接下来介绍存储用户信息的方法，即addUser():

```
addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.add({
        data: {
          user: that.state.userInfo
        }
      }).then(res => {
        that.getUserList()
      })
}

```

## 其他资源存储

:boom: 存储管理 :point_right: 上传相关文件 :point_right: 复制存储地址写入集合元素里

静态资源走云端存储，可以随时替换，避免发布审核问题

**好吧，欢迎star**

