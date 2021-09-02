// component/myMenu/myMenu.js
let App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    staffMenuMy1:{
      type: Array,
    },
   
    staffMenutask1:{
      type: Array,
    },
    
    staffMenuwork1:{
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    deFualtHttp:App.globalData.rootHttp,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.page,
      })
    }
  }
})
