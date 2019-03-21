export default ({ els }) => (Array.isArray(els) && els || Array.from(els)).map((v, i) => {
        if(v.checked) return i;
    }).filter(v => !(v === undefined));

