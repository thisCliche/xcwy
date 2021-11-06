// pages/staff/task/cheackDetail/cheackDetail.js
import {reportDetail,del} from '../../../../api/task'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    rootHttp:App.globalData.rootHttp,
    actions: [
      { name: '删除', color: '#ee0a24' },
    ],
    title:'',
    info: {},
    images: [],
    id: ''
  },
  previewImage(e){
    let urls = e.currentTarget.dataset.list
    wx.previewImage({
      current: e.currentTarget.dataset.url, 
      urls
    })
  },
  toDetail(){
    wx.navigateTo({
      url: `/pages/staff/task/taskDetail/taskDetail?id=${this.data.id}`,
    })
  },
  openBox(){
    this.setData({
      show:true
    })
  },
  async onSelect(event) {
    this.setData({
      show:false
    })
    let res = await del({token:wx.getStorageSync('token'),id:this.data.id})
    if(res.code != 200){
      wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    }else{
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(_ => {
        wx.navigateBack({
          delta: 1,
        })
      }, 500)
    }
  },
  onCancel(){
    this.setData({
      show:false
    })
  },
  async getDetial(id){
    let res = await reportDetail({token:wx.getStorageSync('token'),id})
    let images = res.data.images
    if(images.length!=0){
      for(let i =0;i<images.length;i++){
        images[i] = this.data.rootHttp +images[i]
      }
    }
    this.setData({
      info: res.data,
      images
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      id: options.id
    })
    this.getDetial(options.id)
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