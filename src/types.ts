export type Param = any;
export type Params = Param[];

export type Query = any;
export type Body = any;

export interface Api {
    path: string;
    desc: string;
    params?: Params;
    query?: Query;
    body?: Body;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const Methods: {[method in Method]: Method} = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};
