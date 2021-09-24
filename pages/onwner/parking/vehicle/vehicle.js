// pages/onwner/parking/vehicle/vehicle.js
import {fee_carList,fee_carDetail} from '../../../../api/info'
const filter = require('../../../../utils/router.js');
const app = getApp()
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    deFualtHttp:app.globalData.rootHttp,
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/onwner/payment/payRecord/payRecord?no=${e.currentTarget.dataset.no}`,
    })
  },
  toPay(e){
    wx.navigateTo({
      url: `/pages/onwner/parking/payPage/payPage?no=${e.currentTarget.dataset.no}`,
    })
  },
  addCar(){
    wx.navigateTo({
      url: '/pages/onwner/parking/addCar/addCar',
    })
  },
  addCar1(){
    wx.navigateTo({
      url: '/pages/onwner/parking/getcarNo/getcarNo',
    })
  },
  async getfee_carList(){
    let res = await fee_carList({token:wx.getStorageSync('token')})
    this.setData({
      list:res.data
    })
    console.log(res)
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
    this.getfee_carList()
    // fee_carDetail({token:wx.getStorageSync('token'),car_no:'皖AD22222'}).then(res=>{
    //   console.log(res)
    // })
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