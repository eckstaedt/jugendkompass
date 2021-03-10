(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["posts-post-list-post-list-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header translucent=\"true\">\n  <ion-toolbar>\n    <ion-title>Jugendkompass</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-header collapse=\"condense\">              \n    <ion-toolbar>      \n      <ion-title size=\"large\">Jugendkompass</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"loadPosts($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div class=\"topBar\">\n    <ion-searchbar\n      type=\"search\"\n      inputmode=\"search\"\n      enterkeyhint=\"search\"\n      [(ngModel)]=\"searchTerm\"\n      (ionInput)=\"onSearch($event)\"\n      class=\"searchBar\"\n      [disabled]=\"!allPosts.length\"\n      animated\n      placeholder=\"Artikel suchen...\">\n    </ion-searchbar>\n    <ion-button [disabled]=\"!allPosts.length\" (click)=\"onFilter()\" class=\"filterBtn\" shape=\"round\" fill=\"none\">\n      <ion-icon [color]=\"currentRubrik === 'all' ? '' : 'primary'\" name=\"funnel\"></ion-icon>\n    </ion-button>\n    <ion-item style=\"display: none;\">\n      <ion-label>Rubrik</ion-label>\n      <ion-select (ionChange)=\"filterRubrik()\" [(ngModel)]=\"currentRubrik\" cancelText=\"Abbrechen\" okText=\"Ok\" #select>\n        <ion-select-option value=\"all\">Alle</ion-select-option>\n        <ion-select-option *ngFor=\"let rubrik of rubriken\" [value]=\"rubrik.id\">{{ rubrik.name }}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <div class=\"categoryBar\" *ngIf=\"categories.length\">\n    <ion-select [disabled]=\"!allPosts.length\" (ionChange)=\"filterCategory()\" [(ngModel)]=\"currentCategory\">\n      <ion-select-option value=\"all\">Alle Ausgaben</ion-select-option>\n      <ion-select-option [value]=\"cat.id\" *ngFor=\"let cat of categories\">{{ cat.name }}</ion-select-option>\n    </ion-select>\n  </div>\n  <div *ngIf=\"posts.length\">\n    <ion-card [routerLink]=\"['/', 'tabs', 'posts', post.id]\" *ngFor=\"let post of posts\" (click)=\"setAsRead(post)\" [color]=\"post.articleWasRead ? 'light' : ''\">\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"4\">\n            <img *ngIf=\"post.media_url\" [src]=\"post.media_url\">\n          </ion-col>\n          <ion-col size=\"8\">\n            <ion-card-header>\n              <p [style.color]=\"post.rubrik.description ? post.rubrik.description : ''\" *ngIf=\"post.rubrik\">{{ post.rubrik.name }}</p>\n              <ion-card-title [innerHTML]=\"post.title.rendered\"></ion-card-title>\n              <ion-card-subtitle *ngIf=\"!post.category\">{{ post.date_gmt | date: 'dd.MM.yyyy' }}</ion-card-subtitle>\n              <ion-card-subtitle *ngIf=\"post.category\">{{ post.category.name }}</ion-card-subtitle>\n            </ion-card-header>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </div>\n\n  <div *ngIf=\"!posts.length && !allPosts.length\">\n    <ion-card *ngFor=\"let i of items\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        </ion-card-title>\n        <ion-card-subtitle>\n          <ion-skeleton-text animated style=\"width: 20%\"></ion-skeleton-text>\n        </ion-card-subtitle>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div class=\"noResultContainer\" *ngIf=\"!posts.length && allPosts.length\">\n    <ion-grid>\n      <ion-row class=\"noItemsIcon\">\n        <ion-col>\n          <ion-icon color=\"medium\" name=\"alert-circle-outline\"></ion-icon>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"noItemsLabel\">\n        <ion-label color=\"medium\">Keine Artikel gefunden</ion-label>\n      </ion-row>\n    </ion-grid>\n  </div>\n \n  <ion-infinite-scroll *ngIf=\"count && count > 10 && !allPosts.length\" threshold=\"100px\" (ionInfinite)=\"loadMore($event)\">\n    <ion-infinite-scroll-content loadingText=\"Weitere Artikel werden geladen...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n \n</ion-content>\n");

/***/ }),

