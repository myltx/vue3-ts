<script setup lang="ts">
import useUserStore, { type SubmitLoginData } from '@/stores/model/user'
import { AesEncryption } from '@/utils/aes'
import { ElMessage, type FormRules } from 'element-plus'

const { replace } = useRouter()
const encryption = new AesEncryption()
const { accountLogin } = useUserStore()
const loginFromRef = ref()
const form: SubmitLoginData = reactive({
  userName: 'myltx1',
  password: '123456'
})
const rules: FormRules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
async function onSubmit() {
  console.log('submit!', form)

  await loginFromRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        const { userName, password } = form
        await accountLogin({
          userName,
          password: encryption.encryptByAES(userName + password)
        })
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        replace('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form
    ref="loginFromRef"
    :model="form"
    label-width="auto"
    :rules="rules"
    style="max-width: 600px"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
