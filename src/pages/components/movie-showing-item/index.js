import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Text, Image } from '@tarojs/components'

import './index.less'

export default class MovieShowingItem extends Component {
  render() {
    const { data } = this.props
    return (
      <View>
        {data.map(item => (
          <View className='list' key={item.id}>
            <View className='list-main'>
              <View className='list-main-left'>
                <Image className='list-main-image' src={item.img} />
              </View>
              <View className='list-main-right'>
                <View className='list-item'>
                  <Text className='title'>{item.titleCn}</Text>
                  {
                    item.ratingFinal > 0 &&
                    <Text className='rate'>{item.ratingFinal} 分</Text>
                  }
                </View>
                {
                  item.ratingFinal > 0 &&
                  <View className='list-item'>
                    <Text className='subTitle'>{item.commonSpecial}</Text>
                  </View>
                }
                {
                  item.ratingFinal <= 0 &&
                  <View className='list-item-center'>
                    <Text>
                      <Text className='count'>{item.wantedCount}</Text><Text>人想看</Text>
                    </Text>
                    <Text className='divide'>-</Text>
                    <Text>{item.type}</Text>
                  </View>
                }
                <View className='list-item'>
                  <Text className='actor'>{item.actorName1} / {item.actorName2}</Text>
                  <Text className='tickets'>购票</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

MovieShowingItem.propTypes = {
  data: PropTypes.array
}
