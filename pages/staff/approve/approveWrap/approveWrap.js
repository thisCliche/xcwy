// pages/staff/approve/approveWrap/approveWrap.js
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    approveMenuMy1:[
      {name:"待处理",icon:App.globalData.rootHttp+'/mini/images/staff/menu19.png',page:'/pages/staff/approve/approveListed/approveListed?type=1',info:''},
      {name:"已处理",icon:App.globalData.rootHttp+'/mini/images/staff/menu20.png',page:'/pages/staff/approve/approveListed/approveListed?type=2',info:''},
      {name:"我发起的",icon:App.globalData.rootHttp+'/mini/images/staff/menu21.png',page:'/pages/staff/approve/approveList/approveList',info:''},
    ],
    approveMenuMy2:[
      {name:"请假",icon:App.globalData.rootHttp+'/mini/images/staff/menu22.png',page:'/pages/staff/approve/leaveApp/leaveApp',info:''},
      {name:"外出",icon:App.globalData.rootHttp+'/mini/images/staff/menu23.png',page:'/pages/staff/approve/outApp/outApp',info:''},
      {name:"物资",icon:App.globalData.rootHttp+'/mini/images/staff/menu24.png',page:'/pages/staff/approve/purchaseApp/purchaseApp',info:''},
      // {name:"采购",icon:App.globalData.rootHttp+'/mini/images/staff/menu25.png',page:'/pages/staff/approve/materialApp/materialApp',info:''},
      {name:"钥匙",icon:App.globalData.rootHttp+'/mini/images/staff/menu26.png',page:'/pages/staff/approve/keyApp/keyApp',info:''},
    ],
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