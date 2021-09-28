// pages/person/vista/vistaList/vistaList.js
import {
  list
} from '../../../../api/report'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    current: 0,
    status: 1,
    active: 0,
    checked: true,
    isRead: false,
    queryInfo: {
      page: 1,
      limit: 10,
    },
    count: 0,
    isShow: true,
    list: []
  },
  onClick(e) {
    if (e.detail.name == 1) {
      this.setData({
        isShow: false,
        ['queryInfo.page']: 1
      })
    } else {
      this.setData({
        isShow: true,
        ['queryInfo.page']: 1
      })
    }
    this.setData({
      current: e.detail.name
    })
    this.getList(e.detail.name)
  },
  onreadChange(event) {
    this.setData({
      isRead: event.detail,
      ['queryInfo.page']: 1
    });
    this.getList(this.data.current)
  },
  async getList(e, type = 0) {
    this.setData({
      isLoad: true
    })
    if (this.data.current == 0) {
      let res = await list({
        token: wx.getStorageSync('token'),
        status: 0,
        unread: this.data.isRead,
        ...this.data.queryInfo
      })
      if (type == 0) {
        this.setData({
          list: res.data.list,
          count: res.data.count,
          isLoad: false
        })
      } else {
        let newList = this.data.list.concat(...res.data.list)
        this.setData({
          list: newList,
          count: res.data.count,
          isLoad: false
        })
      }

    } else if (this.data.current == 1) {
      let res = await list({
        token: wx.getStorageSync('token'),
        status: 1,
        ...this.data.queryInfo
      })
      if (type == 0) {
        this.setData({
          list: res.data.list,
          isLoad: false
        })
      } else {
        let newList = this.data.list.concat(...res.data.list)
        this.setData({
          list: newList,
          count: res.data.count,
          isLoad: false
        })
      }
    }
    // else if (this.data.current == 2) {
    //   let res = await list({
    //     token: wx.getStorageSync('token'),
    //     type: 1,
    //     ...this.data.queryInfo
    //   })
    //   this.setData({
    //     list: res.data.list,
    //     isLoad: false,
    //   })
    // }
    else if (this.data.current == 2) {
      let res = await list({
        token: wx.getStorageSync('token'),
        type: 1,
        unread: this.data.isRead,
        ...this.data.queryInfo
      })
      if (type == 0) {
        this.setData({
          list: res.data.list,
          isLoad: false,
        })
      } else {
        let newList = this.data.list.concat(...res.data.list)
        this.setData({
          list: newList,
          count: res.data.count,
          isLoad: false
        })
      }
    } else {
      let res = await list({
        token: wx.getStorageSync('token'),
        type: 3,
        unread: this.data.isRead,
        ...this.data.queryInfo
      })
      if (type == 0) {
        this.setData({
          list: res.data.list,
          isLoad: false
        })
      } else {
        let newList = this.data.list.concat(...res.data.list)
        this.setData({
          list: newList,
          count: res.data.count,
          isLoad: false
        })
      }
    }


  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/staff/staffLog/staffLogDetail2/staffLogDetail2?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`,
    })
  },
  toDetail1(e) {
    wx.navigateTo({
      url: `/pages/staff/staffLog/staffLogDetail/staffLogDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  allType(e) {
    if (e.currentTarget.dataset.type == 3) {
      this.toDetail1(e)
    } else {
      this.toDetail(e)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('staffInfo').is_leader == 'false') {
      this.setData({
        status: 1
      })
    } else {
      this.setData({
        status: 0
      })
    }
    this.getList()
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
    if (this.data.list.length < this.data.count) {
      let page = ++this.data.queryInfo.page
      this.setData({
        ['queryInfo.page']: page
      })
      this.getList('event', 1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})