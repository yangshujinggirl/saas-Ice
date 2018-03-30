const LOAN_HOST = 'http://172.16.0.218:8080/';
const CRM_HOST = 'http://172.16.0.211:8080/';

module.exports = {
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


};
