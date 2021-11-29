!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[2456],{22456:function(i,n,s){s.r(n),s.d(n,{PushPageModule:function(){return q}});var r=s(38583),o=s(90665),u=s(88786),a=s(90928),l=s(64762),c=s(66097),h=s(76321),g=s(69526),p=s(15257),d=s(10639),f=s(49860);function m(e,t){if(1&e&&(d.TgZ(0,"ion-select-option",12),d._uU(1),d.qZA()),2&e){var i=t.$implicit;d.Q6J("value",i),d.xp6(1),d.Oqu(i.name)}}function v(e,t){if(1&e){var i=d.EpF();d.TgZ(0,"ion-item",2),d.TgZ(1,"ion-label"),d._uU(2,"Ausgabe ausw\xe4hlen"),d.qZA(),d.TgZ(3,"ion-select",4),d.NdJ("ngModelChange",function(e){return d.CHM(i),d.oxw().ausgabe=e}),d.YNc(4,m,2,2,"ion-select-option",11),d.qZA(),d.qZA()}if(2&e){var n=d.oxw();d.xp6(3),d.Q6J("ngModel",n.ausgabe),d.xp6(1),d.Q6J("ngForOf",n.ausgaben)}}function b(e,t){if(1&e&&(d.TgZ(0,"ion-select-option",12),d._uU(1),d.qZA()),2&e){var i=t.$implicit;d.Q6J("value",i),d.xp6(1),d.Oqu(i.title)}}function Z(e,t){if(1&e){var i=d.EpF();d.TgZ(0,"ion-item",2),d.TgZ(1,"ion-label"),d._uU(2,"Impuls ausw\xe4hlen"),d.qZA(),d.TgZ(3,"ion-select",4),d.NdJ("ngModelChange",function(e){return d.CHM(i),d.oxw().impulse=e}),d.YNc(4,b,2,2,"ion-select-option",11),d.qZA(),d.qZA()}if(2&e){var n=d.oxw();d.xp6(3),d.Q6J("ngModel",n.impulse),d.xp6(1),d.Q6J("ngForOf",n.impulses)}}function A(e,t){if(1&e&&(d.TgZ(0,"ion-label"),d._uU(1),d.qZA()),2&e){var i=d.oxw(2);d.xp6(1),d.Oqu(i.file.name)}}function y(e,t){if(1&e){var i=d.EpF();d.TgZ(0,"ion-item",2),d.TgZ(1,"input",13,14),d.NdJ("change",function(){return d.CHM(i),d.oxw().onImageSelected()}),d.qZA(),d.TgZ(3,"ion-button",15),d.NdJ("click",function(){return d.CHM(i),d.MAs(2).click()}),d._uU(4,"Bild ausw\xe4hlen (max. 300 Kb)"),d.qZA(),d.YNc(5,A,2,1,"ion-label",16),d.qZA()}if(2&e){var n=d.oxw();d.xp6(1),d.Q6J("uploader",n.fileUploader),d.xp6(4),d.Q6J("ngIf",n.file)}}var x,T=[{path:"",component:(x=function(){function i(t,n,s,r){e(this,i),this.firebaseService=t,this.alertController=n,this.utils=s,this.toastController=r,this.title="",this.body="",this.ausgaben=[],this.impulses=[],this.type=g.$Q.GENERAL,this.fileUploader=new h.bA({})}var n,s,r;return n=i,(s=[{key:"ngOnInit",value:function(){return(0,l.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getCategories();case 2:return e.next=4,this.getImpulses();case 4:case"end":return e.stop()}},e,this)}))}},{key:"getCategories",value:function(){var e;return(0,l.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.firebaseService.getAusgaben();case 2:this.ausgaben=this.firebaseService.getAusgaben().filter(function(e){return!e.pushSend}),(null===(e=this.ausgaben)||void 0===e?void 0:e.length)?this.ausgabe=this.ausgaben[0]:this.type=g.$Q.GENERAL;case 4:case"end":return t.stop()}},t,this)}))}},{key:"getImpulses",value:function(){var e;return(0,l.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.firebaseService.getImpulses().pipe((0,p.q)(1)).toPromise();case 2:i=t.sent,this.impulses=i.filter(function(e){return!e.pushSend}),(null===(e=this.impulses)||void 0===e?void 0:e.length)?this.impulse=this.impulses[0]:this.type=g.$Q.GENERAL;case 4:case"end":return t.stop()}},t,this)}))}},{key:"onImageSelected",value:function(){if(this.fileUploader.queue&&0!==this.fileUploader.queue.length){var e=this.fileUploader.queue[this.fileUploader.queue.length-1].file;e.size>3e5?(this.showImageUploadError(),this.fileUploader.queue=[]):this.file=e}}},{key:"showImageUploadError",value:function(){return(0,l.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.toastController.create({duration:3e3,message:"W\xe4hle ein Cover mit maximal 300kb aus",color:"danger"});case 2:e.sent.present();case 3:case"end":return e.stop()}},e,this)}))}},{key:"showConfirmAlert",value:function(e){return(0,l.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var i=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""===this.body){t.next=7;break}return t.next=3,this.alertController.create({header:e?"Testnachricht senden?":"Nachricht senden?",message:"<p>Titel: ".concat(this.title,"</p><p>Body: ").concat(this.body,"</p>"),buttons:[,{text:"Abbrechen"},{text:"Senden",handler:function(){return(0,l.mG)(i,void 0,void 0,regeneratorRuntime.mark(function t(){var i;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=this.file,!t.t0){t.next=5;break}return t.next=4,this.firebaseService.uploadImageFile(this.file);case 4:i=t.sent;case 5:e?this.sendTestPush(i):this.sendPush(i);case 6:case"end":return t.stop()}},t,this)}))}}]});case 3:return t.next=5,t.sent.present();case 5:t.next=8;break;case 7:this.utils.showToast("Bitte gebe min. ein Text im Nachricht-Feld ein...","danger");case 8:case"end":return t.stop()}},t,this)}))}},{key:"sendTestPush",value:function(e){var t,i;this.firebaseService.sendTestPush({title:this.title,body:this.body,image:this.type===g.$Q.AUSGABE?null===(t=this.ausgabe)||void 0===t?void 0:t.imageUrl:this.type===g.$Q.IMPULSE?null===(i=this.impulse)||void 0===i?void 0:i.postImg.source_url:null==e?void 0:e.url},this.type===g.$Q.AUSGABE?{ausgabe:this.ausgabe.id.toString()}:this.type===g.$Q.IMPULSE?{impulse:this.impulse.id.toString()}:{}),this.utils.showToast("Die Test Push Mitteilung wurde erfolgreich versendet","success")}},{key:"sendPush",value:function(e){var t,i;this.firebaseService.sendPush({title:this.title,body:this.body,image:this.type===g.$Q.AUSGABE?null===(t=this.ausgabe)||void 0===t?void 0:t.imageUrl:this.type===g.$Q.IMPULSE?null===(i=this.impulse)||void 0===i?void 0:i.postImg.source_url:null==e?void 0:e.url},this.type===g.$Q.AUSGABE?{ausgabe:this.ausgabe.id.toString()}:this.type===g.$Q.IMPULSE?{impulse:this.impulse.id.toString()}:{},this.type),this.type===g.$Q.AUSGABE&&this.firebaseService.updateAusgabe(this.ausgabe.id.toString(),{pushSend:!0}),this.type===g.$Q.IMPULSE&&this.firebaseService.updateImpulse(this.impulse.id.toString(),{pushSend:!0}),this.utils.showToast("Die Push Mitteilung wurde erfolgreich versendet","success"),this.resetData()}},{key:"resetData",value:function(){this.file=void 0,this.fileUploader.queue=[],this.title="",this.body=""}}])&&t(n.prototype,s),r&&t(n,r),i}(),x.\u0275fac=function(e){return new(e||x)(d.Y36(c.O),d.Y36(u.Br),d.Y36(f.c),d.Y36(u.yF))},x.\u0275cmp=d.Xpm({type:x,selectors:[["app-push"]],decls:32,vars:8,consts:[["slot","start"],["text","","defaultHref","/tabs/settings"],["lines","full"],["position","stacked"],[3,"ngModel","ngModelChange"],["value","general"],["value","ausgabe",3,"disabled"],["value","impulse",3,"disabled"],["lines","full",4,"ngIf"],["color","medium","expand","full",3,"click"],["color","success","expand","full",3,"click"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["accept","image/png, image/jpeg","type","file","ng2FileSelect","",2,"display","none",3,"uploader","change"],["selector",""],["color","medium",3,"click"],[4,"ngIf"]],template:function(e,t){1&e&&(d.TgZ(0,"ion-header"),d.TgZ(1,"ion-toolbar"),d.TgZ(2,"ion-buttons",0),d._UZ(3,"ion-back-button",1),d.qZA(),d.TgZ(4,"ion-title"),d._uU(5,"Benachrichtigungen"),d.qZA(),d.qZA(),d.qZA(),d.TgZ(6,"ion-content"),d.TgZ(7,"ion-item",2),d.TgZ(8,"ion-label",3),d._uU(9,"Titel"),d.qZA(),d.TgZ(10,"ion-input",4),d.NdJ("ngModelChange",function(e){return t.title=e}),d.qZA(),d.qZA(),d.TgZ(11,"ion-item",2),d.TgZ(12,"ion-label",3),d._uU(13,"Nachricht"),d.qZA(),d.TgZ(14,"ion-input",4),d.NdJ("ngModelChange",function(e){return t.body=e}),d.qZA(),d.qZA(),d.TgZ(15,"ion-item",2),d.TgZ(16,"ion-label"),d._uU(17,"Typ"),d.qZA(),d.TgZ(18,"ion-select",4),d.NdJ("ngModelChange",function(e){return t.type=e}),d.TgZ(19,"ion-select-option",5),d._uU(20,"Allgemein"),d.qZA(),d.TgZ(21,"ion-select-option",6),d._uU(22,"Neue Ausgabe"),d.qZA(),d.TgZ(23,"ion-select-option",7),d._uU(24,"Neuer Impuls"),d.qZA(),d.qZA(),d.qZA(),d.YNc(25,v,5,2,"ion-item",8),d.YNc(26,Z,5,2,"ion-item",8),d.YNc(27,y,6,2,"ion-item",8),d.TgZ(28,"ion-button",9),d.NdJ("click",function(){return t.showConfirmAlert(!0)}),d._uU(29,"Testnachricht senden"),d.qZA(),d.TgZ(30,"ion-button",10),d.NdJ("click",function(){return t.showConfirmAlert(!1)}),d._uU(31,"Push Benachrichtigung an alle User senden"),d.qZA(),d.qZA()),2&e&&(d.xp6(10),d.Q6J("ngModel",t.title),d.xp6(4),d.Q6J("ngModel",t.body),d.xp6(4),d.Q6J("ngModel",t.type),d.xp6(3),d.Q6J("disabled",!t.ausgaben.length),d.xp6(2),d.Q6J("disabled",!t.impulses.length),d.xp6(2),d.Q6J("ngIf","ausgabe"===t.type),d.xp6(1),d.Q6J("ngIf","impulse"===t.type),d.xp6(1),d.Q6J("ngIf","general"===t.type))},directives:[u.Gu,u.sr,u.Sm,u.oU,u.cs,u.wd,u.W2,u.Ie,u.Q$,u.pK,u.j9,o.JJ,o.On,u.t9,u.QI,u.n0,r.O5,u.YG,r.sg,h.C6],styles:[""]}),x)}],w=function(){var t=function t(){e(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[a.Bz.forChild(T)],a.Bz]}),t}(),q=function(){var t=function t(){e(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[r.ez,o.u5,u.Pc,w,h.Ob]]}),t}()}}])}();