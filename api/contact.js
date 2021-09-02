import request from '../utils/api.js'

export function contact(data) {
  return request({
    url: 'contact/contact',
    method: 'get',
    data
  })
}
export function branch(data) {
  return request({
    url: 'contact/branch',
    method: 'get',
    data
  })
}
export function search(data) {
  return request({
    url: 'contact/search',
    method: 'get',
    data
  })
}