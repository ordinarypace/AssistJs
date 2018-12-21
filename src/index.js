import $ from '@/assist';

// dom test
console.log($('#app'));

// custom data get test
const data = $('#app').data('parent-id');
console.log(data);

// custom data set test
console.log($('#app').data('parent-id', 1));

// first, last, next, prev
const first = $('.test-list').first();
const last = $('.test-list').last();
const next = $('.a').next();
const prev = $('.b').prev();

const target = $('.test-list').find('.e');
console.log(target);

// get query string
console.log($.query.params());


