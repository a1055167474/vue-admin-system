import {get, post} from './http'

let baseUrl = '/api'

export default {
  queryUserList (params) {
    return post(baseUrl + '/dbTest/queryUser', params)
  },

  deleteUserList (params) {
    return post(baseUrl + '/dbTest/deleteUser', params)
  },

  updateUserList (params) {
    return post(baseUrl + '/dbTest/updateUser', params)
  },

  insertUserList (params) {
    return post(baseUrl + '/dbTest/insertUser', params)
  },

  login (params) {
    return post(baseUrl + '/login', params)
  },

  logout (params) {
    return get(baseUrl + '/logout', params)
  },

  addRole (params) {
    return post(baseUrl + '/addRole', params)
  },

  queryRoleList (params) {
    return post(baseUrl + '/queryRole', params)
  }
}
