// pages/staff/attendance/attendanceWrap/attendanceWrap.js
import {
  clockIn,
  check,
  statistics
} from '../../../../api/attendance'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRange: false,
    isJurisdiction: false,
    location: '',
    time: '',
    show: false,
    info: {},
    locationInfo: {},
    attendaceInfo: {}
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/staff/attendance/attendanceDetail/attendanceDetail',
    })
  },
  // async getDetail() {
  //   let data = new Date()
  //   let that = this
  //   let month = (data.getMonth() + 1 + '').padStart(2, '0')
  //   let day = (data.getDate() + '').padStart(2, '0')
  //   let year = data.getFullYear()
  //   let res = await statistics({
  //     token: wx.getStorageSync('token'),
  //     month: `${year}-${month}`
  //   })
  //   console.log(res)
  //   for (let i in res.data.list) {
  //     console.log(i)
  //     if (i == day) {
  //       that.setData({
  //         attendaceInfo: res.data.list[i]
  //       })
  //     }
  //   }
  // },
  getTime() {
    let that = this
    setInterval(() => {
      let date = new Date()
      const hh = (date.getHours() + '').padStart(2, '0')
      const mm = (date.getMinutes() + '').padStart(2, '0')
      const ss = (date.getSeconds() + '').padStart(2, '0')
      that.setData({
        time: `${hh}:${mm}:${ss}`
      })
    }, 1000);
  },
  async cheackIn() {
    if (!this.data.isJurisdiction) return
    // let res = await clockIn({token: wx.getStorageSync('token'),lng:'117.219',lat:'31.8443',})
    let res = await clockIn({
      token: wx.getStorageSync('token'),
      lng: this.data.locationInfo.longitude,
      lat: this.data.locationInfo.latitude,
      // lng: '117.168658',
      // lat: '31.87393'
    })
    if (res.msg == '您不在考勤范围内,是否需要申请外出?') {
      wx.showModal({
        title: '提示',
        content: '您不在考勤范围内,是否需要申请外出?',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/staff/approve/outApp/outApp',
            })
          }
        }
      })
    } else {
      this.getPunckDetail()
      wx.showToast({
        title: '打卡成功',
        icon: 'success'
      })
    }
  },
  async getPunckDetail() {
    let that = this
    check({
      token: wx.getStorageSync('token'),
      lng: '117.168658',
      lat: '31.87393'
    }).then(res => {
      that.setData({
        ['info.begin_record1']: res.data.begin_record1,
        ['info.begin_record2']: res.data.begin_record2,
        ['info.end_record1']: res.data.end_record1,
        ['info.end_record2']: res.data.end_record2,
      })
    })
  },
  getLocation() {
    // let sInfo = wx.getSystemInfoSync();
    // if (!sInfo.locationEnabled) {
    //   return wx.showModal({
    //     title: '提示',
    //     showCancel: false,
    //     content: '请确认系统GPS开关是否打开'
    //   })
    // }
    // if (!sInfo.locationAuthorized) {
    //   return wx.showModal({
    //     title: '提示',
    //     showCancel: false,
    //     content: '请确认系统GPS开关是否打开'
    //   })
    // }

    let that = this;
    this.setData({
      show: true
    })
    wx.getLocation({
      type: 'wgs84',
      success(info) {
        that.setData({
          isJurisdiction: true
        })
        check({
          token: wx.getStorageSync('token'),
          // lng: '117.168658',
          // lat: '31.87393'
          lng: info.longitude,
          lat: info.latitude
        }).then(res => {
          if (res.msg == '考勤信息不存在') {
            wx.showToast({
              title: '非考勤人员',
              icon: 'error',
              duration:2000
            })
            setTimeout(_ => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000)
          } else if (res.data.status == 2) {
            that.setData({
              show: false,
              info: res.data,
              locationInfo: info,
              isRange: false
            })
          } else {
            that.setData({
              show: false,
              locationInfo: info,
              info: res.data,
              isRange: true
            })
          }

        })
      },
      fail(err) {
        that.setData({
          show: false,
        })
        if (err.errMsg == 'getLocation:fail auth deny') {
          return wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请先授权小程序获取位置信息',
            success(res) {
              wx.openSetting()
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '更新过于频繁',
          })
        }
      }
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
    this.getTime()
    // this.getDetail()
    this.getLocation()
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