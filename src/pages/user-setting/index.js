import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtAvatar, AtListItem } from "taro-ui"
import avatarImage from '../../assets/images/avatar.jpg'

import './index.less'

export default class UserSetting extends Taro.Component {
    config = {
        navigationBarTitleText: '个人资料',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
        }
    }

    handleClick = e => {
        console.log(e)
    }

    render() {
        return (
            <View className='user-settings'>
                <View className='user-settings-avatar'>
                    <Text>头像</Text>
                    <View className='image'>
                        <AtAvatar circle image={avatarImage}></AtAvatar>
                    </View>
                </View>

                <View className='user-settings-list'>
                    <AtList className='gap' hasBorder={false}>
                        <AtListItem title='昵称' extraText='三井寿' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='性别' extraText='男' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='绑定手机' extraText='158****0262' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='生日' extraText='1996-02-28' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='居住地' extraText='上海' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='修改密码' arrow='right' onClick={this.handleClick} />
                        <AtListItem title='管理收货地址' arrow='right' hasBorder={false} onClick={this.handleClick} />
                    </AtList>
                </View>
            </View>
        )
    }
}
