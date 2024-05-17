<script setup lang="ts">
import useUserStore, { type SubmitLoginData } from '@/stores/model/user'
import { AesEncryption } from '@/utils/aes'
import { useDarkMode } from '@/composables'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
const { toggleDarkMode, themeConfig } = useDarkMode()

const { replace } = useRouter()
const checkRemember = ref(false)
const encryption = new AesEncryption()
const { accountLogin } = useUserStore()
const loginFromRef = ref()
const loginLoading = ref(false)
const form: SubmitLoginData = reactive({
  userName: 'admin',
  password: '123456'
})
const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
async function onSubmit() {
  loginLoading.value = true
  const data = await loginFromRef.value.validate()
  try {
    const { userName, password } = form
    await accountLogin(
      {
        userName,
        password: encryption.encryptByAES(userName + password)
      },
      () => {
        replace('/')
      }
    )
    loginLoading.value = false
  } catch (error) {
    // message.warning('登录失败')
    loginLoading.value = false
  }

  loginLoading.value = false
}
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: themeConfig,
      token: {
        colorPrimary: '#00b96b'
      }
    }"
  >
    <div class="h-100% login-container bg-#e8fcf3">
      <div class="flex justify-between h-100%">
        <div
          class="bg-white w-50% h-100% left-container flex flex-wrap rounded-tl-0 rounded-tr-41.39px rounded-br-41.39px rounded-bl-0"
        >
          <div class="w-100% h-100px flex items-center p-20px">
            <img src="@/assets/images/logo.gif" class="w-60px h-60px rounded-full mr-20px" />
            <div class="text-28px color-#333 font-bold title">后台管理系统</div>
          </div>
          <div class="mt--150px mx-auto">
            <div class="text-20px font-bold text-left mb-20px">登录</div>

            <a-form
              ref="loginFromRef"
              :model="form"
              :rules="rules"
              label-width="auto"
              style="width: 300px"
            >
              <a-form-item label="" name="userName">
                <a-input
                  v-model:value="form.userName"
                  :style="{
                    width: '100%',
                    height: '40px'
                  }"
                  clearable
                  placeholder="请输入帐号"
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item label="" name="password">
                <a-input
                  v-model:value="form.password"
                  type="password"
                  :style="{
                    width: '100%',
                    height: '40px'
                  }"
                  show-password
                  clearable
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item class="flex justify-between">
                <a-checkbox v-model:value="checkRemember" size="large">记住我</a-checkbox>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="onSubmit" :loading="loginLoading" class="w-100%">
                  登录
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div class="w-50%">
          <div class="w-70px h-50px flex items-center pr-20px cursor-pointer float-right">
            <div
              class="social-links"
              data-v-74f3ae96=""
              data-v-76aa5200=""
              data-relingo-block="true"
            >
              <a
                href="https://github.com/myltx/vue3-ts"
                title="GitHub"
                target="_blank"
                rel="noreferrer noopener"
                class="social-link"
                data-v-76aa5200=""
                data-v-72eabb9c=""
                ><i class="el-icon" style="font-size: 24px" data-v-72eabb9c=""
                  ><svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    width="1.2em"
                    height="1.2em"
                    data-v-72eabb9c=""
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
                    ></path>
                  </svg> </i
              ></a>
            </div>
            <button
              class="border-none w-full bg-transparent cursor-pointer"
              style="height: var(--ep-menu-item-height)"
              @click="toggleDarkMode"
            >
              <i class="cursor-pointer text-20px" inline-flex i="dark:ep-moon ep-sunny" />
            </button>
          </div>
          <div class="w-60% mt-20% mx-auto flex items-center justify-center">
            <img src="@/assets/images/login_bg.png" class="w-86%" />
          </div>
        </div>
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped lang="less">
.title {
  font-family: 'Athiti';
}
</style>
