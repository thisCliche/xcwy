// pages/onwner/repair/repair.js
const filter = require('../../../utils/router.js');
let app = getApp()
import {
  project,
  add
} from '../../../api/repair'
import {
  myProfile
} from '../../../api/login'
import {
  validPhone
} from '../../../utils/util'
import {
  getOwner
} from '../../../api/login'
Page(filter.loginCheck({
  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    rootHttp: app.globalData.rootHttp,
    location: '',
    bxr: '',
    bxdh: '',
    xm: '请选择报修项目',
    project_id: '',
    bxnr: '',
    height: {
      minHeight: 50
    },
    hyShow: false,
    columns: [],
    fileList: [],
    userInfo: {},
    info: {},
    isStaff: false,
    imgList: [],
  },
  onDisplay(e) {
    wx.navigateTo({
      url: '/pages/contact/pickRepairProject/pickRepairProject',
    })
    // let type = e.currentTarget.dataset.type
    // this.setData({
    //   [type]: true
    // });
  },
  getlogin(e) {
    this.setData({
      xm: e.name,
      project_id: e.id
    })
  },
  onClose(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      [type]: false
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
      xm: value.text,
      project_id: value.project_id
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
          url: app.globalData.rootHttp + img.data
        });
        that.setData({
          fileList,
          imgList
        });
      },
    });
  },
  async getProject() {
    let res = await project({
      token: wx.getStorageSync('token')
    })
    let columns = []
    for (let i in res.data) {
      let item = {
        project_id: i,
        text: res.data[i]
      }
      columns.push(item)
    }
    this.setData({
      columns
    })
  },
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  async getUserinfo() {
    let res = await myProfile({
      token: wx.getStorageSync('token')
    })
    this.setData({
      bxr: res.data.name,
      bxdh: res.data.mobile
    })
  },
  async sumbmit() {
    if (!validPhone(this.data.bxdh)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'error'
      })
    }
    if (this.data.isStaff) {
      var form = {
        project_id: this.data.project_id,
        token: wx.getStorageSync('token'),
        address: this.data.location,
        name: this.data.bxr,
        mobile: this.data.bxdh,
        content: this.data.bxnr,
        attachment: JSON.stringify(this.data.imgList)
      }
    } else {
      var form = {
        token: wx.getStorageSync('token'),
        // address: this.data.location,
        name: this.data.bxr,
        mobile: this.data.bxdh,
        content: this.data.bxnr,
        attachment: JSON.stringify(this.data.imgList)
      }
    }

    for (let i in form) {
      if (form[i] == '') {
        if (i == 'attachment') {

        } else {
          return wx.showToast({
            title: '请填写完整',
            icon: 'error'
          })
        }
      }
    }
    let that = this;
    this.setData({
      isLoad:true
    })
    let res = await add(form)
    if (res.code == 200) {
      wx.showToast({
        title: '报修成功',
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

    let type = JSON.parse(wx.getStorageSync('userInfo')).type
    if (type == 3) {
      this.setData({
        isStaff: true
      })
    }
    this.getProject()
    if (this.data.bxr != '') {
      return
    }
    this.getUserinfo()
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