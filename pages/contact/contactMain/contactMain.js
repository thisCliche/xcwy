// pages/contact/contactMain/contactMain.js
import {
  contact,
  branch
} from '../../../api/contact'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    branchName: '',
    staffList: [],
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/contact/contactSearch/contactSearch',
    })
  },
  async getList() {
    let res = await branch({
      token: wx.getStorageSync('token')
    })
    this.setData({
      list: res.data
    })
  },
  async staffList(e) {
    this.setData({
      branchName: e.currentTarget.dataset.name
    })
    let res = await contact({
      token: wx.getStorageSync('token'),
      branch_id: e.currentTarget.dataset.branch_id
    })
    this.setData({
      staffList: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    // this.staffList()
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
    this.getTabBar().init();
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