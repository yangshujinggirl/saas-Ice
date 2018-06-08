const SAAS_HOST = 'http://172.16.0.218:8080';
const CRM_HOST = 'http://172.16.0.218:8080/';
const CONTRACT_HOST = 'http://172.16.0.218:8080';

const { resolve, join } = require('path');
const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');
var NODE_ENV = (process.env.NODE_ENV || 'DEVELOPMENT').toUpperCase();
var __DEV__ = NODE_ENV !== 'PRODUCTION';
var NODE_BUILD = process.env.NODE_BUILD || 'dev';

module.exports = {
    output: {
        path: resolve("build/assets"),
        publicPath: "/assets/",
        filename: __DEV__ ? "[name].js" : "[name].[hash].js",
        chunkFilename: '[id].[hash].js',
        pathinfo: true
    },
    resolve: {
        alias: {
            '@': resolve('src/pages'),
            'base': resolve('src/base'),
            'utils': resolve('src/base/utils'),
            'components': resolve('src/components'),
        }
    },
    devServer: {
        proxy: {
            '/saas': {
                target: SAAS_HOST,
                changeOrigin: true,
                pathRewrite: { "^/saas": "" },
                bypass: function(req, res, proxyOpt) {
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', SAAS_HOST);
                },
            },
            '/loan': {
                target: SAAS_HOST,
                changeOrigin: true,
                pathRewrite: { "^/loan": "/loan-ft1" },
                bypass: function(req, res, proxyOpt) {
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', SAAS_HOST);
                },
            },
            '/crm': {
                target: CRM_HOST,
                changeOrigin: true,
                pathRewrite: { "^/crm": "/crm-ft1" },
                bypass: function(req, res, proxyOpt) {
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', CRM_HOST);
                },
            },

            '/contract': {
                target: CONTRACT_HOST,
                changeOrigin: true,
                pathRewrite: { "^/contract": "/contract-ft1" },
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', CONTRACT_HOST);
                },
            },
            '/wf': {
                target: SAAS_HOST,
                changeOrigin: true,
                pathRewrite: { "^/wf": "/wf-ft1" },
                bypass: function(req, res, proxyOpt) {
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', SAAS_HOST);
                },
            },
        },
    },
    plugins: [

        new ExtractTextPlugin({
            filename: __DEV__ ? "[name].css" : "[name].[hash].css",
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            title: package.title + ' ' + NODE_ENV + ' ' + package.version,
            template: getTemplate(),
            filename: __DEV__ ? 'index.html' : '../index.html',
            name: package.name,
            description: package.description,
            version: package.version,
            // hash: hash,
            author: package.author,
            time: getDate(),
            env: NODE_ENV,
            config: getConfig()
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
    ],
};


function getDate() {
    var date = new Date();
    return date.getFullYear() + '-' + getFullNum(date.getMonth() + 1) + '-' + getFullNum(date.getDate()) + ' ' + getFullNum(date.getHours()) + ':' + getFullNum(date.getMinutes()) + ':' + getFullNum(date.getSeconds());
}

function getFullNum(n) {
    return n < 10 ? '0' + n : n;
}

/**
 * 获取当前环境需要的配置
 * @return {[type]} [description]
 */
function getConfig() {
    return {}
}

function getTemplate() {
    if (__DEV__) {
        return 'src/html/index.dev.ejs';
    }
    if (NODE_BUILD.toLowerCase() == 'login') {
        return 'src/html/index.login.ejs';
    }
    return 'src/html/index.ejs';

}