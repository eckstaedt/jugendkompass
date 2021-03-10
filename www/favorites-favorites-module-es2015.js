(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["favorites-favorites-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/favorites/favorites.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/favorites/favorites.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header translucent=\"true\">\n  <ion-toolbar>\n    <ion-title>Favoriten</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-header collapse=\"condense\">              \n    <ion-toolbar>      \n      <ion-title size=\"large\">Favoriten</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"loadData($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <div class=\"topBar\">\n    <ion-searchbar\n      type=\"search\"\n      inputmode=\"search\"\n      enterkeyhint=\"search\"\n      [(ngModel)]=\"searchTerm\"\n      (ionInput)=\"onSearch($event)\"\n      class=\"searchBar\"\n      [disabled]=\"!allPosts.length\"\n      animated\n      placeholder=\"Artikel suchen...\">\n    </ion-searchbar>\n      <ion-button [disabled]=\"!allPosts.length\" (click)=\"onFilter()\" class=\"filterBtn\" shape=\"round\" fill=\"none\">\n        <ion-icon [color]=\"currentRubrik === 'all' ? '' : 'primary'\" name=\"funnel\"></ion-icon>\n      </ion-button>\n    <ion-item style=\"display: none;\">\n      <ion-label>Rubrik</ion-label>\n      <ion-select (ionChange)=\"filterRubrik()\" [(ngModel)]=\"currentRubrik\" cancelText=\"Abbrechen\" okText=\"Ok\" #select>\n        <ion-select-option value=\"all\">Alle</ion-select-option>\n        <ion-select-option *ngFor=\"let rubrik of rubriken\" [value]=\"rubrik.id\">{{ rubrik.name }}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <div class=\"categoryBar\" *ngIf=\"categories.length\">\n    <ion-select [disabled]=\"!allPosts.length\" (ionChange)=\"filterCategory()\" [(ngModel)]=\"currentCategory\">\n      <ion-select-option value=\"all\">Alle Ausgaben</ion-select-option>\n      <ion-select-option [value]=\"cat.id\" *ngFor=\"let cat of categories\">{{ cat.name }}</ion-select-option>\n    </ion-select> \n  </div>\n\n  <div *ngIf=\"posts.length\">\n    <ion-card [routerLink]=\"['/', 'tabs', 'favorites', post.id]\" *ngFor=\"let post of posts\">\n      <img *ngIf=\"post.base64Img\" [src]=\"post.base64Img\">\n      <ion-card-header>\n        <p [style.color]=\"post.rubrik.description ? post.rubrik.description : ''\" *ngIf=\"post.rubrik\">{{ post.rubrik.name }}</p>\n        <ion-card-title [innerHTML]=\"post.title.rendered\"></ion-card-title>\n        <ion-card-subtitle *ngIf=\"!post.category\">{{ post.date_gmt | date: 'dd.MM.yyyy' }}</ion-card-subtitle>\n        <ion-card-subtitle *ngIf=\"post.category\">{{ post.category.name }}</ion-card-subtitle>\n      </ion-card-header>\n      <ion-card-content>\n        <div [innerHTML]=\"post.excerpt.rendered\"></div>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div *ngIf=\"!posts.length && !allPosts.length && favoritePosts.length\">\n    <ion-card *ngFor=\"let i of items\">\n      <ion-card-header>\n        <ion-card-title>\n          <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        </ion-card-title>\n        <ion-card-subtitle>\n          <ion-skeleton-text animated style=\"width: 20%\"></ion-skeleton-text>\n        </ion-card-subtitle>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div class=\"noResultContainer\" *ngIf=\"(!posts.length && allPosts.length) || !favoritePosts.length\">\n    <ion-grid>\n      <ion-row class=\"noItemsIcon\">\n        <ion-col >\n          <ion-icon color=\"medium\" name=\"alert-circle-outline\"></ion-icon>\n        </ion-col>\n      </ion-row>\n      <ion-row class=\"noItemsLabel\">\n        <ion-label color=\"medium\">Keine Artikel gefunden</ion-label>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/favorites/favorites-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/favorites/favorites-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: FavoritesPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritesPageRoutingModule", function() { return FavoritesPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _favorites_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./favorites.page */ "./src/app/favorites/favorites.page.ts");




const routes = [
    {
        path: '',
        component: _favorites_page__WEBPACK_IMPORTED_MODULE_3__["FavoritesPage"]
    }
];
let FavoritesPageRoutingModule = class FavoritesPageRoutingModule {
};
FavoritesPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], FavoritesPageRoutingModule);



/***/ }),

/***/ "./src/app/favorites/favorites.module.ts":
/*!***********************************************!*\
  !*** ./src/app/favorites/favorites.module.ts ***!
  \***********************************************/
/*! exports provided: FavoritesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritesPageModule", function() { return FavoritesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _favorites_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./favorites-routing.module */ "./src/app/favorites/favorites-routing.module.ts");
/* harmony import */ var _favorites_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./favorites.page */ "./src/app/favorites/favorites.page.ts");







let FavoritesPageModule = class FavoritesPageModule {
};
FavoritesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _favorites_routing_module__WEBPACK_IMPORTED_MODULE_5__["FavoritesPageRoutingModule"]
        ],
        declarations: [_favorites_page__WEBPACK_IMPORTED_MODULE_6__["FavoritesPage"]]
    })
], FavoritesPageModule);



/***/ }),

