// pages/onwner/payment/payPage/payPage.js
import {
  waterDetail,
  propertyDetail,
  electricDetail,
  rentDetail,
  buildDetail,
  buildOrder
} from '../../../../api/fee'
import {
  pay
} from '../../../../api/info'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upInfo: {},
    info: {},
    url:'',
    typeName: '',
  },
  async getDetial1(type) {
    let res = await waterDetail({
      house_id: this.data.upInfo.house_id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  async getDetial2(type) {
    let res = await propertyDetail({
      house_id: this.data.upInfo.house_id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  async getDetial3(type) {
    let res = await electricDetail({
      house_id: this.data.upInfo.house_id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  async getDetial4(type) {
    let res = await rentDetail({
      house_id: this.data.upInfo.house_id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  async buildOrder() {
    if (this.data.upInfo.type != 'build') {
      let res = await buildOrder({
        token: wx.getStorageSync('token'),
        house_id: this.data.upInfo.house_id,
        money: this.data.info.fee,
        table: this.data.upInfo.type
      })
      let result = await pay({
        token: wx.getStorageSync('token'),
        table: this.data.upInfo.type,
        order_no: res.data
      })
      if (res.code != 200) {
        return wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      wx.requestPayment({
        timeStamp: result.data.timeStamp + '',
        nonceStr: result.data.nonceStr,
        package: result.data.package,
        signType: 'MD5',
        paySign: result.data.paySign,
        success(result) {
          wx.showToast({
            title: '支付成功',
          })
          setTimeout(_ => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500)
        },
        fail(result) {
          wx.showToast({
            title: '支付失败',
            icon: 'error'
          })
          console.log('失败', result)
        }
      })
    } else {
      try {
        let result = await pay({
          token: wx.getStorageSync('token'),
          table: this.data.upInfo.type,
          order_no: this.data.info.order_no
        })
        wx.requestPayment({
          timeStamp: result.data.timeStamp + '',
          nonceStr: result.data.nonceStr,
          package: result.data.package,
          signType: 'MD5',
          paySign: result.data.paySign,
          success(result) {
            wx.showToast({
              title: '支付成功',
            })
            setTimeout(_ => {
              wx.navigateBack({
                delta: 1,
              })
            }, 500)
          },
          fail(result) {
            wx.showToast({
              title: '支付失败',
              icon: 'error'
            })
            console.log('失败', result)
          }
        })
      } catch (e) {
        wx.showToast({
          title: '网络错误，请重试',
          icon:'none'
        })
      }

    }
  },
  async getDetial5(type) {
    let res = await buildDetail({
      house_id: this.data.upInfo.house_id,
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      upInfo: options
    })
    switch (options.type) {
      case 'property':
        this.setData({
          typeName: '物业',
          url:'img1'
        })
        this.getDetial2(options.type);
        break;
      case 'water':
        this.setData({
          typeName: '水',
          url:'img3'
        })
        this.getDetial1(options.type);
        break;
      case 'electric':
        this.setData({
          typeName: '电',
          url:'img2'
        })
        this.getDetial3(options.type);
        break;
      case 'rent':
        this.setData({
          typeName: '物业租赁',
          url:'img4'
        })
        this.getDetial4(options.type);
        break;
      case 'build':
        this.setData({
          typeName: '装修缴',
          url:'img5'
        })
        this.getDetial5(options.type);
        break;
    }
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