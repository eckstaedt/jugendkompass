(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["posts-post-post-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post/post.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post/post.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"\" defaultHref=\"/tabs/posts\" #backButton></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"setPostFavorite()\" [disabled]=\"!post?.id\">\n        <ion-icon slot=\"icon-only\" [name]=\"post?.isFavorite ? 'star' : 'star-outline'\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <!-- <ion-buttons slot=\"end\">\n      <ion-button (click)=\"openMenu()\">\n        <ion-icon name=\"ellipsis-horizontal\"></ion-icon>\n      </ion-button>\n    </ion-buttons> -->\n  </ion-toolbar>\n</ion-header>\n \n<ion-content class=\"content postContent\">\n  <div *ngIf=\"post\">\n    <img *ngIf=\"post.media_url || post.base64Img\" [src]=\"post.isFavorite ? post.base64Img : post.media_url\" [style.width]=\"'100%'\">\n    <div style=\"text-align: center;\">\n      <ion-button *ngIf=\"post && post?.audio && post?.audio !== ''\" (click)=\"play()\" class=\"playButton\" shape=\"round\">\n        <ion-icon name=\"play\"></ion-icon>\n      </ion-button>\n    </div>\n    <div class=\"text\">Aufrufe: {{post.views}}</div>\n    <h3 class=\"title\">{{ post?.title.rendered }}</h3>\n    <div class=\"text\" [innerHTML]=\"post.content.rendered\"></div>\n  </div> \n\n \n\n  <div *ngIf=\"!post\">\n    <h3 class=\"title\">\n      <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n    </h3>\n    <div class=\"text\" >\n      <p>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 10%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 10%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 10%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 10%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 50%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 10%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 70%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 60%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 40%\"></ion-skeleton-text>\n        <ion-skeleton-text animated style=\"width: 100%\"></ion-skeleton-text>\n      </p>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ "./src/app/posts/post/post-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/posts/post/post-routing.module.ts ***!
  \***************************************************/
/*! exports provided: PostPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostPageRoutingModule", function() { return PostPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _post_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post.page */ "./src/app/posts/post/post.page.ts");




const routes = [
    {
        path: '',
        component: _post_page__WEBPACK_IMPORTED_MODULE_3__["PostPage"]
    }
];
let PostPageRoutingModule = class PostPageRoutingModule {
};
PostPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PostPageRoutingModule);



/***/ }),

/***/ "./src/app/posts/post/post.module.ts":
/*!*******************************************!*\
  !*** ./src/app/posts/post/post.module.ts ***!
  \*******************************************/
/*! exports provided: PostPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostPageModule", function() { return PostPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _post_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post-routing.module */ "./src/app/posts/post/post-routing.module.ts");
/* harmony import */ var _post_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post.page */ "./src/app/posts/post/post.page.ts");







let PostPageModule = class PostPageModule {
};
PostPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _post_routing_module__WEBPACK_IMPORTED_MODULE_5__["PostPageRoutingModule"]
        ],
        declarations: [_post_page__WEBPACK_IMPORTED_MODULE_6__["PostPage"]]
    })
], PostPageModule);



/***/ }),

/***/ "./src/app/posts/post/post.page.scss":
/*!*******************************************!*\
  !*** ./src/app/posts/post/post.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".content img {\n  padding: 1rem;\n  border-radius: 7%;\n}\n.content .playButton {\n  --padding-start: .8rem;\n  --padding-end: .6rem;\n  margin-left: 1rem;\n}\n.content .title {\n  padding: 0 1rem;\n}\n.content .text {\n  padding: 0 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kMDYyODMxL0RvY3VtZW50cy9wcm9qZWN0cy9qdWdlbmQvYXBwL3NyYy9hcHAvcG9zdHMvcG9zdC9wb3N0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcG9zdHMvcG9zdC9wb3N0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNJLGFBQUE7RUFDQSxpQkFBQTtBQ0FSO0FER0k7RUFDSSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QUNEUjtBRElJO0VBQ0ksZUFBQTtBQ0ZSO0FES0k7RUFDSSxlQUFBO0FDSFIiLCJmaWxlIjoic3JjL2FwcC9wb3N0cy9wb3N0L3Bvc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICAgIGltZyB7XG4gICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDclO1xuICAgIH1cblxuICAgIC5wbGF5QnV0dG9uIHtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAuOHJlbTtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogLjZyZW07XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgIH1cblxuICAgIC50aXRsZSB7XG4gICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICB9XG5cbiAgICAudGV4dCB7XG4gICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICB9XG59IiwiLmNvbnRlbnQgaW1nIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNyU7XG59XG4uY29udGVudCAucGxheUJ1dHRvbiB7XG4gIC0tcGFkZGluZy1zdGFydDogLjhyZW07XG4gIC0tcGFkZGluZy1lbmQ6IC42cmVtO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cbi5jb250ZW50IC50aXRsZSB7XG4gIHBhZGRpbmc6IDAgMXJlbTtcbn1cbi5jb250ZW50IC50ZXh0IHtcbiAgcGFkZGluZzogMCAxcmVtO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/posts/post/post.page.ts":
/*!*****************************************!*\
  !*** ./src/app/posts/post/post.page.ts ***!
  \*****************************************/
