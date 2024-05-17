import { login, getUserInfo } from '@/api/sys/login'
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { setToken, setUserInfo } from '@/utils'

export interface SubmitLoginData {
  userName: string
  password: string
}

const useUserStore = defineStore('useUSerStore', () => {
  const userInfo = ref({})
  const token = ref('')
  async function accountLogin(data: SubmitLoginData, callBack: Function) {
    const loginData: any = await login(data)
    token.value = loginData.data.token
    setToken(loginData.data.token)
    handleSuccess(callBack)
  }
  async function handleSuccess(callBack) {
    try {
      const userInfo: any = await getUserInfo()
      userInfo.value = userInfo.data
      setUserInfo(userInfo?.data)
      message.success('登录成功')
      callBack && callBack()
    } catch (err) {
      // message.warning('登录失败')
    }
  }
  return {
    accountLogin,
    userInfo,
    token
  }
})

export default useUserStore
