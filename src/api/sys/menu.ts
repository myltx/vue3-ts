import { ApiPrefixEnum } from '@/enums/httpEnum'
import { Axios } from '@/service'

export const addMenu = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/add`,
    data
  })

export const updateMenu = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/update`,
    data
  })

export const deleteMenu = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/delete`,
    data
  })

export const getMenuList = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/list`,
    data
  })

export const getMenuTree = (data: any): any =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/getTree`,
    data
  })

export const getMenuTreeByUserAndRole = (data: any): any =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/getTreeByUserAndRole`,
    data
  })

export const getMenuTreeDetail = (data: any): any =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.MENU}/detail`,
    data
  })
