/*!
 * Copyright (c) 2014 Chris O'Hara <cohara87@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(t,e){"undefined"!=typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&"object"==typeof define.amd?define(e):this[t]=e()}("validator",function(t){"use strict";function e(t,e){t=t||{};for(var n in e)"undefined"==typeof t[n]&&(t[n]=e[n]);return t}t={version:"3.22.2"};var n=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,r=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,u=/^(?:[0-9]{9}X|[0-9]{10})$/,i=/^(?:[0-9]{13})$/,o=/^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/,F=/^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/,s={3:/^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,4:/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,5:/^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,all:/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i},a=/^[a-zA-Z]+$/,f=/^[a-zA-Z0-9]+$/,l=/^-?[0-9]+$/,c=/^(?:-?(?:0|[1-9][0-9]*))$/,p=/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,d=/^[0-9a-fA-F]+$/,g=/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,x=/^[\x00-\x7F]+$/,D=/[^\x00-\x7F]/,A=/[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,h=/[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/,E=/[\uD800-\uDBFF][\uDC00-\uDFFF]/,$=/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/;t.extend=function(e,n){t[e]=function(){var e=Array.prototype.slice.call(arguments);return e[0]=t.toString(e[0]),n.apply(t,e)}},t.init=function(){for(var e in t)"function"==typeof t[e]&&"toString"!==e&&"toDate"!==e&&"extend"!==e&&"init"!==e&&t.extend(e,t[e])},t.toString=function(t){return"object"==typeof t&&null!==t&&t.toString?t=t.toString():null===t||"undefined"==typeof t||isNaN(t)&&!t.length?t="":"string"!=typeof t&&(t+=""),t},t.toDate=function(t){return"[object Date]"===Object.prototype.toString.call(t)?t:(t=Date.parse(t),isNaN(t)?null:new Date(t))},t.toFloat=function(t){return parseFloat(t)},t.toInt=function(t,e){return parseInt(t,e||10)},t.toBoolean=function(t,e){return e?"1"===t||"true"===t:"0"!==t&&"false"!==t&&""!==t},t.equals=function(e,n){return e===t.toString(n)},t.contains=function(e,n){return e.indexOf(t.toString(n))>=0},t.matches=function(t,e,n){return"[object RegExp]"!==Object.prototype.toString.call(e)&&(e=new RegExp(e,n)),e.test(t)},t.isEmail=function(t){return n.test(t)};var v={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,allow_underscores:!1};t.isURL=function(n,r){if(!n||n.length>=2083)return!1;if(0===n.indexOf("mailto:"))return!1;r=e(r,v);var u,i,o,F,s,a,f,l,c,p,d,g;if(g=n.split("://"),g.length>1){if(u=g.shift(),-1===r.protocols.indexOf(u))return!1}else if(r.require_protocol)return!1;if(n=g.join("://"),g=n.split("#"),n=g.shift(),d=g.join("#"),d&&/\s/.test(d))return!1;if(g=n.split("?"),n=g.shift(),p=g.join("?"),p&&/\s/.test(p))return!1;if(g=n.split("/"),n=g.shift(),c=g.join("/"),c&&/\s/.test(c))return!1;if(g=n.split("@"),g.length>1&&(F=g.shift(),F.indexOf(":")>=0)){if(F=F.split(":"),i=F.shift(),!/^\S+$/.test(i))return!1;if(o=F.join(":"),!/^\S*$/.test(i))return!1}return a=g.join("@"),g=a.split(":"),s=g.shift(),g.length&&(l=g.join(":"),f=parseInt(l,10),!/^[0-9]+$/.test(l)||0>=f||f>65535)?!1:t.isIP(s)||t.isFQDN(s,r)||"localhost"===s?r.host_whitelist&&-1===r.host_whitelist.indexOf(s)?!1:r.host_blacklist&&-1!==r.host_blacklist.indexOf(s)?!1:!0:!1},t.isIP=function(e,n){if(n=t.toString(n),!n)return t.isIP(e,4)||t.isIP(e,6);if("4"===n){if(!o.test(e))return!1;var r=e.split(".").sort(function(t,e){return t-e});return r[3]<=255}return"6"===n&&F.test(e)};var m={require_tld:!0,allow_underscores:!1};t.isFQDN=function(t,n){n=e(n,m);var r=t.split(".");if(n.require_tld){var u=r.pop();if(!r.length||!/^[a-z]{2,}$/i.test(u))return!1}for(var i,o=0;o<r.length;o++){if(i=r[o],n.allow_underscores){if(i.indexOf("__")>=0)return!1;i=i.replace(/_/g,"")}if(!/^[a-z\u00a1-\uffff0-9-]+$/i.test(i))return!1;if("-"===i[0]||"-"===i[i.length-1]||i.indexOf("---")>=0)return!1}return!0},t.isAlpha=function(t){return a.test(t)},t.isAlphanumeric=function(t){return f.test(t)},t.isNumeric=function(t){return l.test(t)},t.isHexadecimal=function(t){return d.test(t)},t.isHexColor=function(t){return g.test(t)},t.isLowercase=function(t){return t===t.toLowerCase()},t.isUppercase=function(t){return t===t.toUpperCase()},t.isInt=function(t){return c.test(t)},t.isFloat=function(t){return""!==t&&p.test(t)},t.isDivisibleBy=function(e,n){return t.toFloat(e)%t.toInt(n)===0},t.isNull=function(t){return 0===t.length},t.isLength=function(t,e,n){var r=t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[],u=t.length-r.length;return u>=e&&("undefined"==typeof n||n>=u)},t.isByteLength=function(t,e,n){return t.length>=e&&("undefined"==typeof n||t.length<=n)},t.isUUID=function(t,e){var n=s[e?e:"all"];return n&&n.test(t)},t.isDate=function(t){return!isNaN(Date.parse(t))},t.isAfter=function(e,n){var r=t.toDate(n||new Date),u=t.toDate(e);return!!(u&&r&&u>r)},t.isBefore=function(e,n){var r=t.toDate(n||new Date),u=t.toDate(e);return u&&r&&r>u},t.isIn=function(e,n){if(!n||"function"!=typeof n.indexOf)return!1;if("[object Array]"===Object.prototype.toString.call(n)){for(var r=[],u=0,i=n.length;i>u;u++)r[u]=t.toString(n[u]);n=r}return n.indexOf(e)>=0},t.isCreditCard=function(t){var e=t.replace(/[^0-9]+/g,"");if(!r.test(e))return!1;for(var n,u,i,o=0,F=e.length-1;F>=0;F--)n=e.substring(F,F+1),u=parseInt(n,10),i?(u*=2,o+=u>=10?u%10+1:u):o+=u,i=!i;return!!(o%10===0?e:!1)},t.isISBN=function(e,n){if(n=t.toString(n),!n)return t.isISBN(e,10)||t.isISBN(e,13);var r,o=e.replace(/[\s-]+/g,""),F=0;if("10"===n){if(!u.test(o))return!1;for(r=0;9>r;r++)F+=(r+1)*o.charAt(r);if(F+="X"===o.charAt(9)?100:10*o.charAt(9),F%11===0)return!!o}else if("13"===n){if(!i.test(o))return!1;var s=[1,3];for(r=0;12>r;r++)F+=s[r%2]*o.charAt(r);if(o.charAt(12)-(10-F%10)%10===0)return!!o}return!1},t.isJSON=function(t){try{JSON.parse(t)}catch(e){return!1}return!0},t.isMultibyte=function(t){return D.test(t)},t.isAscii=function(t){return x.test(t)},t.isFullWidth=function(t){return A.test(t)},t.isHalfWidth=function(t){return h.test(t)},t.isVariableWidth=function(t){return A.test(t)&&h.test(t)},t.isSurrogatePair=function(t){return E.test(t)},t.isBase64=function(t){return $.test(t)},t.isMongoId=function(e){return t.isHexadecimal(e)&&24===e.length},t.ltrim=function(t,e){var n=e?new RegExp("^["+e+"]+","g"):/^\s+/g;return t.replace(n,"")},t.rtrim=function(t,e){var n=e?new RegExp("["+e+"]+$","g"):/\s+$/g;return t.replace(n,"")},t.trim=function(t,e){var n=e?new RegExp("^["+e+"]+|["+e+"]+$","g"):/^\s+|\s+$/g;return t.replace(n,"")},t.escape=function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},t.stripLow=function(e,n){var r=n?"\x00-	\f-":"\x00-";return t.blacklist(e,r)},t.whitelist=function(t,e){return t.replace(new RegExp("[^"+e+"]+","g"),"")},t.blacklist=function(t,e){return t.replace(new RegExp("["+e+"]+","g"),"")};var w={lowercase:!0};return t.normalizeEmail=function(n,r){if(r=e(r,w),!t.isEmail(n))return!1;var u=n.split("@",2);return u[1]=u[1].toLowerCase(),r.lowercase&&(u[0]=u[0].toLowerCase()),("gmail.com"===u[1]||"googlemail.com"===u[1])&&(r.lowercase||(u[0]=u[0].toLowerCase()),u[0]=u[0].replace(/\./g,"").split("+")[0],u[1]="gmail.com"),u.join("@")},t.init(),t});