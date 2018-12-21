# Assist.js

## Description
Library containing ES6-based DOM control and utility methods.

## How to Use
#### DOM
```ruby
import $ from '@/assist';

$('#app')
$('#app').append(childNode)
$('#app').prepend(childNode)
$('#app').insertAfter(newNode)

$('#app').data('parent-id')
$('#app').data('parent-id', 1);

$('.test-list').first();
$('.test-list').last();
$('.a').next();
$('.b').prev();
$('.test-list').find('.e');

```
#### Event
```ruby
$('#button').on('click, mouseover, mouseleave', _ => {}, false)
$('#button').off('click, mouseover, mouseleave', _ => {}, false)
```

#### Utility
```ruby
$.query.params(url = location.search)
$.query.string(object)

$.cookie.get(name)
$.cookie.set(name, value, expireDate)

$.empty(string or array or object)
$.is(instance, object)
```

#### Storage
```ruby
$.storage.get(key)
$.storage.set(key, value)
$.storage.clear()
$.storage.remove(key)
$.storage.change()
$.storage.status()
```

#### Number
```ruby
$.number.format(number)
$.number.rand(min, max)
```

#### Date
```ruby
$.date.format('YYYY-MM-DD')
$.date.now()
```

#### Asynchronous JavaScript and XML
```ruby
$.ajax = async ({ 
  url, method = 'get', 
  body = {}, 
  credentials = 'omit', 
  mode = 'cors', 
  cache = 'default', 
  headers = {}, 
  timeout = 3000 
})
```




