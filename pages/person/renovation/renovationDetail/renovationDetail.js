// pages/person/renovation/renovationDetail/renovationDetail.js
import {detail} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    infoP:{}
  },
  toPay(e){
    wx.navigateTo({
      url: `/pages/person/renovation/renovationPay/renovationPay?id=${e.currentTarget.dataset.id}&order_no=${e.currentTarget.dataset.order_no}&mony=${e.currentTarget.dataset.money}`,
    })
  },
  async getDetail(id){
    let res = await detail({token:wx.getStorageSync('token'),id})
    this.setData({
      info: res.data
    })
  },
  // async getOwnerDetail() {
  //   let res = await getOwner({
  //     token: wx.getStorageSync('token')
  //   })
  //   this.setData({
  //     infoP: res.data
  //   })
  // },
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
    // this.getOwnerDetail()
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