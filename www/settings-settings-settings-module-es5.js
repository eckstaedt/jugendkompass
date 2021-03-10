function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-settings-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings/settings.page.html":
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings/settings.page.html ***!
    \********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSettingsSettingsSettingsPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Mehr</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n      Allgemein\n    </ion-list-header>\n    <ion-item detail (click)=\"openMail()\">\n      <ion-label>Kontakt</ion-label>\n    </ion-item>\n    <ion-item detail routerDirection=\"forward\" routerLink=\"/tabs/settings/imprint\">\n      <ion-label>Impressum</ion-label>\n    </ion-item>\n    <ion-item detail routerDirection=\"forward\" routerLink=\"/tabs/settings/dataprotection\">\n      <ion-label>Datenschutzerklärung</ion-label>\n    </ion-item>\n\n    <ion-list-header>\n      Theme\n    </ion-list-header>\n    <ion-item>\n      <ion-label>Dunkel</ion-label>\n      <ion-toggle [(ngModel)]=\"darkMode\" (ionChange)=\"toggleMode()\"></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/settings/settings/settings-routing.module.ts":
  /*!**************************************************************!*\
    !*** ./src/app/settings/settings/settings-routing.module.ts ***!
    \**************************************************************/

  /*! exports provided: SettingsPageRoutingModule */

  /***/
  function srcAppSettingsSettingsSettingsRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingsPageRoutingModule", function () {
      return SettingsPageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _settings_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./settings.page */
    "./src/app/settings/settings/settings.page.ts");

    var routes = [{
      path: '',
      component: _settings_page__WEBPACK_IMPORTED_MODULE_3__["SettingsPage"]
    }];

    var SettingsPageRoutingModule = function SettingsPageRoutingModule() {
      _classCallCheck(this, SettingsPageRoutingModule);
    };

    SettingsPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], SettingsPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/settings/settings/settings.module.ts":
  /*!******************************************************!*\
    !*** ./src/app/settings/settings/settings.module.ts ***!
    \******************************************************/

  /*! exports provided: SettingsPageModule */

  /***/
  function srcAppSettingsSettingsSettingsModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function () {
      return SettingsPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _settings_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./settings-routing.module */
    "./src/app/settings/settings/settings-routing.module.ts");
    /* harmony import */


    var _settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./settings.page */
    "./src/app/settings/settings/settings.page.ts");

    var SettingsPageModule = function SettingsPageModule() {
      _classCallCheck(this, SettingsPageModule);
    };

    SettingsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _settings_routing_module__WEBPACK_IMPORTED_MODULE_5__["SettingsPageRoutingModule"]],
      declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_6__["SettingsPage"]]
    })], SettingsPageModule);
    /***/
  },

  /***/
  "./src/app/settings/settings/settings.page.scss":
  /*!******************************************************!*\
    !*** ./src/app/settings/settings/settings.page.scss ***!
    \******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSettingsSettingsSettingsPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmdzL3NldHRpbmdzL3NldHRpbmdzLnBhZ2Uuc2NzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/settings/settings/settings.page.ts":
  /*!****************************************************!*\
    !*** ./src/app/settings/settings/settings.page.ts ***!
    \****************************************************/

  /*! exports provided: SettingsPage */

  /***/
  function srcAppSettingsSettingsSettingsPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingsPage", function () {
      return SettingsPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");

    var SettingsPage = /*#__PURE__*/function () {
      function SettingsPage(storage) {
        _classCallCheck(this, SettingsPage);

        this.storage = storage;
        this.darkMode = false;
      }

      _createClass(SettingsPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.storage.get('darkMode').then(function (res) {
            _this.darkMode = res;
          })["catch"](function () {
            _this.darkMode = false;
          });
        }
      }, {
        key: "toggleMode",
        value: function toggleMode() {
          this.storage.set('darkMode', this.darkMode);
          document.body.classList.toggle('dark', this.darkMode);
        }
      }, {
        key: "openMail",
        value: function openMail() {
          window.open('mailto:entwickler@stephanus-zeitschrift.de', '_blank');
        }
      }]);

      return SettingsPage;
    }();

    SettingsPage.ctorParameters = function () {
      return [{
        type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]
      }];
    };

    SettingsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-settings',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./settings.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/settings/settings.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./settings.page.scss */
      "./src/app/settings/settings/settings.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]])], SettingsPage);
    /***/
  }
}]);
//# sourceMappingURL=settings-settings-settings-module-es5.js.map