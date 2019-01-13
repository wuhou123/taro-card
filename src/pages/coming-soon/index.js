import Taro from '@tarojs/taro'
import { View, Text, Image,ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import MovieUnShowItem from '../components/movie-unShow-item'
import './index.less'
import head from '../../assets/images/heart-animation.gif'
import head2 from '../../assets/images/plase.gif'

export default class HotShowing extends Taro.Component {
    config = {
        navigationBarTitleText: '祝福'
    }

    constructor() {
        super(...arguments)
        this.state = {
            // movieData: [],
            // currentTab: 1,
            userList: [],
            userInfo: {},
            img:head
        }
    }

    componentDidMount() {
        // Taro.request({
        //     url: 'https://api-m.mtime.cn/Movie/MovieComingNew.api',
        //     data: {
        //         locationId: 290
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     }
        // })
        //     .then(res => {
        //         this.setState({
        //             movieData: res.data.moviecomings
        //         })
        //     })
        this.getUserList()
    }

    sendGreet(e) {
        const that = this
        console.log(e)
        if (e.detail.errMsg.includes('ok')) {
            this.setState({
                userInfo:e.detail.userInfo
            })
            that.getOpenId()
        }

    }

    getOpenId () {
        const that = this
        wx.cloud.callFunction({
          name: 'user',
          data: {}
        }).then(res => {
          that.openId = res.result.openid
          that.getIsExist()
        })
      }

      getIsExist () {
        const that = this
        const db = wx.cloud.database()
        const user = db.collection('user')
        user.where({
          _openid: that.openId
        }).get().then(res => {
          if (res.data.length === 0) {
            that.addUser()
          } else {
            that.getUserList()
            wx.showToast({
                title:'您已经送过祝福了~',
                icon:'none'
            })
          }
        })
      }

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
          this.setState({
              img:head2
          })
          setTimeout(()=>{
            this.setState({
                img:head
            })              
          },5000)
        })
      }

      getUserList () {
        const that = this
        wx.cloud.callFunction({
          name: 'userList',
          data: {}
        }).then(res => {
          console.log(res)
          that.setState({
            userList:res.result.data.reverse()
          })
        })
      }

    render() {
        return (
            <View className='page'>
                <View className='page-top'>
                </View>
                <View className='page-main'>
                    <Image class="head" src={img} />
                    <ScrollView
                        scrollY
                        class="box"
                    >
                        {(userList.map((item, index) => (
                            <View class="item" key={index}>
                                <Image src={item.user.avatarUrl}/>
                                <Text class="nameText">{item.user.nickName}</Text>
                            </View>
                        )))}
                    </ScrollView>
                    <View class="count">已收到{userList.length}位好友送来的祝福</View>
                    <View class="bottom">
                        <AtButton class="left" lang="zh_CN" open-type="getUserInfo" onGetUserInfo={this.sendGreet.bind(this)} type='primary'>送上祝福</AtButton>
                        <AtButton class="right" open-type="share" type='primary'>分享喜悦</AtButton>
                    </View>
                </View>
            </View>
        )
    }
}