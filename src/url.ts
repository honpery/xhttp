import { Api, Host, Params, Query } from './type';

export interface UrlOptions {
	host: Host;
}

export class Url {
	constructor(private _options: UrlOptions) { }

	create(api: Api, params: Params = [], query: Query = {}) {
		const { host } = this._options;

		let result = '';

		// host handler
		result += host.replace(/\/$/g, str => '');

		// api handler
		result += api.startsWith('/') ? api : `/${api}`;

		// params handler
		const _params = params.map(i => i);
		result += result.replace(/\/:[a-zA-Z0-9_]\//g, str => {
			if (!_params.length) throw new Error(`API: ${api} params length error.`);
			return `/${params.shift()}/`;
		});
		if (_params.length) result += `/${params.join('/')}`;

		// query handler
		result = result.replace(/\?$/g, str => '');
		result += '?' + Object.keys(query).map(k => `${k}=${query[k]}`);
		result = result.replace(/\?$/g, str => '');

		return result;

	}
}
