// pages/onwner/meetingRoom/meetingRoom.js
import {
  add,
  roomList
} from '../../../api/meeting'
import {validPhone} from '../../../utils/util'
const filter = require('../../../utils/router.js');
Page(filter.loginCheck({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    calendarShow: false,
    hyShow: false,
    columns: [],
    columns1: [{
        values: ['上午', '下午', '全天'],
        defaultIndex: 1,
      },
      {
        values: ['上午', '下午', '全天'],
        defaultIndex: 1,
      },
    ],
    qjShow: false,
    form1: {
      name: '',
      mobile: '',
      count: null,
      begin_time: '',
      begin_type: '',
      end_time: '',
      end_type: '',
      typTime: '请选择',
      uesTime: '请选择',
      meetingRoom: '请先选择时间',
      isfull: false,
      room_id: '',
      content: ''
    },
    form2: {
      name: '',
      mobile: '',
      count: null,
      unit:'',
      begin_time: '',
      begin_type: '',
      end_time: '',
      end_type: '',
      typTime: '请选择',
      uesTime: '请选择',
      meetingRoom: '请先选择时间',
      isfull: false,
      room_id: '',
      content: ''
    }
  },
  judgeFull() {
    if (this.data.form1.begin_time != '' && this.data.form1.begin_type != '' && this.data.form1.end_time != '' && this.data.form1.end_type != '') {
      this.setData({
        ["form1.isfull"]: true
      })
      this.roomList()
    }
  },
  judgeFull2() {
    if (this.data.form2.begin_time != '' && this.data.form2.begin_type != '' && this.data.form2.end_time != '' && this.data.form2.end_type != '') {
      this.setData({
        ["form2.isfull"]: true
      })
      this.roomList2()
    }
  },
  bindInput(e) {
    let dataset = e.currentTarget.dataset;
    let name = dataset.name
    let value = e.detail;
    let attributeName = 'form1.' + name
    this.setData({
      [attributeName]: value
    });
  },
  bindInput2(e) {
    let dataset = e.currentTarget.dataset;
    let name = dataset.name
    let value = e.detail;
    let attributeName = 'form2.' + name
    this.setData({
      [attributeName]: value
    });
  },
  onDisplay(e) {
    let type = e.currentTarget.dataset.type
    if (e.currentTarget.dataset.type == 'hyShow') {
      if(this.data.radio == 1){
        if (this.data.form1.isfull) {} else {
          return
        }
      }
      if(this.data.radio == 2){
        if (this.data.form2.isfull) {} else {
          return
        }
      }
    }
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
    });
    if (this.data.radio == "1") {
      this.setData({
        ["form1.begin_time"]: this.formatDate(start),
        ["form1.end_time"]: this.formatDate(end),
        ["form1.uesTime"]: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      });
      this.judgeFull()
    } else {
      this.setData({
        ["form2.begin_time"]: this.formatDate(start),
        ["form2.end_time"]: this.formatDate(end),
        ["form2.uesTime"]: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      });
      this.judgeFull2()
    }
    
  },

  onpickerConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      hyShow: false
    })
    if (this.data.radio == "1") {
      console.log(this.data.radio)
      this.setData({
        ["form1.meetingRoom"]: value.text,
        ["form1.room_id"]: value.id,
      })
    } else {
      this.setData({
        ["form2.meetingRoom"]: value.text,
        ["form2.room_id"]: value.id,
      })
    }
  },
  onpickerConfirm1(event) {
    const {
      value,
      index
    } = event.detail;
    this.setData({
      qjShow: false
    })
    if (this.data.radio == "1") {
      this.setData({
        ["form1.begin_type"]: ++index[0],
        ["form1.end_type"]: ++index[1],
        ["form1.typTime"]: value,
      })
      this.judgeFull()
    } else {
      this.setData({
        ["form2.begin_type"]: ++index[0],
        ["form2.end_type"]: ++index[1],
        ["form2.typTime"]: value,
      })
      this.judgeFull2()
    }
    
  },

  onradioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  async roomList() {
    let res = await roomList({
      token: wx.getStorageSync('token'),
      begin_time: this.data.form1.begin_time,
      begin_type: this.data.form1.begin_type,
      end_type: this.data.form1.end_type,
      end_time: this.data.form1.end_time,
    })
    let columns = []
    for (let i in res.data) {
      let obj = {
        text: res.data[i].name,
        disabled: res.data[i].status == 0 ? false : true,
        id: res.data[i].id
      }
      columns.push(obj)
    }
    this.setData({
      columns
    })
  },
  async roomList2() {
    let res = await roomList({
      token: wx.getStorageSync('token'),
      begin_time: this.data.form2.begin_time,
      begin_type: this.data.form2.begin_type,
      end_type: this.data.form2.end_type,
      end_time: this.data.form2.end_time,
    })
    let columns = []
    for (let i in res.data) {
      let obj = {
        text: res.data[i].name,
        disabled: res.data[i].status == 0 ? false : true,
        id: res.data[i].id
      }
      columns.push(obj)
    }
    this.setData({
      columns
    })
  },
  async submit1(){
    if(!validPhone(this.data.form1.mobile)){
      return wx.showToast({
        title: '手机号不正确',
        icon:'error'
      })
    }
    let form = this.data.form1
    form.type = this.data.radio
    for(let i in form){
      if(form[i] == ''){
        return wx.showToast({
          title: '请填写完整',
          icon:'error'
        })
      }
    }
    let res = await add({token:wx.getStorageSync('token'),...form})
    if(res.code == 200) {
      wx.showToast({
        title: '预约成功',
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
  async submit2(){
    if(!validPhone(this.data.form2.mobile)){
      return wx.showToast({
        title: '手机号不正确',
        icon:'error'
      })
    }
    let form = this.data.form2
    form.type = this.data.radio
    for(let i in form){
      if(form[i] == ''){
        return wx.showToast({
          title: '请填写完整',
          icon:'error'
        })
      }
    }
    let res = await add({token:wx.getStorageSync('token'),...form})
    if(res.code == 200) {
      wx.showToast({
        title: '预约成功',
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