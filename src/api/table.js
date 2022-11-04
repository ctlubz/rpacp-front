import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

export function getListOrderInfo(params) {
  return request({
    url: '/order/orderinfo/all',
    method: 'get',
    params
  })
}

export function getListBuisInfo(params) {
  return request({
    url: '/order/buisinfo/all',
    method: 'get',
    params
  })
}
