// pages/person/vista/vistaList/vistaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    active: 0,
    list: [{
      title: `王佳佳提交的装修申请`,
      time:'05-16 18:36',
      estimateTime: '装修时间：2021.06.06 至 2021.07.07',
      des: `城隍庙文化馆-老城保护中心-信息楼-1011栋-105室`,
      status:'待审核'
    }, {
      title: `王佳佳提交的装修申请`,
      time:'05-16 18:36',
      estimateTime: '装修时间：2021.06.06 至 2021.07.07',
      des: `城隍庙文化馆-老城保护中心-信息楼-1011栋-105室`,
      status:'待审核'
    }],
    list2: [{
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      content:'1.详情内容 1.详情内容 1.详情内容',
      color:'#CECECE'
    }, {
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      color:'#32CC85'
    },]
  },
  onClick(e) {
    this.setData({
      current: e.detail.name
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/staff/renovation/renovationHandle/renovationHandle',
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