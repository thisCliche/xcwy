// pages/person/vista/vistaList/vistaList.js
import {
  reportList
} from '../../../../api/task'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    current: 0,
    active: 0,
    queryInfo: {
      page: 1,
      limit: 10,
    },
    list: [],
    list2: [{
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      content: '1.详情内容 1.详情内容 1.详情内容',
      color: '#CECECE'
    }, {
      title: `日常巡查`,
      estimateTime: '昨天 星期三',
      des: '小区安全日常巡查',
      color: '#32CC85'
    }, ]
  },
  async getList() {
    this.setData({
      isLoad: true
    })
    let res = await reportList({
      ...this.data.queryInfo,
      status: this.data.current,
      token: wx.getStorageSync('token')
    })
    this.setData({
      list: res.data.list,
      isLoad: false
    })
  },
  onClick(e) {
    this.setData({
      current: e.detail.name
    })
    this.getList(e.detail.name)
  },
  toTaskDetail(e){
    wx.navigateTo({
      url: `/pages/staff/task/taskDetail/taskDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  toWrite(e) {
    switch (e.currentTarget.dataset.type) {
      case 1:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseDaily/releaseDaily?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`,
        })
        break;
      case 2:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseSafe/releaseSafe?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&type=2`,
        })
        break;
      case 3:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseSafe/releaseSafe?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&type=3`,
        })
        break;
      case 4:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseSafe/releaseSafe?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&type=4`,
        })
        break;
      default:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseSafe/releaseSafe?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&type=5`,
        })
    }
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/staff/task/cheackDetail/cheackDetail?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`,
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