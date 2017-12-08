import { Api, ApiConfig, ApiGroup, ApiToken, Env, Params, Query, ServerConfig } from './type';

export interface UrlOptions {
    apis: ApiConfig;
    servers: ServerConfig;
    env: Env;
}

export class Url {

    private _config: {[token in ApiToken]: Api } = {};

    constructor(private _options: UrlOptions) {
        this._initApiToken(_options.apis);
        this._config = this._initConfig();
    }

    create(api: Api, params: Params = [], query: Query = {}) {
        let result = this._config[api.token || ''].path;

        // handle params
        result = result.replace(/\/:[a-zA-Z0-9_]+/g, str => {
            if (!params.length) throw new Error(`API: ${api.token} params length error.`);
            return '/' + params.shift();
        });
        if (params.length) result += `/${params.join('/')}`;

        // handle query
        result += '?' + Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
        return result;
    }

    getConfig() {
        return this._config;
    }

    private _initApiToken(apis: ApiConfig, token = '') {
        Object.keys(apis).forEach(name => {
            const _api = apis[name] as Api;
            const _group = apis[name] as ApiGroup;
            const _token = token ? `${token}_${name}` : name;

            if (_api.desc && _api.path) {
                _api.token = _token;
                return;
            }

            this._initApiToken(_group, _token);
        });
    }

    private _initConfig() {
        const { apis, servers, env } = this._options;
        const flat: Api[] = [];

        Object.keys(servers).forEach(serverToken => {
            const server = servers[serverToken];
            const host = server.host[env];

            function _getApi(api: ApiGroup | Api) {
                const _api = api as Api;

                if (_api.desc && _api.path) {
                    _api.token = `${serverToken}_${_api.token}`;
                    _api.path = `${host}${_api.path}`;
                    flat.push(_api);
                    return;
                }

                const _group = api as ApiGroup;
                Object.values(_group).forEach(_getApi);
            }

            server.apis.forEach(_getApi);
        });

        return Object.assign(this._config, ...flat.map(api => ({ [api.token || '']: api })));
    }
}
