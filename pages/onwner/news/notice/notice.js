// pages/onwner/news/newsList.js
const App = getApp()
import {
  newsList
} from '../../../../api/info'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo: {
      channel_id: 5,
      page: 1,
      limit: 10
    },
    count: 0,
    deFualtHttp: App.globalData.rootHttp,
    newList: []
  },
  async getnewList(type = 0) {
    let res = await newsList(this.data.queryInfo)
    res.data.list.forEach(item => {
      item.img = `${this.data.deFualtHttp}${item.pic_path}`,
        item.add_time_text = item.add_time_text.substr(0, 10)
    })
    if (type == 0) {
      this.setData({
        newList: res.data.list,
        count: res.data.count
      })
    } else {
      let oldList = this.data.newList
      let newList = oldList.concat(res.data.list)
      this.setData({
        newList,
        count: res.data.count
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getnewList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.newList.length < this.data.count) {
      let page = ++this.data.queryInfo.page
      this.setData({
        ['queryInfo.page']: page
      })
      this.getnewList(1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})