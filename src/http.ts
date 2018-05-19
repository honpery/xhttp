import 'isomorphic-fetch';
import { Logger } from './logger';
import { Api, Body, Headers, Host, LogLevel, Method, Params, Query } from './type';
import { Url } from './url';

export interface HttpOptions {
	host: Host;
	logLevel?: LogLevel;
	query?: Query;
	headers?: Headers;
}

export interface FetchOptions {
	api: Api;
	params?: Params;
	query?: Query;
	body?: Body;
	headers?: Headers;
}

export class Http<E> {

	private _url: Url;
	private _logger: Logger;

	constructor(private _options: HttpOptions) {
		this._url = new Url({ host: _options.host });
		this._logger = new Logger({ logLevel: _options.logLevel });
	}

	get(options: FetchOptions) { return this._buildMethod(Method.GET, options); }
	post(options: FetchOptions) { return this._buildMethod(Method.POST, options); }
	put(options: FetchOptions) { return this._buildMethod(Method.PUT, options); }
	patch(options: FetchOptions) { return this._buildMethod(Method.PATCH, options); }
	delete(options: FetchOptions) { return this._buildMethod(Method.DELETE, options); }

	private async _buildMethod(method: Method, options: FetchOptions) {
		const { api, params, body } = options;
		const query = { ...this._options.query, ...options.query };
		const headers = { ...this._options.headers, ...options.headers };

		const reqInit: RequestInit = { method, headers };

		if ([Method.POST, Method.PATCH, Method.PUT].includes(method)) reqInit.body = body;

		const url = this._url.create(api, params, query);

		const req = new Request(url, reqInit);

		this._logger.reqLog(req);

		const res = await fetch(req);

		this._logger.resLog(req, res);

		return { req, res };
	}

}
