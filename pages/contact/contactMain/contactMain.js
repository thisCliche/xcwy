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
    indexList: [],
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
    })
    let indexList = []
    res.data.forEach(item => {
      if (item.data.length != 0) {
        indexList.push(item.letter)
      }
    })
    this.setData({
      staffList: res.data,
      indexList
    })
  },
  toPhone(e) {
    if (e.currentTarget.dataset.mobile != '') {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.mobile
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    let e = {
      currentTarget: {
        dataset: {
          branch_id: 1,
          name: "城新物业"
        }
      }
    }
    this.staffList(e)
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