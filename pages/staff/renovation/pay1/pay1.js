// pages/staff/renovation/pay/pay.js
import {agree} from '../../../../api/build'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['线下', '微信'],
    hyShow: false,
    zffs:'请选择支付方式',
    money: null,
    id:'',
  },
  onDisplay(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: true
    });
  },
  onClose(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: false
    });
  },
  onpickerConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(value)
    this.setData({hyShow: false,zffs:value})
  },
  bindInput(e){
    console.log(e)
  },
  async agree(){
    let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
    if(!reg.test(this.data.money)){
      return wx.showToast({
        title: '请输入正数',
        icon:'error'
      })
    }
    let res = await agree({token:wx.getStorageSync('token'),id:this.data.id,money:this.data.money})
    if(res.code == 200) {
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }else{
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    console.log(options)
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