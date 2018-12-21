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

                if(pre === '.' && el.classList.contains(selector)) yield el;
                else if(pre === '#' && el.id === selector) yield el;
                else if(el.tagName.toLowerCase() === this.target) yield el;

            } while(el = el.nextElementSibling);
        }
    }
};

export default Traverse;