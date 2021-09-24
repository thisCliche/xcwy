// pages/staff/staffLog/selectLog/selectLog.js
import {list} from '../../../../api/report'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [0],
    select:true,
    logList: [],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onSelect(event){
    this.setData({
      [`logList[${event.currentTarget.dataset.idx}].select`]:!event.currentTarget.dataset.type,
    });
  },
  async getlist(){
    let res = await list({token:wx.getStorageSync('token'),page:1,limit:31,type:1,status:2})
    res.data.list.forEach(item=>{
      item.select = false
    })
    this.setData({
      logList: res.data.list
    })
  },
  submit(){
    let logList = this.data.logList.filter(item=>{
      return item.select
    })
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    wx.navigateBack({
      delta: 1,
      complete: function () {
        setTimeout(function () {
          prevPage.getlogList({
            logList: logList
          })
        }, 500)
      }
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
    this.getlist()
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