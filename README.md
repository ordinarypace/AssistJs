# Assist.js

## Description
Library containing ES6-based DOM control and utility methods.

## How to Use
#### DOM
```ruby
import $ from '@/assist';

$('#app')
$('#app').data('parent-id')
$('#app').data('parent-id', 1);

const first = $('.test-list').first();
const last = $('.test-list').last();
const next = $('.a').next();
const prev = $('.b').prev();
const target = $('.test-list').find('.e');

```
