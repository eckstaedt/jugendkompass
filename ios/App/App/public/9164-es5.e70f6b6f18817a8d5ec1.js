!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(self.webpackChunkjugendkompass=self.webpackChunkjugendkompass||[]).push([[9164],{89164:function(n,i,o){o.r(i),o.d(i,{SettingsPageModule:function(){return x}});var r=o(38583),a=o(90665),s=o(88786),u=o(90928),c=o(64762),l=o(4147),p=o(16380),h=o(66097),d=o(45819),g=o(10639),m=o(38605),f=o(39249),Z=o(49860);function b(e,t){1&e&&(g.TgZ(0,"ion-item",27),g._UZ(1,"ion-icon",28),g.TgZ(2,"ion-label"),g._uU(3,"Benachrichtigungen"),g.qZA(),g.qZA())}function k(e,t){1&e&&(g.TgZ(0,"ion-item",29),g._UZ(1,"ion-icon",28),g.TgZ(2,"ion-label"),g._uU(3,"Sende Benachrichtigungen"),g.qZA(),g.qZA())}function A(e,t){if(1&e){var n=g.EpF();g.TgZ(0,"ion-item",30),g.NdJ("click",function(){return g.CHM(n),g.oxw().openFeedbackModal()}),g._UZ(1,"ion-icon",31),g.TgZ(2,"ion-label"),g._uU(3,"Feedback"),g.qZA(),g.qZA()}}function v(e,t){1&e&&(g.TgZ(0,"ion-item",32),g._UZ(1,"ion-icon",33),g.TgZ(2,"ion-label"),g._uU(3,"Feedbackauswertung"),g.qZA(),g.qZA())}function w(e,t){1&e&&(g.TgZ(0,"ion-item",34),g._UZ(1,"ion-icon",35),g.TgZ(2,"ion-label"),g._uU(3,"Analysenauswertung"),g.qZA(),g.qZA())}var T,q=[{path:"",component:(T=function(){function n(t,i,o,r,a,s,u){e(this,n),this.storage=t,this.plt=i,this.actionSheetController=o,this.firebaseService=r,this.modalController=a,this.themeService=s,this.utils=u,this.version=l.i8,this.theme="default",this.isAdmin=!1,this.isApp=!0,this.feedbackProvided=!1}var i,o,r;return i=n,(o=[{key:"ngOnInit",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.themeService.getThemeInStorage();case 2:this.theme=e.sent,this.isApp=this.utils.isApp(),this.firebaseService.subscribeToAdmin().subscribe(function(e){t.isAdmin=e});case 5:case"end":return e.stop()}},e,this)}))}},{key:"ionViewWillEnter",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.storage.get("hasFeedbackSend");case 2:this.feedbackProvided=e.sent;case 3:case"end":return e.stop()}},e,this)}))}},{key:"openFeedbackModal",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.modalController.create({component:d.w});case 2:return(t=e.sent).onDidDismiss().then(function(e){n.feedbackProvided=e.data}),e.next=6,t.present();case 6:case"end":return e.stop()}},e,this)}))}},{key:"onThemeChange",value:function(){this.themeService.themeChange(this.theme)}},{key:"openContactActionSheet",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.actionSheetController.create({buttons:[{text:"E-Mail",handler:function(){return t.openContactSource("mailto:entwickler@jugendkompass.de")}},{text:"Telegram",handler:function(){return t.openContactSource("https://t.me/JugendKompass")}},{text:"Whatsapp",handler:function(){return t.openContactSource("https://api.whatsapp.com/send?phone=4915737855537")}},{text:"Abbrechen",role:"cancel"}]});case 2:return e.next=4,e.sent.present();case 4:case"end":return e.stop()}},e,this)}))}},{key:"openContactSource",value:function(e){window.open(e,"_blank")}},{key:"share",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.utils.isApp()){e.next=5;break}return e.next=3,p.m.share({title:"Artikel teilen",text:"Jugendkompass",url:this.plt.is("ios")?"https://apps.apple.com/de/app/jugendkompass/id1559123537":"https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass",dialogTitle:"App weiterempfehlen"});case 3:e.next=7;break;case 5:return e.next=7,this.openShareActionSheet();case 7:case"end":return e.stop()}},e,this)}))}},{key:"openShareActionSheet",value:function(){return(0,c.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.actionSheetController.create({buttons:[{text:"iOS App weiterempfehlen",icon:"logo-apple",handler:function(){window.open("https://apps.apple.com/de/app/jugendkompass/id1559123537","_blank")}},{text:"Android App weiterempfehlen",icon:"logo-android",handler:function(){window.open("https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass","_blank")}},{text:"Cancel",icon:"close",role:"cancel"}]});case 2:return e.next=4,e.sent.present();case 4:case"end":return e.stop()}},e,this)}))}}])&&t(i.prototype,o),r&&t(i,r),n}(),T.\u0275fac=function(e){return new(e||T)(g.Y36(m.Ke),g.Y36(s.t4),g.Y36(s.BX),g.Y36(h.O),g.Y36(s.IN),g.Y36(f.f),g.Y36(Z.c))},T.\u0275cmp=g.Xpm({type:T,selectors:[["app-settings"]],decls:57,vars:7,consts:[["translucent","true"],["collapse","condense"],["size","large"],["detail","","routerDirection","forward","routerLink","/tabs/settings/push-settings",4,"ngIf"],["detail","","button","",3,"click"],["slot","start","name","help-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/imprint"],["slot","start","name","briefcase-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/dataprotection"],["slot","start","name","lock-closed-outline"],["slot","start","name","share-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/push",4,"ngIf"],["button","","detail","",3,"click",4,"ngIf"],["detail","","routerDirection","forward","routerLink","/tabs/settings/feedback-summary",4,"ngIf"],["detail","","routerDirection","forward","routerLink","/tabs/settings/analytics",4,"ngIf"],["lines","full"],["slot","start","name","information-outline"],["slot","end"],["lines","inset"],["slot","start","name","contrast-outline"],[1,"theme-label"],[1,"theme-select",3,"ngModel","ngModelChange","ionChange"],["value","default"],["value","light"],["value","dark"],["lines","full","detail","","routerDirection","forward","routerLink","/tabs/settings/text-size"],["slot","start","name","resize-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/push-settings"],["slot","start","name","send-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/push"],["button","","detail","",3,"click"],["slot","start","name","clipboard-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/feedback-summary"],["slot","start","name","pie-chart-outline"],["detail","","routerDirection","forward","routerLink","/tabs/settings/analytics"],["slot","start","name","bar-chart-outline"]],template:function(e,t){1&e&&(g.TgZ(0,"ion-header",0),g.TgZ(1,"ion-toolbar"),g.TgZ(2,"ion-title"),g._uU(3,"Einstellungen"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(4,"ion-content"),g.TgZ(5,"ion-header",1),g.TgZ(6,"ion-toolbar"),g.TgZ(7,"ion-title",2),g._uU(8,"Einstellungen"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(9,"ion-list"),g.TgZ(10,"ion-list-header"),g._uU(11,"Allgemein"),g.qZA(),g.YNc(12,b,4,0,"ion-item",3),g.TgZ(13,"ion-item",4),g.NdJ("click",function(){return t.openContactActionSheet()}),g._UZ(14,"ion-icon",5),g.TgZ(15,"ion-label"),g._uU(16,"Kontakt"),g.qZA(),g.qZA(),g.TgZ(17,"ion-item",6),g._UZ(18,"ion-icon",7),g.TgZ(19,"ion-label"),g._uU(20,"Impressum"),g.qZA(),g.qZA(),g.TgZ(21,"ion-item",8),g._UZ(22,"ion-icon",9),g.TgZ(23,"ion-label"),g._uU(24,"Datenschutzerkl\xe4rung"),g.qZA(),g.qZA(),g.TgZ(25,"ion-item",4),g.NdJ("click",function(){return t.share()}),g._UZ(26,"ion-icon",10),g.TgZ(27,"ion-label"),g._uU(28,"App weiterempfehlen"),g.qZA(),g.qZA(),g.YNc(29,k,4,0,"ion-item",11),g.YNc(30,A,4,0,"ion-item",12),g.YNc(31,v,4,0,"ion-item",13),g.YNc(32,w,4,0,"ion-item",14),g.TgZ(33,"ion-item",15),g._UZ(34,"ion-icon",16),g.TgZ(35,"ion-label"),g._uU(36,"Version"),g.qZA(),g.TgZ(37,"ion-chip",17),g.TgZ(38,"ion-label"),g._uU(39),g.qZA(),g.qZA(),g.qZA(),g.TgZ(40,"ion-list-header"),g._uU(41,"Erscheinungsbild"),g.qZA(),g.TgZ(42,"ion-item",18),g._UZ(43,"ion-icon",19),g.TgZ(44,"ion-label",20),g._uU(45,"Theme"),g.qZA(),g.TgZ(46,"ion-select",21),g.NdJ("ngModelChange",function(e){return t.theme=e})("ionChange",function(){return t.onThemeChange()}),g.TgZ(47,"ion-select-option",22),g._uU(48,"Systemeinstellung"),g.qZA(),g.TgZ(49,"ion-select-option",23),g._uU(50,"Hell"),g.qZA(),g.TgZ(51,"ion-select-option",24),g._uU(52,"Dunkel"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(53,"ion-item",25),g._UZ(54,"ion-icon",26),g.TgZ(55,"ion-label"),g._uU(56,"Textgr\xf6\xdfe"),g.qZA(),g.qZA(),g.qZA(),g.qZA()),2&e&&(g.xp6(12),g.Q6J("ngIf",t.isApp),g.xp6(17),g.Q6J("ngIf",t.isAdmin),g.xp6(1),g.Q6J("ngIf",!t.feedbackProvided&&t.isApp),g.xp6(1),g.Q6J("ngIf",t.isAdmin),g.xp6(1),g.Q6J("ngIf",t.isAdmin),g.xp6(7),g.Oqu(t.version),g.xp6(7),g.Q6J("ngModel",t.theme))},directives:[s.Gu,s.sr,s.wd,s.W2,s.q_,s.yh,r.O5,s.Ie,s.gu,s.Q$,s.YI,u.rH,s.hM,s.t9,s.QI,a.JJ,a.On,s.n0],styles:[".theme-label[_ngcontent-%COMP%]{width:40%}.theme-select[_ngcontent-%COMP%]{width:60%;text-align:right}"]}),T)}],_=function(){var t=function t(){e(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[u.Bz.forChild(q)],u.Bz]}),t}(),x=function(){var t=function t(){e(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[r.ez,a.u5,s.Pc,_]]}),t}()}}])}();