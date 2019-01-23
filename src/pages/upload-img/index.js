import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtImagePicker, AtMessage, AtNoticebar } from "taro-ui"

import './index.less'

export default class UserSetting extends Taro.Component {
    config = {
        navigationBarTitleText: '上传照片',
        backgroundTextStyle: '#EEEFF1',
    }

    constructor() {
        super(...arguments)
        this.state = {
            getFiles: [],
            files: [],
            fileId: '',
            id: ''
        }
    }

    onChange(files, operationType, index) {
        console.log(files, operationType, index)
        if (operationType === 'add') this.addImg(files)
        else if (operationType === 'remove') this.removeImg(index)
    }
    onImageClick(index, file) {
        console.log(index, file)
        let fileArr = []
        this.state.files.forEach(v => {
            fileArr.push(v.url)
        })
        wx.previewImage({
            current: file,
            urls: fileArr
        })
    }

    addImg(files) {
        if (files && files.length > 0) {
            let filePath = files[files.length - 1].url
            let timestamp = Date.parse(new Date())
            //配置存储路径、相对路径
            let cloudPath = `./static/img/${timestamp}${filePath.match(/\.[^.]+?$/)[0]}`
            console.log(filePath, cloudPath)
            wx.cloud.uploadFile({
                cloudPath,
                filePath,
                success: res => {
                    Taro.atMessage({
                        message: '上传成功',
                        type: 'success'
                    })
                    this.setState({
                        fileId: res.fileID
                    }, () => {
                        let bannerList = [...this.state.getFiles, this.state.fileId]
                        this.uploadImg(bannerList)
                    })
                },
                fail: error => {
                    Taro.atMessage({
                        message: JSON.stringify(error),
                        type: 'error'
                    })
                }
            })
        }
    }

    removeImg(index) {
        let newList = this.state.getFiles.slice()
        newList.splice(index, 1)
        this.uploadImg(newList)
    }

    uploadImg(bannerList) {
        const that = this
        wx.cloud.callFunction({
            name: 'uploadImg',
            data: {
                bannerList: bannerList,
                id: this.state.id
            }
        }).then(res => {
            console.log(res)
            that.getList()
        })
    }

    getList() {
        const db = wx.cloud.database()
        const banner = db.collection('banner')
        banner.get().then(res => {
            let data = res.data[0].banner || [], list = [];
            data.forEach(v => {
                list.push({ url: v })
            })
            this.setState({
                files: list
            })
            //后续更新
            this.setState({
                getFiles: data,
                id: res.data[0]._id
            })
        })
    }

    componentWillMount() {
        this.getList()
    }

    render() {
        return (
            <View className='user-settings'>
                <AtMessage />
                <AtNoticebar icon='volume-plus'>
                    目前仅支持管理员可以上传编辑图片！
                </AtNoticebar>
                <AtImagePicker
                    mode='aspectFill'
                    files={this.state.files}
                    onChange={this.onChange.bind(this)}
                    onFail={this.onFail.bind(this)}
                    onImageClick={this.onImageClick.bind(this)}
                />
            </View>
        )
    }
}
