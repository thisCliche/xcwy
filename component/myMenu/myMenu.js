// component/myMenu/myMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menu1:{
      type: Array,
    },
    menu2:{
      type: Array,
    },
    menu3:{
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.page,
      })
    },
    toDetail1(e){
      if(wx.getStorageSync('userInfo')){
        let type  = JSON.parse(wx.getStorageSync('userInfo')).type
        if(type == 1){
          wx.navigateTo({
            url: '/pages/person/attestation/attestation',
          })
        }else{
          wx.navigateTo({
            url: e.currentTarget.dataset.page,
          })
        }
      }else{
        wx.navigateTo({
          url: e.currentTarget.dataset.page,
        })
      }
    }
  }
})
