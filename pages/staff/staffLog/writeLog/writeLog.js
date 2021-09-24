// pages/staff/staffLog/writeLog/writeLog.js
import {
  add,
} from '../../../../api/report'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteHttp: App.globalData.siteHttp,
    minHeight: {
      minHeight: 80
    },
    selectList: [],
    selectlogList: [],
    today: '',
    summary: '',
  },
  toReceiver() {
    wx.navigateTo({
      url: '/pages/staff/staffLog/receiver/receiver',
    })
  },
  deletePep(e) {
    let selectList = this.data.selectList
    selectList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      selectList
    })
  },
  tologList() {
    wx.navigateTo({
      url: '/pages/staff/staffLog/selectLog/selectLog',
    })
  },
  getlogList(e) {
    this.setData({
      selectlogList: e.logList
    })
  },
  getselect(e) {
    let selectList = this.data.selectList
    let newList = []
    if (selectList.length != 0) {
      for (let i of e.selectList) {
        let isExist = false
        for (let j of selectList) {
          if (i.id == j.id) {
            isExist = true
            break;
          }
        }
        if (!isExist) {
          newList.push(i)
        }
      }
      let newSelectList = selectList.concat(...newList)
      this.setData({
        selectList: newSelectList
      })
    } else {
      this.setData({
        selectList: e.selectList
      })
    }
  },
  async submit() {
    let uid = []
    let tasks = ''
    let images = []
    this.data.selectList.map(item => {
      uid.push(item.id)
    })
    this.data.selectlogList.map((item, idx) => {
      tasks = tasks + `${++idx}. ${item.content.tasks}`
    })
    this.data.selectlogList.map((item, idx) => {
      if (item.images.length != 0) {
        images.push(...item.images)
      }
    })

    let form = {
      type: '3',
      token: wx.getStorageSync('token'),
      uid: uid.toString(),
      summary: this.data.summary,
      tasks,
      images: JSON.stringify(images),
    }
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'error'
        })
      }
    }
    let res = await add(form)
    if (res.code == 200) {
      wx.showToast({
        title: '提交成功',
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
    let today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1 + '').padStart(2, '0')}`
    this.setData({
      today
    })
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