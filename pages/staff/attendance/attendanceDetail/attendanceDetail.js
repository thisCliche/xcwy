// pages/staff/attendance/attendanceDetail/attendanceDetail.js
import {
  statistics
} from '../../../../api/attendance'
import {
  list
} from '../../../../api/report'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hyShow: false,
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    year: '',
    month: '',
    info: {},
    isTwo: false
  },
  cancel() {
    this.setData({
      hyShow: false
    })
  },
  async getDetail(month) {
    if (this.data.year == '') {
      let data = new Date()
      let month = (data.getMonth() + 1 + '').padStart(2, '0')
      let year = data.getFullYear()
      this.setData({
        month,
        year
      })
      try {
        let res = await statistics({
          token: wx.getStorageSync('token'),
          month: `${year}-${month}`
        })
        if (Object.keys(res.data.list[0]).length == 5) {
          this.setData({
            isTwo: true
          })
        }
        this.setData({
          info: res.data
        })
      } catch (e) {
        console.log(e, 'error')
      }

    } else {
      let res = await statistics({
        token: wx.getStorageSync('token'),
        month
      })
      console.log(`${month}数据`, res.data)
      if (Object.keys(res.data.list[0]).length == 5) {
        this.setData({
          isTwo: true
        })
      }
      this.setData({
        info: res.data
      })
    }
  },
  onInput(event) {
    let that = this
    let data = new Date(event.detail)
    let month = (data.getMonth() + 1 + '').padStart(2, '0')
    let year = data.getFullYear()
    setTimeout(_ => {
      console.log('传送的日期',`${year}-${month}`)
      that.getDetail(`${year}-${month}`)
      that.setData({
        month,
        year,
        currentDate: event.detail,
        hyShow: false
      });
    }, 500)

  },
  openBox() {
    this.setData({
      hyShow: true
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
    this.getDetail()
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