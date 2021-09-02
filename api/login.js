import request from '../utils/api.js'

export function sendLogin(data) {
  return request({
    url: 'third/wechatMiniProgram',
    method: 'get',
    data
  })
}
export function myProfile(data) {
  return request({
    url: 'member/myProfile',
    method: 'get',
    data
  })
}
export function changeProfile(data) {
  return request({
    url: 'member/changeProfile',
    method: 'post',
    data
  })
}
export function sendCode(data) {
  return request({
    url: 'member/sendCode',
    method: 'get',
    data
  })
}
export function changeMobile(data) {
  return request({
    url: 'member/changeMobile',
    method: 'post',
    data
  })
}
export function project(data) {
  return request({
    url: 'member/project',
    method: 'post',
    data
  })
}
export function owner(data) {
  return request({
    url: 'member/owner',
    method: 'post',
    data
  })
}
export function getOwner(data) {
  return request({
    url: 'member/getOwner',
    method: 'get',
    data
  })
}
export function logout(data) {
  return request({
    url: 'member/logout',
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: 'member/login',
    method: 'get',
    data
  })
}