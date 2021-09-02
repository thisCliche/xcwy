// pages/staff/releaseTask/releaseTask/releaseTask.js
import {add} from '../../../../api/task'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHeight:{ minHeight: 80 },
    list:[1,2,3,4,5,6],
    type: '',
    columns: ['日常巡查', '安全督查', '管家巡检', '工程巡检', '其他'],
    title: '',
    project_id:'',
    project_name:'请选择',
    content:'',
    hyShow: false,
    calendarShow1:false,
    calendarShow2:false,
    begin_time:'',
    end_time:'',
    uid: '',
    lx:'请选择',
    selectList:[],
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
      begin_time: this.formatDate(event.detail),
    });
  },
  onConfirm2(event) {
    this.setData({
      calendarShow2: false,
      end_time: this.formatDate(event.detail),
    });
  },
  onpickerConfirm(event) {
    const { picker, value, index } = event.detail;
    let idx = index
    this.setData({hyShow: false,lx:value,type:++idx})
  },
  toPick(){
    wx.navigateTo({
      url: '/pages/contact/pickTaskProject/pickTaskProject',
    })
  },
  getlogin(e){
    let project_name = e.name
    let project_id = e.id
    this.setData({
      project_id,project_name
    })
  },
  toSelect(){
    wx.navigateTo({
      url: '/pages/staff/staffLog/receiver/receiver',
    })
  },
  deletePep(e){
    let selectList = this.data.selectList
    selectList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      selectList
    })
  },
  getselect(e){
    let selectList = this.data.selectList
    let newList = []
    if(selectList.length !=0){
      for(let i of e.selectList){
        let isExist = false
        for(let j of selectList){
          if(i.id == j.id){
            isExist = true
            break;
          }
        }
        if(!isExist){
          newList.push(i)
        }
      }
      let newSelectList = selectList.concat(...newList)
      this.setData({
        selectList:newSelectList
      })
    }else{
      this.setData({
        selectList: e.selectList
      })
    }
  },
  async submit() {
    let uid = []
    this.data.selectList.map(item=>{
      uid.push(item.id)
    })
    let form = {
      type: this.data.type,
      token: wx.getStorageSync('token'),
      uid: uid.toString(),
      title: this.data.title,
      project_id: this.data.project_id,
      content: this.data.content,
      begin_time: this.data.begin_time,
      end_time: this.data.end_time,
      do_count:this.data.selectList.length
    }
    for (let i in form) {
      if (form[i] === '') {
        return wx.showToast({
          title: '请填写完整',
          icon: 'error'
        })
      }
    }
    let res = await add(form)
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