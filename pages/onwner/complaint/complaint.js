// pages/onwner/complaint/complaint.js
import {
  add
} from '../../../api/Feedback'
const filter = require('../../../utils/router.js');
let app = getApp()
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    rootHttp: app.globalData.rootHttp,
    title: '',
    height: {
      minHeight: 100
    },
    content: '',
    fileList: [],
    imgList: [],
  },
  async submit() {
    let form = {
      title: this.data.title,
      token: wx.getStorageSync('token'),
      content: this.data.content,
      images: JSON.stringify(this.data.imgList)
    }
    for (let i in form) {
      if (form[i] == '') {
        if (i == 'images') {

        } else {
          return wx.showToast({
            title: '请填写完整',
            icon: 'error'
          })
        }
      }
    }
    let res = await add(form)
    if (res.code == 200) {
      wx.showToast({
        title: '投诉成功',
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
    let imgList = this.data.imgList
    fileList.splice(event.detail.index, 1)
    imgList.splice(event.detail.index, 1)
    this.setData({
      fileList,
      imgList
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let that = this
    console.log(file)
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
        let imgList = that.data.imgList
        imgList.push(img.data)
        fileList.push({
          // ...file,
          url: app.globalData.rootHttp + img.data
        });
        that.setData({
          fileList,
          imgList
        });
      },
    });
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
}))