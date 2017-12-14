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

        const result = { req, res, result: {} as T | {} };

        if (res.headers.get('Content-Type') === 'application/json') {
            result.result = await res.json();
            return result;
        }

        // if (res.headers.get('Content-Type') === '') { }
        return result;
    }
}
