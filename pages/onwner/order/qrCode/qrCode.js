// pages/onwner/order/qrCode/qrCode.js
import {
  appointmentDetail
} from '../../../../api/booking'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deFualtHttp: app.globalData.rootHttp,
    imagePath: '',
    info: {},
  },
  async getDetail(id) {
    let res = await appointmentDetail({
      id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
    this.generate()
  },
  async generate() {
    let path = await this.getImageInfo(this.data.info.qrcode)
    let that = this;
    let context = wx.createCanvasContext('mycanvas');
    context.save();
    context.fillStyle = '#fff'
    context.fillRect(0, 0, 345, 358)
    context.drawImage(path, 110, 180, 134, 134);
    context.restore();
    context.save();
    let word1 = `${this.data.info.project_name}—${this.data.info.area_name}`
    let word2 = `尊敬的  ${this.data.info.booking_detail[0].name}  先生/女士`
    let word3 = `联系电话：${this.data.info.booking_detail[0].mobile}`
    let word4 = `身份证号：${this.data.info.booking_detail[0].id_card}`
    let word5 = `当您来访  请出示此通行证给工作人员`
    let word6 = `预约时间：${this.data.info.date}`
    context.beginPath()
    context.moveTo(0, 140);
    context.lineTo(345, 140);
    context.strokeStyle = 'rgb(224,224,224)'
    context.stroke();
    context.closePath()
    context.restore()
    context.save()
    context.fillStyle = '#FFA477'
    context.fillRect(0, 0, 345, 40)
    context.draw()
    context.font = 'normal normal 16px songti'
    context.fillStyle = '#fff'
    context.setTextAlign('center')
    context.fillText(word1, 173, 24)
    context.fillStyle = '#444'
    context.fillText(word2, 173, 64)
    context.fillStyle = '#ababab'
    context.fillText(word3, 173, 94)
    context.fillStyle = '#ababab'
    context.fillText(word4, 173, 124)
    context.fillStyle = '#000'
    context.fillText(word5, 173, 164)
    context.fillStyle = '#ababab'
    context.fillText(word6, 173, 340)
    context.stroke();
    context.save(); //保存之前的画布设置
    context.draw(true);
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          let tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 1000);
  },
  async save() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail(error) {
        wx.showToast({
          title: '请允许授权',
          icon: 'error'
        })
      }
    })
  },
  getImageInfo(src) {
    return new Promise((resolve) => {
      wx.getImageInfo({
        src: src,
        success(res) {
          resolve(res.path)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
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