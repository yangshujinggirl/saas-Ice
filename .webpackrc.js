const proxyTarget = 'http://172.16.0.218:8080/';

module.exports = {
    devServer: {
        proxy: {
            '/loan-ft1': {
                target: proxyTarget,
                changeOrigin: true,
                bypass: function(req, res, proxyOpt) {
                    // 添加 HTTP Header 标识 proxy 开启
                    res.set('X-ICE-PROXY', 'on');
                    res.set('X-ICE-PROXY-BY', proxyTarget);
                },
            },
        },
    },
};