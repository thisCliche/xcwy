// pages/staff/task/cheackDetail/cheackDetail.js
import {
  detail,
  del
} from '../../../../api/report'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    list: [1, 2, 3, 4, 5, 6],
    value: 3,
    id: '',
    siteHttp: App.globalData.siteHttp,
    info: {},
    type: '',
    actions: [{
      name: '删除',
      color: '#ee0a24'
    }, ],
  },
  toApprove() {
    wx.navigateTo({
      url: `/pages/staff/staffLog/approve/approve?id=${this.data.id}`,
    })
  },
  openBox() {
    this.setData({
      show: true
    })
  },
  async onSelect(event) {
    let dt = new Date()
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    let dateNumber = `${y}-${m}-${d}`
    this.setData({
      show: true
    })
    if (this.data.info.add_time.slice(0, 10) == dateNumber) {
      let res = await del({
        token: wx.getStorageSync('token'),
        id: this.data.id
      })
      if (res.code == 200) {
        wx.showToast({
          title: '删除成功',
        })
        setTimeout(_ => {
          wx.navigateBack({
            delta: 1,
          })
        }, 500)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'error'
        })
      }
    } else {
      wx.showToast({
        title: '仅可删除当天日志',
        icon: 'none'
      })
    }
  },
  onCancel() {
    this.setData({
      show: false
    })
  },
  async getList(id) {
    let res = await detail({
      id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      type: options.type
    })
    this.getList(options.id)
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