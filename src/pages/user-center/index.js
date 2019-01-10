import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar, AtList, AtListItem } from "taro-ui"
import BottomTab from "../components/bottom-tab"

import avatarImage from '../../assets/images/avatar.jpg'
import './index.less'

export default class UserCenter extends Taro.Component {
    config = {
        navigationBarTitleText: '个人中心',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
            currentTab: 2
        }
    }

    showSettings() {
        Taro.navigateTo({
            url: `/pages/user-setting/index`
        })
    }

    showMessages() {
        Taro.navigateTo({
            url: `/pages/user-message/index`
        })
    }

    handleClick = e => {
        console.log(e)
    }

    render() {
        return (
            <View className='user-center'>
                <View className='user-center-top'>
                    <View className='user-settings'>
                        <AtIcon className='user-icon-right' value='bell' size='24' color='#999' onClick={this.showMessages.bind(this)}></AtIcon>
                        <AtIcon className='user-icon-right settings' value='settings' size='24' color='#999' onClick={this.showSettings.bind(this)}></AtIcon>
                        <Text className='clearfix'></Text>
                    </View>
                    <View className='user-info gap'>
                        <View className='user-info-avatar'>
                            <AtAvatar circle image={avatarImage}></AtAvatar>
                        </View>
                        <View className='user-info-detail'>
                            <AtList className='gap' hasBorder={false}>
                                <AtListItem title='三井寿' note='悬崖亦是前程万里' hasBorder={false} />
                            </AtList>
                        </View>
                    </View>
                </View>

                <View className='user-center-list'>
                    <AtList className='gap' hasBorder={false}>
                        <AtListItem title='时光商城' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='电影票订单' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='商品订单' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='购物车' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='会员俱乐部' extraText='签到抽好礼' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='我的活动' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='直播' arrow='right' hasBorder={false} onClick={this.handleClick} />
                    </AtList>
                </View>

                <View className='bottom-tab'>
                    <AtList className='gap' hasBorder={false}>
                        <AtListItem title='客服/反馈' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='基本设置' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='关于项目' arrow='right' hasBorder={false} onClick={this.handleClick} />
                    </AtList>
                </View>

                {/* <View>
                    <BottomTab tab={this.state.currentTab}></BottomTab>
                </View> */}
            </View>
        )
    }
}
