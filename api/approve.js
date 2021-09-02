import request from '../utils/api.js'

export function approve_leaveAdd(data) {
  return request({
    url: 'approve_leave/add',
    method: 'post',
    data
  })
}
export function approve_outAdd(data) {
  return request({
    url: 'approve_out/add',
    method: 'post',
    data
  })
}
export function approve_goodsGoods(data) {
  return request({
    url: 'approve_goods/goods',
    method: 'get',
    data
  })
}
export function approve_goodsAdd(data) {
  return request({
    url: 'approve_goods/add',
    method: 'post',
    data
  })
}

export function approve_keyKey(data) {
  return request({
    url: 'approve_key/key',
    method: 'get',
    data
  })
}
export function approve_keyAdd(data) {
  return request({
    url: 'approve_key/add',
    method: 'post',
    data
  })
}
export function approve_buyAdd(data) {
  return request({
    url: 'approve_buy/add',
    method: 'post',
    data
  })
}