// /设置token
export function setToken(token: string) {
  localStorage.setItem('token', token)
}

// 获取token'
export function getToken() {
  return localStorage.getItem('token')
}

// 删除 缓存信息
export function removeLocalStorage(key?: string) {
  if (key) {
    localStorage.removeItem(key)
  } else {
    const Desensitization = localStorage.getItem('Desensitization')
    localStorage.clear()
    Desensitization && localStorage.setItem('Desensitization', Desensitization)
  }
}

// 设置用户信息
export function setUserInfo(userInfo: any) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

// 获取用户信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem('userInfo') || '{}')
}

// 获取用户信息
export function getApplyInfo() {
  return JSON.parse(localStorage.getItem('applyInfo') || '{}')
}
