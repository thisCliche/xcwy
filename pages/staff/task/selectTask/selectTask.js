// pages/staff/task/selectTask/selectTask.js
import {
  getList
} from '../../../../api/task'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    radio:0,
    isBtn: false
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
      isBtn: true,
    });
  },
  backUp(){
    let pages = getCurrentPages()
    let prevPage = pages[pages.length-2]
    let that = this
    let name = ''
    this.data.list.forEach(item=>{
      if(item.id == that.data.radio){
        name = item.title
      }
    })
    wx.navigateBack({
      delta: 1,
      complete: function(){
        setTimeout(function(){
          prevPage.getlogin({id:that.data.radio,name})
        },500)
      }
    })
  },
  async taskList(type) {
    let res = await getList({
      token: wx.getStorageSync('token'),
      type
    })
    this.setData({
      list: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(options.type)
    this.taskList(options.type)
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