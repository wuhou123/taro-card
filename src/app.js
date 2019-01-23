import Taro, { Component } from '@tarojs/taro'

import './app.less'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/coming-soon/index',
      'pages/user-center/index',
      'pages/user-setting/index',
      'pages/user-message/index',
      'pages/map/index',
      'pages/upload-img/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '微请柬',
      navigationBarTextStyle: 'black'
    },
    "cloud": true,
    tabBar: {
      color: "#e9bd91",
      selectedColor: "#ea3c25",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "请柬",
        iconPath: "./assets/images/weding.png",
        selectedIconPath: "./assets/images/weding_focus.png"
      },
      {
        pagePath: "pages/coming-soon/index",
        text: "祝福",
        iconPath: "./assets/images/heart.png",
        selectedIconPath: "./assets/images/heart_focus.png"
      },
      {
        pagePath: "pages/user-message/index",
        text: "留言",
        iconPath: "./assets/images/msg.png",
        selectedIconPath: "./assets/images/msg_focus.png"
      },
      {
        pagePath: "pages/user-center/index",
        text: "个人中心",
        iconPath: "./assets/images/my.png",
        selectedIconPath: "./assets/images/my_focus.png"
      },
      ]
    }
  }
  componentWillMount() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  }
  
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