/***/ "./src/app/posts/post-list/post-list-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/posts/post-list/post-list-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: PostListPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostListPageRoutingModule", function() { return PostListPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _post_list_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post-list.page */ "./src/app/posts/post-list/post-list.page.ts");




const routes = [
    {
        path: '',
        component: _post_list_page__WEBPACK_IMPORTED_MODULE_3__["PostListPage"]
    }
];
let PostListPageRoutingModule = class PostListPageRoutingModule {
};
PostListPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PostListPageRoutingModule);



/***/ }),

/***/ "./src/app/posts/post-list/post-list.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/posts/post-list/post-list.module.ts ***!
  \*****************************************************/
/*! exports provided: PostListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostListPageModule", function() { return PostListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _post_list_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post-list-routing.module */ "./src/app/posts/post-list/post-list-routing.module.ts");
/* harmony import */ var _post_list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post-list.page */ "./src/app/posts/post-list/post-list.page.ts");







let PostListPageModule = class PostListPageModule {
};
PostListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _post_list_routing_module__WEBPACK_IMPORTED_MODULE_5__["PostListPageRoutingModule"]
        ],
        declarations: [_post_list_page__WEBPACK_IMPORTED_MODULE_6__["PostListPage"]]
    })
], PostListPageModule);



/***/ }),

/***/ "./src/app/posts/post-list/post-list.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/posts/post-list/post-list.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-grid {\n  padding: 0;\n  height: 7rem;\n}\nion-grid ion-col {\n  padding: 0;\n}\nimg {\n  height: 100%;\n}\n.noResultContainer {\n  height: 100%;\n}\n.noResultContainer ion-grid {\n  height: 100%;\n}\n.noResultContainer ion-grid .noItemsIcon {\n  font-size: 5rem;\n  height: 48%;\n  text-align: center;\n}\n.noResultContainer ion-grid .noItemsIcon ion-icon {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.noResultContainer ion-grid .noItemsLabel {\n  height: 52%;\n  text-align: center;\n  font-size: 1rem;\n}\n.noResultContainer ion-grid .noItemsLabel ion-label {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvcG9zdHMvcG9zdC1saXN0L3Bvc3QtbGlzdC5wYWdlLnNjc3MiLCJzcmMvYXBwL3Bvc3RzL3Bvc3QtbGlzdC9wb3N0LWxpc3QucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7QUNDSjtBRENJO0VBQ0ksVUFBQTtBQ0NSO0FER0E7RUFDSSxZQUFBO0FDQUo7QURHQTtFQUNJLFlBQUE7QUNBSjtBREVJO0VBQ0ksWUFBQTtBQ0FSO0FERVE7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDQVo7QURFWTtFQUNJLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0FDQWhCO0FESVE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDRlo7QURJWTtFQUNJLFdBQUE7QUNGaEIiLCJmaWxlIjoic3JjL2FwcC9wb3N0cy9wb3N0LWxpc3QvcG9zdC1saXN0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1ncmlkIHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGhlaWdodDogN3JlbTtcblxuICAgIGlvbi1jb2wge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbn1cblxuaW1nIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ub1Jlc3VsdENvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgaW9uLWdyaWQge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAgICAgLm5vSXRlbXNJY29uIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcbiAgICAgICAgICAgIGhlaWdodDogNDglO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIC5ub0l0ZW1zTGFiZWwge1xuICAgICAgICAgICAgaGVpZ2h0OiA1MiU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XG5cbiAgICAgICAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpb24tZ3JpZCB7XG4gIHBhZGRpbmc6IDA7XG4gIGhlaWdodDogN3JlbTtcbn1cbmlvbi1ncmlkIGlvbi1jb2wge1xuICBwYWRkaW5nOiAwO1xufVxuXG5pbWcge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5ub1Jlc3VsdENvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5ub1Jlc3VsdENvbnRhaW5lciBpb24tZ3JpZCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5ub1Jlc3VsdENvbnRhaW5lciBpb24tZ3JpZCAubm9JdGVtc0ljb24ge1xuICBmb250LXNpemU6IDVyZW07XG4gIGhlaWdodDogNDglO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQgLm5vSXRlbXNJY29uIGlvbi1pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuLm5vUmVzdWx0Q29udGFpbmVyIGlvbi1ncmlkIC5ub0l0ZW1zTGFiZWwge1xuICBoZWlnaHQ6IDUyJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDFyZW07XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQgLm5vSXRlbXNMYWJlbCBpb24tbGFiZWwge1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/posts/post-list/post-list.page.ts":
/*!***************************************************!*\
  !*** ./src/app/posts/post-list/post-list.page.ts ***!
  \***************************************************/
