<template>
  <a-drawer v-model:open="open" destroyOnClose title="新增" placement="right">
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="id" name="id" v-show="false">
        <a-input v-model:value="formState.id" />
      </a-form-item>
      <a-form-item ref="name" required label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" />
      </a-form-item>
      <a-form-item ref="name" required label="角色编码" name="roleCode">
        <a-input v-model:value="formState.roleCode" :disabled="!!formState.id" />
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
import { addRole, updateRole } from '@/api/sys/role'
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue'

const emits = defineEmits(['success'])
const formRef = ref()
const open = ref<boolean>(false)
const formState = ref({
  id: '',
  roleName: '',
  roleCode: ''
})
const rules: Record<string, Rule[]> = {
  roleName: [{ required: true, message: '角色名称不能为空', trigger: 'change' }],
  roleCode: [{ required: true, message: '角色编码不能为空', trigger: 'change' }]
}

const showDrawer = (data: any) => {
  formState.value = {
    id: '',
    roleName: '',
    roleCode: ''
  }
  if (data) {
    setForm(data)
  }
  open.value = true
}
function handleSubmit() {
  const requestFn = formState.value.id ? updateRole : addRole
  formRef.value
    .validate()
    .then(async () => {
      await requestFn(formState.value)
      formRef.value.resetFields()
      emits('success')
      open.value = false
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

function setForm(data: any) {
  Object.assign(formState.value, data)
}
defineExpose({
  showDrawer
})
</script>
