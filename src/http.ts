// import * as es6 from 'es6-promise';
// es6.polyfill();

import 'isomorphic-fetch';
import {
    Api, ApiConfig, ApiGroup, Body, Headers,
    Method, Methods, Params, Query, ServerConfig, ServerGroup,
} from './type';
import { Url } from './url';

export interface HttpOptions<E> {
    apis: ApiConfig;
    servers: ServerConfig;
    env: E;
}

export interface FetchOptions {
    api: Api;
    params?: Params;
    query?: Query;
    body?: Body;
    headers?: Headers;
}

export class Http<E> {

    private _url: Url<E>;

    constructor(private _options: HttpOptions<E>) {
        this._url = new Url({
            apis: _options.apis,
            servers: _options.servers,
            env: _options.env,
        });
    }

    get(options: FetchOptions) { return this._buildMethod(Methods.GET, options); }
    post(options: FetchOptions) { return this._buildMethod(Methods.POST, options); }
    put(options: FetchOptions) { return this._buildMethod(Methods.PUT, options); }
    patch(options: FetchOptions) { return this._buildMethod(Methods.PATCH, options); }
    delete(options: FetchOptions) { return this._buildMethod(Methods.DELETE, options); }
    options(options: FetchOptions) { return this._buildMethod(Methods.OPTIONS, options); }
    head(options: FetchOptions) { return this._buildMethod(Methods.HEAD, options); }

    private async _buildMethod(method: Method, options: FetchOptions) {
        const { api, params, query, body, headers = {} } = options;

        const reqInit: RequestInit = { method, headers };

        if ([Methods.POST, Methods.PATCH, Methods.PUT].includes(method)) reqInit.body = body;

        const url = this._url.create(api, params, query);

        const req = new Request(url, reqInit);

        const res = await fetch(req);

        return { req, res };
    }
}
