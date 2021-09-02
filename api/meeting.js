import request from '../utils/api.js'

export function add(data) {
  return request({
    url: 'meeting/add',
    method: 'post',
    data
  })
}
export function roomList(data) {
  return request({
    url: 'meeting/roomList',
    method: 'get',
    data
  })
}
export function record(data) {
  return request({
    url: 'meeting/record',
    method: 'get',
    data
  })
}
export function detail(data) {
  return request({
    url: 'meeting/detail',
    method: 'get',
    data
  })
}
export function list(data) {
  return request({
    url: 'meeting/list',
    method: 'get',
    data
  })
}
export function agree(data) {
  return request({
    url: 'meeting/agree',
    method: 'post',
    data
  })
}
export function reject(data) {
  return request({
    url: 'meeting/reject',
    method: 'post',
    data
  })
}