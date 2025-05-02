<template>
    <van-address-list
  v-model="chosenAddressId"
  :list="list"
  @add="onAdd"
  @edit="onEdit"
/>

</template>
<script>
import { getUserAddress, updateDefaultAddress, getDefalutAddressid } from '@/api/address'
export default {
  name: 'AddressItem',
  data () {
    return {
      isFirst: true, // 是否为第一次进页面，防止一进页面就显示默认地址选择成功弹窗
      chosenAddressId: '',
      list: [],
      defaultAddressId: ''
    }
  },
  async created () {
    this.defaultAddressId = await (await getDefalutAddressid()).data.defaultId
    this.chosenAddressId = this.defaultAddressId
    await this.getAddress()
    this.addressId = this.$route.params.id
    this.listSort()
  },
  methods: {
    onAdd () {
      this.$router.push(
        {
          name: 'EditAddress', // 使用路由名称
          params: { id: 0 }// 传递参数
        }
      )
      this.$toast('新增地址')
    },
    onEdit (item) {
      this.$router.push(
        {
          name: 'EditAddress', // 使用路由名称
          params: { id: item.id }// 传递参数
        }
      )
    },
    // 拿取地址数据
    async getAddress () {
      const { data: { list } } = await getUserAddress()

      list.forEach(item => {
        const address = {
          id: item.address_id,
          name: item.name,
          tel: item.phone,
          address: item.region.province + item.region.city + item.region.region + item.detail,
          isDefault: item.address_id === this.defaultAddressId
        }

        this.list.push(address)
      })
    },
    // 将isdefalut=true的排在list的第一位
    listSort () {
      this.list.forEach((address, index) => {
        if (address.isDefault === true) {
          this.list.splice(index, 1)
          this.list.unshift(address)
        }
      })
    }

  },
  watch: {
    // 选择哪个作为默认地址
    async chosenAddressId (val) {
      if (this.isFirst) {
        this.isFirst = false
        return
      }
      const id = String(val)
      //   发送请求更改默认地址
      await updateDefaultAddress(id)
      this.$toast('修改默认地址成功')
    }
  }
}

</script>
<style></style>
