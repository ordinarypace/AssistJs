import moment from 'moment';

const date = (_ => {
    const now = _ => {
        return moment();
    };

    const format = (str = 'YYYY-MM-DD') => {
        return moment().format(str);
    };

    return {
        now,
        format
    }
})();