// pages/onwner/repair/repair.js
const filter = require('../../../utils/router.js');
let app = getApp()
import {
  project,
  add
} from '../../../api/repair'
import {
  validPhone
} from '../../../utils/util'
Page(filter.loginCheck({
  /**
   * 页面的初始数据
   */
  data: {
    rootHttp:app.globalData.rootHttp,
    location: '',
    bxr: '',
    bxdh: '',
    xm: '请选择报修项目',
    project_id: '',
    bxnr: '',
    height: {
      minHeight: 50
    },
    hyShow: false,
    columns: [],
    fileList: [],
  },
  onDisplay(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: true
    });
  },
  onClose(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: false
    });
  },
  onpickerConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      hyShow: false,
      xm: value.text,
      project_id: value.project_id
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
  async getProject() {
    let res = await project({
      token: wx.getStorageSync('token')
    })
    let columns = []
    for (let i in res.data) {
      let item = {
        project_id: i,
        text: res.data[i]
      }
      columns.push(item)
    }
    this.setData({
      columns
    })
  },
  async sumbmit() {
    if (!validPhone(this.data.bxdh)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'error'
      })
    }
    let form = {
      project_id: this.data.project_id,
      token: wx.getStorageSync('token'),
      address: this.data.location,
      name: this.data.bxr,
      mobile: this.data.bxdh,
      content: this.data.bxnr,
      attachment: JSON.stringify(this.data.fileList)
    }
    for (let i in form) {
      if (form[i] == '') {
        if (i == 'attachment') {
          
        } else {
          return wx.showToast({
            title: '请填写完整',
            icon: 'error'
          })
        }
      }
    }
    let res = await add(form)
    if(res.code == 200) {
      wx.showToast({
        title: '报修成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }else{
      wx.showToast({
        title: res.msg,
        icon:'error'
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
    this.getProject()
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