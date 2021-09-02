// pages/contact/pickProject/pickProject.js
import {
  project
} from '../../../api/booking'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    last: false,
    project_id: '',
  },
  async getList(id) {
    if (id) {
      let res = await project({
        project_id: id
      })

      this.setData({
        list: res.data
      })
    } else {
      let res = await project()
      this.setData({
        list: res.data
      })
    }
  },
  toNext(e) {
    if (this.data.list[0].hasOwnProperty('house_id')) {
      this.setData({
        project_id: e.currentTarget.dataset.item.house_id,
        last: true
      })
      return
    }
    this.setData({
      projectName:e.currentTarget.dataset.item.name
    })
    this.getList(e.currentTarget.dataset.id)
  },
  back() {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length-2]
    let that = this
    wx.navigateBack({
      delta: 1,
      complete: function(){
        setTimeout(function(){
          prevPage.getlogin({id:that.data.project_id,name:that.data.projectName})
        },500)
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
    this.getList()
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