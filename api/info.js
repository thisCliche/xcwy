import request from '../utils/api.js'

export function newsList(data) {
  return request({
    url: 'info/my',
    method: 'get',
    data
  })
}
export function fee_carDel(data) {
  return request({
    url: 'fee_car/del',
    method: 'post',
    data
  })
}
export function visitor(data) {
  return request({
    url: 'index/visitor',
    method: 'get',
    data
  })
}
export function detail(data) {
  return request({
    url: 'info/detail',
    method: 'get',
    data
  })
}
export function fee_carList(data) {
  return request({
    url: 'fee_car/list',
    method: 'get',
    data
  })
}
export function fee_carAdd(data) {
  return request({
    url: 'fee_car/add',
    method: 'post',
    data
  })
}
export function fee_carRecord(data) {
  return request({
    url: 'fee_car/record',
    method: 'get',
    data
  })
}
export function fee_carDetail(data) {
  return request({
    url: 'fee_car/detail',
    method: 'get',
    data
  })
}
export function pay(data) {
  return request({
    url: 'app/pay',
    method: 'post',
    data
  })
}

