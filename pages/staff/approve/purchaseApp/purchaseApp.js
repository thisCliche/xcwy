// pages/staff/approve/leaveApp/leaveApp.js
import {
  approve_goodsGoods,
  approve_goodsAdd,
  approve_goodsgoodsType,
  approve_goodsgetFlowMember
} from '../../../../api/approve'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time1: '请选择',
    time2: '请选择',
    rootHttp: app.globalData.rootHttp,
    reason: '',
    count: null,
    minheight: {
      minHeight: 80
    },
    type: '请选择',
    typeName:'请选择',
    hyShow: false,
    typeShow: false,
    type_id:'',
    goods_id: 0,
    columns: [],
    typeColumns: [],
    fileList: [],
    calendarShow1: false,
    calendarShow2: false,
    flowMember:[],
    imgList: [],
  },
  onDisplay(e) {
    if(e.currentTarget.dataset.type == 'hyShow'){
      if(this.data.typeName == '请选择'){
        return wx.showToast({
          title: '请先选择类型',
          icon:'error'
        })
      }
    }
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
  onpickerConfirmtype(event){
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      typeName: value.text,
      type_id: value.type,
      typeShow: false
    })
    this.getGoods()
  },
  onpickerConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(value)
    this.setData({
      type: value.text,
      goods_id: value.goods_id,
      hyShow: false
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
          fileList
        });
      },
    });
  },
  async getGoods() {
    let res = await approve_goodsGoods({
      token: wx.getStorageSync('token'),
      type:this.data.type_id
    })
    let columns = []
    for (let i in res.data) {
      let item = {
        goods_id: res.data[i].id,
        text: res.data[i].name
      }
      columns.push(item)
    }
    this.setData({
      columns
    })
  },
  async submit() {
    let form = {
      goods_id: this.data.goods_id,
      token: wx.getStorageSync('token'),
      count: this.data.count,
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
    let res = await approve_goodsAdd(form)
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
    // this.getGoods()
    let that = this
    approve_goodsgoodsType().then(res => {
      let keys = Object.keys(res.data)
      let values = Object.values(res.data)
      let typeColumns = []
      for (let i = 0; i < keys.length; i++) {
        let item={
          type: keys[i],
          text:values[i]
        }
        typeColumns.push(item)
      }
      that.setData({
        typeColumns
      })
    })
    approve_goodsgetFlowMember({token:wx.getStorageSync('token')}).then(res=>{
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