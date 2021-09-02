// pages/login/login.js
const app = getApp()
import {
  sendLogin
} from '../../api/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    userPhone: '',
    type: '',
    isLogin: true
  },
  backUp() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  getUserProfile() {
    let that = this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.showLoading({
          title: '登录中...',
        })
        if (res.errMsg == 'getUserProfile:ok') {
          wx.login({
            success: (lres) => {
              if (lres.code) {
                var data = {
                  code: lres.code,
                  userInfo: res.userInfo,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                }
                const code = lres.code
                sendLogin(data).then(json => {
                  wx.hideLoading()
                  if (json.data && json.data.token) {
                    let userInfo = json.data.member_info
                    wx.setStorageSync('userInfo', JSON.stringify(userInfo))
                    wx.setStorageSync('token', json.data.token)
                    wx.setStorageSync('refresh_token', json.data.refresh_token)
                    if (that.data.type == '') {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    } else {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  } else {
                    wx.showToast({
                      title: json.msg || "获取登录信息失败",
                      icon: 'error',
                      duration: 2000
                    })
                  }
                }).catch(res => {
                  wx.showToast({
                    title: '网络错误，登录失败',
                    icon: 'error',
                    duration: 2000
                  })
                })
              } else {
                wx.showToast({
                  title: '获取登录状态失败',
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length != 0) {
      this.setData({
        type: options.type
      })
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