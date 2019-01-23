import Taro from '@tarojs/taro'
import { View, ScrollView, Button} from '@tarojs/components'
import MessageItem from "../components/message-item"
import { AtButton,AtTextarea } from 'taro-ui'
import './index.less'

export default class UserMessage extends Taro.Component {
    config = {
        navigationBarTitleText: '留言消息',
        backgroundTextStyle: '#e34b6d',
    }

    constructor() {
        super(...arguments)
        this.state = {
            isOpen: false,
            desc: '',
            messageList: [],
            openId: '',
            userInfo: '',
            isForm: false,
            isVideo: false,
            isFormlist: false,
            formList: [],
            scrolltop:0
        }
    }

    componentWillMount(){
        this.getMessageList()
    }

    cancel() {
        console.log('cancel')
        this.setState({
            isOpen: false
        })
    }
    getVal(e) {
        this.setState({
            desc: e.detail.value
        })
    }

    sendMessage() {
        const that = this
        if (that.state.desc) {
            if(that.state.desc.includes('丑')||that.state.desc.includes('死')||that.state.desc.includes('你妈')){
                return Taro.showToast({
                    title: '好像用语不规范呢,改改吧？',
                    icon: 'none'
                })
            }
            const db = wx.cloud.database()
            const message = db.collection('message')
            message.add({
                data: {
                    desc: that.state.desc,
                    type: 'message',
                    time: that.getNowFormatDate(),
                    url: that.state.userInfo.avatarUrl,
                    name: that.state.userInfo.nickName
                }
            }).then(res => {
                that.setState({
                    isOpen: false,
                    desc: ''
                })
                that.getMessageList()
            })
        } else {
            Taro.showToast({
                title: '说点什么吧',
                icon: 'none'
            })
        }
    }
    getMessageList () {
        const that = this
        wx.cloud.callFunction({
          name: 'messageList',
          data: {}
        }).then(res => {
          that.setState({
            scrolltop:0,
            messageList:res.result.data.reverse()
          })
        })
      }

    getNowFormatDate() {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const hh = now.getHours()
        const mm = now.getMinutes()
        const ss = now.getSeconds()
        let clock = year + '-'
        if (month < 10) {
            clock += '0'
        }
        clock += month + '-'
        if (day < 10) {
            clock += '0'
        }
        clock += day + ' '
        if (hh < 10) {
            clock += '0'
        }
        clock += hh + ':'
        if (mm < 10) {
            clock += '0'
        }
        clock += mm + ':'
        if (ss < 10) {
            clock += '0'
        }
        clock += ss
        return clock
    }

    toMessage(e) {
        if (e.detail.errMsg.includes('ok')) {
            this.setState({
                userInfo: e.detail.userInfo,
                isOpen: true
            })
            this.getOpenId()
        }

    }

    getOpenId() {
        const that = this
        wx.cloud.callFunction({
            name: 'user',
            data: {}
        }).then(res => {
            this.setState({
                openId: res.result.openid
            })
            that.getIsExist()
        })
    }

    getIsExist() {
        const that = this
        const db = wx.cloud.database()
        const user = db.collection('user')
        user.where({
            _openid: that.openId
        }).get().then(res => {
            if (res.data.length === 0) {
                that.addUser()
            }
        })
    }

    addUser() {
        const that = this
        const db = wx.cloud.database()
        const user = db.collection('user')
        user.add({
            data: {
                user: that.state.userInfo
            }
        }).then(res => {
            console.log(res)
        })
    }

    goMap(){
        Taro.navigateTo({
            url: `/pages/map/index`
        })
    }

    render() {
        return (
            <View className='user-message'>
                <ScrollView
                    scrollY
                    scrollTop={scrolltop}
                    class="box">
                    <View className='user-message-list'>
                        {(messageList.map((item, index) => (
                            <MessageItem image={item.url} title={item.name} time={item.time} subTitle={item.desc} key={index}></MessageItem>
                        )
                        ))}
                    </View>
                </ScrollView>
                {
                    isOpen ?
                        <View class="dialog">
                            <AtTextarea autoFocus fixed maxLength={200} placeholder="在这里输入您想要说的话" name="textarea" onChange={this.getVal.bind(this)} value={this.state.desc}/>
                            <View class="btn">
                                <Button class="left" onClick={this.sendMessage.bind(this)}>发送留言</Button>
                                <Button class="right" onClick={this.cancel.bind(this)}>取消</Button>
                            </View>
                        </View>
                        : ''
                }
                <View class="bottom">
                    <AtButton class="left" lang="zh_CN" open-type="getUserInfo" onGetUserInfo={this.toMessage.bind(this)} type='primary'>留言吧</AtButton>
                    <AtButton class="right" type='primary' onClick={this.goMap.bind(this)}>地图导航</AtButton>
                </View>
            </View>
        )
    }
}
