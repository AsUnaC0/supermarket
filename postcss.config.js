// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配标准屏宽度：iphoneX
      // 设计图 750，调成1倍=》适配375标准屏幕
      // 设计图640，调成一倍图=》适配320标准屏幕
      viewportWidth: 375
    }
  }
}
