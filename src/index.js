import $ from '@/assist';

// dom test
console.log($('#app'));

// custom data get test
const data = $('#app').data('parent-id');
console.log(data);

// custom data set test
console.log($('#app').data('parent-id', 1));
