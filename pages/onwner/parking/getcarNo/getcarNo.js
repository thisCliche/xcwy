// pages/onwner/parking/addCar/addCar.js
import {fee_carAdd,fee_carDetail} from '../../../../api/info'
import {getPrice} from '../../../../api/fee'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    car_no:'皖AD2222',
    deFualtHttp:app.globalData.rootHttp,
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
    KeyboardState: true,
    bill:0,
    info:{}
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
openKeyboard() {
  this.setData({
    KeyboardState: true
  })
},
toPay(e){

  wx.navigateTo({
    url: `/pages/onwner/parking/payPage/payPage?no=${this.data.carnum.join('')}`,
  })
},
// 提交车牌号码
async submitNumber() {
  // wx.navigateTo({
  //   url: `/pages/onwner/parking/payPage1/payPage1?no=${this.data.carnum.join('')}`,
  // })
  let no = this.data.carnum.join('')
  console.log(no)
  let res = await getPrice({Plate:no,token:wx.getStorageSync('token')})
  if(res.code != 200){
    wx.showToast({
      title: res.msg,
      icon:'none'
    })
  }else{
    let data = JSON.parse(res.data)
    console.log(data)
    if(res.data == null){
      wx.showToast({
        title: '暂无数据',
        icon:'error'
      })
    }else{
      if(res.data.Amout == 0 || res.data == '{"Status":0,"ErrorMsg":"车场未开通"}'){
        wx.showToast({
          title: '暂无缴费信息',
          icon:"error"
        })
      }else{
        wx.navigateTo({
          url: `/pages/onwner/parking/payPage/payPage?no=${this.data.carnum.join('')}`,
        })
      }
      // this.setData({
      //   isShow:true,
      //   info: res.data,
      //   bill: res.data.bill
      // })
      
    }
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