// pages/person/renovation/renovationDetail/renovationDetail.js
import {detail} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    id:0,
    infoP:{}
  },
  toPay(e){
    wx.navigateTo({
      url: `/pages/onwner/payment/payPage/payPage?type=build&house_id=${this.data.info.project_id}`,
      // 
    })
    // wx.navigateTo({
    //   url: `/pages/person/renovation/renovationPay/renovationPay?id=${e.currentTarget.dataset.id}&order_no=${e.currentTarget.dataset.order_no}&mony=${e.currentTarget.dataset.money}&des1=${this.data.info.project_name}-${this.data.info.area_name}-${this.data.info.block_name}-${this.data.info.house_name}&name=${this.data.info.member.name}&mobile=${this.data.info.member.mobile}`,
    // })
  },
  async getDetail(id){
    let res = await detail({token:wx.getStorageSync('token'),id})
    this.setData({
      info: res.data
    })
  },
  // async getOwnerDetail() {
  //   let res = await getOwner({
  //     token: wx.getStorageSync('token')
  //   })
  //   this.setData({
  //     infoP: res.data
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
    this.setData({
      id:options.id
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
    this.getDetail(this.data.id)
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