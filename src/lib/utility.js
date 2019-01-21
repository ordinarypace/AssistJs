export const is = (instance, cls) => {
    return instance instanceof cls;
};

export const empty = obj => {
    if(typeof obj === 'string') return obj.trim().length;

    if(Array.isArray(obj)) return obj.length;
    else return Object.keys(obj).length;
};

export const error = str => (new Error(str ? str : 'Invalid Error!'));

export const debounce = (delay, f) => {
    const run =_=> (f(...arg), id = -1);
    let id = -1, arg;

    return (...a) => {
        arg = a;

        if(id !== -1){
            clearTimeout(id);
            id = -1;
        }
        id = setTimeout(run, delay);
    };
};

export const throttle = (rate, f) => {
    const delay = _ => (f(...arg), id = -1);

    let id = -1, next = 0, arg;

    return (...a) => {
        arg = a;
        const curr = Date.now();
        if(next > curr) if(id === -1) id = setTimeout(delay, next - curr);
        else{
            if(id !== -1){
                clearTimeout(id);
                id = -1;
            }
            f(...a);
        }
        next = curr + rate;
    };
};