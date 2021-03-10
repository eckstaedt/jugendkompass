function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["posts-post-list-post-list-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPostsPostListPostListPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header translucent=\"true\">\n  <ion-toolbar>\n    <ion-title>Jugendkompass</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-header collapse=\"condense\">              \n    <ion-toolbar>      \n      <ion-title size=\"large\">Jugendkompass</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"loadPosts($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div class=\"topBar\">\n    <ion-searchbar\n      type=\"search\"\n      inputmode=\"search\"\n      enterkeyhint=\"search\"\n      [(ngModel)]=\"searchTerm\"\n      (ionInput)=\"onSearch($event)\"\n      class=\"searchBar\"\n      [disabled]=\"!allPosts.length\"\n      animated\n      placeholder=\"Artikel suchen...\">\n    </ion-searchbar>\n    <ion-button [disabled]=\"!allPosts.length\" (click)=\"onFilter()\" class=\"filterBtn\" shape=\"round\" fill=\"none\">\n      <ion-icon [color]=\"currentRubrik === 'all' ? '' : 'primary'\" name=\"funnel\"></ion-icon>\n    </ion-button>\n    <ion-item style=\"display: none;\">\n      <ion-label>Rubrik</ion-label>\n      <ion-select (ionChange)=\"filterRubrik()\" [(ngModel)]=\"currentRubrik\" cancelText=\"Abbrechen\" okText=\"Ok\" #select>\n        <ion-select-option value=\"all\">Alle</ion-select-option>\n        <ion-select-option *ngFor=\"let rubrik of rubriken\" [value]=\"rubrik.id\">{{ rubrik.name }}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <div class=\"categoryBar\" *ngIf=\"categories.length\">\n    <ion-select [disabled]=\"!allPosts.length\" (ionChange)=\"filterCategory()\" [(ngModel)]=\"currentCategory\">\n      <ion-select-option value=\"all\">Alle Ausgaben</ion-select-option>\n      <ion-select-option [value]=\"cat.id\" *ngFor=\"let cat of categories\">{{ cat.name }}</ion-select-option>\n    </ion-select>\n  </div>\n  <div *ngIf=\"posts.length\">\n    <ion-card [routerLink]=\"['/', 'tabs', 'posts', post.id]\" *ngFor=\"let post of posts\" (click)=\"setAsRead(post)\" [color]=\"post.articleWasRead ? 'light' : ''\">\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"4\">\n            <img *ngIf=\"post.media_url\" [src]=\"post.media_url\">\n          </ion-col>\n          <ion-col size=\"8\">\n            <ion-card-header>\n              <p [style.color]=\"post.rubrik.description ? post.rubrik.description : ''\" *ngIf=\"post.rubrik\">{{ post.rubrik.name }}</p>\n              <ion-card-title [innerHTML]=\"post.title.rendered\"></ion-card-title>\n              <ion-card-subtitle *ngIf=\"!post.category\">{{ post.date_gmt | date: 'dd.MM.yyyy' }}</ion-card-subtitle>\n              <ion-card-subtitle *ngIf=\"post.category\">{{ post.category.name }}</ion-card-subtitle>\n            </ion-card-header>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div *ngIf=\"!posts.length && !allPosts.length\">\n    <ion-card *ngFor=\"let i of items\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        </ion-card-title>\n        <ion-card-subtitle>\n          <ion-skeleton-text animated style=\"width: 20%\"></ion-skeleton-text>\n        </ion-card-subtitle>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div class=\"noResultContainer\" *ngIf=\"!posts.length && allPosts.length\">\n    <ion-grid>\n      <ion-row class=\"noItemsIcon\">\n        <ion-col>\n          <ion-icon color=\"medium\" name=\"alert-circle-outline\"></ion-icon>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"noItemsLabel\">\n        <ion-label color=\"medium\">Keine Artikel gefunden</ion-label>\n      </ion-row>\n    </ion-grid>\n  </div>\n \n  <ion-infinite-scroll *ngIf=\"count && count > 10 && !allPosts.length\" threshold=\"100px\" (ionInfinite)=\"loadMore($event)\">\n    <ion-infinite-scroll-content loadingText=\"Weitere Artikel werden geladen...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n \n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/posts/post-list/post-list-routing.module.ts":
  /*!*************************************************************!*\
    !*** ./src/app/posts/post-list/post-list-routing.module.ts ***!
    \*************************************************************/

  /*! exports provided: PostListPageRoutingModule */

  /***/
  function srcAppPostsPostListPostListRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PostListPageRoutingModule", function () {
      return PostListPageRoutingModule;
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


    var _post_list_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./post-list.page */
    "./src/app/posts/post-list/post-list.page.ts");

    var routes = [{
      path: '',
      component: _post_list_page__WEBPACK_IMPORTED_MODULE_3__["PostListPage"]
    }];

    var PostListPageRoutingModule = function PostListPageRoutingModule() {
      _classCallCheck(this, PostListPageRoutingModule);
    };

    PostListPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], PostListPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/posts/post-list/post-list.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/posts/post-list/post-list.module.ts ***!
    \*****************************************************/

  /*! exports provided: PostListPageModule */

  /***/
  function srcAppPostsPostListPostListModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PostListPageModule", function () {
      return PostListPageModule;
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


    var _post_list_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./post-list-routing.module */
    "./src/app/posts/post-list/post-list-routing.module.ts");
    /* harmony import */


    var _post_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./post-list.page */
    "./src/app/posts/post-list/post-list.page.ts");

    var PostListPageModule = function PostListPageModule() {
      _classCallCheck(this, PostListPageModule);
    };

    PostListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _post_list_routing_module__WEBPACK_IMPORTED_MODULE_5__["PostListPageRoutingModule"]],
      declarations: [_post_list_page__WEBPACK_IMPORTED_MODULE_6__["PostListPage"]]
    })], PostListPageModule);
    /***/
  },

  /***/
  "./src/app/posts/post-list/post-list.page.scss":
  /*!*****************************************************!*\
    !*** ./src/app/posts/post-list/post-list.page.scss ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPostsPostListPostListPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "ion-grid {\n  padding: 0;\n  height: 7rem;\n}\nion-grid ion-col {\n  padding: 0;\n}\nimg {\n  height: 100%;\n}\n.noResultContainer {\n  height: 100%;\n}\n.noResultContainer ion-grid {\n  height: 100%;\n}\n.noResultContainer ion-grid .noItemsIcon {\n  font-size: 5rem;\n  height: 48%;\n  text-align: center;\n}\n.noResultContainer ion-grid .noItemsIcon ion-icon {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.noResultContainer ion-grid .noItemsLabel {\n  height: 52%;\n  text-align: center;\n  font-size: 1rem;\n}\n.noResultContainer ion-grid .noItemsLabel ion-label {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvcG9zdHMvcG9zdC1saXN0L3Bvc3QtbGlzdC5wYWdlLnNjc3MiLCJzcmMvYXBwL3Bvc3RzL3Bvc3QtbGlzdC9wb3N0LWxpc3QucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7QUNDSjtBRENJO0VBQ0ksVUFBQTtBQ0NSO0FER0E7RUFDSSxZQUFBO0FDQUo7QURHQTtFQUNJLFlBQUE7QUNBSjtBREVJO0VBQ0ksWUFBQTtBQ0FSO0FERVE7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDQVo7QURFWTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0FDQWhCO0FESVE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDRlo7QURJWTtFQUNJLFdBQUE7QUNGaEIiLCJmaWxlIjoic3JjL2FwcC9wb3N0cy9wb3N0LWxpc3QvcG9zdC1saXN0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGhlaWdodDogN3JlbTtcblxuICAgIGlvbi1jb2wge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn1cblxuaW1nIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ub1Jlc3VsdENvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgaW9uLWdyaWQge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAgICAgLm5vSXRlbXNJY29uIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcbiAgICAgICAgICAgIGhlaWdodDogNDglO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIC5ub0l0ZW1zTGFiZWwge1xuICAgICAgICAgICAgaGVpZ2h0OiA1MiU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XG5cbiAgICAgICAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpb24tZ3JpZCB7XG4gIHBhZGRpbmc6IDA7XG4gIGhlaWdodDogN3JlbTtcbn1cbmlvbi1ncmlkIGlvbi1jb2wge1xuICBwYWRkaW5nOiAwO1xufVxuXG5pbWcge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ub1Jlc3VsdENvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5ub1Jlc3VsdENvbnRhaW5lciBpb24tZ3JpZCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5ub1Jlc3VsdENvbnRhaW5lciBpb24tZ3JpZCAubm9JdGVtc0ljb24ge1xuICBmb250LXNpemU6IDVyZW07XG4gIGhlaWdodDogNDglO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQgLm5vSXRlbXNJY29uIGlvbi1pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuLm5vUmVzdWx0Q29udGFpbmVyIGlvbi1ncmlkIC5ub0l0ZW1zTGFiZWwge1xuICBoZWlnaHQ6IDUyJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDFyZW07XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQgLm5vSXRlbXNMYWJlbCBpb24tbGFiZWwge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/posts/post-list/post-list.page.ts":
  /*!***************************************************!*\
    !*** ./src/app/posts/post-list/post-list.page.ts ***!
    \***************************************************/

  /*! exports provided: PostListPage */

  /***/
  function srcAppPostsPostListPostListPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PostListPage", function () {
      return PostListPage;
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


    var src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/wp.service */
    "./src/app/services/wp.service.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/utils/utils */
    "./src/app/utils/utils.ts");
    /* harmony import */


    var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");

    var PostListPage = /*#__PURE__*/function () {
      function PostListPage(wp, utils, appComponent, storage) {
        _classCallCheck(this, PostListPage);

        this.wp = wp;
        this.utils = utils;
        this.appComponent = appComponent;
        this.storage = storage;
        this.posts = [];
        this.allPosts = [];
        this.filteredPosts = [];
        this.rubriken = [];
        this.page = 1;
        this.count = null;
        this.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.searchTerm = '';
        this.currentRubrik = 'all';
        this.categories = []; // TODO give interface

        this.currentCategory = 'all';
        this.readArticles = [];
      }

      _createClass(PostListPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.appComponent.getObservable().subscribe(function (loggedIn) {
            if (loggedIn) {
              _this.loadData();
            }
          });
        }
      }, {
        key: "loadData",
        value: function loadData() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.getCategories();

                  case 2:
                    this.loadPosts();
                    this.getAllPosts();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "getCategories",
        value: function getCategories() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _this2 = this;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", new Promise(function (resolve, reject) {
                      _this2.categories = [];

                      _this2.wp.getCategories().then(function (categories) {
                        if (categories.data) {
                          _this2.categories = categories.data.filter(function (cat) {
                            return cat.parent === 19 && cat.count !== 0;
                          }).sort(function (a, b) {
                            return b.id - a.id;
                          });
                          _this2.rubriken = categories.data.filter(function (cat) {
                            return cat.parent === 42 && cat.count !== 0;
                          }).sort(function (a, b) {
                            return a.name - b.name;
                          });
                        }

                        resolve();
                      })["catch"](function () {
                        _this2.utils.showToast('Fehler beim Laden der Kategorien');

                        reject();
                      });
                    }));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
        }
      }, {
        key: "onSearch",
        value: function onSearch(event) {
          this.searchTerm = '';
          this.posts = this.filteredPosts;
          this.searchTerm = event.srcElement.value;

          if (!this.searchTerm) {
            return;
          }

          this.posts = this.filter();
        }
      }, {
        key: "filterCategory",
        value: function filterCategory() {
          var _this3 = this;

          this.searchTerm = '';
          var posts = [];

          if (this.currentCategory === 'all') {
            posts = this.allPosts;
          } else {
            posts = this.allPosts.filter(function (post) {
              return post.category && post.category.id === _this3.currentCategory;
            });
          }

          if (this.currentRubrik !== 'all') {
            posts = posts.filter(function (post) {
              return post.rubrik && post.rubrik.id === _this3.currentRubrik;
            });
          }

          this.posts = posts;
          this.filteredPosts = this.posts;
        }
      }, {
        key: "filterRubrik",
        value: function filterRubrik() {
          var _this4 = this;

          this.searchTerm = '';
          var posts = [];

          if (this.currentRubrik === 'all') {
            posts = this.allPosts;
          } else {
            posts = this.allPosts.filter(function (post) {
              return post.rubrik && post.rubrik.id === _this4.currentRubrik;
            });
          }

          if (this.currentCategory !== 'all') {
            posts = posts.filter(function (post) {
              return post.category && post.category.id === _this4.currentCategory;
            });
          }

          this.posts = posts;
          this.filteredPosts = this.posts;
        }
      }, {
        key: "filter",
        value: function filter() {
          var _this5 = this;

          if (this.searchTerm === '') {
            return this.filteredPosts;
          } else {
            return this.filteredPosts.filter(function (post) {
              if (post.rubrik) {
                if (post.title.rendered.toLowerCase().indexOf(_this5.searchTerm.toLowerCase()) > -1 || post.rubrik.name.toLowerCase().indexOf(_this5.searchTerm.toLowerCase()) > -1 || post.excerpt.rendered.toLowerCase().indexOf(_this5.searchTerm.toLowerCase()) > -1) {
                  return true;
                }

                return false;
              } else {
                if (post.title.rendered.toLowerCase().indexOf(_this5.searchTerm.toLowerCase()) > -1 || post.excerpt.rendered.toLowerCase().indexOf(_this5.searchTerm.toLowerCase()) > -1) {
                  return true;
                }

                return false;
              }
            });
          }
        }
      }, {
        key: "onFilter",
        value: function onFilter() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.select.open();

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, {
        key: "getAllPosts",
        value: function getAllPosts() {
          var _this6 = this;

          // get local storage for already read articles
          this.storage.get('readArticles').then(function (res) {
            if (res) _this6.readArticles = JSON.parse(res);
          });
          this.wp.getAllPosts().then(function (res) {
            _this6.allPosts = res.data.map(function (post) {
              var rubrik;
              var category;
              var articleWasRead;
              if (_this6.readArticles) articleWasRead = _this6.readArticles.includes(post.id);

              var _iterator = _createForOfIteratorHelper(post.categories),
                  _step;

              try {
                var _loop = function _loop() {
                  var cat = _step.value;

                  if (Boolean(_this6.rubriken.find(function (rub) {
                    return rub.id === cat;
                  }))) {
                    rubrik = _this6.rubriken.find(function (rub) {
                      return rub.id === cat;
                    });
                  }

                  if (Boolean(_this6.categories.find(function (aus) {
                    return aus.id === cat;
                  }))) {
                    category = _this6.categories.find(function (aus) {
                      return aus.id === cat;
                    });
                  }
                };

                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _loop();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              return Object.assign({}, post, {
                media_url: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
                // tslint:disable-next-line: object-literal-shorthand
                rubrik: rubrik,
                // tslint:disable-next-line: object-literal-shorthand
                category: category,
                articleWasRead: articleWasRead
              });
            });
            _this6.posts = _this6.allPosts;
            _this6.filteredPosts = _this6.allPosts;
          });
        }
      }, {
        key: "loadPosts",
        value: function loadPosts(event) {
          var _this7 = this;

          // this.pages = resp.headers.get('x-wp-totalpages');
          // this.totalPosts = parseInt(resp.headers.get('x-wp-total'), 10);
          this.wp.getPosts().then(function (res) {
            if (!_this7.allPosts) {
              _this7.count = parseInt(res.headers.get('x-wp-total'), 10);
              _this7.posts = res.data.map(function (post) {
                var rubrik;
                var category;

                var _iterator2 = _createForOfIteratorHelper(post.categories),
                    _step2;

                try {
                  var _loop2 = function _loop2() {
                    var cat = _step2.value;

                    if (Boolean(_this7.rubriken.find(function (rub) {
                      return rub.id === cat;
                    }))) {
                      rubrik = _this7.rubriken.find(function (rub) {
                        return rub.id === cat;
                      });
                    }

                    if (Boolean(_this7.categories.find(function (aus) {
                      return aus.id === cat;
                    }))) {
                      category = _this7.categories.find(function (aus) {
                        return aus.id === cat;
                      });
                    }
                  };

                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _loop2();
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                return Object.assign({}, post, {
                  media_url: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined,
                  // tslint:disable-next-line: object-literal-shorthand
                  rubrik: rubrik,
                  // tslint:disable-next-line: object-literal-shorthand
                  category: category
                });
              });
            }

            if (event) {
              event.target.complete();
              _this7.currentRubrik = 'all';
              _this7.currentCategory = 'all';
              _this7.allPosts = [];
              _this7.filteredPosts = [];

              _this7.getAllPosts();
            }
          });
        }
      }, {
        key: "loadMore",
        value: function loadMore(event) {
          var _this8 = this;

          this.page++;
          this.wp.getPosts(this.page).subscribe(function (res) {
            _this8.posts = [].concat(_toConsumableArray(_this8.posts), _toConsumableArray(res.map(function (post) {
              return Object.assign({}, post, {
                media_url: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined
              });
            })));
            event.target.complete(); // Disable infinite loading when maximum reached

            if (_this8.page.toString() === _this8.wp.pages) {
              event.target.disabled = true;
            }
          });
        } // set local storage when a post is clicked

      }, {
        key: "setAsRead",
        value: function setAsRead(post) {
          if (!this.readArticles.includes(post.id)) {
            post.articleWasRead = true;
            this.readArticles.push(post.id);
            this.storage.set('readArticles', JSON.stringify(this.readArticles));
          }
        }
      }]);

      return PostListPage;
    }();

    PostListPage.ctorParameters = function () {
      return [{
        type: src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"]
      }, {
        type: src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"]
      }, {
        type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
      }, {
        type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('select', {
      "static": false
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonSelect"])], PostListPage.prototype, "select", void 0);
    PostListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-post-list',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./post-list.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./post-list.page.scss */
      "./src/app/posts/post-list/post-list.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"], src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"], src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]])], PostListPage);
    /***/
  },

  /***/
  "./src/app/utils/utils.ts":
  /*!********************************!*\
    !*** ./src/app/utils/utils.ts ***!
    \********************************/

  /*! exports provided: Utils */

  /***/
  function srcAppUtilsUtilsTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Utils", function () {
      return Utils;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var Utils = /*#__PURE__*/function () {
      function Utils(toastController) {
        _classCallCheck(this, Utils);

        this.toastController = toastController;
      }

      _createClass(Utils, [{
        key: "showToast",
        value: function showToast(text) {
          var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';
          var p = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom';
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var toast;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return this.toastController.create({
                      message: text,
                      color: status,
                      position: p,
                      duration: 2000
                    });

                  case 2:
                    toast = _context4.sent;
                    toast.present();

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
        }
      }]);

      return Utils;
    }();

    Utils.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"]
      }];
    };

    Utils = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
      providedIn: 'root'
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"]])], Utils);
    /***/
  }
}]);
//# sourceMappingURL=posts-post-list-post-list-module-es5.js.map