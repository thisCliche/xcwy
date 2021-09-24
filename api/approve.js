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
export function approve_leaveCancel(data) {
  return request({
    url: 'approve_leave/cancel',
    method: 'post',
    data
  })
}
export function approve_goodsgoodsType(data) {
  return request({
    url: 'approve_goods/goodsType',
    method: 'get',
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
export function approve_leave_list(data) {
  return request({
    url: 'approve_leave/list',
    method: 'get',
    data
  })
}
export function approve_out_list(data) {
  return request({
    url: 'approve_out/list',
    method: 'get',
    data
  })
}
export function approve_goods_list(data) {
  return request({
    url: 'approve_goods/list',
    method: 'get',
    data
  })
}
export function approve_buy_list(data) {
  return request({
    url: 'approve_buy/list',
    method: 'get',
    data
  })
}
export function approve_key_list(data) {
  return request({
    url: 'approve_key/list',
    method: 'get',
    data
  })
}

export function approve_leave_detail(data) {
  return request({
    url: 'approve_leave/detail',
    method: 'get',
    data
  })
}
export function approve_out_detail(data) {
  return request({
    url: 'approve_out/detail',
    method: 'get',
    data
  })
}
export function approve_buy_detail(data) {
  return request({
    url: 'approve_buy/detail',
    method: 'get',
    data
  })
}
export function approve_goods_detail(data) {
  return request({
    url: 'approve_goods/detail',
    method: 'get',
    data
  })
}
export function approve_key_detail(data) {
  return request({
    url: 'approve_key/detail',
    method: 'get',
    data
  })
}
export function approve_leave_agree(data) {
  return request({
    url: 'approve_leave/agree',
    method: 'post',
    data
  })
}
export function approve_leave_reject(data) {
  return request({
    url: 'approve_leave/reject',
    method: 'post',
    data
  })
}
export function approve_out_agree(data) {
  return request({
    url: 'approve_out/agree',
    method: 'post',
    data
  })
}
export function approve_out_reject(data) {
  return request({
    url: 'approve_out/reject',
    method: 'post',
    data
  })
}
export function approve_goods_agree(data) {
  return request({
    url: 'approve_goods/agree',
    method: 'post',
    data
  })
}
export function approve_goods_reject(data) {
  return request({
    url: 'approve_goods/reject',
    method: 'post',
    data
  })
}
export function approve_buy_agree(data) {
  return request({
    url: 'approve_buy/agree',
    method: 'post',
    data
  })
}
export function approve_buy_reject(data) {
  return request({
    url: 'approve_buy/reject',
    method: 'post',
    data
  })
}
export function approve_key_agree(data) {
  return request({
    url: 'approve_key/agree',
    method: 'post',
    data
  })
}
export function approve_key_reject(data) {
  return request({
    url: 'approve_key/reject',
    method: 'post',
    data
  })
}
export function approve_leavegetFlowMember(data) {
  return request({
    url: 'approve_leave/getFlowMember',
    method: 'get',
    data
  })
}
export function approve_outgetFlowMember(data) {
  return request({
    url: 'approve_out/getFlowMember',
    method: 'get',
    data
  })
}
export function approve_goodsgetFlowMember(data) {
  return request({
    url: 'approve_goods/getFlowMember',
    method: 'get',
    data
  })
}
export function approve_keygetFlowMember(data) {
  return request({
    url: 'approve_key/getFlowMember',
    method: 'get',
    data
  })
}