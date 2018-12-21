import Traverse from "./traverse";

const Dom = class {
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

    insertBefore(node){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.parentNode.insertBefore(node, el), this;
    }

    insertAfter(node){
        if(this.el.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.parentNode.insertBefore(node, el.nextSibling), this;
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

let $;

$ = selector => {
    return new Dom(selector);
};

export default $;