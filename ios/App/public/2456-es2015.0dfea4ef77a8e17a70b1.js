"use strict";(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[2456],{22456:function(e,i,t){t.r(i),t.d(i,{PushPageModule:function(){return T}});var s=t(38583),n=t(90665),o=t(94490),l=t(9451),u=t(64762),a=t(8078),r=t(76321),h=t(69526),c=t(15257),g=t(33018),d=t(49860);function p(e,i){if(1&e&&(g.TgZ(0,"ion-select-option",12),g._uU(1),g.qZA()),2&e){const e=i.$implicit;g.Q6J("value",e),g.xp6(1),g.Oqu(e.name)}}function f(e,i){if(1&e){const e=g.EpF();g.TgZ(0,"ion-item",2),g.TgZ(1,"ion-label"),g._uU(2,"Ausgabe ausw\xe4hlen"),g.qZA(),g.TgZ(3,"ion-select",4),g.NdJ("ngModelChange",function(i){return g.CHM(e),g.oxw().ausgabe=i}),g.YNc(4,p,2,2,"ion-select-option",11),g.qZA(),g.qZA()}if(2&e){const e=g.oxw();g.xp6(3),g.Q6J("ngModel",e.ausgabe),g.xp6(1),g.Q6J("ngForOf",e.ausgaben)}}function m(e,i){if(1&e&&(g.TgZ(0,"ion-select-option",12),g._uU(1),g.qZA()),2&e){const e=i.$implicit;g.Q6J("value",e),g.xp6(1),g.Oqu(e.title)}}function b(e,i){if(1&e){const e=g.EpF();g.TgZ(0,"ion-item",2),g.TgZ(1,"ion-label"),g._uU(2,"Impuls ausw\xe4hlen"),g.qZA(),g.TgZ(3,"ion-select",4),g.NdJ("ngModelChange",function(i){return g.CHM(e),g.oxw().impulse=i}),g.YNc(4,m,2,2,"ion-select-option",11),g.qZA(),g.qZA()}if(2&e){const e=g.oxw();g.xp6(3),g.Q6J("ngModel",e.impulse),g.xp6(1),g.Q6J("ngForOf",e.impulses)}}function Z(e,i){if(1&e&&(g.TgZ(0,"ion-label"),g._uU(1),g.qZA()),2&e){const e=g.oxw(2);g.xp6(1),g.Oqu(e.file.name)}}function A(e,i){if(1&e){const e=g.EpF();g.TgZ(0,"ion-item",2),g.TgZ(1,"input",13,14),g.NdJ("change",function(){return g.CHM(e),g.oxw().onImageSelected()}),g.qZA(),g.TgZ(3,"ion-button",15),g.NdJ("click",function(){return g.CHM(e),g.MAs(2).click()}),g._uU(4,"Bild ausw\xe4hlen (max. 300 Kb)"),g.qZA(),g.YNc(5,Z,2,1,"ion-label",16),g.qZA()}if(2&e){const e=g.oxw();g.xp6(1),g.Q6J("uploader",e.fileUploader),g.xp6(4),g.Q6J("ngIf",e.file)}}const v=[{path:"",component:(()=>{class e{constructor(e,i,t,s){this.firebaseService=e,this.alertController=i,this.utils=t,this.toastController=s,this.title="",this.body="",this.ausgaben=[],this.impulses=[],this.type=h.$Q.GENERAL,this.fileUploader=new r.bA({})}ngOnInit(){return(0,u.mG)(this,void 0,void 0,function*(){yield this.getCategories(),yield this.getImpulses()})}getCategories(){var e;return(0,u.mG)(this,void 0,void 0,function*(){yield this.firebaseService.getAusgaben(),this.ausgaben=this.firebaseService.getAusgaben().filter(e=>!e.pushSend),(null===(e=this.ausgaben)||void 0===e?void 0:e.length)?this.ausgabe=this.ausgaben[0]:this.type=h.$Q.GENERAL})}getImpulses(){var e;return(0,u.mG)(this,void 0,void 0,function*(){const i=yield this.firebaseService.getImpulses().pipe((0,c.q)(1)).toPromise();this.impulses=i.filter(e=>!e.pushSend),(null===(e=this.impulses)||void 0===e?void 0:e.length)?this.impulse=this.impulses[0]:this.type=h.$Q.GENERAL})}onImageSelected(){if(this.fileUploader.queue&&0!==this.fileUploader.queue.length){const e=this.fileUploader.queue[this.fileUploader.queue.length-1].file;e.size>3e5?(this.showImageUploadError(),this.fileUploader.queue=[]):this.file=e}}showImageUploadError(){return(0,u.mG)(this,void 0,void 0,function*(){(yield this.toastController.create({duration:3e3,message:"W\xe4hle ein Cover mit maximal 300kb aus",color:"danger"})).present()})}showConfirmAlert(e){return(0,u.mG)(this,void 0,void 0,function*(){""!==this.body?yield(yield this.alertController.create({header:e?"Testnachricht senden?":"Nachricht senden?",message:`<p>Titel: ${this.title}</p><p>Body: ${this.body}</p>`,buttons:[,{text:"Abbrechen"},{text:"Senden",handler:()=>(0,u.mG)(this,void 0,void 0,function*(){let i;this.file&&(i=yield this.firebaseService.uploadImageFile(this.file)),e?this.sendTestPush(i):this.sendPush(i)})}]})).present():this.utils.showToast("Bitte gebe min. ein Text im Nachricht-Feld ein...","danger")})}sendTestPush(e){var i,t;this.firebaseService.sendTestPush({title:this.title,body:this.body,image:this.type===h.$Q.AUSGABE?null===(i=this.ausgabe)||void 0===i?void 0:i.imageUrl:this.type===h.$Q.IMPULSE?null===(t=this.impulse)||void 0===t?void 0:t.postImg.source_url:null==e?void 0:e.url},this.type===h.$Q.AUSGABE?{ausgabe:this.ausgabe.id.toString()}:this.type===h.$Q.IMPULSE?{impulse:this.impulse.id.toString()}:{}),this.utils.showToast("Die Test Push Mitteilung wurde erfolgreich versendet","success")}sendPush(e){var i,t;this.firebaseService.sendPush({title:this.title,body:this.body,image:this.type===h.$Q.AUSGABE?null===(i=this.ausgabe)||void 0===i?void 0:i.imageUrl:this.type===h.$Q.IMPULSE?null===(t=this.impulse)||void 0===t?void 0:t.postImg.source_url:null==e?void 0:e.url},this.type===h.$Q.AUSGABE?{ausgabe:this.ausgabe.id.toString()}:this.type===h.$Q.IMPULSE?{impulse:this.impulse.id.toString()}:{},this.type),this.type===h.$Q.AUSGABE&&this.firebaseService.updateAusgabe(this.ausgabe.id.toString(),{pushSend:!0}),this.type===h.$Q.IMPULSE&&this.firebaseService.updateImpulse(this.impulse.id.toString(),{pushSend:!0}),this.utils.showToast("Die Push Mitteilung wurde erfolgreich versendet","success"),this.resetData()}resetData(){this.file=void 0,this.fileUploader.queue=[],this.title="",this.body=""}}return e.\u0275fac=function(i){return new(i||e)(g.Y36(a.O),g.Y36(o.Br),g.Y36(d.c),g.Y36(o.yF))},e.\u0275cmp=g.Xpm({type:e,selectors:[["app-push"]],decls:32,vars:8,consts:[["slot","start"],["text","","defaultHref","/tabs/settings"],["lines","full"],["position","stacked"],[3,"ngModel","ngModelChange"],["value","general"],["value","ausgabe",3,"disabled"],["value","impulse",3,"disabled"],["lines","full",4,"ngIf"],["color","medium","expand","full",3,"click"],["color","success","expand","full",3,"click"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["accept","image/png, image/jpeg","type","file","ng2FileSelect","",2,"display","none",3,"uploader","change"],["selector",""],["color","medium",3,"click"],[4,"ngIf"]],template:function(e,i){1&e&&(g.TgZ(0,"ion-header"),g.TgZ(1,"ion-toolbar"),g.TgZ(2,"ion-buttons",0),g._UZ(3,"ion-back-button",1),g.qZA(),g.TgZ(4,"ion-title"),g._uU(5,"Benachrichtigungen"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(6,"ion-content"),g.TgZ(7,"ion-item",2),g.TgZ(8,"ion-label",3),g._uU(9,"Titel"),g.qZA(),g.TgZ(10,"ion-input",4),g.NdJ("ngModelChange",function(e){return i.title=e}),g.qZA(),g.qZA(),g.TgZ(11,"ion-item",2),g.TgZ(12,"ion-label",3),g._uU(13,"Nachricht"),g.qZA(),g.TgZ(14,"ion-input",4),g.NdJ("ngModelChange",function(e){return i.body=e}),g.qZA(),g.qZA(),g.TgZ(15,"ion-item",2),g.TgZ(16,"ion-label"),g._uU(17,"Typ"),g.qZA(),g.TgZ(18,"ion-select",4),g.NdJ("ngModelChange",function(e){return i.type=e}),g.TgZ(19,"ion-select-option",5),g._uU(20,"Allgemein"),g.qZA(),g.TgZ(21,"ion-select-option",6),g._uU(22,"Neue Ausgabe"),g.qZA(),g.TgZ(23,"ion-select-option",7),g._uU(24,"Neuer Impuls"),g.qZA(),g.qZA(),g.qZA(),g.YNc(25,f,5,2,"ion-item",8),g.YNc(26,b,5,2,"ion-item",8),g.YNc(27,A,6,2,"ion-item",8),g.TgZ(28,"ion-button",9),g.NdJ("click",function(){return i.showConfirmAlert(!0)}),g._uU(29,"Testnachricht senden"),g.qZA(),g.TgZ(30,"ion-button",10),g.NdJ("click",function(){return i.showConfirmAlert(!1)}),g._uU(31,"Push Benachrichtigung an alle User senden"),g.qZA(),g.qZA()),2&e&&(g.xp6(10),g.Q6J("ngModel",i.title),g.xp6(4),g.Q6J("ngModel",i.body),g.xp6(4),g.Q6J("ngModel",i.type),g.xp6(3),g.Q6J("disabled",!i.ausgaben.length),g.xp6(2),g.Q6J("disabled",!i.impulses.length),g.xp6(2),g.Q6J("ngIf","ausgabe"===i.type),g.xp6(1),g.Q6J("ngIf","impulse"===i.type),g.xp6(1),g.Q6J("ngIf","general"===i.type))},directives:[o.Gu,o.sr,o.Sm,o.oU,o.cs,o.wd,o.W2,o.Ie,o.Q$,o.pK,o.j9,n.JJ,n.On,o.t9,o.QI,o.n0,s.O5,o.YG,s.sg,r.C6],styles:[""]}),e})()}];let y=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[l.Bz.forChild(v)],l.Bz]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[s.ez,n.u5,o.Pc,y,r.Ob]]}),e})()}}]);