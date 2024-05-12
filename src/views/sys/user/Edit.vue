<template>
  <a-drawer v-model:open="open" destroyOnClose title="新增" placement="right">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ style: { width: '120px' } }"
    >
      <a-form-item label="id" name="id" v-show="false">
        <a-input v-model:value="formState.id" />
      </a-form-item>
      <a-form-item required label="用户名" name="userName" tooltip="也是作为账号登录的不可以修改">
        <a-input
          v-model:value="formState.userName"
          placeholder="请输入用户名称"
          :disabled="!!formState.id"
        />
      </a-form-item>
      <a-form-item label="用户昵称" name="nikeName">
        <a-input v-model:value="formState.nikeName" placeholder="请输入用户名称" />
      </a-form-item>
      <!-- <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item label="确认密码" name="password">
        <a-input v-model:value="formState.nikeName" placeholder="请输入用户名称" />
      </a-form-item> -->
      <a-form-item required label="用户角色" name="roleCode">
        <a-select
          ref="select"
          v-model:value="formState.roleCode"
          mode="multiple"
          placeholder="请选择"
          :max-tag-count="2"
        >
          <a-select-option :value="role.roleCode" v-for="role in roleList" :key="role.roleCode">
            {{ role.roleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="个性签名" name="signature">
        <a-textarea
          v-model:value="formState.signature"
          placeholder="请输入"
          :autosize="{ minRows: 2, maxRows: 6 }"
          showCount
          allowClear
          :maxlength="200"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space class="float-right">
        <a-button @click="open = false">取消</a-button>
        <a-button type="primary" @click="handleSubmit">确定</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { getRoleList } from '@/api/sys/role'
import { addUser, updateUser } from '@/api/sys/user'
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'

interface RoleData {
  id: string
  roleName: string
  roleCode: string
}
const emits = defineEmits(['success'])
const formRef = ref()
const open = ref<boolean>(false)
const roleList = ref<RoleData[]>([])
const formState = ref<any>({
  id: '',
  userName: '',
  roleCode: undefined,
  nikeName: '',
  signature: '',
  registerType: '2',
  password: '123456'
})
const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
  roleCode: [{ required: true, message: '角色不能为空', trigger: 'change' }]
}

const showDrawer = (data: any) => {
  formState.value = {
    id: '',
    userName: '',
    roleCode: undefined,
    nikeName: '',
    signature: '',
    registerType: '2',
    password: '123456'
  }
  if (data) {
    setForm(data)
  }
  open.value = true
}
function handleSubmit() {
  const requestFn = formState.value.id ? updateUser : addUser
  formRef.value
    .validate()
    .then(async () => {
      const submitData = Object.assign({}, formState.value)
      submitData.roleCode = submitData.roleCode.join(',')

      await requestFn(submitData)
      formRef.value.resetFields()
      emits('success')
      open.value = false
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

getData()
async function getData() {
  const data: any = await getRoleList({})
  roleList.value = data?.data || []
}

function setForm(data: any) {
  Object.assign(formState.value, data)
}
defineExpose({
  showDrawer
})
</script>
