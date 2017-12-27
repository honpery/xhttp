import { initApis, initServers } from '../src';

export const APIs = initApis({
    rest: {
        market: {
            kline: {
                path: '/market/history/kline',
                desc: '获取K线数据',
            },
        },
    },
});

export const SERVERs = initServers({
    rest: {
        host: {
            prod: 'https://api.huobi.pro',
        },
        desc: 'RESTful api',
        apis: [APIs.rest],
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',        // tslint:disable
            'Content-Type': 'application/json',
        },
    },
});

export const APIsResult = {
    rest_rest_market_kline: {
        desc: '获取K线数据',
        path: 'https://api.huobi.pro/market/history/kline',
        token: 'rest_rest_market_kline',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',        // tslint:disable
            'Content-Type': 'application/json',
        },
        query: {},
    },
};
