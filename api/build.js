import request from '../utils/api.js'

export function add(data) {
  return request({
    url: 'build/add',
    method: 'post',
    data
  })
}
export function record(data) {
  return request({
    url: 'build/record',
    method: 'get',
    data
  })
}
export function detail(data) {
  return request({
    url: 'build/detail',
    method: 'get',
    data
  })
}
export function list(data) {
  return request({
    url: 'build/list',
    method: 'get',
    data
  })
}
export function reject(data) {
  return request({
    url: 'build/reject',
    method: 'post',
    data
  })
}
export function done(data) {
  return request({
    url: 'build/done',
    method: 'post',
    data
  })
}
export function agree(data) {
  return request({
    url: 'build/agree',
    method: 'post',
    data
  })
}
export function pay(data) {
  return request({
    url: 'build/pay',
    method: 'post',
    data
  })
}