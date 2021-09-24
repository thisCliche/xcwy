// pages/staff/renovation/reject/reject.js
import {approve_leave_reject,approve_out_reject,approve_goods_reject,approve_buy_reject,approve_key_reject} from '../../../../api/approve'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reject_reason:'',
    id:'',
    type: '',
    minHeight:{minHeight: 180}
  },
  toReject(){
    if(this.data.reject_reason == ''){
      return wx.showToast({
        title: '不能为空',
        icon: 'error'
      })
    }
    switch(this.data.type){
      case '1':
        this.reject1();
        break;
        case '2':
        this.reject2();
        break;
        case '3':
        this.reject3();
        break;
        case '4':
        this.reject4();
        break;
        case '5':
        this.reject5();
        break;
    }
  },
  async reject1(){
    let res = await approve_leave_reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }
  },
  async reject2(){
    let res = await approve_out_reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }
  },
  async reject3(){
    let res = await approve_goods_reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }
  },
  async reject4(){
    let res = await approve_buy_reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }
  },
  async reject5(){
    let res = await approve_key_reject({reject_reason:this.data.reject_reason,id:this.data.id,token:wx.getStorageSync('token')})
    if(res.code == 200){
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 2,
        })
      },500)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    switch(options.type){
      case '1':
        
    }
    console.log(options)
    this.setData({
      type: options.type,
      id:options.id
    })
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