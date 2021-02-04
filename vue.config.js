/**
 * 自定义配置项
 */
module.exports = {
  publicPath: "/",
  assetsDir: './static',
  productionSourceMap: false,
  devServer: {
    open: true,
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8055,
    https: false,
    hotOnly: true
  }
};