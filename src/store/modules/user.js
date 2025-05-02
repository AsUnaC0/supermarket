import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo(),
      money: 0
    }
  },
  mutations: {
    //   所有mutation的第一个参数，都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setMoney (state, amount) {
      state.money = amount
    }
  },
  actions: {
    logout (context) {
      // 清除用户信息
      context.commit('setUserInfo', {})
      // 清除购物车 跨模块调用mutation,调用cart模块的mutation
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
