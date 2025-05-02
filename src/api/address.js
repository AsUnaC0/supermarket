import requset from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return requset.get('/address/list')
}

// 获取收获地址
export const getUserAddress = () => {
  return requset.get('/address/list')
}

// 更改默认地址
export const updateDefaultAddress = (addressId) => {
  return requset.post('/address/setDefault', {
    addressId
  })
}

// 获取默认地址id
export const getDefalutAddressid = () => requset.post('/address/defaultId')

// 修改地址
export const editAddress = (obj, id, values) => {
  return requset.post('/address/edit', {
    addressId: id,
    form: {
      name: obj.name,
      phone: obj.tel,
      region: [
        {
          label: obj.province,
          value: values[0]
        },
        {
          label: obj.city,
          value: values[1]
        }, {
          label: obj.county,
          value: values[2]
        }
      ],
      detail: obj.addressDetail
    }

  })
}

// 获取收获地址详情
export const getAddressDetail = (addressId) => {
  return requset.get('/address/detail', {
    params: {
      addressId
    }
  })
}

// 删除地址
export const deleteAddress = (addressId) => {
  return requset.post('/address/remove', { addressId })
}

// 新增收获地址
export const Addaddress = (obj, values) => {
  return requset.post('/address/add', {
    form: {
      name: obj.name,
      phone: obj.tel,
      region: [
        {
          label: obj.province,
          value: values[0]
        },
        {
          label: obj.city,
          value: values[1]
        }, {
          label: obj.county,
          value: values[2]
        }
      ],
      detail: obj.addressDetail
    }
  })
}

// 获得省市区
export const getAreaTree = () => requset.get('/region/tree')
