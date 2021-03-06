// pages/person/repair/orderDetail/orderDetail.js
import {repairDetail,agree,confirmed} from '../../../../api/repair'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteHttp:App.globalData.siteHttp,
    rootHttp:App.globalData.rootHttp,
    info:{},
  },
  async getDetail(id){
    let res = await repairDetail({token:wx.getStorageSync('token'),id})
    if(res.data.attachment.length!=0){
      for(let i =0;i<res.data.attachment.length;i++){
        res.data.attachment[i] = this.data.rootHttp +res.data.attachment[i]
      }
    }
    if(res.data.logs?.length==3  || res.data.logs?.length==4){
      for(let i =0;i<res.data.logs[2].attachment.length;i++){
        res.data.logs[2].attachment[i] = this.data.rootHttp +res.data.logs[2].attachment[i]
      }
    }
    this.setData({
      info: res.data
    })
  },
  previewImage(e){
    let urls = e.currentTarget.dataset.list
    wx.previewImage({
      current: e.currentTarget.dataset.url, 
      urls
    })
  },
  toDone(){
    wx.navigateTo({
      url: `/pages/staff/repair/repairReply/repairReply?id=${this.data.info.id}`,
    })
  },
  async confirme(){
    let res = await confirmed({token:wx.getStorageSync('token'),id: this.data.info.id})
    if(res.code != 200){
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }else{
      wx.showToast({
        title: '维修成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }
  },
  async agree(){
    let res = await agree({token:wx.getStorageSync('token'),id: this.data.info.id})
    if(res.code != 200){
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }else{
      wx.showToast({
        title: '接单成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }
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