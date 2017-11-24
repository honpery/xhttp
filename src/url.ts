import { Api, Params, Query } from './types';

export interface UrlOptions { }

export class Url {
    constructor(private _options: UrlOptions) { }

    create(api: Api, params: Params, query: Query) {
        return '';
    }
}
