// pages/onwner/order/orderList/orderList.js
import {
  repairList
} from '../../../../api/repair'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    active: 0,
    current: 0,
    queryInfo: {
      page: 1,
      limit: 10
    },
    count: 0,
    list: []
  },
  onClick(e) {
    this.setData({
      current: e.detail.name,
      ['queryInfo.page']: 1
    })
    this.getrepairList()
  },
  onClick1() {
    this.setData({
      ['queryInfo.page']: 1
    })
    this.getrepairList()
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/person/repair/orderDetail1/orderDetail1?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getrepairList(type = 0) {
    this.setData({
      isLoad: true
    })
    let status = this.data.current
    try {
      let res = await repairList({
        ...this.data.queryInfo,
        status: ++status,
        type: 2,
        token: wx.getStorageSync('token')
      })
      if (type == 0) {
        this.setData({
          list: res.data.list,
          count: res.data.count,
          isLoad: false,
        })
      } else {
        let list = this.data.list.concat(...res.data.list)
        this.setData({
          list: list,
          count: res.data.count,
          isLoad: false,
        })
      }

    } catch (e) {
      this.setData({
        isLoad: false,
      })
      wx.showToast({
        title: '意外错误',
      })
      console.log(e)
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.getrepairList()
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
    this.onClick1()
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
    if (this.data.list.length < this.data.count) {
      let page = ++this.data.queryInfo.page
      this.setData({
        ['queryInfo.page']: page
      })
      this.getList(1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})