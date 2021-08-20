// pages/person/vista/vistaList/vistaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    active: 0,
    list: [{
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      color:'#CECECE'
    }, {
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      color:'#32CC85'
    },],
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
  toWrite(){
    wx.navigateTo({
      url: '/pages/staff/task/taskDetail/taskDetail',
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/staff/task/cheackDetail/cheackDetail',
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