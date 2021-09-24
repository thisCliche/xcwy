// pages/person/attestation/attestation.js
import {
  project,
  owner,
  getOwner,
  logout
} from '../../../api/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio1: '',
    isShow: false,
    radio2: '',
    name: '',
    mobile: '',
    location: '',
    projectList: [],
    active: 0,
    type:1,
  },
  onChange(event) {
    this.setData({
      type: event.detail,
    });
  },
  submit() {
    if (this.data.name != '' || this.data.location) {
      owner({
        token: wx.getStorageSync('token'),
        name: this.data.name,
        mobile: this.data.mobile,
        project_id: this.data.radio1,
        type: this.data.type,
        house_id: this.data.radio2
      }).then(res => {
        if (res.code != 200) {
          wx.showToast({
            title: '意外错误',
            icon: 'error'
          })
        } else {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(_ => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500)
        }
      })
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: 'error'
      })
    }
  },
  onradioChange(event) {
    console.log(event)
    let that = this
    if (event.currentTarget.dataset.type == 'radio2') {
      this.data.projectList.forEach(item => {
        if (item.house_id == event.detail) {
          that.setData({
            location: that.data.location + item.name,
          })
        }
      })
    } else {
      this.data.projectList.forEach(item => {
        if (item.project_id == event.detail) {
          that.setData({
            location: that.data.location + item.name,
          })
        }
      })
    }
    setTimeout(_ => {
      that.setData({
        [event.currentTarget.dataset.type]: event.detail,
        active: ++this.data.active
      });
      if (that.data.radio1 != '') {
        that.getProject({
          project_id: that.data.radio1
        })
      }
    }, 300)


  },
  async getProject(data) {
    let res = await project(data)
    this.setData({
      projectList: res.data
    })
  },
  async logoutBtn() {
    let res = await logout({
      token: wx.getStorageSync('token')
    })
    console.log(res)
    if (res.code != 200) {
      wx.showToast({
        title: '意外错误',
        icon: 'error'
      })
    } else {
      wx.showToast({
        title: '注销成功',
      })
      setTimeout(_ => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 500)
    }
  },
  async getownerInfo() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id == '业主') {
      this.setData({
        isShow: true
      })
      this.getownerInfo()
    } else {
      this.getProject()
    }
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