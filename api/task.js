import request from '../utils/api.js'

export function reportList(data) {
  return request({
    url: 'task/reportList',
    method: 'get',
    data
  })
}
export function add(data) {
  return request({
    url: 'task/add',
    method: 'post',
    data
  })
}
export function project(data) {
  return request({
    url: 'task/project',
    method: 'get',
    data
  })
}
export function list(data) {
  return request({
    url: 'task/list',
    method: 'get',
    data
  })
}
export function getList(data) {
  return request({
    url: 'task/getList',
    method: 'get',
    data
  })
}
export function report(data) {
  return request({
    url: 'task/report',
    method: 'post',
    data
  })
}
export function detail(data) {
  return request({
    url: 'task/detail',
    method: 'get',
    data
  })
}
export function reportDetail(data) {
  return request({
    url: 'task/reportDetail',
    method: 'get',
    data
  })
}
export function del(data) {
  return request({
    url: 'task/del',
    method: 'post',
    data
  })
}