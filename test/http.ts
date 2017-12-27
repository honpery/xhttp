import { expect } from 'chai';
import { Http } from '../src';
import { APIs, SERVERs } from './_data';

const http = new Http({
    apis: APIs,
    servers: SERVERs,
    env: 'prod',
    debug: true,
});

describe('sdk - common - http.ts', () => {
    it('test http', next => {
        http.get({ api: APIs.rest.market.kline })
            .then(({ res }) => res.json())
            .then(json => {
                expect(1).eq(1);
                next();
            });

    });
});
