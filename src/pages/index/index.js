import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import music_icon from '../../assets/images/music_icon.png'
import music_play from '../../assets/images/music_play.png'
import we from '../../assets/images/we.png'
const audioCtx = wx.createInnerAudioContext()

export default class HotShowing extends Taro.Component {
    config = {
        navigationBarTitleText: '请柬'
    }

    constructor() {
        super(...arguments)
        this.state = {
            movieData: [],
            currentTab: 0,
            animationData: [],
            imgList: [],
            isPlay:true
        }
    }

    getList() {
        const that = this
        const db = wx.cloud.database()
        const banner = db.collection('banner')
        banner.get().then(res => {
            console.log(res.data[0].banner)
            that.setState({
                imgList: res.data[0].banner || []
            })
        })
    }

    audioPlay() {
        const that = this
        if (that.state.isPlay) {
          audioCtx.pause()
          that.setState({
            isPlay:false
          })
          wx.showToast({
            title:'您已暂停音乐播放~',
            icon:'none'
          })
        } else {
          audioCtx.play()
          that.setState({
            isPlay:true
          })

          wx.showToast({
            title:'背景音乐已开启~',
            icon:'none'
          })
        }
    }

    getMusicUrl () {
        const that = this
        const db = wx.cloud.database()
        const music = db.collection('vadio')
        music.get().then(res => {
          console.log(res)
          let musicUrl = res.data[0].musicUrl
          audioCtx.src = musicUrl
          audioCtx.loop = true
          audioCtx.autoplay = true
          audioCtx.play()
        })
      }

    componentDidMount() {
        // Taro.request({
        //     url: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api',
        //     method: "GET",
        //     data: {
        //         locationId: 290
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     }
        // })
        //     .then(res => {
        //         this.setState({
        //             movieData: res.data.movies
        //         })
        //     })
        this.getMusicUrl()
        this.getList()
    }
 
    render() {
        return (
            <View className='page'>
                <View className='page-main'>
                    {
                       isPlay?
                       <View class="bg_music" tap={this.audioPlay}>
                            <Image src={music_icon} class="musicImg music_icon" onClick={this.audioPlay.bind(this)} />
                            <Image src={music_play} class="music_play pauseImg" onClick={this.audioPlay.bind(this)}/>
                       </View>                      
                        :
                        <View class="bg_music" tap={this.audioPlay}>
                            <Image src={music_icon} class="musicImg" onClick={this.audioPlay.bind(this)}/>
                            <Image src={music_play} class="music_play playImg" onClick={this.audioPlay.bind(this)}/>
                        </View>
                    }

                    <Swiper
                        className='test-h'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        vertical
                        circular
                        indicatorDots
                        autoplay>
                        {imgList.map((item, index) => (
                            <SwiperItem key={index}>
                                <Image className='slide-image' src={item} mode="aspectFill" lazy-load="true" />
                            </SwiperItem>
                        ))}
                    </Swiper>
                    <View class="info">
                        <View class="content">
                            <h1>Mr.黄 & Miss.梅</h1>
                            <p>谨定于 2019年2月2日 （星期六）中午12:00</p>
                            <p>农历 腊月二十八 中午十二点整 举办婚礼</p>
                            <p>席设：黄梅县天下禅大酒店锦园三厅</p>
                            <p>地址：黄冈市黄梅县黄梅大道777号</p>
                            <Image src={we} class="img_footer" />
                        </View>
                    </View>
                </View >
            </View >
        )
    }
}
