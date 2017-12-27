// import * as es6 from 'es6-promise';
// es6.polyfill();

import color from 'chalk';
import 'isomorphic-fetch';
import { Logger } from './logger';
import {
    Api, ApiConfig, ApiGroup, Body, Headers,
    Method, Methods, Params, Query, ServerConfig, ServerGroup,
} from './type';
import { Url } from './url';

export interface HttpOptions<E> {
    apis: ApiConfig;
    servers: ServerConfig;
    env: E;
    headers?: Headers;
    query?: Query;
    debug?: boolean;
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
    private _logger: Logger;

    constructor(private _options: HttpOptions<E>) {
        this._url = new Url({
            apis: _options.apis,
            servers: _options.servers,
            env: _options.env,
        });

        this._logger = new Logger({
            debug: _options.debug,
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
        const { api, params, query, body, headers: fetchHeader = {} } = options;
        const { headers: globalHeader = {}, query: globalQuery = {} } = this._options;

        const reqInit: RequestInit = { method, headers: Object.assign({}, globalHeader, fetchHeader) };

        if ([Methods.POST, Methods.PATCH, Methods.PUT].includes(method)) reqInit.body = body;

        const url = this._url.create(api, params, Object.assign({}, query, globalQuery));

        const req = new Request(url, reqInit);

        const start = Date.now();
        console.log(this._logger.reqLog(req));

        const res = await fetch(req);
        console.log(this._logger.resLog(req, res, Date.now() - start));

        return { req, res };
    }

}
