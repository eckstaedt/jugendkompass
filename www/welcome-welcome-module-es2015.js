(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["welcome-welcome-module"],{

/***/ "./node_modules/@capacitor-community/fcm/dist/esm/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@capacitor-community/fcm/dist/esm/index.js ***!
  \*****************************************************************/
/*! exports provided: FCM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin */ "./node_modules/@capacitor-community/fcm/dist/esm/plugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FCM", function() { return _plugin__WEBPACK_IMPORTED_MODULE_0__["FCM"]; });


// export * from './web'; // @todo
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@capacitor-community/fcm/dist/esm/plugin.js":
/*!******************************************************************!*\
  !*** ./node_modules/@capacitor-community/fcm/dist/esm/plugin.js ***!
  \******************************************************************/
/*! exports provided: FCM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FCM", function() { return FCM; });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");

const { FCMPlugin } = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["Plugins"];
class FCM {
    /**
     * Subscribe to fcm topic
     * @param options
     */
    subscribeTo(options) {
        return FCMPlugin.subscribeTo({ topic: options.topic });
    }
    /**
     * Unsubscribe from fcm topic
     * @param options
     */
    unsubscribeFrom(options) {
        return FCMPlugin.unsubscribeFrom({ topic: options.topic });
    }
    /**
     * Get fcm token to eventually use from a serve
     *
     * Recommended to use this instead of
     * @usage
     * ```typescript
     * PushNotifications.addListener("registration", (token) => {
     *   console.log(token.data);
     * });
     * ```
     * because the native capacitor method, for apple, returns the APN's token
     */
    getToken() {
        return FCMPlugin.getToken();
    }
    /**
     * Remove local fcm instance completely
     */
    deleteInstance() {
        return FCMPlugin.deleteInstance();
    }
}
//# sourceMappingURL=plugin.js.map

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/welcome/welcome.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/welcome/welcome.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content fullscreen class=\"ion-padding\" scroll-y=\"false\">\n  <ion-slides pager=\"true\">\n    <ion-slide>\n      <ion-icon class=\"icon\" name=\"home-outline\"></ion-icon>\n      <h2>Herzlich Willkommen</h2>\n      <p>Schön das du es zum Jugendkompass geschafft hast.</p>\n    </ion-slide>\n    <ion-slide>\n      <ion-icon class=\"icon\" name=\"newspaper-outline\"></ion-icon>\n      <h2>Bleib auf dem Laufenden</h2>\n      <p>Sobald eine neue Ausgabe der Zeitschrift herausgegeben wird, erfährst du hier davon und kannst eine Auswahl an Artikeln direkt in der App lesen.</p>\n    </ion-slide>\n    <!-- <ion-slide>\n      <ion-icon class=\"icon\" name=\"calendar-outline\"></ion-icon>\n      <h2>Verpasse keine Termine mehr</h2>\n      <p>Alle für die Öffentlichkeit relevanten Termine und Veranstaltungen werden in der App angezeigt.</p>\n    </ion-slide> -->\n    <ion-slide>\n      <ion-icon class=\"icon\" name=\"brush-outline\"></ion-icon>\n      <h2>Wähle ein Theme aus</h2>\n\n      <ion-radio-group (ionChange)=\"onThemeChange()\" [(ngModel)]=\"mode\">\n        <ion-item lines=\"none\">\n          <ion-label>Hell</ion-label>\n          <ion-radio slot=\"start\" value=\"bright\"></ion-radio>\n        </ion-item>\n        <ion-item lines=\"none\">\n          <ion-label>Dunkel</ion-label>\n          <ion-radio slot=\"start\" value=\"dark\"></ion-radio>\n        </ion-item>\n      </ion-radio-group>\n      <ion-button (click)=\"toHome()\" fill=\"clear\">Los geht´s <ion-icon name=\"arrow-forward\"></ion-icon></ion-button>\n    </ion-slide>\n    <!-- <ion-slide>\n      <ion-icon class=\"icon\" name=\"mail-unread-outline\"></ion-icon>\n      <h2>Push</h2>\n      <p>Damit du nicht jeden Tag nach Updates schauen musst erlaube Push Benachrichtigungen um sofort informiert zu werden wenn neue Artikel zur Verfügung stehen.</p>\n      <ion-button (click)=\"toHome()\" fill=\"clear\">Los geht´s <ion-icon name=\"arrow-forward\"></ion-icon></ion-button>\n    </ion-slide> -->\n  </ion-slides>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/welcome/welcome-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/welcome/welcome-routing.module.ts ***!
  \***************************************************/
