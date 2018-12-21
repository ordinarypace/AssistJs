# Assist.js

## Description
Library containing ES6-based DOM control and utility methods.

## How to Use
#### DOM
```ruby
import $ from '@/assist';

// get node list
$('#app') // [div#app];

// get custom data
$('#app').data('parent-id') // 1111

// set custom data
$('#app').data('parent-id', 1); // change data-parent-id value

// first, last, next, prev, find
const first = $('.test-list').first();
const last = $('.test-list').last();
const next = $('.a').next();
const prev = $('.b').prev();

// find
const target = $('.test-list').find('.e');

```
