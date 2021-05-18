import axios from 'axios'
import ElementUI from 'element-ui'
import router from '../router/index'

// 设置超时时间
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log(response, 33)
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    if (error.response.status === 302) {
      ElementUI.Message({
        type: 'warning',
        message: '请登录'
      })
      this.$store.commit('logout');
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      return Promise.reject(error)
    }
    ElementUI.Message({
      type: 'error',
      message: error.response.data.message || error.toString()
    })
    return Promise.reject(error)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      if (res.data.status === 'success') {
        resolve(res.data)
      } else {
        ElementUI.Message({
          type: 'warning',
          message: res.data.message
        })
        reject(res.data)
      }
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        console.log(res, 22)
        if (res.data.status === 'success') {
          resolve(res.data)
        } else {
          reject(res.data)
          ElementUI.Message({
            type: 'warning',
            message: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err, 11)
        reject(err)
      })
  })
}
