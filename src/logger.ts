// tslint:disable:no-console
import color from 'chalk';
import { LogLevel } from './type';

export interface LoggerOptions {
	logLevel?: LogLevel;
}

export class Logger {
	private _start = 0;
	constructor(private _options: LoggerOptions) { }

	reqLog(req: Request) {
		const { logLevel } = this._options;
		if (logLevel === LogLevel.none) return;

		this._start = Date.now();

		let text = '';

		text += color.gray('<--') + ' ';
		text += color.green(req.method.toUpperCase()) + ' ';
		text += color.white(req.url);

		if (logLevel === LogLevel.full) {
			text += this._fmtHeader(req.headers);
		}

		console.log(text);
	}

	resLog(req: Request, res: Response) {
		const { logLevel } = this._options;
		if (logLevel === LogLevel.none) return;

		const time = Date.now() - this._start;

		let text = '';

		text += color.gray('-->') + ' ';
		text += color.green(req.method.toUpperCase()) + ' ';
		text += color.white(req.url) + ' ';
		text += color.yellow(`${time}ms`);

		if (logLevel === LogLevel.full) {
			text += this._fmtHeader(res.headers);
		}

		console.log(text);
	}

	private _fmtHeader(headers: Headers) {
		let result = '\n    Headers: \n';
		headers.forEach((value: string, key: any) => {
			result += `\t${key}: ${Array.isArray(value) ? value.join(', ') : value} \n`;
		});
		return result;
	}

	private _fmtBody() {
		return;
	}
}
