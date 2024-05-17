import { getMenuTreeByUserAndRole } from '@/api/sys/menu'

getMenuTree()
async function getMenuTree() {
  const data = await getMenuTreeByUserAndRole({})
  console.log(data)
}

