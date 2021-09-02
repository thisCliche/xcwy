import request from '../utils/api.js'

export function appointmentList(data) {
  return request({
    url: 'booking/appointmentList',
    method: 'get',
    data
  })
}
export function project(data) {
  return request({
    url: 'booking/project',
    method: 'get',
    data
  })
}
export function appointmentDetail(data) {
  return request({
    url: 'booking/appointmentDetail',
    method: 'get',
    data
  })
}
export function add(data) {
  return request({
    url: 'booking/add',
    method: 'post',
    data
  })
}

export function invitation(data) {
  return request({
    url: 'invitation/invitation',
    method: 'get',
    data
  })
}
export function invitationAdd(data) {
  return request({
    url: 'invitation/add',
    method: 'post',
    data
  })
}
export function visitorList(data) {
  return request({
    url: 'invitation/visitorList',
    method: 'get',
    data
  })
}
export function inviteDetail(data) {
  return request({
    url: 'invitation/inviteDetail',
    method: 'get',
    data
  })
}