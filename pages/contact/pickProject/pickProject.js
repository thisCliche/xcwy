// pages/contact/pickProject/pickProject.js
import {
  project,
  house
} from '../../../api/login'
import {
  approve_keyHouse
} from '../../../api/approve.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list1: {},
    list2: [],
    list3: [],
    list4: [],
    grad: 1,
    selectL: 1,
    last: false,
    houseName: '',
    project_name: '',
    area_name: '',
    block_name: '',
    unit_name: '',
    isDisabled: true,
  },
  async getList(id) {
    if (id) {
      let res = await project({
        project_id: id,
        token: wx.getStorageSync('token')
      })

      this.setData({
        list: res.data
      })
    } else {
      let res = await project({
        token: wx.getStorageSync('token')
      })
      this.setData({
        list: res.data
      })
    }
  },
  toHouse(e) {
    this.setData({
      house_id: e.currentTarget.dataset.item.id,
      house_name: e.currentTarget.dataset.item.name,
      isDisabled:false,
    })
  },
  toUnit(e){
    this.setData({
      unit_name: e.currentTarget.dataset.item.name,
      last: true
    })
  },
  toBlock(e){
    let that = this
    if(this.data.list1[3]){
      setTimeout(() => {
        that.setData({
          grad:4,
        })
      }, 350);
      this.setData({
        block_name: e.currentTarget.dataset.item.name,
        list4: this.data.list1[3],
        last: false
      })
    }else{
      this.setData({
        block_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
  },
  toArea(e){
    let that = this
    if(this.data.list1[2]){
      setTimeout(() => {
        that.setData({
          grad:3,
        })
      }, 350);
      this.setData({
        area_name: e.currentTarget.dataset.item.name,
        list3: this.data.list1[2],
        last: false
      })
    }else{
      this.setData({
        area_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
  },
  toProject(e) {
    let that = this
    if (e.currentTarget.dataset.item.hasOwnProperty('child') && e.currentTarget.dataset.item.child.length != 0) {
      if (e.currentTarget.dataset.item.child[1]) {
        setTimeout(() => {
          that.setData({
            grad:2,
          })
        }, 350);
        this.setData({
          project_name: e.currentTarget.dataset.item.name,
          list1:e.currentTarget.dataset.item.child,
          list2: e.currentTarget.dataset.item.child[1],
          last: false
        })
      }
    } else {
      this.setData({
        project_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
  },
  async back() {
    let res = await house({token:wx.getStorageSync('token'),project_name:this.data.project_name,area_name:this.data.area_name,block_name:this.data.block_name,unit_name:this.data.unit_name,})
    if (res.code != 200) {
      return wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    } else if (res.data.length == 0) {
      return wx.showToast({
        title: '数据为空',
        icon: 'none'
      })
    } else {
      this.setData({
        selectL: 2,
        list: res.data
      })
    }
    
  },
  async back2() {
    
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let that = this
    wx.navigateBack({
      delta: 1,
      complete: function () {
        setTimeout(function () {
          prevPage.getlogin({
            id: that.data.house_id,
            name: that.data.project_name+that.data.area_name+that.data.block_name+that.data.unit_name+ that.data.house_name,
          })
        }, 500)
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
    this.getList()
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