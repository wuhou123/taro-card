import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.less'

export default class BottomTab extends Component {
    showTab(index) {
        if (index == this.props) {
            return
        }
        switch (index) {
            case 0:
                Taro.redirectTo({
                    url: `/pages/index/index`
                })
                break;
            case 1:
                Taro.redirectTo({
                    url: `/pages/coming-soon/index`
                })
                break;
            case 2:
                Taro.redirectTo({
                    url: `/pages/user-center/index`
                })
                break;
            default:
                break;
        }
    }

    render() {
        const tabList = [
            { title: '正在热映', iconType: 'video' },
            { title: '即将上映', iconType: 'calendar' },
            { title: '个人中心', iconType: 'user' }
        ]

        return (
            <View>
                <AtTabBar fixed tabList={tabList} onClick={this.showTab} current={this.props.tab} />
            </View>
        )
    }
}

BottomTab.propTypes = {
    tab: PropTypes.number
}