/*! exports provided: PostPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostPage", function() { return PostPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/wp.service */ "./src/app/services/wp.service.ts");
/* harmony import */ var src_app_services_audio_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/audio.service */ "./src/app/services/audio.service.ts");
/* harmony import */ var _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/photo-viewer/ngx */ "./node_modules/@ionic-native/photo-viewer/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");









let PostPage = class PostPage {
    constructor(activatedRoute, router, wp, audioService, photoViewer, platform, actionSheetController, appComponent, storage) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.wp = wp;
        this.audioService = audioService;
        this.photoViewer = photoViewer;
        this.platform = platform;
        this.actionSheetController = actionSheetController;
        this.appComponent = appComponent;
        this.storage = storage;
        this.soundReady = false;
        this.playing = false;
        this.favoritePosts = [];
        this.defaultHref = '';
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
            this.backButton.defaultHref = this.router['routerState'].snapshot.url.search('favorites') ? 'tabs/favorites' : 'tabs/posts';
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            yield this.storage.get('favoritePosts').then((res) => {
                if (res)
                    this.favoritePosts = JSON.parse(res);
            });
            let isFavorite = false;
            if (this.favoritePosts)
                isFavorite = this.favoritePosts.find(post => post.id.toString() == id) ? true : false;
            // if local stored favorite-post, get post information from local storage
            if (isFavorite) {
                const localPost = this.favoritePosts.find(post => post.id.toString() == id);
                this.post = Object.assign({}, localPost);
                if (this.post.audio) {
                    this.audioService.loadNewAudio(this.post.audio, this.post.title.rendered);
                }
                if (this.platform.is('capacitor')) {
                }
                setTimeout(() => {
                    for (const image of Array.from(document.querySelectorAll('.postContent img'))) {
                        image.onclick = () => {
                            this.photoViewer.show(image.src);
                        };
                    }
                }, 100);
            }
            else {
                this.wp.getPostContent(id).then((res) => {
                    this.post = Object.assign({}, res.data, { media_url: res.data._embedded['wp:featuredmedia'] ?
                            res.data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : undefined, isFavorite: isFavorite, views: res.data.views ? parseInt(res.data.views, 10) + 1 : 1 });
                    if (this.post.audio) {
                        this.audioService.loadNewAudio(this.post.audio, this.post.title.rendered);
                    }
                    if (this.platform.is('capacitor')) {
                    }
                    setTimeout(() => {
                        for (const image of Array.from(document.querySelectorAll('.postContent img'))) {
                            image.onclick = () => {
                                this.photoViewer.show(image.src);
                            };
                        }
                    }, 100);
                });
            }
        });
    }
    openMenu() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionButtons = [{
                    text: 'Artikel im Browser aufrufen',
                    handler: () => {
                        window.open(this.post.link, '_blank');
                    }
                }];
            if (this.post.pdf) {
                actionButtons.push({
                    text: 'Artikel als PDF anzeigen',
                    handler: () => {
                        window.open(this.post.pdf, '_blank');
                    }
                });
            }
            actionButtons.push({
                role: 'destructive',
                text: 'Abbrechen'
            });
            const sheet = yield this.actionSheetController.create({
                buttons: actionButtons
            });
            yield sheet.present();
        });
    }
    play() {
        this.audioService.playNew();
    }
    setPostFavorite() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!this.post.isFavorite) {
                this.post.isFavorite = true;
                if (this.post.media_url)
                    yield this.wp.getBase64ImgFromUrl(this.post.media_url).then(res => this.post.base64Img = res);
                this.favoritePosts.push(this.post);
                this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
            }
            else {
                this.post.isFavorite = false;
                this.favoritePosts = this.favoritePosts.filter(post => post.id != this.post.id);
                if (this.favoritePosts)
                    this.storage.set('favoritePosts', JSON.stringify(this.favoritePosts));
            }
        });
    }
};
PostPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__["WpService"] },
    { type: src_app_services_audio_service__WEBPACK_IMPORTED_MODULE_4__["AudioService"] },
    { type: _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_5__["PhotoViewer"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"] },
    { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('backButton', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonBackButton"])
], PostPage.prototype, "backButton", void 0);
PostPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-post',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./post.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/posts/post/post.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./post.page.scss */ "./src/app/posts/post/post.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_wp_service__WEBPACK_IMPORTED_MODULE_3__["WpService"],
        src_app_services_audio_service__WEBPACK_IMPORTED_MODULE_4__["AudioService"],
        _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_5__["PhotoViewer"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"],
        src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["Storage"]])
], PostPage);



/***/ })

}]);
//# sourceMappingURL=posts-post-post-module-es2015.js.map