// pages/person/complaint/complaintDetail/complaintDetail.js
import {
  detail
} from '../../../../api/Feedback'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootHttp:App.globalData.rootHttp,
    siteHttp: App.globalData.siteHttp,
    info:{},
  },
  previewImage(e){
    let urls = e.currentTarget.dataset.list
    wx.previewImage({
      current: e.currentTarget.dataset.url, 
      urls
    })
  },
  async getDetail(id) {
    let res = await detail({
      id,
      token: wx.getStorageSync('token')
    })
    if(res.data.images.length!=0){
      for(let i =0;i<res.data.images.length;i++){
        res.data.images[i] = this.data.rootHttp +res.data.images[i]
      }
    }
    if(res.data.reply_images!==null && res.data.reply_images?.length!=0 ){
      for(let i =0;i<res.data.reply_images.length;i++){
        res.data.reply_images[i] = this.data.rootHttp +res.data.reply_images[i]
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