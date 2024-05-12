<template>
  <div>
    <div class="mb-20px">
      <a-space>
        <a-button type="primary" @click="handleAdd">新增</a-button>
        <a-button @click="getData">查询</a-button>
      </a-space>
    </div>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
            <a-popconfirm
              title="确定删除吗?"
              @confirm="hanldeDelete(record)"
              cancel-text="取消"
              ok-text="确定"
            >
              <a-button type="link" danger size="small" v-if="!record.isDef">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <Edit ref="editRef" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
import { deleteUser, getUserList } from '@/api/sys/user'
import Edit from './Edit.vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '角色名称',
    dataIndex: 'roleNames'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 120
  }
]

const editRef = ref()

const dataSource = ref([])
const loading = ref(false)

getData()
async function getData() {
  const data: any = await getUserList({})
  console.log(data)
  dataSource.value = data?.data || []
}

function handleAdd() {
  editRef.value.showDrawer()
}
function handleEdit(record: any) {
  editRef.value.showDrawer(record)
}
function handleSuccess() {
  message.success('操作成功')
  getData()
}
async function hanldeDelete(record: any) {
  try {
    await deleteUser({ id: record.id })
    message.success('删除成功')
    getData()
  } catch (err) {
    message.warning('删除失败')
  }
}
</script>
