export default ({ els }) => (Array.isArray(els) && els || Array.from(els)).every(v => v.checked);
