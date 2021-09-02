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
  globalData: {
    userInfo: null,
    siteHttp: 'https://via.placeholder.com/',
    rootHttp:'https://h5.ahzxkj.net:9002'
  }
})