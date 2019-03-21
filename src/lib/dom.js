import Traverse from "./traverse";
import './polyfill';

const Dom = class {
    static error(str){
        new Error(str ? str : 'Invalid DOM!');
    }

    constructor(selector = ''){
        let result;

        if(typeof selector === 'object'){
            if('nodeType' in selector && selector.nodeType === 1){
                const { tagName } = selector;
                const tag = tagName.toLowerCase();

                if(tag === 'window' && tag === 'document') result = (tag === 'window' ? [window] : [document]);
                else result = [selector];

            } else {
                if(selector.id) result = this.getElements(`#${selector.id}`);
                else if(selector.classList.length) result = this.getElements(Array.from(selector.classList).map(v => `.${v}`).join(''));
                else Dom.error('Invalid DOM!');
            }

        } else result = this.getElements(selector);

        if(result){
            if(result.length > 1){
                this[0] = [...result];
                this.length = this[0].length;

            } else {
                this[0] = result[0];
                this.length = 1;
            }
        }

        return this;
    }

    get el(){
        return this[0];
    }

    set el(v){
        this[0] = v;
    }

    getElements(selector){
        return Array.from(document.querySelectorAll(selector))
    }

    on(events, callback, capture){
        return events.split(',').forEach(e => (this.length === 1 ? [this.el] : this.el).forEach(v => v.addEventListener(e, callback, capture))), this;
    }

    off(events, callback){
        return events.split(',').forEach(e => (this.length === 1 ? [this.el] : this.el).forEach(v => v.removeEventListener(e, callback))), this;
    }

    append(...elements){
        if(!Array.isArray(this.el)) this.el = [this.el];
        return this.el.forEach(v => { elements.forEach(c => v.appendChild(c)); }), this;
    }

    prepend(...elements){
        if(!Array.isArray(this.el)) this.el = [this.el];
        return this.el.forEach(v => { elements.reverse().forEach(c => v.insertBefore(c, v.firstChild)); }), this;
    }

    insertBefore(node){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.parentNode.insertBefore(node, el), this;
    }

    insertAfter(node){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        return el.parentNode.insertBefore(node, el.nextSibling), this;
    }

    prev(){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        this.el = el.previousElementSibling;

        return this;
    }

    next(){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        this.el = el.nextElementSibling;

        return this;
    }

    last(){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        this.el =  el.lastElementChild;

        return this;
    }

    first(){
        if(this.length !== 1) Assist.error('There must be only one node');

        const [el] = this.el;

        this.el = el.firstElementChild;

        return this;
    }

    find(selector){
        const iterable =  new Traverse(this.el[0], selector);

        this.el = [...iterable];

        return this;
    }

    remove(){
        this.el.remove();
    }

    show(){
        this.el.style.display = '';

        return this.el;
    }

    hide(){
        this.el.style.display = 'none';

        return this.el;
    }

    set html(v){
        this.el.innerHTML = v;
    }

    get html(){
        return this.el.innerHTML;
    }
};

let $;

$ = selector => {
    return new Dom(selector);
};

export default $;
