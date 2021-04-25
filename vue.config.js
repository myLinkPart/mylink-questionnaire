const JsCss2JsonPlugin = require('./JsCss2JsonPlugin');
const path = require('path');
const resolve = (p) => path.resolve(p);

module.exports = {
    // 基本路径
    publicPath: (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") ? "./" : "/",
    // 输出文件目录
    outputDir: "dist",
    // 放置build生成的静态资源 (js、css、img、fonts) 的目录。
    assetsDir: "static",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV !== "production",
    productionSourceMap: process.env.NODE_ENV !== "production",
    configureWebpack: {
        plugins: (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") ? [
            new JsCss2JsonPlugin(1)
        ] : [],
        resolve: {
            alias: {
                '@': resolve('src'),
                '@assets': resolve('src/assets'),
                '@utils': resolve('src/utils'),
                '@views': resolve('src/views'),
                '@c': resolve('src/components'),
                '@common': resolve('src/common/js'),
                '@tools': resolve('src/tools'), 
            }
        },

    },
    // css相关配置
    css: {
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "@/../static/css/common.scss";`
            }
        },
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(args=> {
                // 定义html文件中需要用到的一些数据
                const htmlParams = {
                    production: true,
                    inject: process.env.NODE_ENV === "development",
                };
                Object.assign(args[0], htmlParams);
                return args;
            });
    },
    // devServer: {
    //     open: true, // 配置自动启动浏览器
    //     host: "0.0.0.0",
    //     port: 8080,
    //     https: false,
    //     proxy: {
    //         "/api": {
    //             target: "http://47.57.156.216/",
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/api": "/",
    //             },
    //         },
    //     }, // 设置代理
    //     // before: app => {}
    // },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
};
