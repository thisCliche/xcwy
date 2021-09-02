// pages/person/meetBook/meetBookDetail/meetBookDetail.js
import {detail,agree} from '../../../../api/meeting'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    id:''
  },
  async getDetail(id){
    let res = await detail({id,token:wx.getStorageSync('token')})
    this.setData({
      info: res.data
    })
  },
  reject(){
    wx.navigateTo({
      url: `/pages/staff/meetRoom/reject/reject?id=${this.data.id}`,
    })
  },
  async agree(){
    let res = await agree({id:this.data.id,token:wx.getStorageSync('token')})
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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