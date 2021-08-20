// component/myMenu/myMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    approveMenuMy1:{
      type: Array,
    },
   
    approveMenuMy2:{
      type: Array,
    },
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
    }
  }
})
