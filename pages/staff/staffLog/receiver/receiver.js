// pages/contact/contactMain/contactMain.js
import {
  contact,
  branch
} from '../../../../api/contact'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    branchName: '',
    staffList: [],
    selectList: [],
  },
  toDetail() {
    wx.navigateTo({
      url: '/pages/staff/staffLog/searchReceiver/searchReceiver',
    })
  },
  async getList() {
    let res = await branch({
      token: wx.getStorageSync('token')
    })
    this.setData({
      list: res.data
    })
  },
  async staffList(e) {
    this.setData({
      branchName: e.currentTarget.dataset.name
    })
    let res = await contact({
      token: wx.getStorageSync('token'),
      // branch_id: e.currentTarget.dataset.branch_id
    })
    res.data.forEach(item => {
      item.select = false
    })
    this.setData({
      staffList: res.data
    })
  },
  onChange(e) {
    console.log(e)
    let key = `staffList[${e.currentTarget.dataset.index1}].data[${e.currentTarget.dataset.index2}].select`
    this.setData({
      [key]: e.detail
    })
    let item = this.data.staffList[e.currentTarget.dataset.index1].data[e.currentTarget.dataset.index2]
    let selectList = this.data.selectList
    if (e.detail) {
      selectList.push(item)
      this.setData({
        selectList
      })
    } else {
      let newselectList = selectList.filter(item => {
        return item.id != e.currentTarget.dataset.id
      })
      this.setData({
        selectList: newselectList
      })
    }
  },
  confirm() {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let that = this
    wx.navigateBack({
      delta: 1,
      complete: function () {
        setTimeout(function () {
          prevPage.getselect({
            selectList: that.data.selectList
          })
        }, 500)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.source) {
      wx.setNavigationBarTitle({
        title: '选择任务接收人',
      })
    }
    this.getList()
    let e = {
      currentTarget: {
        dataset: {
          branch_id: 1,
          name: "城新物业"
        }
      }
    }
    this.staffList(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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