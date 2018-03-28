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
<<<<<<< HEAD
            '/crm': {
                target: CRM_HOST,
                changeOrigin: true,
            },
=======
          'test': {
              target: proxyTarget,
            changeOrigin: true
          }
>>>>>>> 2df1ec47c8262e620227a249aa3bc0c9c06ce595
        },
    },


};
