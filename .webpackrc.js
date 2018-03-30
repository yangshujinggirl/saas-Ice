const LOAN_HOST = 'http://172.16.0.218:8080/';
const CRM_HOST = 'http://172.16.0.211:8080/';

const { resolve } = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');

module.exports = {
    // output: {
    //     path: resolve("build/assets"),
    //     filename: '[name].[hash].js',
    //     publicPath: "/assets/",
    //     chunkFilename: "[id].[hash].js",
    //     pathinfo: true
    // },
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
                pathRewrite:{"^/loanApi" : ""},
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', LOAN_HOST);
                },
            },
            '/crm': {
                target: CRM_HOST,
                changeOrigin: true,
            },
        },
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: '平常金服SAAS ' + package.version,
            template: './public/index.ejs',
            filename: '../index.html',
            name: package.name,
            description: package.description,
            version: package.version,
            // hash: hash,
            author: package.author,
            time: getDate()
        })]
};


function getDate() {
    var date = new Date();
    return date.getFullYear() + '-' + getFullNum(date.getMonth() + 1) + '-' + getFullNum(date.getDate()) + ' ' + getFullNum(date.getHours()) + ':' + getFullNum(date.getMinutes()) + ':' + getFullNum(date.getSeconds());
}

function getFullNum(n) {
    return n < 10 ? '0' + n : n;
}