/*! exports provided: PostListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostListPage", function() { return PostListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/wp.service */ "./src/app/services/wp.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utils/utils */ "./src/app/utils/utils.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");







let PostListPage = class PostListPage {
    constructor(wp, utils, appComponent, storage) {
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
    ngOnInit() {
        this.appComponent.getObservable().subscribe((loggedIn) => {
            if (loggedIn) {
                this.loadData();
            }
        });
    }
    loadData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.getCategories();
            this.loadPosts();
            this.getAllPosts();
        });
    }
    getCategories() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.categories = [];
                this.wp.getCategories().then((categories) => {
                    if (categories.data) {
                        this.categories = categories.data
                            .filter((cat) => cat.parent === 19 && cat.count !== 0)
                            .sort((a, b) => b.id - a.id);
                        this.rubriken = categories.data
                            .filter((cat) => cat.parent === 42 && cat.count !== 0)
                            .sort((a, b) => a.name - b.name);
                    }
                    resolve();
                }).catch(() => {
                    this.utils.showToast('Fehler beim Laden der Kategorien');
                    reject();
                });
            });
        });
    }
    onSearch(event) {
        this.searchTerm = '';
        this.posts = this.filteredPosts;
        this.searchTerm = event.srcElement.value;
        if (!this.searchTerm) {
            return;
        }
        this.posts = this.filter();
    }
    filterCategory() {
        this.searchTerm = '';
        let posts = [];
        if (this.currentCategory === 'all') {
            posts = this.allPosts;
        }
        else {
            posts = this.allPosts.filter((post) => post.category && post.category.id === this.currentCategory);
        }
        if (this.currentRubrik !== 'all') {
            posts = posts.filter((post) => post.rubrik && post.rubrik.id === this.currentRubrik);
        }
        this.posts = posts;
        this.filteredPosts = this.posts;
    }
    filterRubrik() {
        this.searchTerm = '';
        let posts = [];
        if (this.currentRubrik === 'all') {
            posts = this.allPosts;
        }
        else {
            posts = this.allPosts.filter((post) => post.rubrik && post.rubrik.id === this.currentRubrik);
        }
        if (this.currentCategory !== 'all') {
            posts = posts.filter((post) => post.category && post.category.id === this.currentCategory);
        }
        this.posts = posts;
        this.filteredPosts = this.posts;
    }
    filter() {
        if (this.searchTerm === '') {
            return this.filteredPosts;
        }
        else {
            return this.filteredPosts.filter((post) => {
                if (post.rubrik) {
                    if (post.title.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        post.rubrik.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        post.excerpt.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
                else {
                    if (post.title.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
                        post.excerpt.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
            });
        }
    }
    onFilter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.select.open();
        });
    }
    getAllPosts() {
        // get local storage for already read articles
        this.storage.get('readArticles').then((res) => {
            if (res)
                this.readArticles = JSON.parse(res);
        });
        this.wp.getAllPosts().then((res) => {
            this.allPosts = res.data.map((post) => {
                let rubrik;
                let category;
                let articleWasRead;
                if (this.readArticles)
                    articleWasRead = this.readArticles.includes(post.id);
                for (const cat of post.categories) {
                    if (Boolean(this.rubriken.find((rub) => rub.id === cat))) {
                        rubrik = this.rubriken.find((rub) => rub.id === cat);
                    }
                    if (Boolean(this.categories.find((aus) => aus.id === cat))) {
                        category = this.categories.find((aus) => aus.id === cat);
                    }
                }
                return Object.assign({}, post, { media_url: post._embedded['wp:featuredmedia'] ?
                        post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined, 
                    // tslint:disable-next-line: object-literal-shorthand
                    rubrik: rubrik, 
                    // tslint:disable-next-line: object-literal-shorthand
                    category: category, articleWasRead: articleWasRead });
            });
            this.posts = this.allPosts;
            this.filteredPosts = this.allPosts;
        });
    }
    loadPosts(event) {
        // this.pages = resp.headers.get('x-wp-totalpages');
        // this.totalPosts = parseInt(resp.headers.get('x-wp-total'), 10);
        this.wp.getPosts().then((res) => {
            if (!this.allPosts) {
                this.count = parseInt(res.headers.get('x-wp-total'), 10);
                this.posts = res.data.map((post) => {
                    let rubrik;
                    let category;
                    for (const cat of post.categories) {
                        if (Boolean(this.rubriken.find((rub) => rub.id === cat))) {
                            rubrik = this.rubriken.find((rub) => rub.id === cat);
                        }
                        if (Boolean(this.categories.find((aus) => aus.id === cat))) {
                            category = this.categories.find((aus) => aus.id === cat);
                        }
                    }
                    return Object.assign({}, post, { media_url: post._embedded['wp:featuredmedia'] ?
                            post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined, 
                        // tslint:disable-next-line: object-literal-shorthand
                        rubrik: rubrik, 
                        // tslint:disable-next-line: object-literal-shorthand
                        category: category });
                });
            }
            if (event) {
                event.target.complete();
                this.currentRubrik = 'all';
                this.currentCategory = 'all';
                this.allPosts = [];
                this.filteredPosts = [];
                this.getAllPosts();
            }
        });
    }
    loadMore(event) {
        this.page++;
        this.wp.getPosts(this.page).subscribe(res => {
            this.posts = [...this.posts, ...res.map((post) => {
                    return Object.assign({}, post, { media_url: post._embedded['wp:featuredmedia'] ?
                            post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined });
                })];
            event.target.complete();
            // Disable infinite loading when maximum reached
            if (this.page.toString() === this.wp.pages) {
                event.target.disabled = true;
            }
        });
    }
    // set local storage when a post is clicked
    setAsRead(post) {
        if (!this.readArticles.includes(post.id)) {
            post.articleWasRead = true;
            this.readArticles.push(post.id);
            this.storage.set('readArticles', JSON.stringify(this.readArticles));
        }
    }
};
PostListPage.ctorParameters = () => [
    { type: src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"] },
    { type: src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"] },
    { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('select', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonSelect"])
], PostListPage.prototype, "select", void 0);
PostListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-post-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./post-list.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post-list/post-list.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./post-list.page.scss */ "./src/app/posts/post-list/post-list.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_2__["WpService"],
        src_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__["Utils"],
        src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]])
], PostListPage);



/***/ }),

/***/ "./src/app/utils/utils.ts":
/*!********************************!*\
  !*** ./src/app/utils/utils.ts ***!
  \********************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let Utils = class Utils {
    constructor(toastController) {
        this.toastController = toastController;
    }
    showToast(text, status = 'danger', p = 'bottom') {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: text,
                color: status,
                position: p,
                duration: 2000
            });
            toast.present();
        });
    }
};
Utils.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"] }
];
Utils = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"]])
], Utils);



/***/ })

}]);
//# sourceMappingURL=posts-post-list-post-list-module-es2015.js.map