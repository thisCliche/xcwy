// pages/onwner/vistResig/vistResig.js
const filter = require('../../../../utils/router.js');
import {
  add,invitation,invitationAdd
} from '../../../../api/booking'
import {
  getOwner
} from '../../../../api/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '请选择',
    info:{},
    id:'',
    calendarShow: false,
    checked: true,
    pepople: [{
      name: '',
      mobile: '',
      id_card: ''
    }],
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
  bindInput(e) {
    let dataset = e.currentTarget.dataset;
    let name = dataset.name
    let value = e.detail;
    let attributeName =  `pepople[${e.currentTarget.dataset.index}].${name}` 
    this.setData({
      [attributeName]: value
    });
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
      name: '',
      mobile: '',
      id_card: ''
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
  async getOwnerDetail() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    let res1 = await invitation({token: wx.getStorageSync('token')})
    this.setData({
      info: res.data
    })
  },
  async submit(){
    if(!wx.getStorageSync('token')){
      return wx.navigateTo({
        url: '/pages/login/login?type=back',
      })
    }
    // if (!validPhone(this.data.lxdh)) {
    //   return wx.showToast({
    //     title: '手机号不正确',
    //     icon: 'error'
    //   })
    // }
    // if (!validIdenty(this.data.sfzh)) {
    //   return wx.showToast({
    //     title: '身份证号不正确',
    //     icon: 'error'
    //   })
    // }
    let form = {
      project_id: this.data.project_id,
      token: wx.getStorageSync('token'),
      id: this.data.id,
      date: this.data.time,
      people_count: this.data.pepople.length,

      access: JSON.stringify(this.data.pepople),
      is_drive: this.data.checked,
      car_no: this.data.carnum.join(''),
      remark: this.data.bz,
    }
    if(!form.is_drive){
      form.car_no = '皖ASDFE2'
    }
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
    form.is_drive = form.is_drive.toString()
    let res = await invitationAdd(form)
    if(res.code == 200) {
      wx.showToast({
        title: '预约成功',
      })
      setTimeout(_=>{
        wx.switchTab({
          url: '/pages/index/index',
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
    this.setData({id:options.id})
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
    // this.getOwnerDetail()
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