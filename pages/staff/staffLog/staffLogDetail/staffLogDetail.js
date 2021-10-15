// pages/staff/task/cheackDetail/cheackDetail.js
import {
  detail,
  del
} from '../../../../api/report'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    isShow: false,
    isRead: false,
    isHidden: false,
    list: [1, 2, 3, 4, 5, 6],
    value: 3,
    id: '',
    siteHttp: App.globalData.siteHttp,
    rootHttp: App.globalData.rootHttp,
    info: {},
    actions: [{
      name: '编辑'
    },{
      name: '删除',
      color: '#ee0a24'
    }, ],
  },
  toApprove() {
    wx.navigateTo({
      url: `/pages/staff/staffLog/approve/approve?id=${this.data.id}`,
    })
  },
  openBox() {
    this.setData({
      show: true
    })
  },
  async onSelect(event) {
    let dt = new Date()
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')
    let dateNumber = `${y}-${m}-${d}`
    if (event.detail.name == '删除') {
      this.setData({
        show: true
      })
      if (this.data.info.add_time.slice(0, 10) == dateNumber) {
        let res = await del({
          token: wx.getStorageSync('token'),
          id: this.data.id
        })
        if (res.code == 200) {
          wx.showToast({
            title: '删除成功',
          })
          setTimeout(_ => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'error'
          })
        }
      } else {
        wx.showToast({
          title: '仅可删除当天日志',
          icon: 'none'
        })
      }
    } else {
      if (this.data.info.add_time.slice(0, 10) == dateNumber) {
        this.setData({
          show: false
        })
        wx.navigateTo({
          url: `/pages/staff/staffLog/editwriteLog/editwriteLog?id=${this.data.id}`,
        })
      } else {
        wx.showToast({
          title: '仅可编辑当天日志',
          icon: 'none'
        })
        this.setData({
          show: false
        })
      }
    }
  },
  onCancel() {
    this.setData({
      show: false
    })
  },
  async getList(id) {
    let res = await detail({
      id,
      token: wx.getStorageSync('token')
    })
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    res.data.report_receiver.map(item => {
      if (item.member_id == userInfo.id) {
        this.setData({
          isShow: true
        })
        if (item.comment == '') {
          this.setData({
            isRead: true
          })
        } else {
          this.setData({
            isRead: false
          })
        }
      }
    })
    if (userInfo.id == res.data.member_id) {
      this.setData({
        isHidden: true
      })
    }
    this.setData({
      info: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

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
    this.getList(this.data.id)


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