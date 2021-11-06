let App = getApp()
import {
  newsList,
  visitor
} from '../../api/info'
import {
  myProfile,
  getUser
} from '../../api/login.js'
import eventBus from '../../utils/eventBus'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStaff: '访客',
    siteHttp: App.globalData.siteHttp,
    deFualtHttp: App.globalData.rootHttp,
    height: 0,
    banner: [],
    menu1: [{
        name: "社区公告",
        icon: App.globalData.rootHttp + '/mini/images/menu8.png',
        page: '/pages/onwner/news/notice/notice'
      },
      {
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

    ],
    menu2: [{
        name: "停车管理",
        icon: App.globalData.rootHttp + '/mini/images/menu4.png',
        page: '/pages/onwner/parking/vehicle/vehicle'
      },
      {
        name: "费用缴纳",
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
    ],
    menu3: [{
      name: "访客预约",
      icon: App.globalData.rootHttp + '/mini/images/menu9.png',
      page: '/pages/onwner/vistInvite/vistInvite'
    }, {
      name: "我的预约",
      icon: App.globalData.rootHttp + '/mini/images/menu10.png',
      page: '/pages/onwner/order/orderList/orderList',
      info: 0
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
        page: `/pages/staff/staffLog/staffList/staffList`,
        info: ''
      },
      {
        name: "维修工单",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu6.png',
        page: '/pages/staff/repair/orderList/orderList?type=1',
        info: 0
      },
      {
        name: "投诉处理",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu7.png',
        page: '/pages/staff/complaint/complaintList/complaintList',
        info: 0
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

    staffMenutask1: [],
    temporarystaffMenutask1: [{
        name: "日常巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu10.png',
        page: '/pages/staff/releaseTask/releaseDaily1/releaseDaily1',
        info: ''
      },
      {
        name: "安全督查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu11.png',
        page: '/pages/staff/releaseTask/releaseSafe1/releaseSafe1?type=2',
        info: ''
      },
      {
        name: "管家巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu12.png',
        page: '/pages/staff/releaseTask/releaseDaily2/releaseDaily2?type=3',
        info: ''
      },
      {
        name: "工程巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu13.png',
        page: '/pages/staff/releaseTask/releaseDaily2/releaseDaily2?type=4',
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
    temporarystaffMenutask2: [{
        name: "日常巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu10.png',
        page: '/pages/staff/releaseTask/releaseDaily1/releaseDaily1',
        info: ''
      },
      {
        name: "安全督查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu11.png',
        page: '/pages/staff/releaseTask/releaseSafe1/releaseSafe1?type=2',
        info: ''
      },
      {
        name: "管家巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu12.png',
        page: '/pages/staff/releaseTask/releaseDaily2/releaseDaily2?type=3',
        info: ''
      },
      {
        name: "工程巡查",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu13.png',
        page: '/pages/staff/releaseTask/releaseDaily2/releaseDaily2?type=4',
        info: ''
      }
    ],
    staffMenuwork1: [{
        name: "日报",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu16.png',
        page: '/pages/staff/staffLog/writeLog2/writeLog2?type=1',
        info: ''
      },
      // {
      //   name: "周报",
      //   icon: App.globalData.rootHttp + '/mini/images/staff/menu18.png',
      //   page: '/pages/staff/staffLog/writeLog2/writeLog2?type=2',
      //   info: ''
      // },
      {
        name: "月报",
        icon: App.globalData.rootHttp + '/mini/images/staff/menu17.png',
        page: '/pages/staff/staffLog/writeLog/writeLog',
        info: ''
      },
    ],
  },
  async getnews() {
    let res = await newsList({
      channel_id: 2,
      limit: 3
    })
    res.data.list.forEach(item => {
      item.img = `${this.data.deFualtHttp}${item.pic_path}`
      item.add_time_text = item.add_time_text.substr(0, 10)
    })
    this.setData({
      newList: res.data.list
    })
  },
  async getnotice() {
    let res = await newsList({
      channel_id: 6,
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
    this.setData({
      banner: res.data.list
    })
  },
  async getstaffInfo() {
    let res = await getUser({
      token: wx.getStorageSync('token')
    })
    let page = this.data.staffMenuMy1[2].page + '?num=' + res.data.approve_count

    this.setData({
      ['staffMenuMy1[2].info']: res.data.approve_count,
      ['staffMenuMy1[2].page']: page,
      ['staffMenuMy1[3].info']: res.data.task_count,
      ['staffMenuMy1[4].info']: res.data.report_count,
      ['staffMenuMy1[5].info']: res.data.repair_count,
      ['staffMenuMy1[6].info']: res.data.feedback_count,
      ['staffMenuMy1[7].info']: res.data.build_count,
      ['staffMenuMy1[8].info']: res.data.meeting_count,
    })
    let temporarystaffMenutask1 = this.data.temporarystaffMenutask1
    let temporarystaffMenutask2 = this.data.temporarystaffMenutask2
    if (res.data.is_leader == 'true' || res.data.is_manager == 'true') {
      this.setData({
        staffMenutask1: temporarystaffMenutask1
      })
    } else {
      this.setData({
        staffMenutask1: temporarystaffMenutask2
      })
    }
    wx.setStorageSync('staffInfo', res.data)
  },
  async getUserInfo() {
    if (!wx.getStorageSync('token')) {

      return this.setData({
        isStaff: '访客'
      })
    }
    let res = await myProfile({
      token: wx.getStorageSync('token')
    })
    if (res.data.identity == '访客') {
      let res = await visitor({
        token: wx.getStorageSync('token')
      })
      this.setData({
        ['menu3[1].info']: res.data.wait_count
      })
    }
    this.setData({
      isStaff: res.data.identity
    })
    if (res.data.identity == '员工') {
      this.getstaffInfo()
    }
  },
  tonotice() {
    wx.navigateTo({
      url: '/pages/onwner/news/notice1/notice1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().safeArea.height
    this.setData({
      height,
    })
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