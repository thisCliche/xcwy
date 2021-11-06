// pages/staff/approve/leaveApp/leaveApp.js
import {approve_buyAdd} from '../../../../api/approve'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    rootHttp:app.globalData.rootHttp,
    time1:'请选择',
    time2:'请选择',
    reason:'',
    minheight:{minHeight:80},
    type:'请选择',
    hyShow:false,
    columns: ['病假', '事假', '婚假'],
    fileList: [],
    fileList2: [],
    calendarShow1:false,
    calendarShow2:false,
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
        type : value,
        hyShow: false
      })
  },
  deleteImg(event) {
    let fileList = this.data.fileList
    fileList.splice(event.detail.index, 1)
    this.setData({
      fileList
    })
  },
  afterUpFile(event){
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
          fileList2 = []
        } = that.data;
        fileList2.push({
          // ...file,
          name:file.name.split('.')[0],
          format: '.'+file.name.split('.')[1],
          url: app.globalData.rootHttp + img.data
        });
        that.setData({
          fileList2
        });
      },
    });
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
      reason: this.data.reason,
      token: wx.getStorageSync('token'),
      images: JSON.stringify(this.data.fileList),
      attachment: JSON.stringify(this.data.fileList2),
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
    let res = await approve_buyAdd(form)
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