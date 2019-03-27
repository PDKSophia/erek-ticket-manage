import axios from 'axios'
import { Message } from 'iview'
import { getAuthorityToken } from 'js/utils/vue-token'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  // 弹窗通知报错
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * 封装的请求函数
 * @param  {string} url
 * @param  {object} [option]
 * @return {object}
 */
export default function request(option) {
  const options = {
    ...option
  }
  const defaultOptions = {
    credentials: 'include'
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        xAutToken: getAuthorityToken(),
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.data = newOptions.data ? JSON.parse(JSON.stringify(newOptions.data)) : {}
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        xAutToken: getAuthorityToken(),
        ...newOptions.headers
      }
    }
  } else {
    newOptions.headers = {
      Accept: 'application/json',
      xAutToken: getAuthorityToken(),
      ...newOptions.headers
    }
  }

  return axios(newOptions)
    .then(checkStatus)
    .then(response => {
      var res = response.data
      if (res.code === 1) {
        return res.data
      } else {
        Message.error({
          content: res.msg,
          duration: 1.5
        })
      }
    })
    .catch(err => {
      let status = err.name
      if (status === 401) {
        console.log('未经授权, 错误码:', status)
      }
      if (status === 403) {
        console.log('禁止访问, 错误码:', status)
      }
      if (status <= 504 && status >= 500) {
        console.log('服务器错误, 错误码:', status)
      }
      if (status >= 404 && status < 422) {
        console.log('找不到资源路径, 错误码 :', status)
      }
    })
}
