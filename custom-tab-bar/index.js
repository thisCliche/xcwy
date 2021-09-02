const app = getApp()
Component({
  data: {
    active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": {
          normal: app.globalData.rootHttp+'/mini/images/home.png',
          active: app.globalData.rootHttp+'/mini/images/homeA.png',
        },
        "text": "首页"
      },
      // {
      //   "url": "/pages/contact/contactMain/contactMain",
      //   "icon": {
      //     normal: app.globalData.rootHttp+'/mini/images/mail.png',
      //     active: app.globalData.rootHttp+'/mini/images/mailA.png',
      //   },
      //   "text": "通讯录"
      // },
      {
        "url": "/pages/person/personMain/personMain",
        "icon": {
          normal: app.globalData.rootHttp+'/mini/images/person.png',
          active: app.globalData.rootHttp+'/mini/images/personA.png',
        },
        "text": "个人中心"
      }
    ]
    },
    // onShow: function () {
    //   this.getTabBar().init();
    // },  
    methods: {
     onChange(e) {
        wx.switchTab({
          url: this.data.list[e.detail].url
        });
        this.setData({ active: e.detail });
     },
     init() {
        let userInfo = wx.getStorageSync('userInfo')
        if(!userInfo){
          this.setData({
            list: [
              {
                "url": "/pages/index/index",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/home.png',
                  active: app.globalData.rootHttp+'/mini/images/homeA.png',
                },
                "text": "首页"
              },
              {
                "url": "/pages/person/personMain/personMain",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/person.png',
                  active: app.globalData.rootHttp+'/mini/images/personA.png',
                },
                "text": "个人中心"
              }
            ]
          })
        }
        else if(JSON.parse(userInfo).type == 3){
          this.setData({
            list: [
              {
                "url": "/pages/index/index",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/home.png',
                  active: app.globalData.rootHttp+'/mini/images/homeA.png',
                },
                "text": "首页"
              },
              {
                "url": "/pages/contact/contactMain/contactMain",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/mail.png',
                  active: app.globalData.rootHttp+'/mini/images/mailA.png',
                },
                "text": "通讯录"
              },
              {
                "url": "/pages/person/personMain/personMain",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/person.png',
                  active: app.globalData.rootHttp+'/mini/images/personA.png',
                },
                "text": "个人中心"
              }
            ]
          })
        }else{
          this.setData({
            list: [
              {
                "url": "/pages/index/index",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/home.png',
                  active: app.globalData.rootHttp+'/mini/images/homeA.png',
                },
                "text": "首页"
              },
              {
                "url": "/pages/person/personMain/personMain",
                "icon": {
                  normal: app.globalData.rootHttp+'/mini/images/person.png',
                  active: app.globalData.rootHttp+'/mini/images/personA.png',
                },
                "text": "个人中心"
              }
            ]
          })
        }
         const page = getCurrentPages().pop();
         this.setData({
        　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
         });
        }
     }
});