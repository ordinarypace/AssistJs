export const is = (instance, cls) => {
    return instance instanceof cls;
};

export const empty = obj => {
    if(typeof obj === 'string') return obj.trim().length;

    if(Array.isArray(obj)) return obj.length;
    else return Object.keys(obj).length;
};