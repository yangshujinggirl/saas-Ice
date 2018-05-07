const LOAN_HOST = 'http://172.16.0.218:8080/';
const CRM_HOST = 'http://172.16.0.211:8080/';
// const CRM_HOST = 'http://172.16.0.190:8080/';

const { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');
var NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
var __DEV__ = NODE_ENV !== 'PRODUCTION';

module.exports = {
    // output: {
    //     path: resolve("build/assets"),
    //     filename: __DEV__ ? "[name].js" : "[name].[hash].js",
    //     publicPath: "/assets/",
    //     chunkFilename: "[id].[hash].js",
    //     pathinfo: true
    // },
    resolve: {
        alias: {
            'base': resolve('src/base'),
            'utils': resolve('src/base/utils'),
            'components': resolve('src/components'),
        }
    },
    devServer: {
        proxy: {
            '/loan-ft1': {
                target: LOAN_HOST,
                changeOrigin: true,
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', LOAN_HOST);
                },
            },
            '/loanApi': {
                target: LOAN_HOST,
                changeOrigin: true,
                pathRewrite: { "^/loanApi": "" },
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', LOAN_HOST);
                },
            },
            '/processApi': {
                target: ' http://172.16.0.218:8080/wf-dev',
                changeOrigin: true,
                pathRewrite:{"^/processApi" : ""},
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', ' http://172.16.0.218:8080/wf-dev');
                },
            },
            '/crm': {
                target: CRM_HOST,
                changeOrigin: true,
            },
          // /loan/tasks?
            '/loan': {
              target: LOAN_HOST,
              changeOrigin: true,
              pathRewrite:{"^/loan" : ""},
            },
        },
    },
    plugins: [

        new ExtractTextPlugin({
            filename: __DEV__ ? "[name].css" : "[name].[hash].css",
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            title: package.title + (__DEV__ ? ' DEV ' : ' ') + package.version,
            template: __DEV__ ? './public/index.dev.ejs' : './public/index.ejs',
            filename: './index.html',
            name: package.name,
            description: package.description,
            version: package.version,
            // hash: hash,
            author: package.author,
            time: getDate(),
            env: NODE_ENV
        })
    ]
};


function getDate() {
    var date = new Date();
    return date.getFullYear() + '-' + getFullNum(date.getMonth() + 1) + '-' + getFullNum(date.getDate()) + ' ' + getFullNum(date.getHours()) + ':' + getFullNum(date.getMinutes()) + ':' + getFullNum(date.getSeconds());
}

function getFullNum(n) {
    return n < 10 ? '0' + n : n;
}
