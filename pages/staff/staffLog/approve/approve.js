import {approve} from '../../../../api/report'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:3,
    minHeight:{minHeight:200},
    comment:'',
    id: '',
    list:[1,2,3,4,5,6],
  },
  async submit(e){
    let form = {
      token:wx.getStorageSync('token'),
      id : this.data.id,
      score: this.data.score,
      comment: this.data.comment
    }
    for(let i in form){
      if(form[i] == ''){
        return wx.showToast({
          title: '填写完整',
          icon: 'error'
        })
      }
    }
    let res = await approve(form)
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
  onChange(e){
    this.setData({
      score:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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