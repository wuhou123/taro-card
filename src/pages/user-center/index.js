import Taro from '@tarojs/taro'
import { View, Text, OpenData, Button } from '@tarojs/components'
import { AtIcon, AtList, AtListItem, AtTag, AtBadge, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

import './index.less'

export default class UserCenter extends Taro.Component {
    config = {
        navigationBarTitleText: '个人中心',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
            currentTab: 2,
            msgNum: '',
            isOpened:false
        }
    }

    componentWillMount() {
        this.getMessageList()
    }

    showSettings() {
        Taro.navigateTo({
            url: `/pages/user-setting/index`
        })
    }

    showMessages() {
        this.setState({
            msgNum: ''
        })
        Taro.switchTab({
            url: `/pages/user-message/index`
        })
    }

    handleClick = type => {
        Taro.atMessage({
            'message': '抱歉，个人未开放权限！',
            'type': type,
        })
    }

    getMessageList() {
        const that = this
        wx.cloud.callFunction({
            name: 'messageList',
            data: {}
        }).then(res => {
            that.setState({
                msgNum: res.result.data.length || ''
            })
        })
    }

    handleConfirm(){
        this.setState({
            isOpened:false
        })
    }

    handleClickopen(){
        this.setState({
            isOpened:true
        })
    }

    render() {
        return (
            <View className='user-center'>
                <AtMessage />
                <AtModal
                    isOpened={isOpened}
                    title='关于'
                    confirmText='确认'
                    onConfirm={this.handleConfirm}
                    content='这是一个微请柬项目\n\rjust for interesting things'
                />
                <View className='user-center-top'>
                    <View className='user-settings'>
                        <AtBadge value={msgNum} className='user-icon-right'>
                            <AtIcon value='bell' size='24' color='#999' onClick={this.showMessages.bind(this)}></AtIcon>
                        </AtBadge>

                        {/* <AtIcon className='user-icon-right settings' value='settings' size='24' color='#999' onClick={this.showSettings.bind(this)}></AtIcon> */}
                        <Text className='clearfix'></Text>
                    </View>
                    <View className='user-info gap'>
                        <View className='user-info-avatar'>
                            <OpenData type='userAvatarUrl' />
                        </View>
                        <View className='user-info-detail'>
                            <AtList className='gap' hasBorder={false}>
                                <OpenData type='userNickName' lang="zh_CN" class="setName" />
                                <AtTag type='primary' circle style="margin-left:5px">💗</AtTag>
                            </AtList>
                        </View>
                    </View>
                </View>

                <View className='user-center-list'>
                    <AtList className='gap' hasBorder={false}>
                        <AtListItem title='自己制作' arrow='right' onClick={this.handleClick.bind(this, 'success')} />
                        <AtListItem title='关于项目' arrow='right' onClick={this.handleClickopen} />
                    </AtList>
                </View>
            </View>
        )
    }
}
