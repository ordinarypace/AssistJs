const query = (_ => {
    const string = (o = {}) => {
        return Object.keys(o).reduce((p, c) => { return p.push(`${c}=${o[c]}`), p; }, []).join('&');
    };

    const params = (url = location.search) => {
        const params = {}, scheme = url.split('?');

        if(scheme.length > 1){
            scheme[1].split('&').forEach((v, i) => {
                const [key, value] = v.split('=');

                params[key] = value;
                params.length = i;
            });

        } else params.length = 0;

        return params;
    };

    return {
        string,
        params
    }
})();

export default query;