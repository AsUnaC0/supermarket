<template>
    <div>
        <van-nav-bar title="收货地址" left-arrow @click-left="$router.go(-1)" />
        <AddressItem></AddressItem>
</div>

</template>
<script>
import AddressItem from '@/components/AddressItem.vue'
export default {
  name: 'AddressIndex',
  components: {
    AddressItem
  },
  data () {
    return {

    }
  }
}
</script>
<style></style>
