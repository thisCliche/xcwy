// pages/contact/pickProject/pickProject.js
import {
  project,
  house,
  getOwner,
  owner,
  logout
} from '../../../api/login'
import {
  approve_keyHouse
} from '../../../api/approve.js'
import {
  validPhone,
  validIdenty
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false, 
    list: [],
    list1: {},
    list2: [],
    list3: [],
    list4: [],
    grad: 1,
    selectL: 1,
    last: false,
    isShow: false,
    houseName: '',
    project_name: '',
    area_name: '',
    block_name: '',
    unit_name: '',
    isSelect:true,
    name: '',
    mobile: '',
    location: '',
    projectList: [],
    active: 0,
    type: 1,
    info:{},
    house_id: 0,
    house_name: '',
    project_id:0,
    isDisabled: true,
  },
  onChange(event) {
    this.setData({
      type: event.detail,
    });
  },
  toHouse(e) {
    this.setData({
      house_id: e.currentTarget.dataset.item.id,
      house_name: e.currentTarget.dataset.item.name,
      isDisabled:false,
    })
  },
  submit() {
    if(this.data.name == ''){
      return wx.showToast({
        title: '请输入姓名',
        icon: 'error'
      })
    }
    if (!validPhone(this.data.mobile)) {
      return wx.showToast({
        title: '手机号不正确',
        icon: 'error'
      })
    }
    let that = this;
    if (this.data.name != '' || this.data.location) {
      
    this.setData({
      isLoad:true
    })
      owner({
        token: wx.getStorageSync('token'),
        name: this.data.name,
        mobile: this.data.mobile,
        project_id: this.data.project_id,
        type: this.data.type,
        house_id: this.data.house_id
      }).then(res => {
        if (res.code != 200) {
          that.setData({
            isLoad:false
          })
          wx.showToast({
            title: '意外错误',
            icon: 'error'
          })
        } else {
          wx.showToast({
            title: '提交成功',
          })
          let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
          userInfo.type = 2
          wx.setStorageSync('userInfo', JSON.stringify(userInfo))
          setTimeout(_ => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500)
        }
      })
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: 'error'
      })
    }
  },
  async getList(id) {
    if (id) {
      let res = await project({
        project_id: id,
        token: wx.getStorageSync('token')
      })

      this.setData({
        list: res.data
      })
    } else {
      let res = await project({
        token: wx.getStorageSync('token')
      })
      this.setData({
        list: res.data
      })
    }
  },
  toUnit(e){
    this.setData({
      unit_name: e.currentTarget.dataset.item.name,
      last: true
    })
  },
  toBlock(e){
    if(this.data.list1[3]){
      setTimeout(() => {
        this.setData({
          grad:4,
        })
      }, 350);
      this.setData({
        block_name: e.currentTarget.dataset.item.name,
        list4: this.data.list1[3],
        
        last: false
      })
    }else{
      this.setData({
        block_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
  },
  toArea(e){
    if(this.data.list1[2]){
      setTimeout(() => {
        this.setData({
          grad:3,
        })
      }, 350);
      this.setData({
        area_name: e.currentTarget.dataset.item.name,
        list3: this.data.list1[2],
        
        last: false
      })
    }else{
      this.setData({
        area_name: e.currentTarget.dataset.item.name,
        last: true
      })
    }
  },
  toProject(e) {
    if (e.currentTarget.dataset.item.hasOwnProperty('child') && e.currentTarget.dataset.item.child.length != 0) {
      if (e.currentTarget.dataset.item.child[1]) {
        setTimeout(() => {
          this.setData({
            grad:2,
          })
        }, 350);
        this.setData({
          project_name: e.currentTarget.dataset.item.name,
          project_id: e.currentTarget.dataset.item.id,
          list1:e.currentTarget.dataset.item.child,
          list2: e.currentTarget.dataset.item.child[1],
          
          last: false
        })
      }
    } else {
      this.setData({
        project_name: e.currentTarget.dataset.item.name,
        project_id: e.currentTarget.dataset.item.id,
        last: true
      })
    }
    // if (this.data.list[0].hasOwnProperty('child')) {
    //   this.setData({
    //     project_id: e.currentTarget.dataset.item.house_id,
    //     houseName:e.currentTarget.dataset.item.name,
    //     last: true
    //   })
    //   return
    // }
    // this.setData({
    //   projectName:e.currentTarget.dataset.item.name
    // })
    // this.getList(e.currentTarget.dataset.id)
  },
  back2(){
    this.setData({
      isSelect: false,
      location: this.data.project_name+ this.data.area_name+ this.data.block_name+ this.data.unit_name+this.data.house_name,
      // house_id:this.data.id,
      // project_id:this.data.project_id,
    })
  },
  async back() {
    let res = await house({token:wx.getStorageSync('token'),project_name:this.data.project_name,area_name:this.data.area_name,block_name:this.data.block_name,unit_name:this.data.unit_name,})
    if (res.code != 200) {
      return wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    } else if (res.data.length == 0) {
      return wx.showToast({
        title: '数据为空',
        icon: 'none'
      })
    } else {
      this.setData({
        selectL: 2,
        list: res.data
      })
    }
    // let pages = getCurrentPages()
    // let prevPage = pages[pages.length - 2]
    // let that = this
    // wx.navigateBack({
    //   delta: 1,
    //   complete: function () {
    //     setTimeout(function () {
    //       prevPage.getlogin({
    //         id: res.data[0].id,
    //         name: that.data.project_name+res.data[0].name,
    //       })
    //     }, 500)
    //   }
    // })
  },
  async logoutBtn() {
    let res = await logout({
      token: wx.getStorageSync('token')
    })
    if (res.code != 200) {
      wx.showToast({
        title: '意外错误',
        icon: 'error'
      })
    } else {
      let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
      userInfo.type = 1
      wx.setStorageSync('userInfo', JSON.stringify(userInfo))
      wx.showToast({
        title: '注销成功',
      })
      setTimeout(_ => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 500)
    }
  },
  async getownerInfo() {
    let res = await getOwner({
      token: wx.getStorageSync('token')
    })
    this.setData({
      info: res.data
    })
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == '业主') {
      this.setData({
        isShow: true
      })
      this.getownerInfo()
    } else {
      // this.getProject()
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
    this.getList()
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