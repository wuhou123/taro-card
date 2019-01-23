// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const banner = db.collection('banner')
  const result = await banner.doc(event.id).update({
      data: {
          banner:event.bannerList
      }
  })
  return {
    event,
    result
  }
}
