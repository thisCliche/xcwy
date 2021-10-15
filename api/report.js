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
export function week(data) {
  return request({
    url: 'report/week',
    method: 'get',
    data
  })
}
export function del(data) {
  return request({
    url: 'report/del',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: 'report/edit',
    method: 'post',
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