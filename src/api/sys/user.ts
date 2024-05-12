import { ApiPrefixEnum } from '@/enums/httpEnum'
import { Axios } from '@/service'

export const addUser = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/register`,
    data
  })

export const updateUser = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/editUserInfo`,
    data
  })

export const deleteUser = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/delete`,
    data
  })

export const getUserList = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/getUserList`,
    data
  })

export const getUserDetail = (data: any): any =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/detail`,
    data
  })
