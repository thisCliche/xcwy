// pages/person/renovation/renovationPay/renovationPay.js
import {pay} from '../../../../api/info'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:'1',
    id:0,
    rootHttp:app.globalData.rootHttp,
    order_no:'',
    mony:''
  },
  async getOrder(id){
    // let res = await pay({token:wx.getStorageSync('token'),id:Number(id),type:this.data.radio})
    // console.log(res)
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
      mony:options.mony
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