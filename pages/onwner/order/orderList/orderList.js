// pages/onwner/order/orderList/orderList.js
const filter = require('../../../../utils/router.js');
import {appointmentList} from '../../../../api/booking'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    active: 0,
    current:0,
    queryInfo:{
      page:1,
      limit:50
    },
    list:[{title:'文化馆',time:'2021-06-01',des:'老城保护中心'},{title:'文化馆',time:'2021-06-01',des:'老城保护中心'}]
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/onwner/order/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getList(){
    this.setData({
      isLoad: true
    })
    let status = this.data.current
    let res = await appointmentList({token:wx.getStorageSync('token'),...this.data.queryInfo,status:++status})
    this.setData({
      list: res.data.list,
      isLoad: false,
    })
  },
  onClick(e) {
    this.setData({
      current: e.detail.name
    })
    this.getList()
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