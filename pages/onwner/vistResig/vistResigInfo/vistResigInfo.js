// pages/onwner/vistResig/vistResigInfo/vistResigInfo.js
const filter = require('../../../../utils/router.js');
import {
  getOwner,
  login
} from '../../../../api/login'
import {
  invitation
} from '../../../../api/booking'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    isShow: false,
  },
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    let res1 = await login({
      account: 15656588888
    })
    console.log(res1)
    this.setData({
      info: res.data
    })
  },
  async generateLink() {
    let res = await invitation({
      token: wx.getStorageSync('token')
    })
    wx.setClipboardData({
      data: res.data.url,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  saveImg() {
    // 查看是否有 `scope.writePhotosAlbum` 权限
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {

          // 申请所需权限
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 授权成功保存图片
              this.saveToAlbum();
            },
            fail: () => {
              // 授权失败
            }
          });
        } else {
          // 用户到设置中同意保存相册权限后再次保存到相册
          this.saveToAlbum();
        }
      }
    });

    // 保存图片到相册
    
  },
  saveToAlbum() {
    // 下载图片资源到本地
    wx.downloadFile({
      url: this.data.info.qrcode,
      success: function (res) {
        // 保存图片到相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: () => {
            // 保存失败
          }
        });
      },
      fail: () => {
        // 下载失败
      }
    });
  },
  async generateCode() {
    let res = await invitation({
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data,
      isShow: true
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
    this.getOwnerDetail()
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