// pages/person/vista/vistaList/vistaList.js
import {handleList} from '../../../../api/Feedback'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    active:0,
    queryInfo:{
      page: 1,
      num: 10,
    },
    list:[]
  },
  async getList(){
    let res = await handleList({token:wx.getStorageSync('token'),status:this.data.current,...this.data.queryInfo})
    this.setData({
      list: res.data
    })
  },
  onClick(e){
    this.setData({
      current:e.detail.name
    })
    this.getList()
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/staff/complaint/complaintDetail/complaintDetail?id=${e.currentTarget.dataset.id}`,
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