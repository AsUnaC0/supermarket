<template>
    <div>
        <van-nav-bar title="收货地址" left-arrow @click-left="$router.go(-1)" />
        <van-address-edit
    ref="address"
  :area-list="areaList"
  show-delete
  show-set-default
  show-search-result
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  :address-info="addressInfo"
  @save="onSave"
  @delete="onDelete"
/>
    </div>

</template>
<script>
import { areaList } from '@vant/area-data'
import { getAddressDetail, getAreaTree, editAddress, updateDefaultAddress, deleteAddress, Addaddress } from '@/api/address'
export default {
  name: 'EditAddress',
  data () {
    return {
      areaList,
      addressInfo: {},
      addressId: '',
      addressValue: '', // 黑马的地址码
      hmCode: [1, 1, 1]// 保存找的的黑马的码
    }
  },
  methods: {
    async onSave (content) {
      if (this.addressId) {
        // 如果是修改地址
        this.findHmcodeByname(this.addressValue, content)
        if (content.isDefault) {
          updateDefaultAddress(this.addressId)
        }
        await editAddress(content, this.addressId, this.hmCode)
        this.$toast('修改地址成功')
        this.$router.go(-1)
        return
      }
      // 如果是新增地址
      this.findHmcodeByname(this.addressValue, content)
      await Addaddress(content, this.hmCode)

      this.$toast('新增地址成功')
      this.$router.go(-1)
    },
    async onDelete () {
      const addressId = parseInt(this.addressId)
      await deleteAddress(addressId)
      this.$router.go(-1)
      this.$toast('delete')
    },
    // 按名字找组件的areaList的对应的城市行政码
    findAreaCodeByName (areaList, targetName) {
      // 1. 在 county_list 中查找（区县级）
      for (const [code, name] of Object.entries(areaList.county_list)) {
        if (name.includes(targetName)) return code
      }
      // 2. 如果在 county_list 找不到，继续在 city_list 或 province_list 查找
      for (const [code, name] of Object.entries(areaList.city_list)) {
        if (name.includes(targetName)) return code
      }
      for (const [code, name] of Object.entries(areaList.province_list)) {
        if (name.includes(targetName)) return code
      }
      return null // 未找到
    },
    // 按名字找黑马的城市对应码
    findHmcodeByname (list, name) {
      const { province, city, county } = name
      // 如果是直辖市，没有省份
      if (province === city) {
        Object.values(list).forEach(value => {
          if (province.includes(value.name)) {
            this.hmCode[0] = value.id
            this.hmCode[1] = value.id + 1
            const regionList = Object.values(value.city)[0].region
            Object.values(regionList).forEach(value => {
              if (value.name === county) {
                this.hmCode[2] = value.id
              }
            })
          }
        })
      } else {
        Object.values(list).forEach(value => {
          if (value.name.includes(province)) {
            this.hmCode[0] = value.id
            Object.values(value.city).forEach(value => {
              if (value.name.includes(city)) {
                this.hmCode[1] = value.id
                Object.values(value.region).forEach(value => {
                  if (value.name.includes(county)) {
                    this.hmCode[2] = value.id
                  }
                })
              }
            })
          }
        })
      }
    }
  },
  async created () {
    // 黑马的地址码
    const list = await getAreaTree()
    this.addressValue = list.data.list

    if (!this.$route.params.id) {
      return
    }
    // 获取编辑哪个地址数据
    const addressId = this.$route.params.id
    this.addressId = addressId
    // 获得地址详情
    const res = await getAddressDetail(addressId)
    // 反向查询areacode
    const region = res.data.detail.region.region

    const areaCode = this.findAreaCodeByName(this.areaList, region)

    // 默认数据回显
    this.addressInfo = {
      id: res.data.detail.address_id,
      name: res.data.detail.name,
      tel: res.data.detail.phone,
      province: res.data.detail.region.province,
      city: res.data.detail.region.city,
      county: res.data.detail.region.region,
      addressDetail: res.data.detail.detail,
      areaCode,
      isDefault: true
    }
  }

}
</script>
