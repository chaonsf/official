
module.exports = {
    lintOnSave:false,
    productionSourceMap:false,
    //移动端配置px转rem
  /*   chainWebpack: config=>{
        config.module
        .rule('scss')
        .oneOf('vue')
        .use('px2rem-loader')
        .loader('px2rem-loader')
        .before('postcss-loader') // this makes it work.
        .options({ remUnit: 75, remPrecision: 8 })
        .end()
    }, */     
    devServer: {
        // 端口配置
        port: 8080,
        // 反向代理配置
        proxy: {
            '/api': {
                 //target:'http://192.168.200.30:8081',
                 target:'https://ynyiot.com',
                ws: true,
                changeOrigin: true,		
                /*  pathRewrite: {
                    '^/api': '/'
                }  */
            },
            '/ys7': {
                target: 'https://open.ys7.com/api',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/ys7': '/'
                }
            },
        }
    }
}
