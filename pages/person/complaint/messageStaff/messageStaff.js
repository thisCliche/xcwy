// pages/person/complaint/complaintList/complaintList.js
import {
  messageMy,read
} from '../../../../api/Feedback'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // toDetail(e){

  // },
  async todeDetail(e) {
    if(e.currentTarget.dataset.read == 'false'){
      let res = await read({id:e.currentTarget.dataset.msid})
      if (e.currentTarget.dataset.table == 'build') {
        wx.navigateTo({
          url: `/pages/staff/renovation/renovationHandle/renovationHandle?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'meeting') {
        wx.navigateTo({
          url: `/pages/staff/meetRoom/meetDetail/meetDetail?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'repair') {
        wx.navigateTo({
          url: `/pages/person/repair/orderDetail1/orderDetail1?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'feedback') {
        wx.navigateTo({
          url: `/pages/staff/complaint/complaintDetail/complaintDetail?id=${e.currentTarget.dataset.id}`,
        })
      }
    }else{
      if (e.currentTarget.dataset.table == 'build') {
        wx.navigateTo({
          url: `/pages/staff/renovation/renovationHandle/renovationHandle?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'meeting') {
        wx.navigateTo({
          url: `/pages/staff/meetRoom/meetDetail/meetDetail?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'repair') {
        wx.navigateTo({
          url: `/pages/person/repair/orderDetail1/orderDetail1?id=${e.currentTarget.dataset.id}`,
        })
      } else if (e.currentTarget.dataset.table == 'feedback') {
        wx.navigateTo({
          url: `/pages/staff/complaint/complaintDetail/complaintDetail?id=${e.currentTarget.dataset.id}`,
        })
      }
    }
    

  },
  async getDetail() {
    let res = await messageMy({
      token: wx.getStorageSync('token'),
      page: 1,
      num: 50
    })
    this.setData({
      list: res.data
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