// pages/person/personInfo/personInfo.js
const filter = require('../../../utils/router.js');
import {myProfile} from '../../../api/login.js'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  toDetial(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },
  async getUserInfo(){
    let res = await myProfile({token:wx.getStorageSync('token')})
    this.setData({
      userInfo: res.data
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
    this.getUserInfo()
    
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