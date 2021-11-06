// pages/onwner/complaint/complaint.js
import {detail,reply} from '../../../../api/Feedback'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    title:'',
    rootHttp:App.globalData.rootHttp,
    siteHttp:App.globalData.siteHttp,
    height:{minHeight: 80},
    content: '',
    fileList: [],
    reply:"",
    info:{},
    id:'',
    imgList: [],
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  async getDetail(id){
    let res = await detail({id,token:wx.getStorageSync('token')})
    if(res.data.images.length!=0){
      for(let i =0;i<res.data.images.length;i++){
        res.data.images[i] = this.data.rootHttp +res.data.images[i]
      }
    }
    if(res.data.reply_images!==null && res.data.reply_images?.length!=0 ){
      for(let i =0;i<res.data.reply_images.length;i++){
        res.data.reply_images[i] = this.data.rootHttp +res.data.reply_images[i]
      }
    }
    this.setData({
      info:res.data
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
          url: App.globalData.rootHttp + img.data
        });
        that.setData({
          fileList
        });
      },
    });
  },
  previewImage(e){
    let urls = e.currentTarget.dataset.list
    wx.previewImage({
      current: e.currentTarget.dataset.url, 
      urls
    })
  },
  async submit() {
    
    let form = {
      token: wx.getStorageSync('token'),
      id: this.data.id,
      reply: this.data.reply,
      reply_images: JSON.stringify(this.data.imgList)
    }
    for (let i in form) {
      if (form[i] == '') {
          return wx.showToast({
            title: '请填写完整',
            icon: 'error'
          })
      }
    }
    let that = this;
    this.setData({
      isLoad:true
    })
    let res = await reply(form)
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
      that.setData({
        isLoad:false
      })
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
    this.setData({
      id: options.id
    })
    this.getDetail(options.id)
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