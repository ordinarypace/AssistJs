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

$('.test-list').append(document.createElement('li'));
$('.test-list').prepend(document.createElement('li'));
$('.test-list').insertBefore(document.createElement('div'));
$('.test-list').insertAfter(document.createElement('div'));

console.log($('body').find('div'));

// get query string
console.log($.query.params());


