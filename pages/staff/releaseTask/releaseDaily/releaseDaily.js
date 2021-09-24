// pages/staff/releaseTask/releaseDaily/releaseDaily.js

import {
  report
} from '../../../../api/task'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    type: 1,
    title: '',
    patrol: '',
    fileList: [],
    siteHttp: app.globalData.siteHttp,
    rootHttp: app.globalData.rootHttp,
    minHeight: {
      minHeight: 80
    }
  },
  async submit() {
    let form = {
      token: wx.getStorageSync('token'),
      id: this.data.id,
      type: this.data.type,
      patrol: this.data.patrol,
      images: JSON.stringify(this.data.fileList),
    }
    for (let i in form) {
      if (form[i] == '') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'error'
        })
      }
    }
    let res = await report(form)
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
  deleteImg(event) {
    let fileList = this.data.fileList
    fileList.splice(event.detail.index, 1)
    this.setData({
      fileList
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let that = this
    wx.uploadFile({
      url: that.data.rootHttp + '/api.php/app/upload',
      filePath: file.url,
      name: 'file',
      header: {
        "Authorization": "Basic enhrajp6eGtqNjY4OA=="
      },
      success(res) {
        let img = JSON.parse(res.data)
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = that.data;
        fileList.push({
          // ...file,
          url: app.globalData.rootHttp + img.data
        });
        that.setData({
          fileList
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.title != '日常巡查'){
      wx.setNavigationBarTitle({
        title: '管家巡检/工程巡检',
      })
    }
    this.setData({
      title: options.title,
      type:this.data.type,
      id: options.id
    })
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