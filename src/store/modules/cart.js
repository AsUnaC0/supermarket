import { getCartList, changeCount, delSelect } from '@/api/cart.js'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置cartList的方法
    setCartList (state, newList) {
      state.cartList = newList
    },

    toggleCheck (state, goodsId) {
      // 让对应id项状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },

    toggleAllCheck (state, flag) {
      // 让所有小选框同步设置
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      // 让对应id项数量修改
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (goods) {
        goods.goods_num = goodsNum
      }
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      //   后台返回的数据，不包含复选框的选中状态，为了实现将来的功能
      //   需要在这里手动添加一个选中状态的属性 标记当前商品是否选中
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsId, goodsNum })

      // 在同步到后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },

    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      // 重新请求购物车列表
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods.goods_price_min * item.goods_num, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }

  }
}
