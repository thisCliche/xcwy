// pages/person/renovation/renovationDetail/renovationDetail.js
import {detail,done} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    id:'',
  },
  async toDone(){
    let res = await done({token:wx.getStorageSync('token'),id:this.data.id})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }
  },
  async getDetail(id){
    let res =await detail({id,token:wx.getStorageSync('token')})
    this.setData({
      info:res.data
    })
  },
  toPay(){
    wx.navigateTo({
      url: '/pages/staff/renovation/pay/pay',
    })
  },
  reject(){
    wx.navigateTo({
      url: `/pages/staff/renovation/reject/reject?id=${this.data.id}`,
    })
  },
  resolve(){
    wx.navigateTo({
      url: '/pages/onwner/payment/payPage/payPage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
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