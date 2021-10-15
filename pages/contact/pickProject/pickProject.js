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
    last: false,
    houseName: '',
    project_name: '',
    area_name: '',
    block_name: '',
    unit_name: '',
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
  toUnit(e){
    this.setData({
      unit_name: e.currentTarget.dataset.item.name,
      last: true
    })
  },
  toBlock(e){
    if(this.data.list1[3]){
      this.setData({
        block_name: e.currentTarget.dataset.item.name,
        list4: this.data.list1[3],
        grad:4,
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
    if(this.data.list1[2]){
      this.setData({
        area_name: e.currentTarget.dataset.item.name,
        list3: this.data.list1[2],
        grad:3,
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
    if (e.currentTarget.dataset.item.hasOwnProperty('child') && e.currentTarget.dataset.item.child.length != 0) {
      if (e.currentTarget.dataset.item.child[1]) {
        this.setData({
          project_name: e.currentTarget.dataset.item.name,
          list1:e.currentTarget.dataset.item.child,
          list2: e.currentTarget.dataset.item.child[1],
          grad:2,
          last: false
        })
      }
    } else {
      this.setData({
        project_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
    // if (this.data.list[0].hasOwnProperty('child')) {
    //   this.setData({
    //     project_id: e.currentTarget.dataset.item.house_id,
    //     houseName:e.currentTarget.dataset.item.name,
    //     last: true
    //   })
    //   return
    // }
    // this.setData({
    //   projectName:e.currentTarget.dataset.item.name
    // })
    // this.getList(e.currentTarget.dataset.id)
  },
  async back() {
    let res = await house({token:wx.getStorageSync('token'),project_name:this.data.project_name,area_name:this.data.area_name,block_name:this.data.block_name,unit_name:this.data.unit_name,})
    console.log(res)
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let that = this
    wx.navigateBack({
      delta: 1,
      complete: function () {
        setTimeout(function () {
          prevPage.getlogin({
            id: res.data[0].id,
            name: that.data.project_name+res.data[0].name,
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