let App = getApp()
import {
  newsList
} from '../../api/info'
import {
  myProfile
} from '../../api/login.js'
import eventBus from '../../utils/eventBus'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStaff: '访客',
    // isStaff: '业主',
    // isStaff: '员工',
    siteHttp: App.globalData.siteHttp,
    deFualtHttp: App.globalData.rootHttp,
    banner: 4,
    menu1: [{
        name: "访客邀请",
        icon: App.globalData.rootHttp + '/mini/images/menu1.png',
        page: '/pages/onwner/vistResig/vistResigInfo/vistResigInfo'
      },
      {
        name: "我要报修",
        icon: App.globalData.rootHttp + '/mini/images/menu2.png',
        page: '/pages/onwner/repair/repair'
      },
      {
        name: "我要投诉",
        icon: App.globalData.rootHttp + '/mini/images/menu3.png',
        page: '/pages/onwner/complaint/complaint'
      },
      {
        name: "停车管理",
        icon: App.globalData.rootHttp + '/mini/images/menu4.png',
        page: '/pages/onwner/parking/vehicle/vehicle'
      },
    ],
    menu2: [{
        name: "物业缴费",
        icon: App.globalData.rootHttp + '/mini/images/menu5.png',
        page: '/pages/onwner/payment/paymentList/paymentList'
      },
      {
        name: "申请装修",
        icon: App.globalData.rootHttp + '/mini/images/menu6.png',
        page: '/pages/onwner/renovation/renovation'
      },
      {
        name: "预约会议室",
        icon: App.globalData.rootHttp + '/mini/images/menu7.png',
        page: '/pages/onwner/meetingRoom/meetingRoom'
      },
      {
        name: "社区公告",
        icon: App.globalData.rootHttp + '/mini/images/menu8.png',
        page: '/pages/onwner/news/notice/notice'
      },
    ],
    menu3: [{
      name: "访客预约",
      icon: App.globalData.rootHttp + '/mini/images/menu9.png',
      page: '/pages/onwner/vistInvite/vistInvite'
    }, {
      name: "我的预约",
      icon: App.globalData.rootHttp + '/mini/images/menu10.png',
      page: '/pages/onwner/order/orderList/orderList'
    }, ],
    newList: [],
    noticeList: [],
    staffMenuMy1: [{
        name: "考勤打卡",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu1.png',
        page: '/pages/staff/attendance/attendanceWrap/attendanceWrap',
        info: ''
      },
      {
        name: "我要报修",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu2.png',
        page: '/pages/onwner/repair/repair',
        info: ''
      },
      {
        name: "审批",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu3.png',
        page: '/pages/staff/approve/approveWrap/approveWrap',
        info: ''
      },
      {
        name: "我的任务",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu4.png',
        page: '/pages/staff/task/taskList/taskList',
        info: ''
      }, {
        name: "查看日志",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu5.png',
        page: '/pages/staff/staffLog/staffList/staffList',
        info: ''
      },
      {
        name: "维修工单",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu6.png',
        page: '/pages/staff/repair/orderList/orderList',
        info: '7'
      },
      {
        name: "投诉处理",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu7.png',
        page: '/pages/staff/complaint/complaintList/complaintList',
        info: '21'
      },
      {
        name: "装修申请",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu8.png',
        page: '/pages/staff/renovation/renovationApp/renovationApp',
        info: ''
      }, {
        name: "会议室预约",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu9.png',
        page: '/pages/staff/meetRoom/meetList/meetList',
        info: ''
      },
    ],

    staffMenutask1: [{
        name: "日常巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu10.png',
        page: '/pages/staff/task/selectTask/selectTask?type=1',
        info: ''
      },
      {
        name: "安全督查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu11.png',
        page: '/pages/staff/task/selectTask/selectTask?type=2',
        info: ''
      },
      {
        name: "管家巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu12.png',
        page: '/pages/staff/task/selectTask/selectTask?type=3',
        info: ''
      },
      {
        name: "工程巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu13.png',
        page: '/pages/staff/task/selectTask/selectTask?type=4',
        info: ''
      }, {
        name: "发布任务",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu14.png',
        page: '/pages/staff/releaseTask/releaseTask/releaseTask',
        info: ''
      },
      {
        name: "任务反馈",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu15.png',
        page: '/pages/staff/taskFeed/taskList/taskList',
        info: ''
      },
    ],

    staffMenuwork1: [{
        name: "日报",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu16.png',
        page: '/pages/staff/staffLog/writeLog2/writeLog2?type=1',
        info: ''
      },
      {
        name: "周报",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu18.png',
        page: '/pages/staff/staffLog/writeLog2/writeLog2?type=2',
        info: ''
      },
      {
        name: "月报",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu17.png',
        page: '/pages/staff/staffLog/writeLog2/writeLog2?type=3',
        info: ''
      },
    ],
  },
  async getnews() {
    let res = await newsList({
      channel_id: 2,
      limit: 3
    })
    this.setData({
      newList: res.data.list
    })
  },
  async getnotice() {
    let res = await newsList({
      channel_id: 5,
      limit: 1
    })
    this.setData({
      noticeList: res.data.list
    })
  },
  async getbanner() {
    let res = await newsList({
      channel_id: 1,
      limit: 4
    })
    console.log(res)
  },
  async getUserInfo() {
    let res = await myProfile({
      token: wx.getStorageSync('token')
    })
    this.setData({
      isStaff: res.data.identity
    })
  },
  tonotice() {
    wx.navigateTo({
      url: '/pages/onwner/news/notice/notice',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    eventBus.on('reload', _ => {
      that.getUserInfo()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getnews()
    this.getbanner()
    this.getnotice()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('token')) {
      this.getUserInfo()
    }
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