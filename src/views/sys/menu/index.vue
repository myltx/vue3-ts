<script lang="ts" setup>
import Edit from './Edit.vue'
import { getMenuTree, getMenuTreeDetail } from '@/api/sys/menu'
interface Tree {
  label: string
  id: number | string
  children?: Tree[]
}
const detailData = ref({})
const editRef = ref()
const handleNodeClick = async (data: Tree) => {
  const result = await getMenuTreeDetail({ id: data.id })
  detailData.value = result.data || {}
  editRef.value.setFormData(detailData.value)
}

const treeData: any = ref([])
getTreeData()
async function getTreeData() {
  const data = await getMenuTree({})
  treeData.value = data?.data || {}
}
function handleAddNode() {
  editRef.value.resetForm()
}

const defaultProps = {
  children: 'children',
  label: 'label'
}
// function append(data: any) {
//   console.log(data)
// }

// function remove(node: any, data: any) {
//   console.log(node)
//   console.log(data, 'data')
// }
function handleSuccess() {
  getTreeData()
}
</script>

<template>
  <el-container>
    <el-aside width="300px" class="mr-20px p-10px h-100%">
      <div class="flex mb-10px">
        <el-button type="primary" size="small" @click="handleAddNode">添加节点</el-button>
      </div>
      <el-tree
        default-expand-all
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <!-- data -->
        <template #default="{ node }">
          <span class="custom-tree-node flex justify-between w-100%">
            <span>{{ node.label }}</span>
            <span>
              <!-- <el-icon @click.stop="append(data)" color="green"><Plus /></el-icon>
              <el-icon @click.stop="remove(node, data)" class="ml-10px" color="red"
                ><Delete
              /></el-icon> -->
            </span>
          </span>
        </template>
      </el-tree>
    </el-aside>
    <el-main>
      <Edit ref="editRef" @success="handleSuccess" />
    </el-main>
  </el-container>
</template>
