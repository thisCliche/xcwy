// pages/onwner/payment/payPage/payPage.js
import {fee_carRecord,fee_carDetail,pay,fee_carDel} from '../../../../api/info'
import {buildOrder} from '../../../../api/fee'
import {
  getOwner
} from '../../../../api/login'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    car_no:'',
    deFualtHttp:app.globalData.rootHttp,
    info: {},
    userInfo:{}
  },
  async delCar(){
    let res = await fee_carDel({token: wx.getStorageSync('token'),no:this.data.car_no})
    if (res.code == 200) {
      wx.showToast({
        title: '删除成功',
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
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    this.setData({
      userInfo: res.data
    })
  },
  async buildOrder() {
    let res = await buildOrder({
      token: wx.getStorageSync('token'),
      // house_id: this.data.info.house_id,
      type:2,
      money: this.data.info.bill,
      table: 'car',
      car_no:this.data.info.car_no
    })
    let result = await pay({
      token: wx.getStorageSync('token'),
      table: 'car',
      order_no: res.data
    })
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
            delta: 1,
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
  async getDetail(no){
    let res = await fee_carDetail({car_no:no,token:wx.getStorageSync('token')}) 
    this.setData({
      info: res.data
    })
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      car_no:options.no
    })
    // this.getList(options.no)
    this.getDetail(options.no)
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
})