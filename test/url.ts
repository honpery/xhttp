import { expect } from 'chai';
import { ApiConfig, ServerConfig, Url } from '../src';

const apiConfig = {
    we: {
        base: {
            address: { path: '/we/base/address', desc: '地址' },
        },
        fund: {
            fundAccount: { path: '/we/:user_id/accountOverview', desc: '基金账户概述' },
        },
    },
};

const serverConfig = {
    fund: {
        host: {
            ywcs: 'http://ywcs.we.com',
            uat: 'http://uat.we.com',
        },
        apis: [apiConfig.we],
    },
};

const url = new Url({
    apis: apiConfig,
    servers: serverConfig,
    env: 'ywcs',
});

describe('sdk - common - url.ts', () => {
    it('init url config.', () => {
        const config = url.getConfig();
        const result = {
            fund_we_base_address: {
                path: 'http://ywcs.we.com/we/base/address',
                desc: '地址',
                token: 'fund_we_base_address',
            },
            fund_we_fund_fundAccount: {
                path: 'http://ywcs.we.com/we/:user_id/accountOverview',
                desc: '基金账户概述',
                token: 'fund_we_fund_fundAccount',
            },
        };
        expect(config).to.be.eql(result);
    });

    it('create url.', () => {
        const _path = url.create(apiConfig.we.fund.fundAccount, ['202002'], { show: false, name: 111 });
        const result = 'http://ywcs.we.com/we/202002/accountOverview?show=false&name=111';
        expect(_path).to.be.equals(result);
    });
});
