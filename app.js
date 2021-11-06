// app.js
App({
  onLaunch() {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function (res) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function (res) {
      wx.showToast({
        title: '更新失败',
        icon:'error'
      })
    });
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  },
  globalData: {
    userInfo: null,
    siteHttp: 'https://via.placeholder.com/',
    rootHttp:'https://h5.ahzxkj.net:9002'
    // rootHttp:'https://www.hfcxwy.com'
  }
})