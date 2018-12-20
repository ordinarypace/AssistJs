const storage = (_ => {
    if(!window.localStorage) return;

    let defaults = 'localStorage';

    const get = k => {
        return JSON.parse(window[defaults].getItem(k));
    };

    const set = (k, v) => {
        window[defaults].setItem(k, JSON.stringify(v));
    };

    const change = _ => {
        defaults = defaults === 'localStorage' ? 'sessionStorage' : 'localStorage';
    };

    const remove = k => {
        window[defaults].removeItem(k);
    };

    const clear = _ => {
        window[defaults].clear();
    };

    const status = _ => {
        return defaults;
    };

    return {
        get,
        set,
        change,
        status,
        remove,
        clear
    }
})();

export default storage;