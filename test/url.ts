import { expect } from 'chai';
import { initApis, initServers, Url } from '../src';
import { APIs, APIsResult, SERVERs } from './_data';

const url = new Url({
    apis: APIs,
    servers: SERVERs,
    env: 'test',
});

describe('sdk - common - url.ts', () => {
    it('init url config.', () => {
        const config = url.getConfig();
        expect(config).to.be.eql(APIsResult);
    });

    it('create url.', () => {
        const _path = url.create(APIs.demo.test.demo, ['202002'], { show: false, name: 111 });
        const result = 'test.com/demo/test/202002/demo?show=false&name=111';
        expect(_path).to.be.equals(result);
    });
});