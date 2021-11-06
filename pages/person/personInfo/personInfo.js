// pages/person/personInfo/personInfo.js
const filter = require('../../../utils/router.js');
import {myProfile,changeProfile} from '../../../api/login.js'
const app = getApp()
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    rootHttp:app.globalData.rootHttp,
    userInfo:{}
  },
  changeAva(){
    let that = this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          isLoad:true
        })
        wx.uploadFile({
          url: that.data.rootHttp + '/api.php/app/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Authorization": "Basic enhrajp6eGtqNjY4OA=="
          },
          success (res){
            let img = JSON.parse(res.data)
            changeProfile({token:wx.getStorageSync('token'),field:'avatar',value:that.data.rootHttp+img.data}).then(result=>{
              that.setData({
                isLoad:false
              })
              that.getUserInfo()
              console.log(result)
            })
          }
        })
      }
    })
  },
  toDetial(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },
  async getUserInfo(){
    let res = await myProfile({token:wx.getStorageSync('token')})
    if(res.data.id_card == ""){
      res.data.id_card = ' '
    }
    this.setData({
      userInfo: res.data
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
    this.getUserInfo()
    
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