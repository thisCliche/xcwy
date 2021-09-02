// pages/staff/renovation/reject/reject.js
import {reject} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reject_reason:'',
    id:'',
    minHeight:{minHeight: 180}
  },
  async toReject(){
    if(this.data.reject_reason == ''){
      return wx.showToast({
        title: '不能为空',
        icon: 'error'
      })
    }
    let res = await reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
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