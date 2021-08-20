// pages/onwner/meetingRoom/meetingRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    calendarShow: false,
    hyShow:false,
    columns: ['会议室1', '会议室2', '会议室3'],
    form1: {
      bookPer: '',
      phone: '',
      perNumber: null,
      uesTime: '请选择',
      meetingRoom: '请选择',
      reason: ''
    },
    form2: {
      bookUnit:'',
      bookPer: '',
      phone: '',
      perNumber: null,
      uesTime: '请选择',
      meetingRoom: '请选择',
      reason: ''
    }
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
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      calendarShow: false,
    });
    if(this.data.radio == "1"){
      this.setData({
        ["form1.uesTime"]: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      });
    }else{
      this.setData({
        ["form2.uesTime"]: `${this.formatDate(start)} - ${this.formatDate(end)}`,
      }); 
    }
  },

  onpickerConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({hyShow: false})
    if(this.data.radio == "1"){
      console.log(this.data.radio)
      this.setData({
        ["form1.meetingRoom"] : value,
      })
    }else{
      this.setData({
        ["form2.meetingRoom"] : value,
      })
    }
  },
 
  onradioChange(event) {
    this.setData({
      radio: event.detail,
    });
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