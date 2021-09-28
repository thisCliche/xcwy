const devBaseUrl = 'https://h5.ahzxkj.net:9002/api.php/';
const probaseUrl = '';
import eventBus from './eventBus'
// token:wx.getStorageSync('token')
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${devBaseUrl}${options.url}`,
      method: options.method,
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic enhrajp6eGtqNjY4OA=='
      },
      success(request) {
        if (request.data.msg == 'Expired token') {
          let refresh = wx.getStorageSync('refresh_token')
          getToken({
            refresh_token: refresh
          }).then(res => {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('refresh_token', res.data.refresh_token)
            wx.showModal({
              title: '提示',
              content: '登录已过期，重新登录',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  let pages = getCurrentPages()
                  if (pages[0].route == 'pages/index/index') {
                    eventBus.emit('reload')
                  } else {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                }
              }
            })
          })
        }
        else if (request.data) {
          resolve(request.data)
        } else {
          resolve(request.data)
        }
      },
      fail(error) {
        reject(error.data)
      }
    })
  })
}

function getToken(data) {
  return request({
    url: 'member/refreshToken',
    method: 'get',
    data
  })
}
export default request