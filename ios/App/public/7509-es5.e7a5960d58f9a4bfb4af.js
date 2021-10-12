!function(){"use strict";function i(i,n,e){return n in i?Object.defineProperty(i,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):i[n]=e,i}function n(i,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,t.key,t)}}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[7509],{7509:function(e,t,o){o.r(t),o.d(t,{ion_loading:function(){return f}});var a=o(8239),r=o(23150),s=o(97585),d=o(67053),l=o(66575),c=o(61269),p=o(94086),g=function(i){var n=(0,p.c)(),e=(0,p.c)(),t=(0,p.c)();return e.addElement(i.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.01,transform:"scale(1.1)"},{offset:1,opacity:1,transform:"scale(1)"}]),n.addElement(i).easing("ease-in-out").duration(200).addAnimation([e,t])},m=function(i){var n=(0,p.c)(),e=(0,p.c)(),t=(0,p.c)();return e.addElement(i.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.99,transform:"scale(1)"},{offset:1,opacity:0,transform:"scale(0.9)"}]),n.addElement(i).easing("ease-in-out").duration(200).addAnimation([e,t])},u=function(i){var n=(0,p.c)(),e=(0,p.c)(),t=(0,p.c)();return e.addElement(i.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.01,transform:"scale(1.1)"},{offset:1,opacity:1,transform:"scale(1)"}]),n.addElement(i).easing("ease-in-out").duration(200).addAnimation([e,t])},h=function(i){var n=(0,p.c)(),e=(0,p.c)(),t=(0,p.c)();return e.addElement(i.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),t.addElement(i.querySelector(".loading-wrapper")).keyframes([{offset:0,opacity:.99,transform:"scale(1)"},{offset:1,opacity:0,transform:"scale(0.9)"}]),n.addElement(i).easing("ease-in-out").duration(200).addAnimation([e,t])},f=function(){function e(i){var n=this;!function(i,n){if(!(i instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),(0,r.r)(this,i),this.didPresent=(0,r.e)(this,"ionLoadingDidPresent",7),this.willPresent=(0,r.e)(this,"ionLoadingWillPresent",7),this.willDismiss=(0,r.e)(this,"ionLoadingWillDismiss",7),this.didDismiss=(0,r.e)(this,"ionLoadingDidDismiss",7),this.presented=!1,this.keyboardClose=!0,this.duration=0,this.backdropDismiss=!1,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onBackdropTap=function(){n.dismiss(void 0,d.B)}}var t,o,p;return t=e,(o=[{key:"connectedCallback",value:function(){(0,d.e)(this.el)}},{key:"componentWillLoad",value:function(){if(void 0===this.spinner){var i=(0,s.b)(this);this.spinner=s.c.get("loadingSpinner",s.c.get("spinner","ios"===i?"lines":"crescent"))}}},{key:"present",value:function(){var i=this;return(0,a.Z)(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,d.d)(i,"loadingEnter",g,u,void 0);case 2:i.duration>0&&(i.durationTimeout=setTimeout(function(){return i.dismiss()},i.duration+10));case 3:case"end":return n.stop()}},n)}))()}},{key:"dismiss",value:function(i,n){return this.durationTimeout&&clearTimeout(this.durationTimeout),(0,d.f)(this,i,n,"loadingLeave",m,h)}},{key:"onDidDismiss",value:function(){return(0,d.g)(this.el,"ionLoadingDidDismiss")}},{key:"onWillDismiss",value:function(){return(0,d.g)(this.el,"ionLoadingWillDismiss")}},{key:"render",value:function(){var n,e=this.message,t=this.spinner,o=this.htmlAttributes,a=(0,s.b)(this);return(0,r.h)(r.H,Object.assign({tabindex:"-1"},o,{style:{zIndex:"".concat(4e4+this.overlayIndex)},onIonBackdropTap:this.onBackdropTap,class:Object.assign(Object.assign({},(0,c.g)(this.cssClass)),(n={},i(n,a,!0),i(n,"loading-translucent",this.translucent),n))}),(0,r.h)("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),(0,r.h)("div",{tabindex:"0"}),(0,r.h)("div",{class:"loading-wrapper ion-overlay-wrapper",role:"dialog"},t&&(0,r.h)("div",{class:"loading-spinner"},(0,r.h)("ion-spinner",{name:t,"aria-hidden":"true"})),e&&(0,r.h)("div",{class:"loading-content",innerHTML:(0,l.s)(e)})),(0,r.h)("div",{tabindex:"0"}))}},{key:"el",get:function(){return(0,r.i)(this)}}])&&n(t.prototype,o),p&&n(t,p),e}();f.style={ios:".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-lines.sc-ion-loading-ios,.spinner-lines-small.sc-ion-loading-ios,.spinner-bubbles.sc-ion-loading-ios,.spinner-circles.sc-ion-loading-ios,.spinner-crescent.sc-ion-loading-ios,.spinner-dots.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, #f9f9f9));--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600, #666666);--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);color:var(--ion-text-color, #000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding-left:34px;padding-right:34px;padding-top:24px;padding-bottom:24px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-wrapper.sc-ion-loading-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.loading-content.sc-ion-loading-ios{font-weight:bold}.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{margin-left:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}",md:".sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-lines.sc-ion-loading-md,.spinner-lines-small.sc-ion-loading-md,.spinner-bubbles.sc-ion-loading-md,.spinner-circles.sc-ion-loading-md,.spinner-crescent.sc-ion-loading-md,.spinner-dots.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50, #f2f2f2);--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary, #3880ff);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);color:var(--ion-color-step-850, #262626);font-size:14px}.loading-wrapper.sc-ion-loading-md{border-radius:2px;padding-left:24px;padding-right:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0, 0, 0, 0.4);box-shadow:0 16px 20px rgba(0, 0, 0, 0.4)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-wrapper.sc-ion-loading-md{padding-left:unset;padding-right:unset;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px}}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{margin-left:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}"}}}])}();