import request from '../utils/api.js'

export function add(data) {
  return request({
    url: 'report/add',
    method: 'post',
    data
  })
}
export function list(data) {
  return request({
    url: 'report/list',
    method: 'get',
    data
  })
}
export function detail(data) {
  return request({
    url: 'report/detail',
    method: 'get',
    data
  })
}
export function approve(data) {
  return request({
    url: 'report/approve',
    method: 'post',
    data
  })
}