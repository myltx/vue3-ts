import { getMenuTreeByUserAndRole } from '@/api/sys/menu'

export async function getMenuTree() {
  const data = await getMenuTreeByUserAndRole({})
  console.log(data)
}
