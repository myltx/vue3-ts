<script setup lang="ts">
import { ResourceTypeEnum } from '@/enums/biz/authority'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { iconNameList } from '../../../main'
import { addMenu, deleteMenu, getMenuTree, updateMenu } from '@/api/sys/menu'

const router = useRouter()
const emits = defineEmits(['success'])

const ruleFormRef = ref<FormInstance>()
let ruleForm: any = reactive({
  parentId: '',
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

const rules = reactive<FormRules<typeof ruleForm>>({})
const submitForm = (formEl: FormInstance | undefined) => {
  const requestFn = ruleForm?.id ? updateMenu : addMenu
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const data: any = await requestFn(ruleForm)
      if (data.success) {
        ElMessage({
          message: '提交成功',
          type: 'success'
        })
        ruleFormRef.value?.resetFields()
        getTree()
        emits('success')
      }
      return Promise.resolve(data)
    } else {
      console.log('error submit!')
      return Promise.reject('必填项未填写完全')
    }
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
  ElMessageBox.confirm('选中节点及其子结点将被永久删除, 是否确定删除？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const data: any = await deleteMenu({ id: ruleForm.id })
      console.log(data)
      if (data.success) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
        ruleFormRef.value?.resetFields()
        getTree()
        emits('success')
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
function underscoreToCamel(str: string) {
  return str.replace(/_([a-z])/g, function (match: any, letter: any) {
    return letter.toUpperCase()
  })
}
function setFormData(data: any) {
  for (const key in data) {
    data[underscoreToCamel(key)] = data[key]
    const regex = /_/
    if (regex.test(key)) {
      delete data[key]
    }
  }
  ruleForm = Object.assign(ruleForm, data)
}
defineExpose({
  setFormData,
  resetForm
})
</script>
<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    label-suffix="："
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="id" prop="id" v-show="false">
      <el-input v-model="ruleForm.id" clearable />
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentId">
      <el-tree-select
        v-model="ruleForm.parentId"
        :data="treeData"
        :render-after-expand="false"
        check-strictly
        :props="{ value: 'id' }"
        placeholder="请选择"
        clearable
        :disabled="ruleForm.id"
      />
    </el-form-item>
    <el-form-item label="名称" prop="label">
      <el-input v-model="ruleForm.label" clearable />
    </el-form-item>
    <el-form-item label="类型" prop="resourceType">
      <el-radio-group v-model="ruleForm.resourceType" class="ml-4">
        <el-radio :value="ResourceTypeEnum.MENU" size="large">菜单</el-radio>
        <el-radio :value="ResourceTypeEnum.DATA" size="large">数据</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-switch
        v-model="ruleForm.state"
        :active-value="1"
        :inactive-value="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-text="'启用'"
        :inactive-text="'禁用'"
      />
    </el-form-item>
    <el-form-item label="通用菜单" prop="isGeneral">
      <el-switch
        v-model="ruleForm.isGeneral"
        :active-value="1"
        :inactive-value="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-text="'是'"
        :inactive-text="'否'"
      />
    </el-form-item>
    <el-form-item label="是否显示" prop="isShow">
      <el-switch
        v-model="ruleForm.isShow"
        :active-value="1"
        :inactive-value="0"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-text="'是'"
        :inactive-text="'否'"
      />
    </el-form-item>
    <el-form-item label="排序" prop="sortValue">
      <el-input v-model.number="ruleForm.sortValue" clearable />
    </el-form-item>
    <el-form-item label="地址栏路径" prop="path">
      <template #label>
        <span class="flex items-center">
          地址栏路径
          <el-tooltip effect="dark" content="浏览器地址栏 # 号后的路径" placement="top">
            <el-icon><Warning /></el-icon>
          </el-tooltip>
          ：
        </span>
      </template>
      <el-input v-model.number="ruleForm.path" clearable />
    </el-form-item>
    <el-form-item label="页面路径" prop="component">
      <template #label>
        <span class="flex items-center">
          页面路径
          <el-tooltip
            class="box-item"
            effect="dark"
            content="前端项目src/views后的页面路径"
            placement="top"
          >
            <el-icon><Warning /></el-icon>
          </el-tooltip>
          ：
        </span>
      </template>
      <el-input v-model.number="ruleForm.component" clearable>
        <template #prepend>@/views</template>
      </el-input>
    </el-form-item>
    <el-form-item label="菜单图标" prop="icon">
      <el-input v-model.number="ruleForm.icon" clearable>
        <template #append>
          <el-popover placement="top-start" title="" :width="200" trigger="click" conm>
            <template #reference>
              <el-icon class="cursor-pointer"><Grid /></el-icon>
            </template>
            <div class="h-200px overflow-y-auto grid grid-cols-5">
              <div v-for="icon in iconNameList" :key="icon" class="cursor-pointer h-35px text-20px">
                <el-tooltip class="box-item" effect="dark" :content="icon" placement="top">
                  <el-icon @click="handleIcon(icon)">
                    <component :is="icon"></component>
                  </el-icon>
                </el-tooltip>
              </div>
            </div>
          </el-popover>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="描述" prop="describe">
      <el-input
        v-model.number="ruleForm.describe"
        type="textarea"
        :rows="4"
        :autosize="false"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 保存 </el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="danger" @click="deleteMenuNode" v-if="ruleForm.id">删除</el-button>
      <el-button @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
