// pages/onwner/news/newsList.js
import {newsList} from '../../../../api/info'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryInfo:{
      channel_id:2,
      page:1,
      limit:3
    },
    count: '',
    newList:[]
  },
  lower(){
    if(this.data.newList.length>=this.data.count){
      return
    }
    this.setData({
      ['queryInfo.page']: ++this.data.queryInfo.page
    })
    this.addnewList()
  },
  async addnewList(){
    let res = await newsList(this.data.queryInfo)
    let oldList = this.data.newList
    let newList = oldList.concat(res.data.list)
    this.setData({
      newList,
      count: res.data.count
    })
  },
  async getnewList(){
    let res = await newsList(this.data.queryInfo)
    this.setData({
      newList :res.data.list,
      count: res.data.count
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
    this.getnewList()
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