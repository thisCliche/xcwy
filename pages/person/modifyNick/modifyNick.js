// pages/person/modifyNick/modifyNick.js
import {changeProfile} from '../../../api/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    field:'',
  },
  changed(){
    if(this.data.value == ''){
      wx.showToast({
        title: '不能为空',
        icon: 'error'
      })
    }
    changeProfile({token:wx.getStorageSync('token'),field:this.data.field,value:this.data.value}).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(_=>{
          wx.navigateBack({
            delta: 1,
          })
        },500)
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'error'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.field != 'nick'){
      wx.setNavigationBarTitle({
        title: '修改名字',
      })
      this.setData({
        field:'name'
      })
    }
    
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