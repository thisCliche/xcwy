// pages/person/modifyPhone/modifyPhone.js
import {
  changeMobile,
  sendCode
} from '../../../api/login'
import {
  validPhone
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    isShow: true,
    codeInfo:'获取验证码',
    timer: null,
    codeDis:false,

  },
  submit(){
    if(this.data.code == ''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'error'
      })
    }else{
      changeMobile({token:wx.getStorageSync('token'),new_mobile:this.data.phone,code:this.data.code}).then(res=>{
        if(res.code != '200'){
          wx.showToast({
            title: '请重试',
            icon: 'error'
          })
        }else{
          wx.showToast({
            title: '修改成功',
          })
        }
      })
    }
    
  },
  getCode() {
    const TimeCount = 5;
    let that = this
    if (validPhone(this.data.phone)) {
      if (!this.data.timer) {
        that.setData({
          codeDis:true,
          codeInfo:TimeCount,
          timer:setInterval(_ => {
            if (this.data.codeInfo > 0 && this.data.codeInfo <= TimeCount) {
              that.setData({
                codeInfo: --that.data.codeInfo
              })
            } else {
              that.setData({
                codeDis: false,
                codeInfo:'获取验证码'
              })
              clearInterval(that.data.timer);
              that.setData({
                timer: null
              })
            }
          }, 1000)
        })
      }
      sendCode({
        mobile: this.data.phone
      }).then(res=>{
      })
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'error'
      })
    }
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