// component/newItem/newItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newList:{
      type:Array
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
        url: `/pages/onwner/news/newsDetail/newsDetail?id=${e.currentTarget.dataset.id}`,
      })
        },
  }
})
