!function(){"use strict";function e(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}function o(e,o){for(var t=0;t<o.length;t++){var r=o[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[3527],{23527:function(t,r,i){i.r(r),i.d(r,{ion_popover:function(){return x}});var n=i(8239),a=i(23150),p=i(97585),s=i(77330),c=i(67053),l=i(61269),d=i(54001),v=i(94086),u=function(e,o){var t="top",r="left",i=e.querySelector(".popover-content"),n=i.getBoundingClientRect(),a=n.width,p=n.height,s=e.ownerDocument.defaultView.innerWidth,c=e.ownerDocument.defaultView.innerHeight,l=o&&o.target&&o.target.getBoundingClientRect(),d=null!=l&&"top"in l?l.top:c/2-p/2,u=null!=l&&"left"in l?l.left:s/2,f=l&&l.width||0,m=l&&l.height||0,b=e.querySelector(".popover-arrow"),x=b.getBoundingClientRect(),g=x.width,w=x.height;null==l&&(b.style.display="none");var y={top:d+m,left:u+f/2-g/2},k={top:d+m+(w-1),left:u+f/2-a/2},D=!1,P=!1;k.left<h+25?(D=!0,k.left=h):a+h+k.left+25>s&&(P=!0,k.left=s-a-h,r="right"),d+m+p>c&&d-p>0?(y.top=d-(w+1),k.top=d-p-(w-1),e.className=e.className+" popover-bottom",t="bottom"):d+m+p>c&&(i.style.bottom=h+"%"),b.style.top=y.top+"px",b.style.left=y.left+"px",i.style.top=k.top+"px",i.style.left=k.left+"px",D&&(i.style.left="calc(".concat(k.left,"px + var(--ion-safe-area-left, 0px))")),P&&(i.style.left="calc(".concat(k.left,"px - var(--ion-safe-area-right, 0px))")),i.style.transformOrigin=t+" "+r;var E=(0,v.c)(),S=(0,v.c)(),C=(0,v.c)();return S.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),C.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),E.addElement(e).easing("ease").duration(100).addAnimation([S,C])},h=5,f=function(e){var o=(0,v.c)(),t=(0,v.c)(),r=(0,v.c)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),r.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),o.addElement(e).easing("ease").duration(500).addAnimation([t,r])},m=function(e,o){var t=e.ownerDocument,r="rtl"===t.dir,i="top",n=r?"right":"left",a=e.querySelector(".popover-content"),p=a.getBoundingClientRect(),s=p.width,c=p.height,l=t.defaultView.innerWidth,d=t.defaultView.innerHeight,u=o&&o.target&&o.target.getBoundingClientRect(),h=null!=u&&"bottom"in u?u.bottom:d/2-c/2,f=u&&u.height||0,m={top:h,left:null!=u&&"left"in u?r?u.left-s+u.width:u.left:l/2-s/2};m.left<12?(m.left=12,n="left"):s+12+m.left>l&&(m.left=l-s-12,n="right"),h+f+c>d&&h-c>0?(m.top=h-c-f,e.className=e.className+" popover-bottom",i="bottom"):h+f+c>d&&(a.style.bottom="12px");var b=(0,v.c)(),x=(0,v.c)(),g=(0,v.c)(),w=(0,v.c)(),y=(0,v.c)();return x.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),g.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),w.addElement(a).beforeStyles({top:"".concat(m.top,"px"),left:"".concat(m.left,"px"),"transform-origin":"".concat(i," ").concat(n)}).fromTo("transform","scale(0.001)","scale(1)"),y.addElement(e.querySelector(".popover-viewport")).fromTo("opacity",.01,1),b.addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).addAnimation([x,g,w,y])},b=function(e){var o=(0,v.c)(),t=(0,v.c)(),r=(0,v.c)();return t.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),r.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),o.addElement(e).easing("ease").duration(500).addAnimation([t,r])},x=function(){function t(e){var o=this;!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,t),(0,a.r)(this,e),this.didPresent=(0,a.e)(this,"ionPopoverDidPresent",7),this.willPresent=(0,a.e)(this,"ionPopoverWillPresent",7),this.willDismiss=(0,a.e)(this,"ionPopoverWillDismiss",7),this.didDismiss=(0,a.e)(this,"ionPopoverDidDismiss",7),this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),o.dismiss()},this.onBackdropTap=function(){o.dismiss(void 0,c.B)},this.onLifecycle=function(e){var t=o.usersElement,r=g[e.type];if(t&&r){var i=new CustomEvent(r,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(i)}}}var r,i,v;return r=t,(i=[{key:"connectedCallback",value:function(){(0,c.e)(this.el)}},{key:"present",value:function(){var e=this;return(0,n.Z)(regeneratorRuntime.mark(function o(){var t,r;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(!e.presented){o.next=2;break}return o.abrupt("return");case 2:if(t=e.el.querySelector(".popover-content")){o.next=5;break}throw new Error("container is undefined");case 5:return r=Object.assign(Object.assign({},e.componentProps),{popover:e.el}),o.next=8,(0,s.a)(e.delegate,t,e.component,["popover-viewport",e.el["s-sc"]],r);case 8:return e.usersElement=o.sent,o.next=11,(0,d.e)(e.usersElement);case 11:return o.abrupt("return",(0,c.d)(e,"popoverEnter",u,m,e.event));case 12:case"end":return o.stop()}},o)}))()}},{key:"dismiss",value:function(e,o){var t=this;return(0,n.Z)(regeneratorRuntime.mark(function r(){var i;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,c.f)(t,e,o,"popoverLeave",f,b,t.event);case 2:if(i=r.sent,r.t0=i,!r.t0){r.next=7;break}return r.next=7,(0,s.d)(t.delegate,t.usersElement);case 7:return r.abrupt("return",i);case 8:case"end":return r.stop()}},r)}))()}},{key:"onDidDismiss",value:function(){return(0,c.g)(this.el,"ionPopoverDidDismiss")}},{key:"onWillDismiss",value:function(){return(0,c.g)(this.el,"ionPopoverWillDismiss")}},{key:"render",value:function(){var o,t=(0,p.b)(this),r=this.onLifecycle,i=this.htmlAttributes;return(0,a.h)(a.H,Object.assign({"aria-modal":"true","no-router":!0,tabindex:"-1"},i,{style:{zIndex:"".concat(2e4+this.overlayIndex)},class:Object.assign(Object.assign({},(0,l.g)(this.cssClass)),(o={},e(o,t,!0),e(o,"popover-translucent",this.translucent),o)),onIonPopoverDidPresent:r,onIonPopoverWillPresent:r,onIonPopoverWillDismiss:r,onIonPopoverDidDismiss:r,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap}),(0,a.h)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),(0,a.h)("div",{tabindex:"0"}),(0,a.h)("div",{class:"popover-wrapper ion-overlay-wrapper"},(0,a.h)("div",{class:"popover-arrow"}),(0,a.h)("div",{class:"popover-content"})),(0,a.h)("div",{tabindex:"0"}))}},{key:"el",get:function(){return(0,a.i)(this)}}])&&o(r.prototype,i),v&&o(r,v),t}(),g={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"};x.style={ios:'.sc-ion-popover-ios-h{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}.overlay-hidden.sc-ion-popover-ios-h{display:none}.popover-wrapper.sc-ion-popover-ios{opacity:0;z-index:10}.popover-content.sc-ion-popover-ios{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-ios{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-ios-h{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}.popover-content.sc-ion-popover-ios{border-radius:10px}.popover-arrow.sc-ion-popover-ios{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow.sc-ion-popover-ios::after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}[dir=rtl].sc-ion-popover-ios .popover-arrow.sc-ion-popover-ios::after,[dir=rtl].sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after,[dir=rtl] .sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{left:unset;right:unset;right:3px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios{top:auto;bottom:-10px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{top:-6px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.popover-translucent.sc-ion-popover-ios-h .popover-content.sc-ion-popover-ios,.popover-translucent.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}',md:".sc-ion-popover-md-h{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md,[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md,[dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:100ms;transition-delay:100ms}"}}}])}();