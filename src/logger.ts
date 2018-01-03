import color from 'chalk';

export interface LoggerOptions {
    debug?: boolean;
}

export class Logger {
    constructor(private _options: LoggerOptions) { }

    reqLog(req: Request) {
        let text = '';

        text += color.gray('<--') + ' ';
        text += color.green(req.method.toUpperCase()) + ' ';
        text += color.white(req.url);

        if (this._options.debug) {
            text += this._fmtHeader(req.headers);
        }

        console.log(text);
    }

    resLog(req: Request, res: Response, time: number) {
        let text = '';

        text += color.gray('-->') + ' ';
        text += color.green(req.method.toUpperCase()) + ' ';
        text += color.white(req.url) + ' ';
        text += color.yellow(`${time}ms`);

        if (this._options.debug) {
            text += this._fmtHeader(res.headers);
        }

        console.log(text);
    }

    private _fmtHeader(headers: Headers) {
        let result = '\n    Headers: \n';
        headers.forEach((value, key) => {
            result += `\t${key}: ${Array.isArray(value) ? value.join(', ') : value} \n`;
        });
        return result;
    }

    private _fmtBody() {

    }
}
