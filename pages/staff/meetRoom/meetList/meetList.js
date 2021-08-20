// pages/person/vista/vistaList/vistaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    active:0,
    list:[{title:`个人预约`,estimateTime:'预约时间：2021.10.10 上午',des:'预约人：蒋海宁',time:'2021-01-06 18:36',location:'会议室：北楼305大会议室'},{title:`个人预约`,estimateTime:'预约时间：2021.10.10 上午',des:'预约人：蒋海宁',time:'2021-01-06 18:36',location:'会议室：北楼305大会议室'}]
  },
  onClick(e){
    this.setData({
      current:e.detail.name
    })
  },
  toDetail(){
    wx.navigateTo({
      url: '/pages/staff/meetRoom/meetDetail/meetDetail',
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