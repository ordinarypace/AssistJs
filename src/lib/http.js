import { error } from './utility';

const http = (_ => {
    const ajax = async ({ url, method = 'get', body = {}, credentials = 'same-origin', contentType = 'application/json', mode = 'cors', cache = 'default', headers = {}, timeout = 3000 }) => {
        if(typeof url !== 'string' || !url.trim().length) throw new Error('Invalid URL!');

        const defaults = {
            method,
            credentials,
            mode,
            cache,
            headers: new Headers()
        };

        let result, stream, timer;

        defaults.headers.append('Content-Type', `${contentType}`);

        if(headers){
            // defaults.headers.append('Accept', 'application/json');
            Object.keys(headers).map(v => defaults.headers.append(v, headers[v]));
        }
        if(method === 'post') defaults.body = JSON.stringify(body);

        stream = await Promise.race([
            fetch(new Request(url, defaults)),
            new Promise((resolve, reject) => {
                timer = setTimeout(_ => reject(error('timeout')), timeout);
            })
        ]);

        const { status } = stream;

        if(status === 200){
            clearTimeout(timer);
            result = await stream.text();

        } else result = status;

        return JSON.parse(result);
    };

    return {
        ajax
    }
})();

export default http;