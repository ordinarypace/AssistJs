import './lib/polyfill';
import http from './lib/http';
import storage from './lib/storage';
import date from './lib/storage';
import cookie from './lib/cookie';
import query from './lib/query';
import number from './lib/number';
import { empty, error, is, debounce, throttle } from './lib/utility';
import $ from './lib/dom';

$.version = '0.0.1';
$.empty = empty;
$.is = is;
$.error = error;
$.debounce = debounce;
$.throttle = throttle;
$.query = query;
$.cookie = cookie;
$.number = number;
$.storage = storage;
$.ajax = http.ajax;
$.date = date;

export default $;
