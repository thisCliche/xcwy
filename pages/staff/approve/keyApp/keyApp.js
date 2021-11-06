// pages/staff/approve/leaveApp/leaveApp.js
import {
  approve_keyAdd,
  approve_keyKey,
  approve_keygetFlowMember
} from '../../../../api/approve'
import {
  project
} from '../../../../api/login.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    rootHttp: app.globalData.rootHttp,
    time1: '请选择',
    time1stamp: 0,
    time2: '请选择',
    time2stamp: 0,
    duration: null,
    reason: '',
    minDate: new Date().getTime(),
    minheight: {
      minHeight: 80
    },
    typeName: '请选择',
    key_id: '',
    type: null,
    hyShow: false,
    columns: [],
    fileList: [],
    calendarShow1: false,
    calendarShow2: false,
    datetime1: new Date().getTime(),
    datetime2: new Date().getTime(),
    flowMember: [],
    imgList: [],
  },
  async getKey() {
    let res = await approve_keyKey({
      token: wx.getStorageSync('token')
    })
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
    if (e.currentTarget.dataset.type == 'hyShow') {
      wx.navigateTo({
        url: '/pages/contact/pickKeyProject/pickKeyProject',
      })
    } else {
      if (e.currentTarget.dataset.type == 'calendarShow1') {
        this.setData({
          datetime1: new Date().getTime()
        })
      }
      this.setData({
        [type]: true
      });
    }
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
    const hh = (date.getHours() + '').padStart(2, '0')
    const mm = (date.getMinutes() + '').padStart(2, '0')
    return `${date.getFullYear()}-${m}-${date.getDate()} ${hh}:${mm}`;
  },
  onConfirm(event) {
    this.setData({
      time1stamp: event.detail,
      calendarShow1: false,
      time1: this.formatDate(event.detail),
      minDate: event.detail
    });
  },
  onConfirm2(event) {
    this.setData({
      calendarShow2: false,
      time2stamp: event.detail,
      time2: this.formatDate(event.detail),
    });
  },
  onpickerConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      hyShow: false,
      typeName: value.text,
      key_id: value.key_id,
    })
  },
  getlogin(e){
    this.setData({
      key_id:e.id,
      typeName:e.name
    })
  },
  deleteImg(event) {
    let fileList = this.data.fileList
    let imgList = this.data.imgList
    fileList.splice(event.detail.index, 1)
    imgList.splice(event.detail.index, 1)
    this.setData({
      fileList,
      imgList
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
        let imgList = that.data.imgList
        imgList.push(img.data)
        that.setData({
          fileList,
          imgList
        });
      },
    });
  },
  async submit() {
    if (this.data.time1stamp > this.data.time2stamp) {
      return wx.showToast({
        title: '归还时间应小于申领时间',
        icon: 'none'
      })
    }
    let form = {
      key_id: this.data.key_id,
      token: wx.getStorageSync('token'),
      begin_time: this.data.time1,
      end_time: this.data.time2,
      reason: this.data.reason,
      images: JSON.stringify(this.data.imgList)
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
    let res = await approve_keyAdd(form)
    if (res.code == 200) {
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(_ => {
        wx.navigateBack({
          delta: 1,
        })
      }, 500)
    } else {
      that.setData({
        isLoad:false
      })
      wx.showToast({
        title: res.msg,
        icon: 'error'
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
    let that = this
    project({
      token: wx.getStorageSync('token')
    }).then(res => {
      console.log(res)
    })
    approve_keygetFlowMember({
      token: wx.getStorageSync('token')
    }).then(res => {
      that.setData({
        flowMember: res.data
      })
    })
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