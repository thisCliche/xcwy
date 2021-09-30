// pages/onwner/payment/payPage/payPage.js
import {
  waterDetail,
  propertyDetail,
  electricDetail,
  rentDetail,
  buildDetail,
  buildOrder
} from '../../../../api/fee'
import {
  pay
} from '../../../../api/info'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootHttp:app.globalData.rootHttp,
    upInfo: {},
    info: {},
    typeName: '',
    id:'',
    mony:'',
    order_no:'',
    des1:'',
    mobile:'',
    name:''
  },
  async toPay(){
    let result = await pay({table:'build',order_no:this.data.order_no,token:wx.getStorageSync('token')})
    wx.requestPayment({
      timeStamp: result.data.timeStamp + '',
      nonceStr: result.data.nonceStr,
      package: result.data.package,
      signType: 'MD5',
      paySign: result.data.paySign,
      success(result) {
        wx.showToast({
          title: '支付成功',
        })
        setTimeout(_ => {
          wx.navigateBack({
            delta: 2,
          })
        }, 500)
      },
      fail(result) {
        wx.showToast({
          title: '支付失败',
          icon: 'error'
        })
        console.log('失败', result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      order_no:options.order_no,
      mony:options.mony,
      des1:options.des1,
      name:options.name,
      mobile:options.mobile,
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