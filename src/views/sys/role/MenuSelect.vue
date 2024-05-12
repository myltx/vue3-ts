<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { getMenuTree } from '@/api/sys/menu'
import { updateRole } from '@/api/sys/role'

const emits = defineEmits(['success'])
const open = ref(false)
const treeData: any = ref([])

const selectedKeys = ref<string[]>([])
const detailData = ref({
  id: '',
  menuId: []
})

const defaultProps = {
  children: 'children',
  title: 'label',
  key: 'id'
}
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})

async function getTree() {
  const data: any = await getMenuTree({})
  treeData.value = data?.data || []
}
const showDrawer = (data: any) => {
  detailData.value = data
  open.value = true
  getTree()
}
async function handleSubmit() {
  if (!detailData.value?.id) {
    message.warning('请选择角色')
    return
  }
  await updateRole(detailData.value)
  emits('success')
  open.value = false;
}

defineExpose({
  showDrawer
})
</script>
<template>
  <a-drawer v-model:open="open" destroyOnClose title="新增" placement="right">
    <a-tree
      v-model:selectedKeys="detailData.menuId"
      v-model:checkedKeys="detailData.menuId"
      checkable
      :tree-data="treeData"
      :fieldNames="defaultProps"
    >
      <template #title="{ label, key }">
        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ label }}</span>
        <template v-else>{{ label }}</template>
      </template>
    </a-tree>

    <template #footer>
      <a-space class="float-right">
        <a-button @click="open = false">取消</a-button>
        <a-button type="primary" @click="handleSubmit">确定</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<style></style>
