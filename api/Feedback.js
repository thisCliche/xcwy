import request from '../utils/api.js'

export function add(data) {
  return request({
    url: 'Feedback/add',
    method: 'post',
    data
  })
}
export function my(data) {
  return request({
    url: 'Feedback/my',
    method: 'get',
    data
  })
}
export function detail(data) {
  return request({
    url: 'Feedback/detail',
    method: 'get',
    data
  })
}
export function handleList(data) {
  return request({
    url: 'Feedback/handleList',
    method: 'get',
    data
  })
}
export function reply(data) {
  return request({
    url: 'Feedback/reply',
    method: 'post',
    data
  })
}
export function messageMy(data) {
  return request({
    url: 'message/my',
    method: 'get',
    data
  })
}