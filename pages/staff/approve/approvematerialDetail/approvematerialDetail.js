// pages/person/renovation/renovationDetail/renovationDetail.js
import {approve_goods_detail,approve_goods_agree,approve_goodscancel} from '../../../../api/approve'

let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteHttp:App.globalData.siteHttp,
    type:false,
    info: {},
    id:''
  },
  toPay(){
    wx.navigateTo({
      url: '/pages/person/renovation/renovationPay/renovationPay',
    })
  },
  reject(){
    wx.navigateTo({
      url: `/pages/staff/approve/reject/reject?type=3&id=${this.data.info.id}`,
    })
  },
  async resolve(){
    let res = await approve_goods_agree({id:this.data.info.id,token:wx.getStorageSync('token')})
    if(res.code == 200) {
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }else{
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  async getDetail(id){
    let res = await approve_goods_detail({id,token:wx.getStorageSync('token')})
    this.setData({
      info: res.data
    })
  },
  async revoke(){
    let res = await approve_goodscancel({id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200) {
      wx.showToast({
        title: '撤销成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }else{
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == '1'){
      this.setData({
        type: true
      })
    }
    if(options.type == '3'){
      this.setData({
        isMe: true
      })
    }
    this.setData({
      id: options.id
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