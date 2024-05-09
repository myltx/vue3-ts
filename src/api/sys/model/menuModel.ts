import { request } from '@/utils/http/axios'

export interface RouteItem {
  path: string
  component: any
  meta: any
  name?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteItem[]
}

/**
 * @description: Get menu return value
 */
export type GetMenuListResultModel = RouteItem[]

enum Api {
  GetMenuList = '/getMenuList'
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => request.get<GetMenuListResultModel>({ url: Api.GetMenuList })
