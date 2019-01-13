import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import './index.less'
import music_icon from '../../assets/images/music_icon.png'
import music_play from '../../assets/images/music_play.png'
import we from '../../assets/images/we.png'
import email_icon from '../../assets/images/email.png'
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
            isPlay: true,
            queueData: null,
            emailData: null,
            isEmail: false,
            isDialog:false,
            dialogData:null
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
            setTimeout(()=>{
                this.queue()
            },8000)
        })
    }

    audioPlay() {
        const that = this
        if (that.state.isPlay) {
            audioCtx.pause()
            that.setState({
                isPlay: false
            })
            wx.showToast({
                title: '您已暂停音乐播放~',
                icon: 'none'
            })
        } else {
            audioCtx.play()
            that.setState({
                isPlay: true
            })

            wx.showToast({
                title: '背景音乐已开启~',
                icon: 'none'
            })
        }
    }

    getMusicUrl() {
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

    queue() {
        let animation = wx.createAnimation({})
        animation.translate((200 - 60), 0).scale(0.3).opacity(0.5).step({ duration: 2000 }).height(0).step()
        this.setState({ queueData: animation.export()})
        let animation2 = wx.createAnimation({})
        animation2.translate(0, 330).step({ duration: 1000 })
        setTimeout(() => {
            this.setState({
                isEmail: true
            })
        }, 2000)
        setTimeout(()=>{
            this.setState({
                emailData: animation2.export()
            })           
        },2100)
    }
    openDialog() {
        this.setState({
            isDialog:true
        })
    }
    closeDialog(){
        if(!this.state.isDialog) return
        let animation3 = wx.createAnimation({});
        animation3.translate(1000, 100).step({ duration: 1000 })
        this.setState({
            dialogData:animation3.export()
        })
        setTimeout(()=>{
            this.setState({
                isDialog:false
            })
        },3000)
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
                <View onClick={this.queue.bind(this)} animation={queueData}>
                    <AtNoticebar marquee>
                        祝福小朋友，猪年快乐！2019-1-13 于上海 模板最后更新于1-13日晚
                    </AtNoticebar>
                </View>
                {
                    isEmail ?
                        <Image src={email_icon} class="email_img" onClick={this.openDialog.bind(this)} animation={emailData} />
                        :
                        ''
                }

                <View className='page-main'>
                    {
                        isPlay ?
                            <View class="bg_music" tap={this.audioPlay}>
                                <Image src={music_icon} class="musicImg music_icon" onClick={this.audioPlay.bind(this)} />
                                <Image src={music_play} class="music_play pauseImg" onClick={this.audioPlay.bind(this)} />
                            </View>
                            :
                            <View class="bg_music" tap={this.audioPlay}>
                                <Image src={music_icon} class="musicImg" onClick={this.audioPlay.bind(this)} />
                                <Image src={music_play} class="music_play playImg" onClick={this.audioPlay.bind(this)} />
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
                    {isDialog ?
                        <View class="info" onClick={this.closeDialog.bind(this)} animation={dialogData}>
                            <View class="content" onClick={this.closeDialog.bind(this)}>
                                <h1>Mr.fei & Miss.禾子</h1>
                                <p>谨定于 2019年2月2日 （星期六）中午12:00</p>
                                <p>农历 腊月二十八 中午十二点整</p>
                                <p>地址：湖北*仙桃</p>
                                <Image src={we} class="img_footer" />
                            </View>
                        </View>
                        :
                        ''
                    }

                </View >
            </View >
        )
    }
}
