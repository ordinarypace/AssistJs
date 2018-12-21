# Assist.js

## Description
Library containing ES6-based DOM control and utility methods.

## How to Use
#### DOM
```ruby
import $ from '@/assist';

// dom test
$('#app') // [div#app];

// custom data get test
$('#app').data('parent-id') // 1111

// custom data set test
$('#app').data('parent-id', 1); // change data-parent-id value

// first, last, next, prev, find
const first = $('.test-list').first();
const last = $('.test-list').last();
const next = $('.a').next();
const prev = $('.b').prev();
const target = $('.test-list').find('.e');

// get query string
console.log($.query.params());

```
