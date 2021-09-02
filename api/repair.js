import request from '../utils/api.js'

export function project(data) {
  return request({
    url: 'repair/project',
    method: 'get',
    data
  })
}
export function agree(data) {
  return request({
    url: 'repair/agree',
    method: 'post',
    data
  })
}
export function confirmed(data) {
  return request({
    url: 'repair/confirmed',
    method: 'post',
    data
  })
}
export function done(data) {
  return request({
    url: 'repair/done',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: 'repair/add',
    method: 'post',
    data
  })
}
export function repairList(data) {
  return request({
    url: 'repair/repairList',
    method: 'get',
    data
  })
}
export function repairDetail(data) {
  return request({
    url: 'repair/repairDetail',
    method: 'get',
    data
  })
}