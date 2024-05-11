import { removeLocalStorage } from '@/utils'
import { TIMEOUT, OTHER, NOLOGIN } from './error-code'
import { message,Modal } from 'ant-design-vue'

const LOGIN_OUT_PATH = '/login'

// 成功处理函数
export function handleSuccess(res: any, resolve: Function) {
  const data: any = res.data
  if (data.success == false) {
    // 未登录
    if (NOLOGIN.includes(data.code)) {
      Modal.info({
        content:data.msg || data.message,
        onOk() {
          removeLocalStorage()
          window.location.hash = LOGIN_OUT_PATH
        },
      });
    } else {
      const msg: any = data.msg || data.message
      message.warning(msg)
    }
  }
  resolve(data)
}

// 失败处理函数
export function handleError(error: any, reject: Function) {
  console.log(error, 'error')
  console.log(error.response)
  if (error.code == TIMEOUT) {
    message.error('请求超时')
  } else if (error.response && error.response.data) {
    if (error.response.status === 500) {
      message.error(error.response.data)
    }
    if (NOLOGIN.includes(error.response.data.code)) {
      Modal.info({
        content:error.response.data.errorMsg || error.response.data.msg,
        onOk() {
          removeLocalStorage()
          window.location.hash = LOGIN_OUT_PATH
        },
      });
    } else {
      const resData = error.response.data
      if (OTHER.includes(resData.code)) {
        Modal.info({
          content:error.response.data.errorMsg || error.response.data.msg,
          onOk() {
            removeLocalStorage()
            window.location.hash = LOGIN_OUT_PATH
          },
        });
      } else if (resData.msg) {
        message.warning(resData.msg)
      } else if (resData.message) {
        message.warning(resData.message)
        window.location.hash = LOGIN_OUT_PATH
      }
    }
  } else if (error.message || error.msg) {
    message.warning(error.message || error.msg)
  }
  reject(error)
}
