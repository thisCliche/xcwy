import request from '../utils/api.js'

export function index(data) {
  return request({
    url: 'fee/index',
    method: 'get',
    data
  })
}
export function waterRecord(data) {
  return request({
    url: 'fee/waterRecord',
    method: 'get',
    data
  })
}
export function waterDetail(data) {
  return request({
    url: 'fee/waterDetail',
    method: 'get',
    data
  })
}

export function propertyRecord(data) {
  return request({
    url: 'fee/propertyRecord',
    method: 'get',
    data
  })
}
export function propertyDetail(data) {
  return request({
    url: 'fee/propertyDetail',
    method: 'get',
    data
  })
}
export function electricRecord(data) {
  return request({
    url: 'fee/electricRecord',
    method: 'get',
    data
  })
}
export function electricDetail(data) {
  return request({
    url: 'fee/electricDetail',
    method: 'get',
    data
  })
}
export function rentRecord(data) {
  return request({
    url: 'fee/rentRecord',
    method: 'get',
    data
  })
}
export function rentDetail(data) {
  return request({
    url: 'fee/rentDetail',
    method: 'get',
    data
  })
}
export function record(data) {
  return request({
    url: 'fee_car/record',
    method: 'get',
    data
  })
}
export function buildDetail(data) {
  return request({
    url: 'fee/buildDetail',
    method: 'get',
    data
  })
}
export function buildRecord(data) {
  return request({
    url: 'fee/buildRecord',
    method: 'get',
    data
  })
}
export function buildOrder(data) {
  return request({
    url: 'fee/buildOrder',
    method: 'post',
    data
  })
}