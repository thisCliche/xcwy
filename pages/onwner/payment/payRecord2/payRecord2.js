// pages/onwner/payment/payRecord/payRecord.js
import {
  waterRecord,
  propertyRecord,
  electricRecord,
  rentRecord,
  record,
  buildRecord
} from '../../../../api/fee'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo: {
      page: 1,
      limit: 100
    },
    typeName:'',
    list: []
  },
  toDetail() {

  },
  async getList1(house_id) {
    let res = await waterRecord({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      house_id
    })
    this.setData({
      list: res.data.list
    })
  },
  async getList2(house_id) {
    let res = await propertyRecord({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      house_id
    })
    this.setData({
      list: res.data.list
    })
  },
  async getList3(house_id) {
    let res = await electricRecord({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      house_id
    })
    this.setData({
      list: res.data.list
    })
  },
  async getList4(house_id) {
    let res = await rentRecord({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      house_id
    })
    this.setData({
      list: res.data.list
    })
  },
  async getList5(car_no) {
    let res = await record({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      car_no
    })
    this.setData({
      list: res.data.list
    })
  },
  async getList6(house_id) {
    let res = await buildRecord({
      ...this.data.queryInfo,
      token: wx.getStorageSync('token'),
      house_id
    })
    this.setData({
      list: res.data.list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.no) {
      this.getList5(options.no)
    } else {
      switch (options.type) {
        case 'property':
          this.setData({
            typeName:'物业费'
          })
          this.getList2(options.house_id)
          break;
        case 'rent':
          this.setData({
            typeName:'租赁费'
          })
          this.getList4(options.house_id)
          break;
        case 'water':
          this.setData({
            typeName:'水费'
          })
          this.getList1(options.house_id)
          break;
        case 'build':
          this.setData({
            typeName:'装修缴费'
          })
          this.getList6(options.house_id)
          break;
        default:
          this.setData({
            typeName:'电费'
          })
          this.getList3(options.house_id)
      }
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