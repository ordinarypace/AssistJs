const cookie = (_ => {
    const get = cname => {
        if(!cname) return document.cookie;

        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');

        for(let i = 0; i < ca.length; i += 1) {
            let c = ca[i];

            while(c.startsWith(' ')) c = c.substring(1);

            if(c.includes(name)) return c.substring(name.length, c.length);
        }
        return "";
    };

    const set = (cname, cvalue, exdays) => {
        const d = new Date();

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        const expires = `expires=${d.toUTCString()}`;

        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    };

    return {
        get,
        set
    }
})();

export default cookie;