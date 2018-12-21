import './lib/polyfill';
import http from './lib/http';
import storage from './lib/storage';
import date from './lib/storage';
import cookie from './lib/cookie';
import query from './lib/query';
import number from './lib/number';
import { empty, is } from './lib/utility';
import Dom from './lib/dom';

let $;

$ = selector => {
    return new Dom(selector);
};

$.version = '0.0.1';
$.empty = empty;
$.is = is;
$.query = query;
$.cookie = cookie;
$.number = number;
$.storage = storage;
$.ajax = http.ajax;
$.date = date;

export default $;
