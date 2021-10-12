"use strict";(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[8597],{89800:function(t,e,n){var r=n(36279),o=n(72483),i=n(71100);function u(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var a=u(r),c={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},s=function(t){function e(n,r,o){var i=t.call(this,r)||this;return Object.setPrototypeOf(i,e.prototype),i.code=n,i.details=o,i}return o.__extends(e,t),e}(Error),f=function(){function t(t,e){var n=this;this.auth=null,this.messaging=null,this.auth=t.getImmediate({optional:!0}),this.messaging=e.getImmediate({optional:!0}),this.auth||t.get().then(function(t){return n.auth=t},function(){}),this.messaging||e.get().then(function(t){return n.messaging=t},function(){})}return t.prototype.getAuthToken=function(){return o.__awaiter(this,void 0,void 0,function(){var t;return o.__generator(this,function(e){switch(e.label){case 0:if(!this.auth)return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return(t=e.sent())?[2,t.accessToken]:[2,void 0];case 3:return e.sent(),[2,void 0];case 4:return[2]}})})},t.prototype.getInstanceIdToken=function(){return o.__awaiter(this,void 0,void 0,function(){return o.__generator(this,function(t){if(!this.messaging||!("Notification"in self)||"granted"!==Notification.permission)return[2,void 0];try{return[2,this.messaging.getToken()]}catch(p){return[2,void 0]}return[2]})})},t.prototype.getContext=function(){return o.__awaiter(this,void 0,void 0,function(){var t,e;return o.__generator(this,function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return t=n.sent(),[4,this.getInstanceIdToken()];case 2:return e=n.sent(),[2,{authToken:t,instanceIdToken:e}]}})})},t}();function l(t,e){var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}var d,h,p,y=function(){function t(){}return t.prototype.encode=function(t){var e=this;if(null==t)return null;if(t instanceof Number&&(t=t.valueOf()),"number"==typeof t&&isFinite(t)||!0===t||!1===t||"[object String]"===Object.prototype.toString.call(t))return t;if(Array.isArray(t))return t.map(function(t){return e.encode(t)});if("function"==typeof t||"object"==typeof t)return l(t,function(t){return e.encode(t)});throw new Error("Data cannot be encoded in JSON: "+t)},t.prototype.decode=function(t){var e=this;if(null==t)return t;if(t["@type"])switch(t["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var n=Number(t.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+t);return n;default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(function(t){return e.decode(t)}):"function"==typeof t||"object"==typeof t?l(t,function(t){return e.decode(t)}):t},t}(),v=function(){function t(t,e,n,r,o){var i=this;void 0===r&&(r="us-central1"),this.app_=t,this.fetchImpl=o,this.serializer=new y,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return Promise.resolve(i.deleteService())}},this.contextProvider=new f(e,n),this.cancelAllRequests=new Promise(function(t){i.deleteService=function(){return t()}});try{var u=new URL(r);this.customDomain=u.origin,this.region="us-central1"}catch(a){this.customDomain=null,this.region=r}}return Object.defineProperty(t.prototype,"app",{get:function(){return this.app_},enumerable:!1,configurable:!0}),t.prototype._url=function(t){var e=this.app_.options.projectId;return null!==this.emulatorOrigin?this.emulatorOrigin+"/"+e+"/"+this.region+"/"+t:null!==this.customDomain?this.customDomain+"/"+t:"https://"+this.region+"-"+e+".cloudfunctions.net/"+t},t.prototype.useFunctionsEmulator=function(t){this.emulatorOrigin=t},t.prototype.httpsCallable=function(t,e){var n=this;return function(r){return n.call(t,r,e||{})}},t.prototype.postJSON=function(t,e,n){return o.__awaiter(this,void 0,void 0,function(){var r,i;return o.__generator(this,function(o){switch(o.label){case 0:n["Content-Type"]="application/json",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,this.fetchImpl(t,{method:"POST",body:JSON.stringify(e),headers:n})];case 2:return r=o.sent(),[3,4];case 3:return o.sent(),[2,{status:0,json:null}];case 4:i=null,o.label=5;case 5:return o.trys.push([5,7,,8]),[4,r.json()];case 6:return i=o.sent(),[3,8];case 7:return o.sent(),[3,8];case 8:return[2,{status:r.status,json:i}]}})})},t.prototype.call=function(t,e,n){return o.__awaiter(this,void 0,void 0,function(){var r,i,u,a,f,l,d,h,p,y;return o.__generator(this,function(o){switch(o.label){case 0:return r=this._url(t),e=this.serializer.encode(e),i={data:e},u={},[4,this.contextProvider.getContext()];case 1:return(a=o.sent()).authToken&&(u.Authorization="Bearer "+a.authToken),a.instanceIdToken&&(u["Firebase-Instance-ID-Token"]=a.instanceIdToken),f=function(t){var e,n=new Promise(function(n,r){e=setTimeout(function(){r(new s("deadline-exceeded","deadline-exceeded"))},t)});return{timer:e,promise:n}}(n.timeout||7e4),l=f.timer,d=f.promise,[4,Promise.race([m(l,this.postJSON(r,i,u)),d,m(l,this.cancelAllRequests)])];case 2:if(!(h=o.sent()))throw new s("cancelled","Firebase Functions instance was deleted.");if(p=function(t,e,n){var r=function(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(t),o=r,i=void 0;try{var u=e&&e.error;if(u){var a=u.status;if("string"==typeof a){if(!c[a])return new s("internal","internal");r=c[a],o=a}var l=u.message;"string"==typeof l&&(o=l),void 0!==(i=u.details)&&(i=n.decode(i))}}catch(f){}return"ok"===r?null:new s(r,o,i)}(h.status,h.json,this.serializer))throw p;if(!h.json)throw new s("internal","Response is not valid JSON object.");if(void 0===(y=h.json.data)&&(y=h.json.result),void 0===y)throw new s("internal","Response is missing data field.");return[2,{data:this.serializer.decode(y)}]}})})},t}();function m(t,e){return o.__awaiter(this,void 0,void 0,function(){var n;return o.__generator(this,function(r){switch(r.label){case 0:return[4,e];case 1:return n=r.sent(),clearTimeout(t),[2,n]}})})}d=a.default,h=fetch.bind(self),p={Functions:v},d.INTERNAL.registerComponent(new i.Component("functions",function(t,e){var n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("messaging");return new v(n,r,o,e,h)},"PUBLIC").setServiceProps(p).setMultipleInstances(!0)),a.default.registerVersion("@firebase/functions","0.5.1")},78597:function(t,e,n){n.r(e),n(89800)},72483:function(t,e,n){n.r(e),n.d(e,{__extends:function(){return o},__assign:function(){return i},__rest:function(){return u},__decorate:function(){return a},__param:function(){return c},__metadata:function(){return s},__awaiter:function(){return f},__generator:function(){return l},__createBinding:function(){return d},__exportStar:function(){return h},__values:function(){return p},__read:function(){return y},__spread:function(){return v},__spreadArrays:function(){return m},__await:function(){return _},__asyncGenerator:function(){return g},__asyncDelegator:function(){return b},__asyncValues:function(){return w},__makeTemplateObject:function(){return O},__importStar:function(){return E},__importDefault:function(){return I},__classPrivateFieldGet:function(){return S},__classPrivateFieldSet:function(){return T}});var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function o(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function u(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function a(t,e,n,r){var o,i=arguments.length,u=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(u=(i<3?o(u):i>3?o(e,n,u):o(e,n))||u);return i>3&&u&&Object.defineProperty(e,n,u),u}function c(t,e){return function(n,r){e(n,r,t)}}function s(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function f(t,e,n,r){return new(n||(n=Promise))(function(o,i){function u(t){try{c(r.next(t))}catch(e){i(e)}}function a(t){try{c(r.throw(t))}catch(e){i(e)}}function c(t){t.done?o(t.value):function(t){return t instanceof n?t:new n(function(e){e(t)})}(t.value).then(u,a)}c((r=r.apply(t,e||[])).next())})}function l(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function d(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}function h(t,e){for(var n in t)"default"!==n&&!e.hasOwnProperty(n)&&(e[n]=t[n])}function p(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function y(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u}function v(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(y(arguments[e]));return t}function m(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],u=0,a=i.length;u<a;u++,o++)r[o]=i[u];return r}function _(t){return this instanceof _?(this.v=t,this):new _(t)}function g(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(t,e||[]),i=[];return r={},u("next"),u("throw"),u("return"),r[Symbol.asyncIterator]=function(){return this},r;function u(t){o[t]&&(r[t]=function(e){return new Promise(function(n,r){i.push([t,e,n,r])>1||a(t,e)})})}function a(t,e){try{!function(t){t.value instanceof _?Promise.resolve(t.value.v).then(c,s):f(i[0][2],t)}(o[t](e))}catch(n){f(i[0][3],n)}}function c(t){a("next",t)}function s(t){a("throw",t)}function f(t,e){t(e),i.shift(),i.length&&a(i[0][0],i[0][1])}}function b(t){var e,n;return e={},r("next"),r("throw",function(t){throw t}),r("return"),e[Symbol.iterator]=function(){return this},e;function r(r,o){e[r]=t[r]?function(e){return(n=!n)?{value:_(t[r](e)),done:"return"===r}:o?o(e):e}:o}}function w(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=p(t),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise(function(r,o){!function(t,e,n,r){Promise.resolve(r).then(function(e){t({value:e,done:n})},e)}(r,o,(e=t[n](e)).done,e.value)})}}}function O(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}function E(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function I(t){return t&&t.__esModule?t:{default:t}}function S(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}function T(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}}}]);