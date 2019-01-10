import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.less'

export default class MessageItem extends Component {
  render() {
    const {image, title, subTitle } = this.props
    return (
      <View>
          <View className='list'>
            <View className='list-main'>
              <View className='list-main-left'>
              <AtAvatar circle image={image}></AtAvatar>
              </View>
              <View className='list-main-right'>
                <View className='margin-bottom-15'>
                  <Text>{title}</Text>
                </View>
                <View className='margin-bottom-15'>
                  <Text className='subTitle'>{subTitle}</Text>
                </View>
              </View>
            </View>
          </View>
      </View>
    )
  }
}