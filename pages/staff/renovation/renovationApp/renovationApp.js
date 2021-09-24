// pages/person/vista/vistaList/vistaList.js
import {list} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    current: 0,
    active: 0,
    queryInfo:{
      page:1,
      limit:10
    },
    count:0,
    list: [],
  },
  async getList(type=0){
    this.setData({
      isLoad: true
    })
    let status = this.data.current
    let res = await list({...this.data.queryInfo,token:wx.getStorageSync('token'),status:++status})
    if(type == 0){
      this.setData({
        list: res.data.list,
        count: res.data.count,
        isLoad: false
      })
    }else{
      let list = this.data.list.concat(...res.data.list)
      this.setData({
        list: list,
        count: res.data.count,
        isLoad: false
      })
    }
    
  },
  onClick(e) {
    this.setData({
      current: e.detail.name,
      ['queryInfo.page']: 1
    })
    this.getList()
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/staff/renovation/renovationHandle/renovationHandle?id=${e.currentTarget.dataset.id}`,
    })
  },
  toDetail1(e) {
    wx.navigateTo({
      url: `/pages/staff/renovation/renovationHandle1/renovationHandle1?id=${e.currentTarget.dataset.id}`,
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
    if (this.data.list.length < this.data.count) {
      let page = ++this.data.queryInfo.page
      this.setData({
        ['queryInfo.page']: page
      })
      this.getList(1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})