// pages/person/vista/vistaList/vistaList.js
import {visitorList} from '../../../../api/booking'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    active:0,
    queryInfo:{
      status:2,
      page:1,
      limit:100
    },
    list:[{title:`城隍庙文化馆-老城保护中心-信息楼-
    1011栋-105室（到访地址）`,estimateTime:'到访时间：2021-06-07',des:'到访人数：1人',time:'2021-06-01'},{title:`城隍庙文化馆-老城保护中心-信息楼-
    1011栋-105室（到访地址）`,estimateTime:'到访时间：2021-06-07',des:'到访人数：1人',time:'2021-06-01'}]
  },
  onClick(e){
    this.setData({
      current:e.detail.name
    })
  },
  async getvisitorList(){
    let res = await visitorList({token:wx.getStorageSync('token'),...this.data.queryInfo})
    this.setData({
      list: res.data.list
    })
  },
  changed(e){
    let queryInfo = this.data.queryInfo
    queryInfo.status = e.detail.index+2
    this.getvisitorList()
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/person/vista/vistaDetail/vistaDetail?id=${e.currentTarget.dataset.id}`,
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
    this.getvisitorList()
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