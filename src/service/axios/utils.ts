import { removeLocalStorage } from '@/utils'
import { TIMEOUT, OTHER, NOLOGIN } from './error-code'
import { ElMessage, ElMessageBox } from 'element-plus'

const LOGIN_OUT_PATH = '/login'

// 成功处理函数
export function handleSuccess(res: any, resolve: Function) {
  const data: any = res.data
  console.log(data)
  if (data.success == false) {
    // 未登录
    if (NOLOGIN.includes(data.code)) {
      ElMessageBox.alert(data.msg || data.message, '', {
        confirmButtonText: '确定',
      }).then(() => {
        removeLocalStorage()
        window.location.hash = LOGIN_OUT_PATH
      })
    } else {
      const msg: any = data.msg || data.message
      ElMessage({
        message: msg,
        type: 'warning'
      })
    }
  }
  resolve(data)
}

// 失败处理函数
export function handleError(error: any, reject: Function) {
  console.log(error, 'error')
  console.log(error.response)
  if (error.code == TIMEOUT) {
    ElMessage({
      message: '请求超时',
      type: 'error'
    })
  } else if (error.response && error.response.data) {
    if (error.response.status === 500) {
      ElMessage({
        message: error.response.data,
        type: 'error'
      })
    }
    if (NOLOGIN.includes(error.response.data.code)) {
      ElMessageBox.alert(error.response.data.errorMsg || error.response.data.msg, '',{
        confirmButtonText: '确定',
      }).then(() => {
        removeLocalStorage()
        window.location.hash = LOGIN_OUT_PATH
      })
    } else {
      const resData = error.response.data

      if (OTHER.includes(resData.code)) {
        ElMessageBox.alert(resData.msg || resData.message, '',{
          confirmButtonText: '确定',
        }).then(() => {
          removeLocalStorage()
          window.location.hash = LOGIN_OUT_PATH
        })
      } else if (resData.msg) {
        ElMessage({
          message: resData.msg,
          type: 'warning'
        })
      } else if (resData.message) {
        ElMessage({
          message: resData.message,
          type: 'warning'
        })
        window.location.hash = LOGIN_OUT_PATH
      }
    }
  } else if (error.message || error.msg) {
    ElMessage({
      message: error.message || error.msg,
      type: 'warning'
    })
  }
  reject(error)
}
