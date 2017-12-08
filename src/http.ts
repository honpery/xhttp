// import * as es6 from 'es6-promise';
// es6.polyfill();

import 'isomorphic-fetch';
import { Api, ApiConfig, Body, Env, Headers, Method, Methods, Params, Query, ServerConfig } from './type';
import { Url } from './url';

export interface HttpOptions {
    apis: ApiConfig;
    servers: ServerConfig;
    env: Env;
}

export interface FetchOptions {
    api: Api;
    params?: Params;
    query?: Query;
    body?: Body;
    headers?: Headers;
}

export class Http {

    private _url: Url;

    constructor(private _options: HttpOptions) {
        this._url = new Url({
            apis: _options.apis,
            servers: _options.servers,
            env: _options.env,
        });
    }

    get<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.GET, options); }
    post<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.POST, options); }
    put<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.PUT, options); }
    patch<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.PATCH, options); }
    delete<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.DELETE, options); }
    options<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.OPTIONS, options); }
    head<T>(options: FetchOptions) { return this._buildMethod<T>(Methods.HEAD, options); }

    private async _buildMethod<T>(method: Method, options: FetchOptions) {
        const { api, params, query, body, headers = {} } = options;

        const reqInit: RequestInit = { method, headers };

        if ([Methods.POST, Methods.PATCH, Methods.PUT].includes(method)) reqInit.body = body;

        const url = this._url.create(api, params, query);

        const req = new Request(url, reqInit);

        const res = await fetch(req);

        const _result = { status: 0, message: 'success', data: {} as T | {} };
        const result = { req, res, result: _result };

        if (res.status >= 400) {
            result.result.status = res.status;
            result.result.message = res.statusText;
            return result;
        }

        if (res.headers.get('Content-Type') === 'application/json') {
            const _r: { status: number, message: string, data: T } = await res.json();

            // handle business logic error.
            if (status) {
                result.result.status = _r.status;
                result.result.message = _r.message;
                return result;
            }

            result.result.data = _r.data || {};
            return result;
        }

        // if (res.headers.get('Content-Type') === '') { }
        return result;
    }
}
