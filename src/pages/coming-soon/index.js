import Taro from '@tarojs/taro'
import { View, Block, Image} from '@tarojs/components'
import { AtButton } from 'taro-ui'
// import MovieUnShowItem from '../components/movie-unShow-item'
import './index.less'
import head from '../../assets/images/heart-animation.gif'

export default class HotShowing extends Taro.Component {
    config = {
        navigationBarTitleText: '祝福'
    }

    constructor() {
        super(...arguments)
        this.state = {
            // movieData: [],
            // currentTab: 1,
            userList:[],
            userInfo:{}
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
    }

    sendGreet(e){
      const that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            that.userInfo = res.userInfo
            // that.getOpenId()
          }
        })
      }

    }

    render() {
        return (
            <View className='page'>
                <View className='page-top'>
                </View>
                <View className='page-main'>
                    <Image class="head" src={head}/>
                    <scroll-view
                        scroll-y
                        class="box"
                    >
                    {(userList.map((item,index)=>(
                        <View class="item" key={index}>
                        <Image src="item" />
                        <Block></Block>
                    </View>
                    )))}
                    </scroll-view>
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