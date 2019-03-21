import isBoolean from './lib/isBoolean';
import isPattern from './lib/isPattern';
import isSelect from './lib/isSelect';
import isSome from './lib/isSome';
import isEvery from './lib/isEvery';

export default (_ => {
    let response = {};
    const modules = {
        isBoolean,
        isPattern,
        isSelect,
        isSome,
        isEvery
    };

    const validator = {
        assert(options){
            const { name, pattern, value, type, merge = true, target = null, defaults = {}, els = [] } = options;

            if(!type || typeof type !== 'string') new Error(`${type} is not string!`);

            const result = modules[`is${type.replace(/^./, match => match.toUpperCase())}`]({ ...options });

            if(result && merge) this.merge(name, value);

            return result;
        },

        merge(k, v){
            if(k) Object.assign(response, { [k || v]: v });
        },

        convertObjectToArray(v){
            let o = v && v || this.result();

            return Object.keys(o).reduce((p, c) => { return p.push(o[c]), p }, []);
        },

        callback(f, context){
            f.call(context || null, this);
        },

        result(){
            return response;
        },

        blank(v){
            switch(typeof v){
                case 'string': return v.trim().length;
                case 'number': return parseInt(v, 10) > 0;
                case 'object': return Array.isArray(v) ? v.length : Object.keys(v).length;
            }
        },

        clear(){
            response = {};
        }
    };

    return validator;
})();

