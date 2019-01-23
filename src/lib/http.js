import { error } from './utility';

const http = (_ => {
    let defaults = {
        headers: new Headers()
    };

    const ajax = async ({ url, method, body, credentials = 'same-origin', contentType, mode = 'cors', cache = 'default', headers, timeout = 3000 }) => {
        if(typeof url !== 'string' || !url.trim().length) throw new Error('Invalid URL!');

        defaults = Object.assign(defaults, {
            method,
            credentials,
            mode,
            cache
        });

        let result, stream, timer;

        setHeader({ headers, contentType });
        setMethod({ method, body });

        stream = await Promise.race([
            fetch(new Request(url, defaults)),
            new Promise((resolve, reject) => {
                timer = setTimeout(_ => reject(error('timeout')), timeout);
            })
        ]);

        const { status } = stream;

        if(status === 200){
            clearTimeout(timer);
            console.log(await stream);
            result = await stream.json();

        } else result = status;

        return result;
    };

    const setHeader = ({ headers = {}, contentType = 'application/json' }) => {
        defaults.headers.append('Content-Type', `${contentType}`);

        if(headers){
            // defaults.headers.append('Accept', 'application/json');
            Object.keys(headers).map(v => defaults.headers.append(v, headers[v]));
        }
    };

    const setMethod = ({ method = 'get', body = {} }) => {
        if(method === 'post') defaults.body = JSON.stringify(body);
        else defaults.method = method;
    };

    return {
        ajax
    }
})();

export default http;
