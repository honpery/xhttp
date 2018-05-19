// basic
export type Scalar = string | number | boolean;

// http
export type Api = string;

export type Host = string;

export type Params = Scalar[];

export interface Query {
	[key: string]: Scalar | Scalar[];
}

export type Body = any;

export interface Headers {
	[key: string]: Scalar | Scalar[];
}

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export enum LogLevel {
	none = 'none',
	simple = 'simple',
	full = 'full',
}
