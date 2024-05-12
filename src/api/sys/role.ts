import { ApiPrefixEnum } from '@/enums/httpEnum'
import { Axios } from '@/service'

export const addRole = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.ROLE}/add`,
    data
  })

export const updateRole = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.ROLE}/update`,
    data
  })

export const deleteRole = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.ROLE}/delete`,
    data
  })

export const getRoleList = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.ROLE}/list`,
    data
  })

export const getRoleDetail = (data: any): any =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.ROLE}/detail`,
    data
  })
