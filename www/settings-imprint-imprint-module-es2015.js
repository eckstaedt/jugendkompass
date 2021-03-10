(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-imprint-imprint-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/imprint/imprint.page.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/settings/imprint/imprint.page.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"\" defaultHref=\"/tabs/settings\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Impressum</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"imprint\">\n  <div class=\"text\" [innerHTML]=\"imprint.data.content.rendered\"></div>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/settings/imprint/imprint-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/settings/imprint/imprint-routing.module.ts ***!
  \************************************************************/
/*! exports provided: ImprintPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImprintPageRoutingModule", function() { return ImprintPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imprint.page */ "./src/app/settings/imprint/imprint.page.ts");




const routes = [
    {
        path: '',
        component: _imprint_page__WEBPACK_IMPORTED_MODULE_3__["ImprintPage"]
    }
];
let ImprintPageRoutingModule = class ImprintPageRoutingModule {
};
ImprintPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ImprintPageRoutingModule);



/***/ }),

/***/ "./src/app/settings/imprint/imprint.module.ts":
/*!****************************************************!*\
  !*** ./src/app/settings/imprint/imprint.module.ts ***!
  \****************************************************/
/*! exports provided: ImprintPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImprintPageModule", function() { return ImprintPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _imprint_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./imprint-routing.module */ "./src/app/settings/imprint/imprint-routing.module.ts");
/* harmony import */ var _imprint_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imprint.page */ "./src/app/settings/imprint/imprint.page.ts");







let ImprintPageModule = class ImprintPageModule {
};
ImprintPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _imprint_routing_module__WEBPACK_IMPORTED_MODULE_5__["ImprintPageRoutingModule"]
        ],
        declarations: [_imprint_page__WEBPACK_IMPORTED_MODULE_6__["ImprintPage"]]
    })
], ImprintPageModule);



/***/ }),

/***/ "./src/app/settings/imprint/imprint.page.scss":
/*!****************************************************!*\
  !*** ./src/app/settings/imprint/imprint.page.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".text {\n  padding: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvc2V0dGluZ3MvaW1wcmludC9pbXByaW50LnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2V0dGluZ3MvaW1wcmludC9pbXByaW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmdzL2ltcHJpbnQvaW1wcmludC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGV4dCB7XG4gICAgcGFkZGluZzogMXJlbTtcbn0iLCIudGV4dCB7XG4gIHBhZGRpbmc6IDFyZW07XG59Il19 */");

/***/ }),

/***/ "./src/app/settings/imprint/imprint.page.ts":
/*!**************************************************!*\
  !*** ./src/app/settings/imprint/imprint.page.ts ***!
  \**************************************************/
/*! exports provided: ImprintPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImprintPage", function() { return ImprintPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/wp.service */ "./src/app/services/wp.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");




let ImprintPage = class ImprintPage {
    constructor(wp, loadingController) {
        this.wp = wp;
        this.loadingController = loadingController;
    }
    ngOnInit() {
        this.getImprint();
    }
    getImprint() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                message: ''
            });
            yield loading.present();
            this.wp.getPageContent('24').then((imprint) => {
                this.imprint = imprint;
                loading.dismiss();
            });
        });
    }
};
ImprintPage.ctorParameters = () => [
    { type: src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] }
];
ImprintPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-imprint',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./imprint.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/imprint/imprint.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./imprint.page.scss */ "./src/app/settings/imprint/imprint.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]])
], ImprintPage);



/***/ })

}]);
//# sourceMappingURL=settings-imprint-imprint-module-es2015.js.map