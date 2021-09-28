// pages/onwner/vistResig/vistResig.js
const filter = require('../../../utils/router.js');
// import {
//   project,
// } from '../../../api/repair'
import {
  add,
  project
} from '../../../api/booking'
import {
  validPhone,
  validIdenty
} from '../../../utils/util'
Page(filter.loginCheck({
  /**
   * 页面的初始数据
   */
  data: {
    time: '请选择',
    renyuan: '',
    calendarShow: false,
    checked: true,
    xm: '请选择',
    project_id: '',
    bz: '',
    hyShow: false,
    columns: [],
    yyr: '',
    lxdh: '',
    sfzh: '',
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
  },
  getlogin: function (e) {
    this.setData({
      xm: e.name,
      project_id: e.id
    })
    console.log(e)
  },
  toSelect() {
    wx.navigateTo({
      url: '/pages/contact/pickProject/pickProject',
    })
  },
  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
    if(detail == false){
      this.setData({
        carnum: []
      });
    }
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
    const d = (date.getDate() + '').padStart(2, '0')
    return `${date.getFullYear()}-${m}-${d}`;
  },
  onConfirm(event) {
    this.setData({
      calendarShow: false,
      time: this.formatDate(event.detail),
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
    if (!this.data.checked) return
    this.setData({
      showNewPower: true,
      KeyboardState: true
    })
  },
  removeNewpower() {
    let carnum = this.data.carnum
    if(this.data.carnum.length == 8){
      carnum.pop()
      this.setData({
        carnum: carnum,
      })
    }
    this.setData({
      showNewPower: false,
    })
  },
  closeKeyboard() {
    this.setData({
      KeyboardState: false
    })
  },
  openKeyboard() {
    if (!this.data.checked) return
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
  async getProject() {
    let res = await project({
      token: wx.getStorageSync('token'),
    })
    let columns = []
    for (let i of res.data) {
      let item = {
        project_id: i.id,
        text: i.name
      }
      columns.push(item)
    }
    this.setData({
      columns
    })
  },
  async submit() {
    if (!validPhone(this.data.lxdh)) {
      return wx.showToast({
        title: '手机号不正确',
        icon: 'error'
      })
    }
    if (!validIdenty(this.data.sfzh)) {
      return wx.showToast({
        title: '身份证号不正确',
        icon: 'error'
      })
    }
    let form = {
      project_id: this.data.project_id,
      token: wx.getStorageSync('token'),
      people_count: this.data.renyuan,
      date: this.data.time,
      mobile: this.data.lxdh,
      name: this.data.yyr,
      is_drive: this.data.checked,
      car_no: this.data.carnum.join(''),
      id_card: this.data.sfzh,
      remark: this.data.bz,
    }
    // if(!form.is_drive){
    //   form.car_no = '皖ASDFE2'
    // }
    for (let i in form) {
      if (form[i] === '') {
        if (i == 'remark' || i == 'car_no') {

        } else {
          return wx.showToast({
            title: '请填写完整',
            icon: 'error'
          })
        }
      }
    }
    form.is_drive = form.is_drive.toString()
    let res = await add(form)
    if (res.code == 200) {
      wx.showToast({
        title: '预约成功',
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
    this.getProject()
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