/*! exports provided: WelcomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageRoutingModule", function() { return WelcomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./welcome.page */ "./src/app/welcome/welcome.page.ts");




const routes = [
    {
        path: '',
        component: _welcome_page__WEBPACK_IMPORTED_MODULE_3__["WelcomePage"]
    }
];
let WelcomePageRoutingModule = class WelcomePageRoutingModule {
};
WelcomePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], WelcomePageRoutingModule);



/***/ }),

/***/ "./src/app/welcome/welcome.module.ts":
/*!*******************************************!*\
  !*** ./src/app/welcome/welcome.module.ts ***!
  \*******************************************/
/*! exports provided: WelcomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _welcome_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./welcome-routing.module */ "./src/app/welcome/welcome-routing.module.ts");
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./welcome.page */ "./src/app/welcome/welcome.page.ts");







let WelcomePageModule = class WelcomePageModule {
};
WelcomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _welcome_routing_module__WEBPACK_IMPORTED_MODULE_5__["WelcomePageRoutingModule"]
        ],
        declarations: [_welcome_page__WEBPACK_IMPORTED_MODULE_6__["WelcomePage"]]
    })
], WelcomePageModule);



/***/ }),

/***/ "./src/app/welcome/welcome.page.scss":
/*!*******************************************!*\
  !*** ./src/app/welcome/welcome.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-slides {\n  height: 100%;\n}\nion-slides ion-slide {\n  display: block;\n  margin-top: 2rem;\n}\nion-slides ion-slide .icon {\n  font-size: 17rem;\n  color: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvd2VsY29tZS93ZWxjb21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvd2VsY29tZS93ZWxjb21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUNDSjtBRENJO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0FDQ1I7QURDUTtFQUNJLGdCQUFBO0VBQ0EsK0JBQUE7QUNDWiIsImZpbGUiOiJzcmMvYXBwL3dlbGNvbWUvd2VsY29tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2xpZGVzIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICBpb24tc2xpZGUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWFyZ2luLXRvcDogMnJlbTtcblxuICAgICAgICAuaWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE3cmVtO1xuICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpb24tc2xpZGVzIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuaW9uLXNsaWRlcyBpb24tc2xpZGUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cbmlvbi1zbGlkZXMgaW9uLXNsaWRlIC5pY29uIHtcbiAgZm9udC1zaXplOiAxN3JlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/welcome/welcome.page.ts":
/*!*****************************************!*\
  !*** ./src/app/welcome/welcome.page.ts ***!
  \*****************************************/
/*! exports provided: WelcomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePage", function() { return WelcomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var _capacitor_community_fcm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor-community/fcm */ "./node_modules/@capacitor-community/fcm/dist/esm/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");





const fcm = new _capacitor_community_fcm__WEBPACK_IMPORTED_MODULE_4__["FCM"]();

const { PushNotifications } = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"];
let WelcomePage = class WelcomePage {
    constructor(router, storage) {
        this.router = router;
        this.storage = storage;
        this.mode = 'bright';
    }
    ngOnInit() {
    }
    toHome() {
        PushNotifications.requestPermission().then((res) => {
            if (res.granted) {
                PushNotifications.register().then(() => {
                    fcm
                        .subscribeTo({ topic: 'general' })
                        .then(() => console.log('subscribed successfully'))
                        .catch((err) => console.log(err));
                })
                    .catch((err) => console.log(JSON.stringify(err)));
            }
        });
        this.storage.set('oldUser', true);
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
    }
    onThemeChange() {
        this.storage.set('darkMode', Boolean(this.mode === 'dark'));
        document.body.classList.toggle('dark', Boolean(this.mode === 'dark'));
        console.log(this.mode);
    }
};
WelcomePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] }
];
WelcomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-welcome',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./welcome.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/welcome/welcome.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./welcome.page.scss */ "./src/app/welcome/welcome.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
], WelcomePage);



/***/ })

}]);
//# sourceMappingURL=welcome-welcome-module-es2015.js.map