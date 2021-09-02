// pages/onwner/vistResig/vistResigInfo/vistResigInfo.js
const filter = require('../../../../utils/router.js');
import {
  getOwner,login
} from '../../../../api/login'
import {invitation} from '../../../../api/booking'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    let res1 = await login({account:15656588888})
    console.log(res1)
    this.setData({
      info: res.data
    })
  },
  // generateLink(){
  //   invitation({token:wx.getStorageSync('token')}).then(res=>{
  //     console.log(res)
  //   })
  // },
  async generateCode(){
    let res = await invitation({token:wx.getStorageSync('token')})
    this.setData({info:res.data})
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
    this.getOwnerDetail()
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
}))