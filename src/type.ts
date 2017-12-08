export type Params = any[];
export type Query = any;

export type Headers = any;
export type Body = any;

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export const Methods: {[method in Method]: Method} = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
};

export type Env = 'ywcs' | 'uat';
export const Envs: {[env in Env]: Env} = {
    ywcs: 'ywcs',
    uat: 'uat',
};

export type ApiToken = string;

export interface Api {
    path: string;
    desc: string;
    params?: Params;
    query?: Query;
    headers?: Headers;
    body?: Body;
    token?: ApiToken;
}

export interface ApiGroup {
    [group: string]: ApiGroup | Api;
}

export type ApiConfig = ApiGroup;

export interface Server {
    host: {
        [env in Env]: string;
    };
    apis: Array<ApiGroup | Api>;
    params?: Params;
    query?: Query;
}

export type ServerToken = string;

export type ServerConfig = {
    [token in ServerToken]: Server;
};