/***/ "./src/app/favorites/favorites.page.scss":
/*!***********************************************!*\
  !*** ./src/app/favorites/favorites.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".topBar {\n  display: flex;\n  padding: 0 1rem;\n}\n.topBar .searchBar {\n  padding-left: 0;\n  float: left;\n}\n.topBar .filterBtn {\n  --padding-start: 0;\n  --padding-end: 0;\n  display: flex;\n  margin: auto;\n}\n.categoryBar {\n  padding: 0 1rem;\n}\n.categoryBar ion-select {\n  padding-left: 0;\n}\n.noResultContainer {\n  height: 100%;\n}\n.noResultContainer ion-grid {\n  height: 100%;\n}\n.noResultContainer ion-grid .noItemsIcon {\n  font-size: 5rem;\n  height: 48%;\n  text-align: center;\n}\n.noResultContainer ion-grid .noItemsIcon ion-icon {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.noResultContainer ion-grid .noItemsLabel {\n  height: 52%;\n  text-align: center;\n  font-size: 1rem;\n}\n.noResultContainer ion-grid .noItemsLabel ion-label {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5wYWdlLnNjc3MiLCJzcmMvYXBwL2Zhdm9yaXRlcy9mYXZvcml0ZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUNDSjtBRENJO0VBQ0ksZUFBQTtFQUNBLFdBQUE7QUNDUjtBREVJO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FDQVI7QURJQTtFQUNJLGVBQUE7QUNESjtBREdJO0VBQ0ksZUFBQTtBQ0RSO0FES0E7RUFDSSxZQUFBO0FDRko7QURJSTtFQUNJLFlBQUE7QUNGUjtBRElRO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQ0ZaO0FESVk7RUFDSSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtBQ0ZoQjtBRE1RO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ0paO0FETVk7RUFDSSxXQUFBO0FDSmhCIiwiZmlsZSI6InNyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9wQmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IDAgMXJlbTtcblxuICAgIC5zZWFyY2hCYXIge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgIH1cbiAgICBcbiAgICAuZmlsdGVyQnRuIHtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgICAtLXBhZGRpbmctZW5kOiAwO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgfVxufVxuXG4uY2F0ZWdvcnlCYXIge1xuICAgIHBhZGRpbmc6IDAgMXJlbTtcblxuICAgIGlvbi1zZWxlY3Qge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgfVxufVxuXG4ubm9SZXN1bHRDb250YWluZXIge1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGlvbi1ncmlkIHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgIC5ub0l0ZW1zSWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDVyZW07XG4gICAgICAgICAgICBoZWlnaHQ6IDQ4JTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICAubm9JdGVtc0xhYmVsIHtcbiAgICAgICAgICAgIGhlaWdodDogNTIlO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuXG4gICAgICAgICAgICBpb24tbGFiZWwge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIi50b3BCYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAwIDFyZW07XG59XG4udG9wQmFyIC5zZWFyY2hCYXIge1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIGZsb2F0OiBsZWZ0O1xufVxuLnRvcEJhciAuZmlsdGVyQnRuIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IGF1dG87XG59XG5cbi5jYXRlZ29yeUJhciB7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cbi5jYXRlZ29yeUJhciBpb24tc2VsZWN0IHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG4ubm9SZXN1bHRDb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG4ubm9SZXN1bHRDb250YWluZXIgaW9uLWdyaWQgLm5vSXRlbXNJY29uIHtcbiAgZm9udC1zaXplOiA1cmVtO1xuICBoZWlnaHQ6IDQ4JTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLm5vUmVzdWx0Q29udGFpbmVyIGlvbi1ncmlkIC5ub0l0ZW1zSWNvbiBpb24taWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbn1cbi5ub1Jlc3VsdENvbnRhaW5lciBpb24tZ3JpZCAubm9JdGVtc0xhYmVsIHtcbiAgaGVpZ2h0OiA1MiU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuLm5vUmVzdWx0Q29udGFpbmVyIGlvbi1ncmlkIC5ub0l0ZW1zTGFiZWwgaW9uLWxhYmVsIHtcbiAgd2lkdGg6IDEwMCU7XG59Il19 */");

/***/ }),

/***/ "./src/app/favorites/favorites.page.ts":
/*!*********************************************!*\
  !*** ./src/app/favorites/favorites.page.ts ***!
  \*********************************************/
/*! exports provided: FavoritesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoritesPage", function() { return FavoritesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");





let FavoritesPage = class FavoritesPage {
    constructor(appComponent, storage) {
        this.appComponent = appComponent;
        this.storage = storage;
        this.posts = [];
        this.allPosts = [];
        this.filteredPosts = [];
        this.favoritePosts = [];
        this.searchTerm = '';
        this.rubriken = [];
        this.currentRubrik = 'all';
        this.currentCategory = 'all';
        this.categories = [];
        this.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.count = null;
    }
    ngOnInit() {
        this.appComponent.getObservable().subscribe((loggedIn) => {
            if (loggedIn) {
                this.loadData();
            }
        });
    }
    loadData(event) {
        this.storage.get('favoritePosts').then((res) => {
            if (res) {
                this.posts = JSON.parse(res);
                this.posts = this.sortByMostRecent(this.posts);
                this.allPosts = this.posts;
                this.filteredPosts = this.posts;
                this.favoritePosts = this.posts;
            }
            if (event)
                event.target.complete();
        });
    }
    ionViewWillEnter() {
        this.loadData();
    }
    sortByMostRecent(posts) {
        return posts.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
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
    onFilter() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.select.open();
        });
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
};
FavoritesPage.ctorParameters = () => [
    { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('select', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonSelect"])
], FavoritesPage.prototype, "select", void 0);
FavoritesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-favorites',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./favorites.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/favorites/favorites.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./favorites.page.scss */ "./src/app/favorites/favorites.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]])
], FavoritesPage);



/***/ })

}]);
//# sourceMappingURL=favorites-favorites-module-es2015.js.map