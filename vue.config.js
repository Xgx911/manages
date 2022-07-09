
const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    // echarts: 'echarts',
    // 'element-ui': 'ELEMENT',
    // vuex: 'Vuex',
    // 'vue-router': 'VueRouter',
    // axios: 'axios'
  },

  // 通过cdn方式使用
  js: [
    'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    'https://cdn.bootcss.com/element-ui/2.4.11/index.js',
    'https://cdn.bootcss.com/echarts/3.7.1/echarts.min.js'
  ],
  css: []
}

// 这里只列一部分，具体配置参考文档
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {

  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径 (打包之后，改变系统默认的index.html的文件名)
  indexPath: 'index.html',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
  lintOnSave: false,
  // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  //   lintOnSave: true,
  // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  runtimeCompiler: false,
  chainWebpack: config => {
    // 配置cdn引入
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          // gzip压缩配置
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10kb的数据进行压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
      config.plugins.push(new BundleAnalyzerPlugin())
    };
    config.externals = cdn.externals
  },
  //   /**
  //   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  //   * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
  //   * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  //   * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  //   * */
  //   productionSourceMap: false,

  //   // 它支持webPack-dev-server的所有选项
  devServer: {
    // host: "0.0.0.0",
    port: 8083, // 端口号
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

    // 配置多个代理
    // proxy: {
    // }
  }
}
