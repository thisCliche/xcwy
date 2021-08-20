let App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // isStaff: true,
    isStaff: false,
    siteHttp:App.globalData.siteHttp,
    banner:4,
    menu1:[
      {name:"访客邀请",icon:'/static/images/menu1.png',page:'/pages/onwner/vistResig/vistResigForm/vistResigForm'},
      {name:"我要报修",icon:'/static/images/menu2.png',page:'/pages/onwner/repair/repair'},
      {name:"我要投诉",icon:'/static/images/menu3.png',page:'/pages/onwner/complaint/complaint'},
      {name:"停车管理",icon:'/static/images/menu4.png',page:'/pages/onwner/parking/vehicle/vehicle'},
    ],
    menu2:[
      {name:"物业缴费",icon:'/static/images/menu5.png',page:'/pages/onwner/payment/paymentList/paymentList'},
      {name:"申请装修",icon:'/static/images/menu6.png',page:'/pages/onwner/renovation/renovation'},
      {name:"预约会议室",icon:'/static/images/menu7.png',page:'/pages/onwner/meetingRoom/meetingRoom'},
      {name:"社区公告",icon:'/static/images/menu8.png',page:'/pages/onwner/news/newsList/newsList'},
    ],
    menu3:[{name:"访客预约",icon:'/static/images/menu9.png',page:'/pages/onwner/vistInvite/vistInvite'},{name:"我的预约",icon:'/static/images/menu10.png',page:'/pages/onwner/order/orderList/orderList'},],
    newList:[
      {title:'疫情防控不减压，关于什么什么',des:"疫情防控不减压，关于工作场所做防控的措施",time:'06-05',img:'https://via.placeholder.com/168x122'},
      {title:'疫情防控不减压，关于什么什么',des:"疫情防控不减压，关于工作场所做防控的措施",time:'06-05',img:'https://via.placeholder.com/168x122'},
      {title:'疫情防控不减压，关于什么什么',des:"疫情防控不减压，关于工作场所做防控的措施",time:'06-05',img:'https://via.placeholder.com/168x122'}
    ],
    staffMenuMy1:[
      {name:"考勤打卡",icon:'/static/images/staff/menu1.png',page:'/pages/staff/attendance/attendanceWrap/attendanceWrap',info:''},
      {name:"我要报修",icon:'/static/images/staff/menu2.png',page:'/pages/onwner/repair/repair',info:''},
      {name:"审批",icon:'/static/images/staff/menu3.png',page:'/pages/staff/approve/approveWrap/approveWrap',info:''},
      {name:"我的任务",icon:'/static/images/staff/menu4.png',page:'/pages/staff/task/taskList/taskList',info:''},{name:"查看日志",icon:'/static/images/staff/menu5.png',page:'/pages/staff/staffLog/staffList/staffList',info:''},
      {name:"维修工单",icon:'/static/images/staff/menu6.png',page:'/pages/staff/repair/orderList/orderList',info:'7'},
      {name:"投诉处理",icon:'/static/images/staff/menu7.png',page:'/pages/staff/complaint/complaintList/complaintList',info:'21'},
      {name:"装修申请",icon:'/static/images/staff/menu8.png',page:'/pages/staff/renovation/renovationApp/renovationApp',info:''},{name:"会议室预约",icon:'/static/images/staff/menu9.png',page:'/pages/staff/meetRoom/meetList/meetList',info:''},
    ],

    staffMenutask1:[
      {name:"日常巡查",icon:'/static/images/staff/menu10.png',page:'/pages/staff/releaseTask/releaseDaily/releaseDaily',info:''},
      {name:"安全督查",icon:'/static/images/staff/menu11.png',page:'/pages/staff/releaseTask/releaseSafe/releaseSafe',info:''},
      {name:"管家巡查",icon:'/static/images/staff/menu12.png',page:'',info:''},
      {name:"工程巡查",icon:'/static/images/staff/menu13.png',page:'',info:''}, {name:"发布任务",icon:'/static/images/staff/menu14.png',page:'/pages/staff/releaseTask/releaseTask/releaseTask',info:''},
      {name:"任务反馈",icon:'/static/images/staff/menu15.png',page:'/pages/staff/taskFeed/taskList/taskList',info:''},
    ],

    staffMenuwork1:[
      {name:"日报",icon:'/static/images/staff/menu16.png',page:'/pages/staff/staffLog/writeLog/writeLog',info:''},
      {name:"周报",icon:'/static/images/staff/menu17.png',page:'/pages/staff/staffLog/writeLog2/writeLog2',info:''},
      {name:"周报",icon:'/static/images/staff/menu18.png',page:'/pages/staff/staffLog/staffList/staffList',info:''},
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