import { ElMessage } from 'element-plus'
import { login, getUserInfo } from '@/api/sys/login'
import { defineStore } from 'pinia'
import { setToken, setUserInfo } from '@/utils'

export interface SubmitLoginData {
  userName: string
  password: string
}

const useUserStore = defineStore('useUSerStore', () => {
  const userInfo = ref({})
  const token = ref('')
  async function accountLogin(data: SubmitLoginData) {
    try {
      const loginData: any = await login(data)
      token.value = loginData.data.token
      setToken(loginData.data.token)
      handleSuccess()
    } catch (error) {
      ElMessage({
        message: '登录失败',
        type: 'warning'
      })
    }
  }
  async function handleSuccess() {
    const userInfo: any = await getUserInfo()
    userInfo.value = userInfo.data
    setUserInfo(userInfo?.data)
  }
  return {
    accountLogin,
    userInfo,
    token
  }
})

export default useUserStore
