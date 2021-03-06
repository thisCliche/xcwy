// pages/person/meetBook/meetBook.js
import {record} from '../../../../api/meeting'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootHttp:App.globalData.rootHttp,
    list:[{name:'',pass:true},{name:'',pass:false}]
    // list:[]
  },
  toDetail(e){
    wx.navigateTo({
      url: `/pages/person/meetBook/meetBookDetail/meetBookDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  async getRecord(){
    let res = await record({token:wx.getStorageSync('token'),page:1,limit:100})
    this.setData({
      list: res.data.list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getRecord()
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