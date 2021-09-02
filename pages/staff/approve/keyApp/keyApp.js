// pages/staff/approve/leaveApp/leaveApp.js
import {approve_keyAdd,approve_keyKey} from '../../../../api/approve'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rootHttp:app.globalData.rootHttp,
    time1:'请选择',
    time2:'请选择',
    duration:null,
    reason:'',
    minDate: new Date().getTime(),
    minheight:{minHeight:80},
    typeName:'请选择',
    key_id:'',
    type: null,
    hyShow:false,
    columns: [],
    fileList: [],
    calendarShow1:false,
    calendarShow2:false,
    datetime1:new Date().getTime(),
    datetime2:new Date().getTime(),
  },
  async getKey(){
    let res = await approve_keyKey({token:wx.getStorageSync('token')})
    let columns = []
    for (let i in res.data) {
      let item = {
        key_id: i,
        text: res.data[i]
      }
      columns.push(item)
    }
    this.setData({
      columns
    })
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
    this.setData({
      calendarShow1: false,
      time1: this.formatDate(event.detail),
      minDate:event.detail
    });
  },
  onConfirm2(event) {
    this.setData({
      calendarShow2: false,
      time2: this.formatDate(event.detail),
    });
  },
  onpickerConfirm(event) {
    const { picker, value, index } = event.detail;
      this.setData({
        hyShow: false,
        typeName: value.text,
        key_id: value.key_id,
      })
  },
  deleteImg(event) {
    let fileList = this.data.fileList
    fileList.splice(event.detail.index, 1)
    this.setData({
      fileList
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let that = this
    wx.uploadFile({
      url: that.data.rootHttp + '/api.php/app/upload',
      filePath: file.url,
      name: 'file',
      header: {
        "Authorization": "Basic enhrajp6eGtqNjY4OA=="
      },
      success(res) {
        let img = JSON.parse(res.data)
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = that.data;
        fileList.push({
          // ...file,
          url: app.globalData.rootHttp + img.data
        });
        that.setData({
          fileList
        });
      },
    });
  },
  async submit() {
    
    let form = {
      key_id: this.data.key_id,
      token: wx.getStorageSync('token'),
      begin_time: this.data.time1,
      end_time: this.data.time2,
      reason: this.data.reason,
      images: JSON.stringify(this.data.fileList)
    }
    for (let i in form) {
      if (form[i] == '') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'error'
        })
      }
    }
    let res = await approve_keyAdd(form)
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
      wx.showToast({
        title: res.msg,
        icon:'error'
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
this.getKey()
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