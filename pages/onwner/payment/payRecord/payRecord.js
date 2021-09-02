// pages/onwner/payment/payRecord/payRecord.js
import {
  waterRecord,
  propertyRecord,
  electricRecord,
  rentRecord
} from '../../../../api/fee'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo: {
      page: 1,
      limit: 10
    }
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/onwner/payment/payPage/payPage',
    })
  },
  async getList1(house_id) {
    let res = await waterRecord({
      ...this.data.queryInfo,
      token:wx.getStorageSync('token'),
      house_id
    })
    console.log(res)
  },
  async getList2(house_id) {
    let res = await propertyRecord({
      ...this.data.queryInfo,
      token:wx.getStorageSync('token'),
      house_id
    })
    console.log(res)
  },
  async getList3(house_id) {
    let res = await electricRecord({
      ...this.data.queryInfo,
      token:wx.getStorageSync('token'),
      house_id
    })
    console.log(res)
  },
  async getList4(house_id) {
    let res = await rentRecord({
      ...this.data.queryInfo,
      token:wx.getStorageSync('token'),
      house_id
    })
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    switch (options.type) {
      case 'property':
        this.getList2(options.house_id)
        break;
      case 'rent':
        this.getList4(options.house_id)
        break;
      case 'water':
        this.getList1(options.house_id)
        break;
      default:
        this.getList3(options.house_id)
    }
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