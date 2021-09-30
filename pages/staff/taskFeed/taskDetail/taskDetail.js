// pages/staff/task/taskDetail/taskDetail.js
import {
  reportDetail,
  detail
} from '../../../../api/task'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    rootHttp: App.globalData.rootHttp,
    list: [1, 2, 3, 4, 5, 6]
  },
  async getDetail(id) {
    let res = await detail({
      token: wx.getStorageSync('token'),
      id
    })

    if (res.data.done_receiver.length != 0) {
      for (let i = 0; i < res.data.done_receiver.length; i++) {
        if (res.data.done_receiver[i].images != '[]') {
          let images = JSON.parse(res.data.done_receiver[i].images)
          for (let j = 0; j < images.length; j++) {
            images[j] = this.data.rootHttp + images[j]
          }
          res.data.done_receiver[i].images = images
        }
      }
    }

    this.setData({
      info: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})