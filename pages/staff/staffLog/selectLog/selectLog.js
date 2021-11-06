// pages/staff/staffLog/selectLog/selectLog.js
import {
  dailyReport,
} from '../../../../api/report'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [0],
    select: true,
    all: false,
    rootHttp: App.globalData.rootHttp,
    logList: [],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onSelect(event) {
    this.setData({
      [`logList[${event.currentTarget.dataset.idx}].select`]: !event.currentTarget.dataset.type,
    });
  },
  toAll(e) {
    this.setData({
      all: e.detail
    })
    let logList = this.data.logList.length;
    let that = this
    if (e.detail) {
      for(let i=0;i<logList;i++){
        that.setData({
          [`logList[${i}].select`]: true,
        });
      }
    } else {
      for(let i=0;i<logList;i++){
        that.setData({
          [`logList[${i}].select`]: false,
        });
      }
    }
  },
  async getlist() {
    let that = this
    // dailyReport
    let res = await dailyReport({
      token: wx.getStorageSync('token'),
      page: 1,
      limit: 31,
      // type: 1,
      // status: 2
    })
    res.data.forEach(item => {
      item.select = false
    })
    let logList = res.data
    if (logList.length != 0) {
      for (let i = 0; i < logList.length; i++) {
        if (logList[i].images.length != 0) {
          for (let j = 0; j < logList[i].images.length; j++) {
            try {
              logList[i].images[j] = that.data.rootHttp + logList[i].images[j]
            } catch (e) {
              console.log(i, j)
            }
          }
        }
      }
    }

    this.setData({
      logList: logList
    })
  },
  submit() {
    let logList = this.data.logList.filter(item => {
      return item.select
    })
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    wx.navigateBack({
      delta: 1,
      complete: function () {
        setTimeout(function () {
          prevPage.getlogList({
            logList: logList
          })
        }, 500)
      }
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
    this.getlist()
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