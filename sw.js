(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function activate(){var e,t,n,r;return regeneratorRuntime.async(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,caches.keys();case 2:e=s.sent,t=e[Symbol.iterator]();case 4:if((n=t.next()).done){s.next=13;break}if(r=n.value,/^svgomg-/.test(r)){s.next=8;break}return s.abrupt("continue",11);case 8:if(-1!=expectedCaches.indexOf(r)){s.next=11;break}return s.next=11,caches["delete"](r);case 11:s.next=4;break;case 13:return s.next=15,storage.set("active-version",version);case 15:case"end":return s.stop()}},null,this)}function handleFontRequest(e){var t,n,r;return regeneratorRuntime.async(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,caches.match(e);case 2:if(t=s.sent,!t){s.next=5;break}return s.abrupt("return",t);case 5:return s.next=7,fetch(e.clone());case 7:return n=s.sent,s.next=10,caches.open("svgomg-fonts");case 10:return r=s.sent,r.put(e,n.clone()),s.abrupt("return",n);case 13:case"end":return s.stop()}},null,this)}require("regenerator/runtime"),require("./cache-polyfill");var storage=require("../utils/storage"),version=require("../../changelog.json")[0].version,cacheVerion=version.split(".")[0];self.addEventListener("install",function(e){var t=this;e.waitUntil(function(){var e,n,r;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return e=storage.get("active-version"),t.next=3,caches.open("svgomg-static-"+cacheVerion);case 3:return n=t.sent,t.next=6,n.addAll(["./","imgs/icon.png","css/all.css","js/gzip-worker.js","js/page.js","js/prism-worker.js","js/svgo-worker.js","changelog.json",new Request("https://fonts.googleapis.com/css?family=Roboto:400,700|Inconsolata",{mode:"no-cors"})]);case 6:return t.next=8,e;case 8:if(r=t.sent,r&&r.split(".")[0]!==version.split(".")[0]){t.next=13;break}return self.skipWaiting&&self.skipWaiting(),t.next=13,activate();case 13:case"end":return t.stop()}},null,t)}())});var expectedCaches=["svgomg-static-"+cacheVerion];self.addEventListener("activate",function(e){e.waitUntil(activate())}),self.addEventListener("fetch",function(e){var t=new URL(e.request.url);e.respondWith("fonts.gstatic.com"==t.host?handleFontRequest(e.request):caches.match(e.request).then(function(t){return t||fetch(e.request)}))});
//# sourceMappingURL=out.js.map

},{"../../changelog.json":3,"../utils/storage":6,"./cache-polyfill":4,"regenerator/runtime":2}],2:[function(require,module,exports){
(function (global){
!function(t){"use strict";function r(t,r,e,n){return new i(t,r,e||null,n||[])}function e(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function n(){}function o(){}function i(t,r,n,o){function i(r,o){if(u===w)throw new Error("Generator is already running");if(u===m)return f();for(;;){var i=c.delegate;if(i){var a=e(i.iterator[r],i.iterator,o);if("throw"===a.type){c.delegate=null,r="throw",o=a.arg;continue}r="next",o=s;var l=a.arg;if(!l.done)return u=g,l;c[i.resultName]=l.value,c.next=i.nextLoc,c.delegate=null}if("next"===r){if(u===d&&"undefined"!=typeof o)throw new TypeError("attempt to send "+JSON.stringify(o)+" to newborn generator");u===g?c.sent=o:delete c.sent}else if("throw"===r){if(u===d)throw u=m,o;c.dispatchException(o)&&(r="next",o=s)}else"return"===r&&c.abrupt("return",o);u=w;var a=e(t,n,c);if("normal"===a.type){u=c.done?m:g;var l={value:a.arg,done:c.done};if(a.arg!==L)return l;c.delegate&&"next"===r&&(o=s)}else"throw"===a.type&&(u=m,"next"===r?c.dispatchException(a.arg):o=a.arg)}}var a=r?Object.create(r.prototype):this,c=new l(o),u=d;return a.next=i.bind(a,"next"),a["throw"]=i.bind(a,"throw"),a["return"]=i.bind(a,"return"),a}function a(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function c(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function l(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(a,this),this.reset()}function u(t){if(t){var r=t[p];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,n=function o(){for(;++e<t.length;)if(h.call(t,e))return o.value=t[e],o.done=!1,o;return o.value=s,o.done=!0,o};return n.next=n}}return{next:f}}function f(){return{value:s,done:!0}}var s,h=Object.prototype.hasOwnProperty,p="function"==typeof Symbol&&Symbol.iterator||"@@iterator",y="object"==typeof module,v=t.regeneratorRuntime;if(v)return void(y&&(module.exports=v));v=t.regeneratorRuntime=y?module.exports:{},v.wrap=r;var d="suspendedStart",g="suspendedYield",w="executing",m="completed",L={},x=o.prototype=i.prototype;n.prototype=x.constructor=o,o.constructor=n,n.displayName="GeneratorFunction",v.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return r?r===n||"GeneratorFunction"===(r.displayName||r.name):!1},v.mark=function(t){return t.__proto__=o,t.prototype=Object.create(x),t},v.async=function(t,n,o,i){return new Promise(function(a,c){function l(t){var r=e(this,null,t);if("throw"===r.type)return void c(r.arg);var n=r.arg;n.done?a(n.value):Promise.resolve(n.value).then(f,s)}var u=r(t,n,o,i),f=l.bind(u.next),s=l.bind(u["throw"]);f()})},x[p]=function(){return this},x.toString=function(){return"[object Generator]"},v.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function n(){for(;r.length;){var e=r.pop();if(e in t)return n.value=e,n.done=!1,n}return n.done=!0,n}},v.values=u,l.prototype={constructor:l,reset:function(){this.prev=0,this.next=0,this.sent=s,this.done=!1,this.delegate=null,this.tryEntries.forEach(c);for(var t,r=0;h.call(this,t="t"+r)||20>r;++r)this[t]=null},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){function r(r,n){return i.type="throw",i.arg=t,e.next=r,!!n}if(this.done)throw t;for(var e=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var a=h.call(o,"catchLoc"),c=h.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&h.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?this.next=o.finallyLoc:this.complete(i),L},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&r&&(this.next=r),L},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc)}},"catch":function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;c(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:u(t),resultName:r,nextLoc:e},L}}}("object"==typeof global?global:"object"==typeof window?window:this);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
module.exports=[
  {
    "version": "1.2.4",
    "changes": [
      "Download button now works in IE."
    ]
  },
  {
    "version": "1.2.3",
    "changes": [
      "Fixing bug introduced by browserify."
    ]
  },
  {
    "version": "1.2.2",
    "changes": [
      "Better font loading."
    ]
  },
  {
    "version": "1.2.1",
    "changes": [
      "Lots of performance improvements."
    ]
  },
  {
    "version": "1.2.0",
    "changes": [
      "Code view.",
      "Prettify code option."
    ]
  },
  {
    "version": "1.1.7",
    "changes": [
      "Performance improvements."
    ]
  },
  {
    "version": "1.1.6",
    "changes": [
      "Fix zooming with mouse wheels."
    ]
  },
  {
    "version": "1.1.5",
    "changes": [
      "Removing erroneous scrollbars in Firefox."
    ]
  },
  {
    "version": "1.1.4",
    "changes": [
      "Fixed 'about' link."
    ]
  },
  {
    "version": "1.1.3",
    "changes": [
      "Reverting some painting stuff until I get a handle on the performance.",
      "Using simpler demo SVG."
    ]
  },
  {
    "version": "1.1.2",
    "changes": [
      "Sharper rendering on desktop Chrome & Safari.",
      "Fixed right mouse button issue."
    ]
  },
  {
    "version": "1.1.1",
    "changes": [
      "Reset zooming on image load."
    ]
  },
  {
    "version": "1.1.0",
    "changes": [
      "Click/touch and drag panning.",
      "Pinch zooming.",
      "Wheel zooming."
    ]
  },
  {
    "version": "1.0.4",
    "changes": [
      "Fixing checkered background in IE.",
      "Improving slider touch interaction."
    ]
  },
  {
    "version": "1.0.3",
    "changes": [
      "Fixing SVG output in Firefox."
    ]
  },
  {
    "version": "1.0.2",
    "changes": [
      "Caching fonts for offline use.",
      "Removing tap delay on iPhone/iPad.",
      "Fixing iOS add-to-homescreen.",
      "Better mobile demo image."
    ]
  },
  {
    "version": "1.0.1",
    "changes": [
      "Layout fixes.",
      "Better mobile keyboard handling.",
      "A lighter demo SVG for mobile.",
      "Fixing drag & drop."
    ]
  },
  {
    "version": "1.0.0",
    "changes": [
      "First release."
    ]
  }
]
},{}],4:[function(require,module,exports){
"use strict";Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(t){var e=function(t){this.name="NetworkError",this.code=19,this.message=t},r=this;return e.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return t=t.map(function(t){return t instanceof Request?t:String(t)}),Promise.all(t.map(function(t){"string"==typeof t&&(t=new Request(t));var r=new URL(t.url).protocol;if("http:"!==r&&"https:"!==r)throw new e("Invalid scheme");return fetch(t.clone())}))}).then(function(e){return Promise.all(e.map(function(e,n){return r.put(t[n],e)}))}).then(function(){return void 0})}),CacheStorage.prototype.match||(CacheStorage.prototype.match=function(t,e){var r=this;return this.keys().then(function(n){var o;return n.reduce(function(n,u){return n.then(function(){return o||r.open(u).then(function(r){return r.match(t,e)}).then(function(t){return o=t})})},Promise.resolve())})}),module.exports=self.caches;
//# sourceMappingURL=out.js.map

},{}],5:[function(require,module,exports){
"use strict";function promisifyRequest(e){return new Promise(function(t,r){var n=function(){t(e.result),i()},o=function(){r(e.error),i()},i=function(){e.removeEventListener("complete",n),e.removeEventListener("success",n),e.removeEventListener("error",o),e.removeEventListener("abort",o)};e.addEventListener("complete",n),e.addEventListener("success",n),e.addEventListener("error",o),e.addEventListener("abort",o)})}var _prototypeProperties=function(e,t,r){t&&Object.defineProperties(e,t),r&&Object.defineProperties(e.prototype,r)},IndexedDouchebag=function(){function e(e,t,r){var n=indexedDB.open(e,t);this.ready=promisifyRequest(n),n.onupgradeneeded=function(e){r(n.result,e.oldVersion)}}return _prototypeProperties(e,null,{transaction:{value:function(e,t,r){return this.ready.then(function(n){var o="readonly";t.apply?r=t:t&&(o=t);var i,u=n.transaction(e,o),a=r(u,n),s=promisifyRequest(u);return a?(i=a[0]&&"result"in a[0]?Promise.all(a.map(promisifyRequest)):promisifyRequest(a),s.then(function(){return i})):s})},writable:!0,enumerable:!0,configurable:!0},get:{value:function(e,t){return this.transaction(e,function(r){return r.objectStore(e).get(t)})},writable:!0,enumerable:!0,configurable:!0},put:{value:function(e,t,r){return this.transaction(e,"readwrite",function(n){n.objectStore(e).put(r,t)})},writable:!0,enumerable:!0,configurable:!0},"delete":{value:function(e,t){return this.transaction(e,"readwrite",function(r){r.objectStore(e)["delete"](t)})},writable:!0,enumerable:!0,configurable:!0}}),e}();module.exports=IndexedDouchebag;
//# sourceMappingURL=out.js.map

},{}],6:[function(require,module,exports){
"use strict";function getIdb(){return idb||(idb=new Idb("svgo-keyval",1,function(e){e.createObjectStore("keyval")})),idb}var Idb=require("./indexeddouchbag"),idb;module.exports=self.indexedDB?{get:function(e){return getIdb().get("keyval",e)},set:function(e,t){return getIdb().put("keyval",e,t)},"delete":function(e){return getIdb()["delete"]("keyval",e)}}:{get:function(e){return Promise.resolve(localStorage.getItem(e))},set:function(e,t){return Promise.resolve(localStorage.setItem(e,t))},"delete":function(e){return Promise.resolve(localStorage.removeItem(e))}};
//# sourceMappingURL=out.js.map

},{"./indexeddouchbag":5}]},{},[1]);

//# sourceMappingURL=sw.js.map