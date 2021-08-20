// pages/person/vista/vistaList/vistaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    active: 0,
    list: [{
      type: "1",
      title: `任芳提交的请假`,
      time: '2021.06.15',
      leaveType: '请假类型：事假/病假',
      startTime: '开始时间：2021-10-15 10:16',
      endTime: '结束时间：2021-10-15 10:16',
      status: '李飞处理中'
    }, {
      type: "2",
      title: `任芳提交的请假`,
      time: '2021.06.15',
      leaveTime: '外出时间：2.5小时',
      startTime: '开始时间：2021-10-15 10:16',
      endTime: '结束时间：2021-10-15 10:16',
      status: '李飞处理中'
    }, {
      type: "3",
      title: `任芳提交的请假`,
      time: '2021.06.15',
      reason: '申请物资：10只笔，3套本子，1台电脑设备，一台打印机，一箱水，一盒打印纸',
      status: '李飞处理中'
    }, {
      type: "4",
      title: `任芳提交的采购申请`,
      time: '2021.06.15',
      reason: '申请物资：10只笔，3套本子，1台电脑设备，一台打印机，一箱水，一盒打印纸',
      status: '李飞处理中'
    }, {
      type: "5",
      title: `任芳提交的钥匙申请`,
      time: '2021.06.15',
      startTime: '开始时间：2021-10-15 10:16',
      endTime: '结束时间：2021-10-15 10:16',
      status: '李飞处理中'
    }, ]
  },
  onClick(e) {
    this.setData({
      current: e.detail.name
    })
  },
  toDetail(e) {
    if (e.currentTarget.dataset.type == '1') {
      wx.navigateTo({
        url: '/pages/staff/approve/approveleaveDetail/approveleaveDetail',
      })
    }
    else if(e.currentTarget.dataset.type == '2'){
      wx.navigateTo({
        url: '/pages/staff/approve/approveoutDetail/approveoutDetail',
      })
    }
    else if(e.currentTarget.dataset.type == '3'){
      wx.navigateTo({
        url: '/pages/staff/approve/approvematerialDetail/approvematerialDetail',
      })
    }
    else if(e.currentTarget.dataset.type == '4'){
      wx.navigateTo({
        url: '/pages/staff/approve/approvepurchaseDetail/approvepurchaseDetail',
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/staff/approve/approvekeyDetail/approvekeyDetail',
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