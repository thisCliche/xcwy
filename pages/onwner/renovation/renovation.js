// pages/onwner/renovation/renovation.js
const filter = require('../../../utils/router.js');
import {
  add
} from '../../../api/build'
import {
  getOwner
} from '../../../api/login'
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false,
    calendarShow: false,
    textarea: {
      minHeight: 80
    },
    info: {},
    uesTime: ' ',
    begin_time:'',
    end_time:'',
    reason: ''
  },
  async submit(){
    let form = {
      begin_time: this.data.begin_time,
      token: wx.getStorageSync('token'),
      end_time: this.data.end_time,
      content: this.data.reason,
    }
    for (let i in form) {
      if (form[i] == '') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'error'
        })
      }
    }
    let that = this;
    this.setData({
      isLoad:true
    })
    let res = await add(form)
    if(res.code == 200) {
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(_=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    }else{
      that.setData({
        isLoad:false
      })
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  onDisplay(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: true
    });
  },
  onClose(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    const m = (date.getMonth() + 1 + '').padStart(2, '0')
    return `${date.getFullYear()}-${m}-${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      calendarShow: false,
      begin_time:this.formatDate(start),
      end_time:this.formatDate(end),
      uesTime: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
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
    this.getOwnerDetail()
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
}))