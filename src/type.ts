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

export type ApiGroup<T> = {
    [P in keyof T]: Api | ApiGroup<T>[P];
};

export type ApiConfig = ApiGroup<any>;

export interface Server<T> {
    host: { [env: string]: string; };
    apis: Array<ApiGroup<any>>;
    params?: Params;
    query?: Query;
}

export type ServerToken = string;

export type ServerGroup<T> = {
    [token in ServerToken]: Server<T>;
};

export type ServerConfig = ServerGroup<any>;
