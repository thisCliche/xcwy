// pages/person/vista/vistaList/vistaList.js
import {
  approve_leave_list,
  approve_out_list,
  approve_goods_list,
  approve_buy_list,
  approve_key_list,
  approve_leaveCancel
} from '../../../../api/approve'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    active: 0,
    approve_leave_list:[],
    approve_out_list:[],
    approve_goods_list:[],
    approve_buy_list:[],
    approve_key_list:[],
    isLoad: false,
  },
  onClick(e) {
    this.setData({
      current: e.detail.name,
      isLoad: true
    })
    switch (e.detail.name) {
      case 0:
        this.getList1();
        break;
      case 1:
        this.getList2();
        break;
      case 2:
        this.getList3();
        break;
      case 3:
        this.getList5();
        break;
      case 4:
        this.getList5();
        break;
    }
  },
  async getList1(){
    let res = await approve_leave_list({token:wx.getStorageSync('token'),type:3})
    this.setData({
      isLoad: false,
      approve_leave_list:res.data
    })
  },
  async getList2(){
    let res = await approve_out_list({token:wx.getStorageSync('token'),type:3})
    this.setData({
      isLoad: false,
      approve_out_list:res.data
    })
  },
  async getList3(){
    let res = await approve_goods_list({token:wx.getStorageSync('token'),type:3})
    this.setData({
      isLoad: false,
      approve_goods_list:res.data
    })
    
  },
  async getList4(){
    let res = await approve_buy_list({token:wx.getStorageSync('token'),type:3})
    this.setData({
      isLoad: false,
      approve_buy_list:res.data
    })
  },
  async getList5(){
    let res = await approve_key_list({token:wx.getStorageSync('token'),type:3})
    this.setData({
      isLoad: false,
      approve_key_list:res.data
    })
  },
  toDetail(e) {
    if (e.currentTarget.dataset.type == '1') {
      wx.navigateTo({
        url: `/pages/staff/approve/approveleaveDetail/approveleaveDetail?id=${e.currentTarget.dataset.id}&type=3`,
      })
    } else if (e.currentTarget.dataset.type == '2') {
      wx.navigateTo({
        url: `/pages/staff/approve/approveoutDetail/approveoutDetail?id=${e.currentTarget.dataset.id}&type=3`,
      })
    } else if (e.currentTarget.dataset.type == '3') {
      wx.navigateTo({
        url: `/pages/staff/approve/approvematerialDetail/approvematerialDetail?id=${e.currentTarget.dataset.id}&type=3`,
      })
    } else if (e.currentTarget.dataset.type == '4') {
      wx.navigateTo({
        url: `/pages/staff/approve/approvepurchaseDetail/approvepurchaseDetail?id=${e.currentTarget.dataset.id}&type=3`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/staff/approve/approvekeyDetail/approvekeyDetail?id=${e.currentTarget.dataset.id}&type=3`,
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
    this.getList1()
  
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