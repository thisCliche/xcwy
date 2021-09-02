// pages/person/complaint/complaintList/complaintList.js
import {my} from '../../../../api/Feedback'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/person/complaint/complaintDetail/complaintDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getDetail(){
    let res = await my({token:wx.getStorageSync('token'),page:1,num:50})
    this.setData({
      list:res.data
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
    this.getDetail()
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