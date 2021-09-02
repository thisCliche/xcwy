// component/titleMore/titleMore.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    tomore(){
      wx.navigateTo({
        url: '/pages/onwner/news/newsList/newsList',
      })
    }
  }
})
