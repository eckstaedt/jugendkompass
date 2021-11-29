"use strict";(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[1855],{71855:function(t,e,o){o.r(e),o.d(e,{ion_modal:function(){return k}});var r=o(8239),a=o(90245),i=o(8688),n=o(57013),s=o(98824),d=o(81135),l=o(61269),p=o(16069),c=o(71014),h=o(57807),m=o(39461);o(40960);const f=(t,e)=>{const o=1/(1-e);return t*o+-e*o},g=t=>{const{currentBreakpoint:e,backdropBreakpoint:o}=t,r=void 0===o||o<e?`calc(var(--backdrop-opacity) * ${e})`:"0",a=(0,c.c)("backdropAnimation").fromTo("opacity",0,r);return{wrapperAnimation:(0,c.c)("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-100*e}%)`}]),backdropAnimation:a}},b=t=>{const{currentBreakpoint:e,backdropBreakpoint:o}=t,r=`calc(var(--backdrop-opacity) * ${f(e,o)})`,a=[{offset:0,opacity:r},{offset:1,opacity:0}],i=[{offset:0,opacity:r},{offset:o,opacity:0},{offset:1,opacity:0}],n=(0,c.c)("backdropAnimation").keyframes(0!==o?i:a);return{wrapperAnimation:(0,c.c)("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-100*e}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:n}},u=(t,e)=>{const{presentingEl:o,currentBreakpoint:r}=e,a=(0,s.g)(t),{wrapperAnimation:i,backdropAnimation:n}=void 0!==r?g(e):{backdropAnimation:(0,c.c)().fromTo("opacity",.01,"var(--backdrop-opacity)"),wrapperAnimation:(0,c.c)().fromTo("transform","translateY(100vh)","translateY(0vh)")};n.addElement(a.querySelector("ion-backdrop")).beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),i.addElement(a.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const d=(0,c.c)("entering-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(i);if(o){const t=window.innerWidth<768,e="ION-MODAL"===o.tagName&&void 0!==o.presentingElement,r=(0,s.g)(o),a=(0,c.c)().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),l=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",r=`translateY(${e?"-10px":t}) scale(0.93)`;a.afterStyles({transform:r}).beforeAddWrite(()=>l.style.setProperty("background-color","black")).addElement(o).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:r,borderRadius:"10px 10px 0 0"}]),d.addAnimation(a)}else if(d.addAnimation(n),e){const t=`translateY(-10px) scale(${e?.93:1})`;a.afterStyles({transform:t}).addElement(r.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:t}]);const o=(0,c.c)().afterStyles({transform:t}).addElement(r.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:t}]);d.addAnimation([a,o])}else i.fromTo("opacity","0","1")}else d.addAnimation(n);return d},y=(t,e,o=500)=>{const{presentingEl:r,currentBreakpoint:a}=e,i=(0,s.g)(t),{wrapperAnimation:n,backdropAnimation:d}=void 0!==a?b(e):{backdropAnimation:(0,c.c)().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:(0,c.c)().fromTo("transform","translateY(0vh)","translateY(100vh)")};d.addElement(i.querySelector("ion-backdrop")),n.addElement(i.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const l=(0,c.c)("leaving-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(o).addAnimation(n);if(r){const t=window.innerWidth<768,e="ION-MODAL"===r.tagName&&void 0!==r.presentingElement,o=(0,s.g)(r),a=(0,c.c)().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish(t=>{1===t&&(r.style.setProperty("overflow",""),Array.from(i.querySelectorAll("ion-modal")).filter(t=>void 0!==t.presentingElement).length<=1&&i.style.setProperty("background-color",""))}),i=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",o=`translateY(${e?"-10px":t}) scale(0.93)`;a.addElement(r).keyframes([{offset:0,filter:"contrast(0.85)",transform:o,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),l.addAnimation(a)}else if(l.addAnimation(d),e){const t=`translateY(-10px) scale(${e?.93:1})`;a.addElement(o.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:t},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);const r=(0,c.c)().addElement(o.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:t},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);l.addAnimation([a,r])}else n.fromTo("opacity","1","0")}else l.addAnimation(d);return l},w=(t,e)=>{const{currentBreakpoint:o}=e,r=(0,s.g)(t),{wrapperAnimation:a,backdropAnimation:i}=void 0!==o?g(e):{backdropAnimation:(0,c.c)().fromTo("opacity",.01,"var(--backdrop-opacity)"),wrapperAnimation:(0,c.c)().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}])};return i.addElement(r.querySelector("ion-backdrop")).beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),a.addElement(r.querySelector(".modal-wrapper")),(0,c.c)().addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([i,a])},x=(t,e)=>{const{currentBreakpoint:o}=e,r=(0,s.g)(t),{wrapperAnimation:a,backdropAnimation:i}=void 0!==o?b(e):{backdropAnimation:(0,c.c)().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:(0,c.c)().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}])};return i.addElement(r.querySelector("ion-backdrop")),a.addElement(r.querySelector(".modal-wrapper")),(0,c.c)().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([i,a])},k=class{constructor(t){(0,a.r)(this,t),this.didPresent=(0,a.e)(this,"ionModalDidPresent",7),this.willPresent=(0,a.e)(this,"ionModalWillPresent",7),this.willDismiss=(0,a.e)(this,"ionModalWillDismiss",7),this.didDismiss=(0,a.e)(this,"ionModalDidDismiss",7),this.didPresentShorthand=(0,a.e)(this,"didPresent",7),this.willPresentShorthand=(0,a.e)(this,"willPresent",7),this.willDismissShorthand=(0,a.e)(this,"willDismiss",7),this.didDismissShorthand=(0,a.e)(this,"didDismiss",7),this.modalIndex=A++,this.coreDelegate=(0,n.C)(),this.isSheetModal=!1,this.inline=!1,this.gestureAnimationDismissing=!1,this.presented=!1,this.keyboardClose=!0,this.backdropBreakpoint=0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.swipeToClose=!1,this.isOpen=!1,this.configureTriggerInteraction=()=>{const{trigger:t,el:e,destroyTriggerInteraction:o}=this;o&&o();const r=void 0!==t?document.getElementById(t):null;r&&(this.destroyTriggerInteraction=((t,e)=>{const o=()=>{e.present()};return t.addEventListener("click",o),()=>{t.removeEventListener("click",o)}})(r,e))},this.onBackdropTap=()=>{this.dismiss(void 0,d.B)},this.onDismiss=t=>{t.stopPropagation(),t.preventDefault(),this.dismiss()},this.onLifecycle=t=>{const e=this.usersElement,o=v[t.type];if(e&&o){const r=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:t.detail});e.dispatchEvent(r)}}}onIsOpenChange(t,e){!0===t&&!1===e?this.present():!1===t&&!0===e&&this.dismiss()}onTriggerChange(){this.configureTriggerInteraction()}swipeToCloseChanged(t){this.gesture?this.gesture.enable(t):t&&this.initSwipeToClose()}connectedCallback(){(0,d.e)(this.el)}componentWillLoad(){const{breakpoints:t,initialBreakpoint:e}=this;this.modalId=this.el.hasAttribute("id")?this.el.getAttribute("id"):`ion-modal-${this.modalIndex}`,this.isSheetModal=void 0!==t&&void 0!==e,void 0!==t&&void 0!==e&&!t.includes(e)&&console.warn("[Ionic Warning]: Your breakpoints array must include the initialBreakpoint value.")}componentDidLoad(){!0===this.isOpen&&(0,s.r)(()=>this.present()),this.configureTriggerInteraction()}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const e=this.el.parentNode,o=this.inline=null!==e&&"ION-APP"!==e.tagName&&"BODY"!==e.tagName;return{inline:o,delegate:this.workingDelegate=o?this.delegate||this.coreDelegate:this.delegate}}present(){var t=this;return(0,r.Z)(function*(){if(t.presented)return;void 0!==t.currentTransition&&(yield t.currentTransition);const e=Object.assign(Object.assign({},t.componentProps),{modal:t.el}),{inline:o,delegate:r}=t.getDelegate(!0);t.usersElement=yield(0,n.a)(r,t.el,t.component,["ion-page"],e,o),yield(0,p.e)(t.usersElement),(0,a.c)(()=>t.el.classList.add("show-modal")),t.currentTransition=(0,d.d)(t,"modalEnter",u,w,{presentingEl:t.presentingElement,currentBreakpoint:t.initialBreakpoint,backdropBreakpoint:t.backdropBreakpoint}),yield t.currentTransition,t.isSheetModal?t.initSheetGesture():t.swipeToClose&&t.initSwipeToClose(),t.currentTransition=void 0})()}initSwipeToClose(){var t=this;if("ios"!==(0,i.b)(this))return;const e=this.leaveAnimation||i.c.get("modalLeave",y),o=this.animation=e(this.el,{presentingEl:this.presentingElement});this.gesture=((t,e,o)=>{const r=t.offsetHeight;let a=!1;const i=(0,m.createGesture)({el:t,gestureName:"modalSwipeToClose",gesturePriority:40,direction:"y",threshold:10,canStart:t=>{const e=t.event.target;return null===e||!e.closest||null===e.closest("ion-content, ion-footer")},onStart:()=>{e.progressStart(!0,a?1:0)},onMove:t=>{const o=(0,s.k)(1e-4,t.deltaY/r,.9999);e.progressStep(o)},onEnd:t=>{const n=t.velocityY,d=(0,s.k)(1e-4,t.deltaY/r,.9999),l=(t.deltaY+1e3*n)/r>=.5;let p=l?-.001:.001;l?(e.easing("cubic-bezier(0.32, 0.72, 0, 1)"),p+=(0,h.g)([0,0],[.32,.72],[0,1],[1,1],d)[0]):(e.easing("cubic-bezier(1, 0, 0.68, 0.28)"),p+=(0,h.g)([0,0],[1,0],[.68,.28],[1,1],d)[0]);const c=((t,e)=>(0,s.k)(400,t/Math.abs(1.1*e),500))(l?d*r:(1-d)*r,n);a=l,i.enable(!1),e.onFinish(()=>{l||i.enable(!0)}).progressEnd(l?1:0,p,c),l&&o()}});return i})(this.el,o,()=>{this.gestureAnimationDismissing=!0,this.animation.onFinish((0,r.Z)(function*(){yield t.dismiss(void 0,"gesture"),t.gestureAnimationDismissing=!1}))}),this.gesture.enable(!0)}initSheetGesture(){var t,e=this;const{wrapperEl:o,initialBreakpoint:a,backdropBreakpoint:n}=this;if(!o||void 0===a)return;const d=this.enterAnimation||i.c.get("modalEnter",u),l=this.animation=d(this.el,{presentingEl:this.presentingElement,currentBreakpoint:a,backdropBreakpoint:n});l.progressStart(!0,1);const p=(null===(t=this.breakpoints)||void 0===t?void 0:t.sort((t,e)=>t-e))||[];this.gesture=((t,e,o,r,a,i,n=[],d,l)=>{const p={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:0!==a?[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-a,opacity:0},{offset:1,opacity:0}]:[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}]},c=this.el.querySelector("ion-content"),h=o.clientHeight;let g=r,b=0;const u=i.childAnimations.find(t=>"wrapperAnimation"===t.id),y=i.childAnimations.find(t=>"backdropAnimation"===t.id),w=n[n.length-1];u&&y&&(u.keyframes([...p.WRAPPER_KEYFRAMES]),y.keyframes([...p.BACKDROP_KEYFRAMES]),i.progressStart(!0,1-g),e.style.setProperty("pointer-events",g>a?"auto":"none")),c&&g!==w&&(c.scrollY=!1);const x=(0,m.createGesture)({el:o,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:t=>{const e=t.event.target.closest("ion-content");return!(1===g&&e)},onStart:()=>{c&&(c.scrollY=!1),i.progressStart(!0,1-g)},onMove:t=>{b=(0,s.k)(1e-4,1-g+t.deltaY/h,.9999),i.progressStep(b)},onEnd:t=>{const o=g-(t.deltaY+100*t.velocityY)/h,r=n.reduce((t,e)=>Math.abs(e-o)<Math.abs(t-o)?e:t),m=0!==r;g=0,u&&y&&(u.keyframes([{offset:0,transform:`translateY(${100*b}%)`},{offset:1,transform:`translateY(${100*(1-r)}%)`}]),y.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${f(1-b,a)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${f(r,a)})`}]),i.progressStep(0)),x.enable(!1),i.onFinish(()=>{m&&(u&&y?(0,s.r)(()=>{u.keyframes([...p.WRAPPER_KEYFRAMES]),y.keyframes([...p.BACKDROP_KEYFRAMES]),i.progressStart(!0,1-r),g=r,l(g),c&&g===n[n.length-1]&&(c.scrollY=!0),e.style.setProperty("pointer-events",g>a?"auto":"none"),x.enable(!0)}):x.enable(!0))},{oneTimeCallback:!0}).progressEnd(1,0,500),m||d()}});return x})(0,this.backdropEl,o,a,n,l,p,()=>{this.gestureAnimationDismissing=!0,this.animation.onFinish((0,r.Z)(function*(){yield e.dismiss(void 0,"gesture"),e.gestureAnimationDismissing=!1}))},t=>{this.currentBreakpoint=t}),this.gesture.enable(!0)}dismiss(t,e){var o=this;return(0,r.Z)(function*(){if(o.gestureAnimationDismissing&&"gesture"!==e)return!1;void 0!==o.currentTransition&&(yield o.currentTransition);const r=d.h.get(o)||[];o.currentTransition=(0,d.f)(o,t,e,"modalLeave",y,x,{presentingEl:o.presentingElement,currentBreakpoint:o.currentBreakpoint||o.initialBreakpoint,backdropBreakpoint:o.backdropBreakpoint});const a=yield o.currentTransition;if(a){const{delegate:t}=o.getDelegate();yield(0,n.d)(t,o.usersElement),o.animation&&o.animation.destroy(),o.gesture&&o.gesture.destroy(),r.forEach(t=>t.destroy())}return o.currentTransition=void 0,o.animation=void 0,a})()}onDidDismiss(){return(0,d.g)(this.el,"ionModalDidDismiss")}onWillDismiss(){return(0,d.g)(this.el,"ionModalWillDismiss")}render(){const{handle:t,isSheetModal:e,presentingElement:o,htmlAttributes:r}=this,n=!1!==t&&e,s=(0,i.b)(this),{presented:d,modalId:p}=this;return(0,a.h)(a.H,Object.assign({"no-router":!0,"aria-modal":"true",tabindex:"-1"},r,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[s]:!0,"modal-card":void 0!==o&&"ios"===s,"modal-sheet":e,"overlay-hidden":!0,"modal-interactive":d},(0,l.g)(this.cssClass)),id:p,onIonBackdropTap:this.onBackdropTap,onIonDismiss:this.onDismiss,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),(0,a.h)("ion-backdrop",{ref:t=>this.backdropEl=t,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),"ios"===s&&(0,a.h)("div",{class:"modal-shadow"}),(0,a.h)("div",{role:"dialog",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:t=>this.wrapperEl=t},n&&(0,a.h)("div",{class:"modal-handle",part:"handle"}),(0,a.h)("slot",null)))}get el(){return(0,a.i)(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["onTriggerChange"],swipeToClose:["swipeToCloseChanged"]}}},v={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};let A=0;k.style={ios:":host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict;pointer-events:none}:host(.modal-interactive) .modal-wrapper,:host(.modal-interactive) ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);background:var(--ion-color-step-350, #c0c0be);z-index:11}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host(:first-of-type){--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-card) .modal-wrapper,:host-context([dir=rtl]).modal-card .modal-wrapper{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}:host(.modal-card) .modal-shadow{-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-sheet) .modal-wrapper,:host-context([dir=rtl]).modal-sheet .modal-wrapper{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}",md:":host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict;pointer-events:none}:host(.modal-interactive) .modal-wrapper,:host(.modal-interactive) ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);background:var(--ion-color-step-350, #c0c0be);z-index:11}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host(:first-of-type){--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px}:host(:first-of-type){--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}"}}}]);