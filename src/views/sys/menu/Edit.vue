<script setup lang="ts">
import { ResourceTypeEnum } from '@/enums/biz/authority'
import { message, Modal } from 'ant-design-vue'
import { iconNameList } from '../../../main'
import { addMenu, deleteMenu, getMenuTree, updateMenu } from '@/api/sys/menu'

const router = useRouter()
const emits = defineEmits(['success'])

const ruleFormRef = ref()
let ruleForm: any = reactive({
  parentId: undefined,
  label: '',
  resourceType: ResourceTypeEnum.MENU,
  state: 1,
  isGeneral: 0,
  isShow: 1,
  sortValue: 0,
  path: '',
  component: '',
  icon: '',
  describe: ''
})
const treeData: any = ref([])

const rules = reactive({})
const submitForm = () => {
  const requestFn = ruleForm?.id ? updateMenu : addMenu
  ruleFormRef.value
    .validate()
    .then(async () => {
      const data: any = await requestFn(ruleForm)
      if (data.success) {
        message.success('提交成功')

        ruleFormRef.value?.resetFields()
        getTree()
        emits('success')
      }
    })
    .catch((error: any) => {
    })
}
function resetForm() {
  ruleFormRef.value?.resetFields()
}
const goBack = () => {
  router.go(-1)
}

function handleIcon(icon: string) {
  ruleForm.icon = icon
}
getTree()
async function getTree() {
  const data: any = await getMenuTree({})
  treeData.value = data?.data || []
}
async function deleteMenuNode() {
  Modal.confirm({
    content: '选中节点及其子结点将被永久删除, 是否确定删除？',
    async onOk() {
      const data: any = await deleteMenu({ id: ruleForm.id })
      console.log(data)
      if (data.success) {
        message.success('删除成功')
        ruleFormRef.value?.resetFields()
        getTree()
        emits('success')
      }
    },
    onCancel() {
      console.log('Cancel')
    },
    class: 'test'
  })
}
function setFormData(data: any) {
  ruleForm = Object.assign(ruleForm, data)
}
defineExpose({
  setFormData,
  resetForm
})
</script>
<template>
  <a-form
    ref="ruleFormRef"
    style="width: 400px"
    :label-col="{ style: { width: '150px' } }"
    :model="ruleForm"
    :rules="rules"
  >
    <a-form-item label="id" name="id" v-show="false">
      <a-input v-model:value="ruleForm.id" allowClear style="width: 100%" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="上级菜单" name="parentId">
      <a-tree-select
        v-model:value="ruleForm.parentId"
        :tree-data="treeData"
        :render-after-expand="false"
        check-strictly
        :fieldNames="{ value: 'id' }"
        placeholder="请选择"
        allowClear
        :disabled="ruleForm.id"
      />
    </a-form-item>
    <a-form-item label="名称" required name="label">
      <a-input v-model:value="ruleForm.label" allowClear placeholder="请输入" />
    </a-form-item>
    <a-form-item label="类型" name="resourceType">
      <a-radio-group v-model:value="ruleForm.resourceType" class="ml-4">
        <a-radio :value="ResourceTypeEnum.MENU" size="large">菜单</a-radio>
        <a-radio :value="ResourceTypeEnum.DATA" size="large">数据</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="状态" name="state">
      <a-switch
        v-model:checked="ruleForm.state"
        :checkedValue="1"
        :unCheckedValue="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :checkedChildren="'启用'"
        :unCheckedChildren="'禁用'"
      />
    </a-form-item>
    <a-form-item label="通用菜单" name="isGeneral">
      <a-switch
        v-model:checked="ruleForm.isGeneral"
        :checkedValue="1"
        :unCheckedValue="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :checkedChildren="'是'"
        :unCheckedChildren="'否'"
      />
    </a-form-item>
    <a-form-item label="是否显示" name="isShow">
      <a-switch
        v-model:checked="ruleForm.isShow"
        :checkedValue="1"
        :unCheckedValue="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :checkedChildren="'是'"
        :unCheckedChildren="'否'"
      />
    </a-form-item>
    <a-form-item label="排序" name="sortValue">
      <a-input-number v-model:value="ruleForm.sortValue" min="0" allowClear placeholder="请输入" />
    </a-form-item>
    <a-form-item label="地址栏路径" name="path" tooltip="前浏览器地址栏 # 号后的路径">
      <a-input v-model:value="ruleForm.path" allowClear placeholder="请输入" />
    </a-form-item>
    <a-form-item label="页面路径" name="component" tooltip="前端项目src/views后的页面路径">
      <a-input
        v-model:value="ruleForm.component"
        addon-before="@/views"
        allowClear
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="菜单图标" name="icon">
      <a-input v-model:value="ruleForm.icon" allowClear placeholder="请输入/选择">
        <template #addonAfter>
          <a-popover placement="top" trigger="click">
            <AppstoreOutlined />
            <template #content>
              <div class="h-200px w-200px overflow-y-auto grid grid-cols-5">
                <div
                  v-for="icon in iconNameList"
                  :key="icon"
                  class="cursor-pointer h-35px text-20px"
                >
                  <a-tooltip class="box-item" effect="dark" :content="icon" placement="top">
                    <a-icon @click="handleIcon(icon)">
                      <component :is="icon"></component>
                    </a-icon>
                  </a-tooltip>
                </div>
              </div>
            </template>
          </a-popover>
        </template>
      </a-input>
    </a-form-item>
    <a-form-item label="描述" name="describe">
      <a-textarea
        v-model:value="ruleForm.describe"
        placeholder="请输入/选择"
        :autosize="{ minRows: 2, maxRows: 6 }"
        showCount
        allowClear
        :maxlength="200"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="submitForm"> 保存 </a-button>
        <a-button @click="resetForm">重置</a-button>
        <a-button type="default" @click="deleteMenuNode" v-if="ruleForm.id">删除</a-button>
        <a-button @click="goBack">返回</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less"></style>
