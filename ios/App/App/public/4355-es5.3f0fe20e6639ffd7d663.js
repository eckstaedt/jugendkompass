!function(){"use strict";function r(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=function(r,t){if(!r)return;if("string"==typeof r)return o(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);"Object"===e&&r.constructor&&(e=r.constructor.name);if("Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return o(r,t)}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var i=0,n=function(){};return{s:n,n:function(){return i>=r.length?{done:!0}:{done:!1,value:r[i++]}},e:function(r){throw r},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,l=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return s=r.done,r},e:function(r){l=!0,a=r},f:function(){try{s||null==e.return||e.return()}finally{if(l)throw a}}}}function o(r,o){(null==o||o>r.length)&&(o=r.length);for(var t=0,e=new Array(o);t<o;t++)e[t]=r[t];return e}function t(r,o,t){return o in r?Object.defineProperty(r,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[o]=t,r}function e(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function i(r,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,e.key,e)}}function n(r,o,t){return o&&i(r.prototype,o),t&&i(r,t),r}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[4355],{44355:function(o,i,a){a.r(i),a.d(i,{ion_breadcrumb:function(){return p},ion_breadcrumbs:function(){return u}});var s=a(90245),l=a(28941),c=a(8688),d=a(98824),b=a(61269),p=function(){function r(o){var t=this;e(this,r),(0,s.r)(this,o),this.ionFocus=(0,s.e)(this,"ionFocus",7),this.ionBlur=(0,s.e)(this,"ionBlur",7),this.collapsedClick=(0,s.e)(this,"collapsedClick",7),this.inheritedAttributes={},this.collapsed=!1,this.active=!1,this.disabled=!1,this.routerDirection="forward",this.onFocus=function(){t.ionFocus.emit()},this.onBlur=function(){t.ionBlur.emit()},this.collapsedIndicatorClick=function(){t.collapsedClick.emit({ionShadowTarget:t.collapsedRef})}}return n(r,[{key:"componentWillLoad",value:function(){this.inheritedAttributes=(0,d.i)(this.el,["aria-label"])}},{key:"isClickable",value:function(){return void 0!==this.href}},{key:"render",value:function(){var r,o=this,e=this.color,i=this.active,n=this.collapsed,a=this.disabled,d=this.download,p=this.el,u=this.inheritedAttributes,m=this.last,h=this.routerAnimation,g=this.routerDirection,f=this.separator,x=this.showCollapsedIndicator,v=this.target,k=this.isClickable(),w=void 0===this.href?"span":"a",y=a?void 0:this.href,C=(0,c.b)(this),B="span"===w?{}:{download:d,href:y,target:v},I=!m&&(n?!(!x||m):f);return(0,s.h)(s.H,{onClick:function(r){return(0,b.o)(y,r,g,h)},"aria-disabled":a?"true":null,class:(0,b.c)(e,(r={},t(r,C,!0),t(r,"breadcrumb-active",i),t(r,"breadcrumb-collapsed",n),t(r,"breadcrumb-disabled",a),t(r,"in-breadcrumbs-color",(0,b.h)("ion-breadcrumbs[color]",p)),t(r,"in-toolbar",(0,b.h)("ion-toolbar",this.el)),t(r,"in-toolbar-color",(0,b.h)("ion-toolbar[color]",this.el)),t(r,"ion-activatable",k),t(r,"ion-focusable",k),r))},(0,s.h)(w,Object.assign({},B,{class:"breadcrumb-native",part:"native",disabled:a,onFocus:this.onFocus,onBlur:this.onBlur},u),(0,s.h)("slot",{name:"start"}),(0,s.h)("slot",null),(0,s.h)("slot",{name:"end"})),x&&(0,s.h)("button",{part:"collapsed-indicator",onClick:function(){return o.collapsedIndicatorClick()},ref:function(r){return o.collapsedRef=r},class:{"breadcrumbs-collapsed-indicator":!0}},(0,s.h)("ion-icon",{icon:l.e,lazy:!1})),I&&(0,s.h)("span",{class:"breadcrumb-separator",part:"separator"},(0,s.h)("slot",{name:"separator"},"ios"===C?(0,s.h)("ion-icon",{icon:l.c,lazy:!1}):(0,s.h)("span",null,"/"))))}},{key:"el",get:function(){return(0,s.i)(this)}}]),r}();p.style={ios:":host{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;color:var(--color);font-size:16px;font-weight:400;line-height:1.5}.breadcrumb-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;outline:none;background:inherit}:host(.breadcrumb-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.breadcrumb-active){color:var(--color-active)}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .breadcrumb-native{background:var(--background-focused)}@media (any-hover: hover){:host(.ion-activatable:hover){color:var(--color-hover)}:host(.ion-activatable.in-breadcrumbs-color:hover),:host(.ion-activatable.ion-color:hover){color:var(--ion-color-shade)}}.breadcrumb-separator{display:-ms-inline-flexbox;display:inline-flex}:host(.breadcrumb-collapsed) .breadcrumb-native{display:none}:host(.in-breadcrumbs-color),:host(.in-breadcrumbs-color.breadcrumb-active){color:var(--ion-color-base)}:host(.in-breadcrumbs-color) .breadcrumb-separator{color:var(--ion-color-base)}:host(.ion-color){color:var(--ion-color-base)}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumb-separator{color:rgba(var(--ion-color-contrast-rgb), 0.8)}:host(.in-toolbar-color.breadcrumb-active){color:var(--ion-color-contrast)}.breadcrumbs-collapsed-indicator{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:14px;margin-right:14px;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 1 100%;flex:1 1 100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:32px;height:18px;border:0;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.breadcrumbs-collapsed-indicator{margin-left:unset;margin-right:unset;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:14px;margin-inline-end:14px}}.breadcrumbs-collapsed-indicator ion-icon{margin-top:1px;font-size:22px}:host{--color:var(--ion-color-step-850, #2d4665);--color-active:var(--ion-text-color, #03060b);--color-hover:var(--ion-text-color, #03060b);--color-focused:var(--color-active);--background-focused:var(--ion-color-step-50, rgba(233, 237, 243, 0.7))}:host(.breadcrumb-active){font-weight:600}.breadcrumb-native{border-radius:4px;padding-left:12px;padding-right:12px;padding-top:5px;padding-bottom:5px;border:1px solid transparent}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.breadcrumb-native{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}:host(.ion-focused) .breadcrumb-native{border-radius:8px}:host(.in-breadcrumbs-color.ion-focused) .breadcrumb-native,:host(.ion-color.ion-focused) .breadcrumb-native{background:rgba(var(--ion-color-base-rgb), 0.1);color:var(--ion-color-base)}:host(.ion-focused) ::slotted(ion-icon),:host(.in-breadcrumbs-color.ion-focused) ::slotted(ion-icon),:host(.ion-color.ion-focused) ::slotted(ion-icon){color:var(--ion-color-step-750, #445b78)}.breadcrumb-separator{color:var(--ion-color-step-550, #73849a)}::slotted(ion-icon){color:var(--ion-color-step-400, #92a0b3);font-size:18px}::slotted(ion-icon[slot=start]){margin-right:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(ion-icon[slot=start]){margin-right:unset;-webkit-margin-end:8px;margin-inline-end:8px}}::slotted(ion-icon[slot=end]){margin-left:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(ion-icon[slot=end]){margin-left:unset;-webkit-margin-start:8px;margin-inline-start:8px}}:host(.breadcrumb-active) ::slotted(ion-icon){color:var(--ion-color-step-850, #242d39)}.breadcrumbs-collapsed-indicator{border-radius:4px;background:var(--ion-color-step-100, #e9edf3);color:var(--ion-color-step-550, #73849a)}.breadcrumbs-collapsed-indicator:hover{opacity:0.45}.breadcrumbs-collapsed-indicator:focus{background:var(--ion-color-step-150, #d9e0ea)}",md:":host{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;color:var(--color);font-size:16px;font-weight:400;line-height:1.5}.breadcrumb-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;outline:none;background:inherit}:host(.breadcrumb-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.breadcrumb-active){color:var(--color-active)}:host(.ion-focused){color:var(--color-focused)}:host(.ion-focused) .breadcrumb-native{background:var(--background-focused)}@media (any-hover: hover){:host(.ion-activatable:hover){color:var(--color-hover)}:host(.ion-activatable.in-breadcrumbs-color:hover),:host(.ion-activatable.ion-color:hover){color:var(--ion-color-shade)}}.breadcrumb-separator{display:-ms-inline-flexbox;display:inline-flex}:host(.breadcrumb-collapsed) .breadcrumb-native{display:none}:host(.in-breadcrumbs-color),:host(.in-breadcrumbs-color.breadcrumb-active){color:var(--ion-color-base)}:host(.in-breadcrumbs-color) .breadcrumb-separator{color:var(--ion-color-base)}:host(.ion-color){color:var(--ion-color-base)}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumb-separator{color:rgba(var(--ion-color-contrast-rgb), 0.8)}:host(.in-toolbar-color.breadcrumb-active){color:var(--ion-color-contrast)}.breadcrumbs-collapsed-indicator{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:14px;margin-right:14px;margin-top:0;margin-bottom:0;display:-ms-flexbox;display:flex;-ms-flex:1 1 100%;flex:1 1 100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:32px;height:18px;border:0;outline:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.breadcrumbs-collapsed-indicator{margin-left:unset;margin-right:unset;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:14px;margin-inline-end:14px}}.breadcrumbs-collapsed-indicator ion-icon{margin-top:1px;font-size:22px}:host{--color:var(--ion-color-step-600, #677483);--color-active:var(--ion-text-color, #03060b);--color-hover:var(--ion-text-color, #03060b);--color-focused:var(--ion-color-step-800, #35404e);--background-focused:$breadcrumb-md-background-focused}:host(.breadcrumb-active){font-weight:500}.breadcrumb-native{padding-left:12px;padding-right:12px;padding-top:6px;padding-bottom:6px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.breadcrumb-native{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}.breadcrumb-separator{margin-left:10px;margin-right:10px;margin-top:-1px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.breadcrumb-separator{margin-left:unset;margin-right:unset;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:10px;margin-inline-end:10px}}:host(.ion-focused) .breadcrumb-native{border-radius:4px;-webkit-box-shadow:0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.12);box-shadow:0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 8px rgba(0, 0, 0, 0.12)}.breadcrumb-separator{color:var(--ion-color-step-550, #73849a)}::slotted(ion-icon){color:var(--ion-color-step-550, #7d8894);font-size:18px}::slotted(ion-icon[slot=start]){margin-right:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(ion-icon[slot=start]){margin-right:unset;-webkit-margin-end:8px;margin-inline-end:8px}}::slotted(ion-icon[slot=end]){margin-left:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(ion-icon[slot=end]){margin-left:unset;-webkit-margin-start:8px;margin-inline-start:8px}}:host(.breadcrumb-active) ::slotted(ion-icon){color:var(--ion-color-step-850, #222d3a)}.breadcrumbs-collapsed-indicator{border-radius:2px;background:var(--ion-color-step-100, #eef1f3);color:var(--ion-color-step-550, #73849a)}.breadcrumbs-collapsed-indicator:hover{opacity:0.7}.breadcrumbs-collapsed-indicator:focus{background:var(--ion-color-step-150, #dfe5e8)}"};var u=function(){function o(t){var i=this;e(this,o),(0,s.r)(this,t),this.ionCollapsedClick=(0,s.e)(this,"ionCollapsedClick",7),this.itemsBeforeCollapse=1,this.itemsAfterCollapse=1,this.breadcrumbsInit=function(){i.setBreadcrumbSeparator(),i.setMaxItems()},this.resetActiveBreadcrumb=function(){var r=i.getBreadcrumbs().find(function(r){return r.active});r&&i.activeChanged&&(r.active=!1)},this.setMaxItems=function(){var o,t=i.itemsAfterCollapse,e=i.itemsBeforeCollapse,n=i.maxItems,a=i.getBreadcrumbs(),s=r(a);try{for(s.s();!(o=s.n()).done;){var l=o.value;l.showCollapsedIndicator=!1,l.collapsed=!1}}catch(c){s.e(c)}finally{s.f()}void 0!==n&&a.length>n&&e+t<=n&&a.forEach(function(r,o){o===e&&(r.showCollapsedIndicator=!0),o>=e&&o<a.length-t&&(r.collapsed=!0)})},this.setBreadcrumbSeparator=function(){var o,t=i.itemsAfterCollapse,e=i.itemsBeforeCollapse,n=i.maxItems,a=i.getBreadcrumbs(),s=a.find(function(r){return r.active}),l=r(a);try{for(l.s();!(o=l.n()).done;){var c=o.value,d=void 0!==n&&0===t?c===a[e]:c===a[a.length-1];c.last=d,c.separator=void 0!==c.separator?c.separator:!d||void 0,!s&&d&&(c.active=!0,i.activeChanged=!0)}}catch(b){l.e(b)}finally{l.f()}},this.getBreadcrumbs=function(){return Array.from(i.el.querySelectorAll("ion-breadcrumb"))}}return n(o,[{key:"onCollapsedClick",value:function(r){var o=this.getBreadcrumbs().filter(function(r){return r.collapsed});this.ionCollapsedClick.emit(Object.assign(Object.assign({},r.detail),{collapsedBreadcrumbs:o}))}},{key:"maxItemsChanged",value:function(){this.resetActiveBreadcrumb(),this.breadcrumbsInit()}},{key:"componentWillLoad",value:function(){this.breadcrumbsInit()}},{key:"render",value:function(){var r,o=this.color,e=this.collapsed,i=(0,c.b)(this);return(0,s.h)(s.H,{class:(0,b.c)(o,(r={},t(r,i,!0),t(r,"in-toolbar",(0,b.h)("ion-toolbar",this.el)),t(r,"in-toolbar-color",(0,b.h)("ion-toolbar[color]",this.el)),t(r,"breadcrumbs-collapsed",e),r))},(0,s.h)("slot",null))}},{key:"el",get:function(){return(0,s.i)(this)}}],[{key:"watchers",get:function(){return{maxItems:["maxItemsChanged"],itemsBeforeCollapse:["maxItemsChanged"],itemsAfterCollapse:["maxItemsChanged"]}}}]),o}();u.style={ios:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){padding-left:20px;padding-right:20px;padding-top:0;padding-bottom:0;-ms-flex-pack:center;justify-content:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-toolbar){padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}",md:":host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}:host(.in-toolbar-color),:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator ion-icon{color:var(--ion-color-contrast)}:host(.in-toolbar-color) .breadcrumbs-collapsed-indicator{background:rgba(var(--ion-color-contrast-rgb), 0.11)}:host(.in-toolbar){padding-left:8px;padding-right:8px;padding-top:0;padding-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-toolbar){padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}"}}}])}();