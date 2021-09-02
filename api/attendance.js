import request from '../utils/api.js'

export function clockIn(data) {
  return request({
    url: 'check/clockIn',
    method: 'post',
    data
  })
}
export function check(data) {
  return request({
    url: 'check/check',
    method: 'get',
    data
  })
}
export function statistics(data) {
  return request({
    url: 'check/statistics',
    method: 'get',
    data
  })
}