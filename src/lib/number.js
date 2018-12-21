const number = (_ => {
    const format = n => {
        return n.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };

    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        format,
        rand
    }
})();

export default number;