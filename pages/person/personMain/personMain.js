// pages/person/person.js
const filter = require('../../../utils/router.js');
const app = getApp()
import {myProfile,unreadCount} from '../../../api/login.js'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    hasNotice:false,
    type: true,
    isStaff: '访客',
    userInfo:{},
    deFualtHttp:app.globalData.rootHttp,
    rootHttp:app.globalData.rootHttp,
    menu1:[{
      name:'个人资料',
      icon:app.globalData.rootHttp+'/mini/images/menu11.png',
      page:'/pages/person/personInfo/personInfo'
    },{
      name:'我的访客',
      icon:app.globalData.rootHttp+'/mini/images/menu12.png',
      page:'/pages/person/vista/vistaList/vistaList'
    },{
      name:'我是业主',
      icon:app.globalData.rootHttp+'/mini/images/menu13.png',
      page:'/pages/person/attestation/attestation'
    },{
      name:'设置',
      icon:app.globalData.rootHttp+'/mini/images/menu14.png',
      page:'/pages/staff/set/set'
    }],
    menu2:[{
      name:'报修记录',
      icon:app.globalData.rootHttp+'/mini/images/menu15.png',
      page:'/pages/person/repair/orderList/orderList?type=2'
    },{
      name:'投诉记录',
      icon:app.globalData.rootHttp+'/mini/images/menu16.png',
      page:'/pages/person/complaint/complaintList/complaintList'
    },{
      name:'装修申请记录',
      icon:app.globalData.rootHttp+'/mini/images/menu17.png',
      page:'/pages/person/renovation/renovationList/renovationList'
    },{
      name:'会议室预约记录',
      icon:app.globalData.rootHttp+'/mini/images/menu18.png',
      page:'/pages/person/meetBook/meetBookList/meetBookList',
    },],
    menu3:[{
      name:'个人资料',
      icon:app.globalData.rootHttp+'/mini/images/menu19.png',
      page:'/pages/person/personInfo/personInfo'
    },{
      name:'报修记录',
      icon:app.globalData.rootHttp+'/mini/images/menu20.png',
      page:'/pages/person/repair/orderList/orderList'
    },{
      name:'设置',
      icon:app.globalData.rootHttp+'/mini/images/menu21.png',
      page:'/pages/staff/set/set'
    },]
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toTz(){
    if(this.data.isStaff == '业主'){
      wx.navigateTo({
        url: '/pages/person/complaint/message/message',
      })
    }else{
      wx.navigateTo({
        url: '/pages/person/complaint/messageStaff/messageStaff',
      })
    }
  },
  getPhoneNum(){
    wx.navigateTo({
      url: '/pages/login/login?form=per',
    })
  },  
  toDetail(e){
    if(e.currentTarget.dataset.page == '/pages/person/attestation/attestation'){
      return wx.navigateTo({
        url: `/pages/person/attestation/attestation?id=${this.data.userInfo.identity}`,
      })
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },
  async getUserInfo(){
    if(!wx.getStorageSync('token')) return
    let res1 = await unreadCount({token:wx.getStorageSync('token')})
    let that = this
    if(res1.data.count == 0){
      that.setData({
        hasNotice:false
      })
    }else{
      that.setData({
        hasNotice:true
      })
    }
    let res = await myProfile({token:wx.getStorageSync('token')})
    this.setData({
      userInfo: res.data,
      isStaff:res.data.identity
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
    this.getTabBar().init();
    if(!wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
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