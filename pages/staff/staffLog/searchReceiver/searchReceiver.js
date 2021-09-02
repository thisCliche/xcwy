// pages/contact/contactSearch/contactSearch.js
import {search} from '../../../../api/contact'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    list:[],
    selectList:[]
  },
  async onSearch(){
    if(this.data.value == ''){
      return wx.showToast({
        title: '不能为空',
        icon: 'error'
      })
    }
    let res = await search({keyword:this.data.value,token:wx.getStorageSync('token')})
    res.data.forEach(item=>{
      item.select = false
    })
    this.setData({
      list: res.data
    })
  },
  onCancel(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onChange(e){
    let key = `list[${e.currentTarget.dataset.index}].select`
    this.setData({
      [key]: e.detail
    })
    let selectList = []
    this.data.list.forEach(item=>{
      if(item.select){
        selectList.push(item)
      }
    })
    this.setData({
      selectList
    })
  },
  confirm(){
    let pages = getCurrentPages()
    console.log(pages)
    let prevPage = pages[pages.length-3]
    let that = this
    wx.navigateBack({
      delta: 2,
      complete: function(){
        setTimeout(function(){
          prevPage.getselect({selectList:that.data.selectList})
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