import Taro from '@tarojs/taro'
import { View} from '@tarojs/components'
import MessageItem from "../components/message-item"

import iconImage from '../../assets/images/avatar.jpg'
import './index.less'

export default class UserMessage extends Taro.Component {
    config = {
        navigationBarTitleText: '我的消息',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
        }
    }

    render() {
        return (
            <View className='user-message'>
                <View className='user-message-list'>
                    <MessageItem image={iconImage} title='赞了我' subTitle='没有未读的啦'></MessageItem>
                    <MessageItem image={iconImage} title='评论/回复' subTitle='没有收到新评论'></MessageItem>
                    <MessageItem image={iconImage} title='时光小秘书' subTitle='没有收到新提醒'></MessageItem>
                </View>
            </View>
        )
    }
}
