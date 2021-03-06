// pages/onwner/vistResig/vistResig.js
import {
  appointmentDetail
} from '../../../../api/booking'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    time: '2021-7-06',
    renyuan: '3',
    calendarShow: false,
    checked: true,
    pepople: [{
      yyr: '',
      lxdh: '',
      sfzh: ''
    }],
    status: '',
    bz: '',
    // 省份简写
    provinces: [
      ['京', '沪', '粤', '津', '冀', '晋', '蒙', '辽', '吉', '黑'],
      ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘'],
      ['桂', '琼', '渝', '川', '贵', '云', '藏'],
      ['陕', '甘', '青', '宁', '新'],
    ],
    // 车牌输入
    numbers: [
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
      ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
      ["W", "X", "Y", "Z", "港", "澳", "学"]
    ],
    carnum: [],
    showNewPower: false,
    KeyboardState: false,
    info: {}
  },
  toDetail() {
    wx.navigateTo({
      url: `/pages/onwner/order/qrCode/qrCode?id=${this.data.id}`,
    })
  },
  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  addInfo() {
    let pepople = this.data.pepople
    pepople.push({
      yyr: '',
      lxdh: '',
      sfzh: ''
    })
    this.setData({
      pepople,
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
      calendarShow: false,
      time: this.formatDate(event.detail),
    });
  },
  // 选中点击设置
  bindChoose(e) {
    if (!this.data.carnum[6] || this.data.showNewPower) {
      var arr = [];
      arr[0] = e.target.dataset.val;
      this.data.carnum = this.data.carnum.concat(arr)
      this.setData({
        carnum: this.data.carnum
      })
    }
  },
  bindDelChoose() {
    if (this.data.carnum.length != 0) {
      this.data.carnum.splice(this.data.carnum.length - 1, 1);
      this.setData({
        carnum: this.data.carnum
      })
    }
  },
  showPowerBtn() {
    this.setData({
      showNewPower: true,
      KeyboardState: true
    })
  },
  closeKeyboard() {
    this.setData({
      KeyboardState: false
    })
  },
  openKeyboard() {
    this.setData({
      KeyboardState: true
    })
  },
  // 提交车牌号码
  submitNumber() {
    if (this.data.carnum[6]) {
      // 跳转到tabbar页面
    }
  },
  async getDetail(id) {
    let res = await appointmentDetail({
      id,
      token: wx.getStorageSync('token')
    })
    switch (res.data.status) {
      case 1:
        this.setData({
          status: '待审核'
        });
        break;
      case 2:
        this.setData({
          status: '待使用'
        });
        break;
      case 3:
        this.setData({
          status: '已使用'
        });
        break;
      case 4:
        this.setData({
          status: '已失效'
        });
        break;
    }
    this.setData({
      info: res.data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
    this.setData({
      id: options.id
    })
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