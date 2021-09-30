// pages/staff/staffLog/writeLog/writeLog.js
import {
  add,
  week
} from '../../../../api/report'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    typeName: '日报',
    tasks: '',
    summary: '',
    plan: '',
    remark: '',
    with_week: false,
    fileList: [],
    siteHttp: App.globalData.siteHttp,
    rootHttp: App.globalData.rootHttp,
    minHeight: {
      minHeight: 80
    },
    selectList: [],
    weekList: [],
    imgList: [],
  },
  onChange(e) {
    if (e.detail) {
      this.getWeekList()
    } else {
      this.setData({
        weekList: []
      })
    }
    this.setData({
      with_week: e.detail
    })
  },
  async getWeekList() {
    let res = await week({
      token: wx.getStorageSync('token'),
      page: 1,
      limit: 4,
      type: 2,
      status: 1
    })
    this.setData({
      weekList: res.data
    })
  },
  deletePep(e) {
    let selectList = this.data.selectList
    selectList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      selectList
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
        let imgList = that.data.imgList
        imgList.push(img.data)
        fileList.push({
          // ...file,
          url: App.globalData.rootHttp + img.data
        });
        that.setData({
          fileList
        });
      },
    });
  },
  getselect(e) {
    let selectList = this.data.selectList
    let newList = []
    if (selectList.length != 0) {
      for (let i of e.selectList) {
        let isExist = false
        for (let j of selectList) {
          if (i.id == j.id) {
            isExist = true
            break;
          }
        }
        if (!isExist) {
          newList.push(i)
        }
      }
      let newSelectList = selectList.concat(...newList)
      this.setData({
        selectList: newSelectList
      })
    } else {
      this.setData({
        selectList: e.selectList
      })
    }
  },
  toSelect() {
    wx.navigateTo({
      url: '/pages/staff/staffLog/receiver/receiver',
    })
  },
  async submit() {
    let uid = []
    this.data.selectList.map(item => {
      uid.push(item.id)
    })
    let form = {
      type: this.data.type,
      token: wx.getStorageSync('token'),
      uid: uid.toString(),
      tasks: this.data.tasks,
      // summary: this.data.summary,
      // plan: this.data.plan,
      images: JSON.stringify(this.data.imgList),
      // remark: this.data.remark,
      // with_week: this.data.with_week
    }
    if (this.data.with_week) {

    } else {
      console.log(form)
      for (let i in form) {
        if (form[i] === '') {
          if (i == 'remark') {

          } else {
            return wx.showToast({
              title: '请填写完整',
              icon: 'error'
            })
          }
        }
      }
    }
    let res = await add(form)
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
    this.setData({
      type: options.type,
    })
    switch (options.type) {
      case '1':
        this.setData({
          typeName: '日报'
        });
        wx.setNavigationBarTitle({
          title: '日报',
        })
        break;
      case '2':
        this.setData({
          typeName: '周报'
        });
        wx.setNavigationBarTitle({
          title: '周报',
        })
        break;
      default:
        this.setData({
          typeName: '月报'
        })
        wx.setNavigationBarTitle({
          title: '月报',
        })
    }
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