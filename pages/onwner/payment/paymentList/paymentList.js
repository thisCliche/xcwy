// pages/onwner/payment/paymentList/paymentList.js
import {propertyRecord,index,buildDetail} from '../../../../api/fee'
const filter = require('../../../../utils/router.js');
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: true,
    list: {}
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/onwner/payment/payRecord/payRecord?type=${e.currentTarget.dataset.type}&house_id=${this.data.list.house_id}`,
    })
  },
  async getList(){
    let res = await index({token:wx.getStorageSync('token')})
    // let res = await propertyRecord({token:wx.getStorageSync('token'),page:1,limit:100})
    this.setData({
      list:res.data,
      isLoad: false,
    })
  },
  topay(e){
    wx.navigateTo({
      url: `/pages/onwner/payment/payPage/payPage?type=${e.currentTarget.dataset.type}&house_id=${this.data.list.house_id}`,
    })
  },
  tolist(){
    wx.navigateTo({
      url: `/pages/person/renovation/renovationList/renovationList`,
    })
  },
  topay1(e){
    wx.navigateTo({
      url: `/pages/person/renovation/renovationPay/renovationPay`,
    })
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
    this.getList()
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
}))