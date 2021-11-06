// pages/staff/task/taskDetail/taskDetail.js
import {detail} from '../../../../api/task'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    list:[1,2,3,4,5,6],
    info:{},
    isHidden:false,
  },
  async getDetail(id){
    let res = await detail({token:wx.getStorageSync('token'),id})
    let userId = JSON.parse(wx.getStorageSync('userInfo')).id
    console.log(userId)
    let that = this
    res.data.task_receiver.forEach(item=>{
      if(item.member_id == userId){
        if(item.is_done == 'true'){
          that.setData({
            isHidden: true
          })
        }
      }
    })
    this.setData({
      info: res.data
    })
  },
  toReport(){
    let id = this.data.info.id
    let type = this.data.info.type
    let title = this.data.info.title
    switch (type) {
      case 1:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseDaily/releaseDaily?id=${id}&title=${title}&type=1`,
        })
        break;
      case 2:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseSafe/releaseSafe?id=${id}&title=${title}&type=2`,
        })
        break;
      case 3:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseDaily/releaseDaily?id=${id}&title=${title}&type=3`,
        })
        break;
      case 4:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseDaily/releaseDaily?id=${id}&title=${title}&type=4`,
        })
        break;
      default:
        wx.navigateTo({
          url: `/pages/staff/releaseTask/releaseDaily/releaseDaily?id=${id}&title=${title}&type=5`,
        })
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getDetail(this.data.id)
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