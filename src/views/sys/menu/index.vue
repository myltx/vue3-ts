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
const handleNodeClick = async (keys: number[]) => {
  console.log(keys, 'key')
  const result = await getMenuTreeDetail({ id: keys[0] })
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
  title: 'label',
  key: 'id'
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
  <a-flex>
    <div class="mr-20px p-10px h-100% w-200px">
      <div class="flex mb-10px">
        <a-button type="primary" size="small" @click="handleAddNode">添加节点</a-button>
      </div>
      <a-tree
        default-expand-all
        :treeData="treeData"
        :fieldNames="defaultProps"
        showLine
        @select="handleNodeClick"
      >
        <!-- <template #default="{ node }">
          <span class="custom-tree-node flex justify-between w-100%">
            <span>{{ node.label }}</span>
            <span>
              <a-icon @click.stop="append(data)" color="green"><Plus /></a-icon>
              <a-icon @click.stop="remove(node, data)" class="ml-10px" color="red"
                ><Delete
              /></a-icon>
            </span>
          </span>
        </template> -->
      </a-tree>
    </div>
    <div>
      <Edit ref="editRef" @success="handleSuccess" />
    </div>
  </a-flex>
</template>
