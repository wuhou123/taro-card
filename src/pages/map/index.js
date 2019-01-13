import Taro from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import './index.less'
import position from '../../assets/images/nav.png'
import plase from '../../assets/images/t1.png'

export default class UserCenter extends Taro.Component {
    config = {
        navigationBarTitleText: '地图导航',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
            markers: [{
                iconPath: position,
                id: 0,
                latitude: 30.423759,
                longitude: 113.140099,
                width: 50,
                height: 50
              }]
        }
    }
    markertap(){
        wx.openLocation({
            latitude: 30.423759,
            longitude: 113.140099,
            scale: 18
        })
    }

    render() {
        return (
            <View className='user-center'>
            <Image mode="aspectFit" class="head-img" src={plase}/>
                <Map
                    id="map"
                    longitude="113.140099"
                    latitude="30.423759"
                    enable-3D
                    enableOverlooking
                    enableRotate
                    markers={markers}
                    onMarkertap={this.markertap.bind(this)}
                    scale="14"
                />
            </View>
        )
    }
}
