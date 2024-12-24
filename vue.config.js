module.exports = {
  devServer: {
    proxy: {
		disableHostCheck: true,
      // 配置跨域
      '/api': {
        target: 'https://dev1.tymecho.com', // 目标接口的域名
        ws: false,
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          '^/api': '' // 替换成空字符，去掉/api前缀
        }
      }
    }
  }
}