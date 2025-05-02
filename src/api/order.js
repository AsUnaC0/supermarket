import request from '@/utils/request'

// 提供订单结算接口
// mode:cart =>obj {cartIds}
// mode:buynow =>obj {goodsId,goodsNum,goodSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10, // 10快递配送 20门店自提
      couponId: 0, // 优惠券id 传0就是不使用
      isUsePoints: 0, // 是否使用积分 0不使用
      ...obj // 其他参数
    }
  })
}

// 提交订单
// 提供订单结算接口
// mode:cart =>obj {cartIds,remark(用户留言)}
// mode:buynow =>obj {goodsId,goodsNum,goodSkuId,remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10快递配送 20门店自提
    couponId: 0, // 优惠券id 传0就是不使用
    isUsePoints: 0, // 是否使用积分 0不使用
    payType: 10, // 余额支付
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page // list
    }
  })
}

// 取消订单
export const cancelMyorder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
