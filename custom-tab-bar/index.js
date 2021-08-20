Component({
  data: {
    active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": {
          normal: '/static/images/home.png',
          active: '/static/images/homeA.png',
        },
        "text": "首页"
      },
      {
        "url": "/pages/contact/contactMain/contactMain",
        "icon": {
          normal: '/static/images/mail.png',
          active: '/static/images/mailA.png',
        },
        "text": "通讯录"
      },
      {
        "url": "/pages/person/personMain/personMain",
        "icon": {
          normal: '/static/images/person.png',
          active: '/static/images/personA.png',
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
         const page = getCurrentPages().pop();
         this.setData({
        　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
         });
        }
     }
});