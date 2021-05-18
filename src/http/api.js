import {get, post} from './http'

let baseUrl = '/api'

export default {
  queryUserList (params) {
    return post(baseUrl + '/user/selectAllUser', params)
  },

  deleteUserList (params) {
    return post(baseUrl + '/user/deleteUser', params)
  },

  updateUserList (params) {
    return post(baseUrl + '/user/updateUser', params)
  },

  insertUserList (params) {
    return post(baseUrl + '/user/addUser', params)
  },

  login (params) {
    return post(baseUrl + '/login/login', params)
  },

  logout (params) {
    return get(baseUrl + '/login/logout', params)
  },

  addRole (params) {
    return post(baseUrl + '/addRole', params)
  },

  queryRoleList (params) {
    return post(baseUrl + '/queryRole', params)
  },

  getUserInfo (params) {
    return get(baseUrl + '/user/getUserInfo', params)
  }
}
