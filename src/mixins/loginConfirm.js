export default {
  // 此处编写的是vue组件实例的配置项 通过一定语法，可以直接混入到组件内部
  // data methods computed watch 生命周期钩子等都可以使用
  //   注意点：
  // 如果此处和组件内，提供了同名的data或methods 则组件内优先级更高
  // 如果编写了生命周期函数，则mixins中的生命周期函数和页面内的生命周期函数会用数组管理统一执行
  methods: {
    // 根据登录状态，判断是否需要显示登录确认框
    // 1.如果是未登录 显示确认框 返回true
    // 2.如果是登录状态 啥也不干 返回false
    loginConfirm () {
      // 判断token是否存在
      // 1.如果token不存在，弹确认框，跳转到登录页
      // 2.如果token存在，加入购物车
      if (!this.$store.getters.token) {
        // 谈弹确认框
        this.$dialog.confirm({
          message: '温馨提示',
          title: '请先登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '取消'
        }).then(() => {
          // 点了确认就跳转到登录
          // 如果希望在登录成功后跳转到当前页面，需要在跳转去携带参数(当前路径地址)
          // this.$route.fullPath  (会包含查询参数)
          this.$router.replace(
            {
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            }
          )
        }).catch(() => {
          // 点了取消啥也不干
        })
        return true // 返回true表示未登录
      }
      return false // 返回false表示已登录
    }
  }
}
