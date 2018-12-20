const http = (_ => {
    const ajax = async ({ url, method = 'get', body = {}, credentials = 'omit', mode = 'cors', cache = 'default', headers = {}, timeout = 3000 }) => {
        if(typeof url !== 'string' || !url.trim().length) throw new Error('Invalid URL!');

        const defaults = {
            method,
            credentials,
            mode,
            cache
        };

        let result, stream, timer;

        if(headers) defaults.headers = headers;
        if(method === 'post') defaults.body = body;

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

        return result;
    };

    return {
        ajax
    }
})();

export default http;