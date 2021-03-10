function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-dataprot-dataprot-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/dataprot/dataprot.page.html":
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/settings/dataprot/dataprot.page.html ***!
    \********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSettingsDataprotDataprotPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"\" defaultHref=\"/tabs/settings\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Datenschutzerklärung</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"dataProt\">\n  <div class=\"text\" [innerHTML]=\"dataProt.data.content.rendered\"></div>\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/settings/dataprot/dataprot-routing.module.ts":
  /*!**************************************************************!*\
    !*** ./src/app/settings/dataprot/dataprot-routing.module.ts ***!
    \**************************************************************/

  /*! exports provided: DataprotPageRoutingModule */

  /***/
  function srcAppSettingsDataprotDataprotRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataprotPageRoutingModule", function () {
      return DataprotPageRoutingModule;
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


    var _dataprot_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./dataprot.page */
    "./src/app/settings/dataprot/dataprot.page.ts");

    var routes = [{
      path: '',
      component: _dataprot_page__WEBPACK_IMPORTED_MODULE_3__["DataprotPage"]
    }];

    var DataprotPageRoutingModule = function DataprotPageRoutingModule() {
      _classCallCheck(this, DataprotPageRoutingModule);
    };

    DataprotPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], DataprotPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/settings/dataprot/dataprot.module.ts":
  /*!******************************************************!*\
    !*** ./src/app/settings/dataprot/dataprot.module.ts ***!
    \******************************************************/

  /*! exports provided: DataprotPageModule */

  /***/
  function srcAppSettingsDataprotDataprotModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataprotPageModule", function () {
      return DataprotPageModule;
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


    var _dataprot_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./dataprot-routing.module */
    "./src/app/settings/dataprot/dataprot-routing.module.ts");
    /* harmony import */


    var _dataprot_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./dataprot.page */
    "./src/app/settings/dataprot/dataprot.page.ts");

    var DataprotPageModule = function DataprotPageModule() {
      _classCallCheck(this, DataprotPageModule);
    };

    DataprotPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _dataprot_routing_module__WEBPACK_IMPORTED_MODULE_5__["DataprotPageRoutingModule"]],
      declarations: [_dataprot_page__WEBPACK_IMPORTED_MODULE_6__["DataprotPage"]]
    })], DataprotPageModule);
    /***/
  },

  /***/
  "./src/app/settings/dataprot/dataprot.page.scss":
  /*!******************************************************!*\
    !*** ./src/app/settings/dataprot/dataprot.page.scss ***!
    \******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSettingsDataprotDataprotPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".text {\n  padding: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvc2V0dGluZ3MvZGF0YXByb3QvZGF0YXByb3QucGFnZS5zY3NzIiwic3JjL2FwcC9zZXR0aW5ncy9kYXRhcHJvdC9kYXRhcHJvdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9zZXR0aW5ncy9kYXRhcHJvdC9kYXRhcHJvdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGV4dCB7XG4gICAgcGFkZGluZzogMXJlbTtcbn0iLCIudGV4dCB7XG4gIHBhZGRpbmc6IDFyZW07XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/settings/dataprot/dataprot.page.ts":
  /*!****************************************************!*\
    !*** ./src/app/settings/dataprot/dataprot.page.ts ***!
    \****************************************************/

  /*! exports provided: DataprotPage */

  /***/
  function srcAppSettingsDataprotDataprotPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataprotPage", function () {
      return DataprotPage;
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


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/wp.service */
    "./src/app/services/wp.service.ts");

    var DataprotPage = /*#__PURE__*/function () {
      function DataprotPage(wp, loadingController) {
        _classCallCheck(this, DataprotPage);

        this.wp = wp;
        this.loadingController = loadingController;
      }

      _createClass(DataprotPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getImprint();
        }
      }, {
        key: "getImprint",
        value: function getImprint() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this = this;

            var loading;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.loadingController.create({
                      message: ''
                    });

                  case 2:
                    loading = _context.sent;
                    _context.next = 5;
                    return loading.present();

                  case 5:
                    this.wp.getPageContent('4').then(function (dataProt) {
                      _this.dataProt = dataProt;
                      loading.dismiss();
                    });

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }]);

      return DataprotPage;
    }();

    DataprotPage.ctorParameters = function () {
      return [{
        type: src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__["WpService"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]
      }];
    };

    DataprotPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-dataprot',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./dataprot.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/settings/dataprot/dataprot.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dataprot.page.scss */
      "./src/app/settings/dataprot/dataprot.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__["WpService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]])], DataprotPage);
    /***/
  }
}]);
//# sourceMappingURL=settings-dataprot-dataprot-module-es5.js.map