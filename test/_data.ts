import { initApis, initServers } from '../src';

export const APIs = initApis({
    demo: {
        test: {
            demo: {
                desc: 'adasdsa',
                path: '/demo/test/:name/demo',
            },
        },
    },
});

export const SERVERs = initServers({
    ddd: {
        host: {
            dev: 'dev.com',
            test: 'test.com',
        },
        apis: [APIs.demo],
    },
});

export const APIsResult = {
    ddd_demo_test_demo: {
        desc: 'adasdsa',
        path: 'test.com/demo/test/:name/demo',
        token: 'ddd_demo_test_demo',
    },
};
