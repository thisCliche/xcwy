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
    value:'',
    siteHttp:app.globalData.siteHttp,
    rootHttp: app.globalData.rootHttp,
    fileList: [],
    minHeight:{minHeight: 80},
    title:'请选择',
    id: '',
    type: '',
    elevator:'',
    fire_control: '',
    security: '',
    health: '',
    other:'',
    images:'',
  },
  getlogin(e){
    this.setData({
      id:e.id,
      title:e.name
    })
  },
  toSelect(){
    wx.navigateTo({
      url: `/pages/staff/task/selectTask/selectTask?type=${this.data.type}`,
    })
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
  async submit() {
    let form = {
      token: wx.getStorageSync('token'),
      id: this.data.id,
      type: this.data.type,
      elevator: this.data.elevator,
      fire_control: this.data.fire_control,
      security: this.data.security,
      health: this.data.health,
      other: this.data.other,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      id: options.id,
      type: options.type
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