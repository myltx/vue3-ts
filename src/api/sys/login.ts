import { ApiPrefixEnum } from '@/enums/httpEnum'
import { Axios } from '@/service'

export const login = (data: any) =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/login`,
    data
  })

export const getUserInfo = () =>
  Axios({
    method: 'post',
    url: `${ApiPrefixEnum.USER}/getUserInfo`,
  })
