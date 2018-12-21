import './lib/polyfill';
import http from './lib/http';
import storage from './lib/storage';

let $;

const Traverse = class{
    constructor(el, target){
        this.el = el;
        this.target = target;
    }
    *[Symbol.iterator](){
        let el = this.el.firstElementChild;

        if(el){
            do {
                const pre = this.target.charAt(0);
                let selector = this.target.slice(1);

                if(pre === '.') if(el.classList.contains(selector)) yield el;
                else if(pre === '#') if(el.id === selector) yield el;

            } while(el = el.nextElementSibling);
        }
    }
};

const Assist = class {
    static error(str){
        new Error(str ? str : 'Invalid DOM!');
    }

    constructor(selector = ''){
        if(typeof selector !== 'string') selector = selector.toString();

        if(selector){
            this[0] = Array.from(document.querySelectorAll(selector));
            this.length = this[0].length;
        }

        return this;
    }

    get el(){
        return this[0];
    }

    on(events, callback, capture){
        return events.split(',').forEach(e => this.el.forEach(v => v.addEventListener(e, callback, capture))), this;
    }

    off(events, callback){
        return events.split(',').forEach(e => this.el.forEach(v => v.removeEventListener(e, callback))), this;
    }

    append(...elements){
        return this.el.forEach(v => { elements.forEach(c => v.appendChild(c)); }), this;
    }

    prepend(...elements){
        return this.el.forEach(v => { elements.reverse().forEach(c => v.insertBefore(c, v.firstChild)); }), this;
    }

    insertAfter(newNode){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.parentNode.insertBefore(newNode, el.nextSibling), this;
    }

    prev(){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.previousElementSibling;
    }

    next(){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.nextElementSibling;
    }

    last(){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.lastElementChild;
    }

    first(){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.firstElementChild;
    }

    find(selector){
        const iterable =  new Traverse(this.el[0], selector);

        return [...iterable];
    }

    data(...params){
        const result = [];
        let [name, setter] = params;
        const camel = name.replace(/-([a-z])/g, g => g[1].toUpperCase());

        setter = String(setter);

        this.el.forEach(v => {
            if('dataset' in v){
                if(setter === 'undefined') result.push(v.dataset[camel]);
                else v.dataset[camel] = setter;

            } else {
                if(!setter) result.push(v.getAttribute('data-', name));
                else v.setAttribute(`data-${name}`, setter);
            }
        });

        if(result.length) return result.length === 1 ? result[0] : result;
    }
};

$ = selector => {
    return new Assist(selector);
};

// static utility methods
$.version = '0.0.1';

$.is = (instance, cls) => {
    return instance instanceof cls;
};

$.empty = obj => {
    if(typeof obj === 'string') return obj.trim().length;

    if(Array.isArray(obj)) return obj.length;
    else return Object.keys(obj).length;
};

$.query = {
    string(o){
        return Object.keys(o).reduce((p, c) => { return p.push(`${c}=${o[c]}`), p; }, []).join('&');
    },
    params(){
        const params = {}, scheme = (url ? url : location.search).split('?');

        if(scheme.length > 1){
            scheme[1].split('&').forEach((v, i) => {
                const [key, value] = v.split('=');

                params[key] = value;
                params.length = i;
            });

        } else params.length = 0;

        return params;
    }
};

$.cookie = {
    get(cname){
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
    },
    set(cname, cvalue, exdays){
        const d = new Date();

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        const expires = `expires=${d.toUTCString()}`;

        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }
};

$.number = {
    format(n){
        return n.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    rand(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

$.storage = storage;
$.ajax = http.ajax;

export default $;
