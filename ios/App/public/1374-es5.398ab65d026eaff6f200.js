!function(){"use strict";function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function r(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[1374],{81374:function(n,t,s){s.r(t),s.d(t,{ion_spinner:function(){return c}});var i=s(23150),a=s(97585),o=s(61269),l=s(60408),c=function(){function n(e){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,n),(0,i.r)(this,e),this.paused=!1}var t,s,c;return t=n,(s=[{key:"getName",value:function(){var e=this.name||a.c.get("spinner"),r=(0,a.b)(this);return e||("ios"===r?"lines":"circular")}},{key:"render",value:function(){var r,n=this,t=(0,a.b)(n),s=n.getName(),c=l.S[s]||l.S.lines,u="number"==typeof n.duration&&n.duration>10?n.duration:c.dur,m=[];if(void 0!==c.circles)for(var k=0;k<c.circles;k++)m.push(f(c,u,k,c.circles));else if(void 0!==c.lines)for(var d=0;d<c.lines;d++)m.push(p(c,u,d,c.lines));return(0,i.h)(i.H,{class:(0,o.c)(n.color,(r={},e(r,t,!0),e(r,"spinner-".concat(s),!0),e(r,"spinner-paused",!!n.paused||a.c.getBoolean("_testing")),r)),role:"progressbar",style:c.elmDuration?{animationDuration:u+"ms"}:{}},m)}}])&&r(t.prototype,s),c&&r(t,c),n}(),f=function(e,r,n,t){var s=e.fn(r,n,t);return s.style["animation-duration"]=r+"ms",(0,i.h)("svg",{viewBox:s.viewBox||"0 0 64 64",style:s.style},(0,i.h)("circle",{transform:s.transform||"translate(32,32)",cx:s.cx,cy:s.cy,r:s.r,style:e.elmDuration?{animationDuration:r+"ms"}:{}}))},p=function(e,r,n,t){var s=e.fn(r,n,t);return s.style["animation-duration"]=r+"ms",(0,i.h)("svg",{viewBox:s.viewBox||"0 0 64 64",style:s.style},(0,i.h)("line",{transform:"translate(32,32)",y1:s.y1,y2:s.y2}))};c.style=":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}[dir=rtl] svg,:host-context([dir=rtl]) svg{left:unset;right:unset;right:0}[dir=rtl] svg,:host-context([dir=rtl]) svg{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-circular){-webkit-animation:spinner-circular linear infinite;animation:spinner-circular linear infinite}:host(.spinner-circular) circle{-webkit-animation:spinner-circular-inner ease-in-out infinite;animation:spinner-circular-inner ease-in-out infinite;stroke:currentColor;stroke-dasharray:80px, 200px;stroke-dashoffset:0px;stroke-width:5.6;fill:none}:host(.spinner-paused),:host(.spinner-paused) svg,:host(.spinner-paused) circle{-webkit-animation-play-state:paused;animation-play-state:paused}@-webkit-keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@-webkit-keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}@keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}"}}])}();