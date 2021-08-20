// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: true,
    menu1:[{
      name:'个人资料',
      icon:'/static/images/menu11.png',
      page:'/pages/person/personInfo/personInfo'
    },{
      name:'我的访客',
      icon:'/static/images/menu12.png',
      page:'/pages/person/vista/vistaList/vistaList'
    },{
      name:'我是业主',
      icon:'/static/images/menu13.png',
      page:'/pages/person/attestation/attestation'
    },{
      name:'设置',
      icon:'/static/images/menu14.png',
      page:'/pages/staff/set/set'
    }],
    menu2:[{
      name:'报修记录',
      icon:'/static/images/menu15.png',
      page:'/pages/person/repair/orderList/orderList'
    },{
      name:'投诉记录',
      icon:'/static/images/menu16.png',
      page:'/pages/person/complaint/complaintList/complaintList'
    },{
      name:'装修申请记录',
      icon:'/static/images/menu17.png',
      page:'/pages/person/renovation/renovationList/renovationList'
    },{
      name:'会议室预约记录',
      icon:'/static/images/menu18.png',
      page:'/pages/person/meetBook/meetBookList/meetBookList',
    },],
    menu3:[{
      name:'个人资料',
      icon:'/static/images/menu19.png',
      page:'/pages/person/personInfo/personInfo'
    },{
      name:'报修记录',
      icon:'/static/images/menu20.png',
      page:'/pages/person/repair/orderList/orderList'
    },{
      name:'设置',
      icon:'/static/images/menu21.png',
      page:'/pages/staff/set/set'
    },]
  },
  toDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
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