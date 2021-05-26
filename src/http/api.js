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
  },

  queryBookList (params) {
    return post(baseUrl + '/book/selectAllBook', params)
  },

  insertBookList (params) {
    return post(baseUrl + '/book/insertBook', params)
  },

  deleteBookList (params) {
    return get(baseUrl + '/book/deleteBookById', params)
  },

  updateBookList (params) {
    return post(baseUrl + '/book/updateBook', params)
  },

  borrowBook (params) {
    return post(baseUrl + '/borrowReturn/addBorrowBook', params)
  },

  queryBorrowReturnList(params){
    return get(baseUrl + '/borrowReturn/getBorrowList', params)
  },

  lostReportBook1(params){
    return get(baseUrl + '/borrowReturn/lostReport', params)
  },

  returnBook1 (params) {
    return post(baseUrl + '/borrowReturn/returnBook', params)
  }
}
