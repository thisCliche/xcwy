// pages/person/vista/vistaList/vistaList.js
import {list} from '../../../../api/task'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    current: 0,
    active: 0,
    queryInfo:{
      page:1,
      limit:10,
    },
    list: [],
  },
  onClick(e) {
    this.setData({
      current: e.detail.name
    })
    this.getList()
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/staff/taskFeed/taskDetail/taskDetail',
    })
    
  },
  async getList(){
    this.setData({
      isLoad: true
    })
    let res = await list({...this.data.queryInfo,status:this.data.current,token:wx.getStorageSync('token')})
    this.setData({
      list: res.data.list,
      isLoad: false
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
})