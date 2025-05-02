import request from '@/utils/request'

// 获取个人信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}

// 获取余额
export const getUserAssets = () => request.get('/user/assets')
