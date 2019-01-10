import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from "taro-ui"

import './index.less'

export default class MovieUnShowItem extends Component {
  render() {
    const { data } = this.props
    return (
      <View>
        {data.map(item => (
          <View className='list' key={item.id}>
            <View className='list-main'>
              <View className='list-main-left'>
                <Image className='list-main-image' src={item.image} />
              </View>
              <View className='list-main-right'>
                <View className='list-item'>
                  <Text className='title'>{item.title}</Text>
                </View>
                <View className='list-item-center'>
                  <Text>
                    <Text className='count'>{item.wantedCount}</Text><Text>人想看</Text>
                  </Text>
                  <Text className='divide'>-</Text>
                  <Text>{item.type}</Text>
                </View>
                <View className='list-item'>
                  {
                    item.actor1 &&
                    <Text className='actor'>{item.actor1} / {item.actor2}</Text>
                  }
                  {
                    !item.actor1 &&
                    <Text className='actor'>{item.director}</Text>
                  }
                  {
                    item.isTicket &&
                    <View className='wantSee operation'>
                      <AtIcon style='padding: 0 3px;' value='heart' size='20' color='lightcoral'></AtIcon>
                      <Text>想看</Text>
                    </View>
                  }
                  {
                    !item.isTicket &&
                    <View className='sell operation'>
                      <Text>预售</Text>
                    </View>
                  }
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

MovieUnShowItem.propTypes = {
  data: PropTypes.array
}
