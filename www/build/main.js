webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reassign_reassign__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SchedulePage = (function () {
    function SchedulePage(navCtrl, navParams, userinfo, inspections) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userinfo = userinfo;
        this.inspections = inspections;
        this.user = {};
        this.assignments = [];
        this.allAssignments = [];
        this.interval = null;
        this.token = navParams.get('token');
        this.username = navParams.get('username');
        this.user.thumbnail = 'assets/imgs/contact.png';
    }
    SchedulePage.prototype.sortByDate = function () {
        this.assignments.sort(function (a, b) {
            if (a.attributes.dueDate < b.attributes.dueDate) {
                return -1;
            }
            if (a.attributes.dueDate > b.attributes.dueDate) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });
    };
    SchedulePage.prototype.getUserInfo = function (token, username) {
        var _this = this;
        this.userinfo.getUserInfo(token, username).then(function (data) {
            _this.user = data;
            if (_this.user.thumbnail) {
                _this.user.thumbnail = 'https://ral.maps.arcgis.com/sharing/rest/community/users/' + username + '/info/' + _this.user.thumbnail;
            }
            _this.inspections.getWorkerInfo(token, username).then(function (data) {
                if (data['error']) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], { error: data['error']['message'] });
                }
                else if (data['features'].length > 0) {
                    var workerid = data['features'][0]['attributes']['OBJECTID'];
                    _this.inspections.getInspections(token, workerid).then(function (data) {
                        _this.assignments = [];
                        _this.fields = data['fields'];
                        var lastLocation = null;
                        data['features'].forEach(function (assignment) {
                            _this.allAssignments.push(assignment);
                            assignment.attributes.oids = [];
                            if (assignment.attributes.location != lastLocation) {
                                assignment.attributes.ids = assignment.attributes.workOrderId;
                                assignment.attributes.types = _this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType');
                                assignment.attributes.oids.push(assignment.attributes.OBJECTID);
                                _this.assignments.push(assignment);
                                lastLocation = assignment.attributes.location;
                            }
                            else {
                                var res = _this.assignments.filter(function (assignment) { return assignment.attributes.location === lastLocation; });
                                if (res.length > 0) {
                                    res[0].attributes.ids += ", #" + assignment.attributes.workOrderId;
                                    res[0].attributes.oids.push(assignment.attributes.OBJECTID);
                                    if (res[0].attributes.types.indexOf(_this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType')) === -1) {
                                        res[0].attributes.types += ", " + _this.getCodedValue(assignment.attributes.assignmentType, 'assignmentType');
                                    }
                                }
                            }
                        });
                        _this.assignments.sort(function (a, b) {
                            if (a.attributes.dueDate < b.attributes.dueDate) {
                                return -1;
                            }
                            if (a.attributes.dueDate > b.attributes.dueDate) {
                                return 1;
                            }
                            // a must be equal to b
                            return 0;
                        });
                    });
                }
            });
        });
    };
    SchedulePage.prototype.reorderItems = function (indexes) {
        var element = this.assignments[indexes.from];
        this.assignments.splice(indexes.from, 1);
        this.assignments.splice(indexes.to, 0, element);
        this.setSchedule();
    };
    SchedulePage.prototype.getCodedValue = function (value, field) {
        var label = '';
        this.fields.forEach(function (f) {
            if (f.name === field) {
                if (f.domain) {
                    if (f.domain.codedValues) {
                        f.domain.codedValues.forEach(function (cv) {
                            if (cv.code === value) {
                                label = cv.name;
                            }
                        });
                    }
                }
            }
            return label;
        });
        return label;
    };
    SchedulePage.prototype.setSchedule = function () {
        var _this = this;
        this.assignments.forEach(function (assignment, i) {
            var date = new Date();
            var minutes = i / 2 * 60;
            //date.setHours(date.getHours() + i/2);
            date = __WEBPACK_IMPORTED_MODULE_6_moment__(date).add(minutes, 'm').toDate();
            _this.allAssignments.filter(function (a) { return a.attributes.location === assignment.attributes.location; }).forEach(function (a) {
                a.attributes.dueDate = date;
                console.log(a.attributes.location, a.attributes.dueDate);
            });
        });
        this.inspections.updateInspections(this.token, this.allAssignments);
    };
    SchedulePage.prototype.reassign = function (assignment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__reassign_reassign__["a" /* ReassignPage */], { assignment: assignment, token: this.token });
    };
    SchedulePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad SchedulePage');
        //this.interval = setInterval(() => this.getUserInfo(this.token, this.username), 5000);
        this.getUserInfo(this.token, this.username);
    };
    SchedulePage.prototype.refresh = function () {
        this.getUserInfo(this.token, this.username);
    };
    SchedulePage.prototype.ionViewDidLeave = function () {
    };
    SchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-schedule',template:/*ion-inline-start:"/Users/grecoj/inspector-schedule/src/pages/schedule/schedule.html"*/'<!--\n  Generated template for the SchedulePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n      <ion-item no-lines class="item-trns">\n          <ion-avatar item-start>\n            <img src="{{user.thumbnail}}"/>\n  \n          </ion-avatar>\n          <h1>{{user.fullName}}</h1>\n        </ion-item>    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-list reorder="true" (ionItemReorder)="reorderItems($event)">\n    <ion-item-sliding #item  *ngFor="let assignment of assignments">\n      <ion-item><ion-label><h2>{{ assignment.attributes.location }}</h2><p>{{ assignment.attributes.types }}</p><p>Permit #{{ assignment.attributes.ids }}</p></ion-label></ion-item>\n      <ion-item-options side="right">\n          <button ion-button (click)="reassign(assignment)">\n              <ion-icon name="reassign"></ion-icon>            \n            Reassign\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>  \n  \n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n      <button ion-button full (click)="refresh()">Refresh</button>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/Users/grecoj/inspector-schedule/src/pages/schedule/schedule.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__["a" /* UserinfoProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__["a" /* InspectionsProvider */]])
    ], SchedulePage);
    return SchedulePage;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReassignPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ReassignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReassignPage = (function () {
    function ReassignPage(navCtrl, navParams, inspections, userinfo) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.inspections = inspections;
        this.userinfo = userinfo;
        this.inspectors = [];
        this.searchtext = "";
        this.assignment = this.navParams.get('assignment');
        this.token = this.navParams.get('token');
        this.inspections.getInspectors(this.token).then(function (data) {
            _this.inspectors = data['features'];
            _this.inspectors.forEach(function (inspector) {
                _this.userinfo.getUserInfo(_this.token, inspector.attributes.userId).then(function (data) {
                    if (data['thumbnail']) {
                        inspector.attributes.thumbnail = 'https://ral.maps.arcgis.com/sharing/rest/community/users/' + inspector.attributes.userId + '/info/' + data['thumbnail'];
                    }
                    else {
                        inspector.attributes.thumbnail = 'assets/imgs/contact.png';
                    }
                });
            });
        });
    }
    ReassignPage.prototype.reassign = function (inspector) {
        var _this = this;
        console.log(inspector);
        console.log(this.assignment);
        this.assignment.attributes.workerId = inspector.attributes.OBJECTID;
        this.inspections.getInspections(this.token, inspector.attributes.OBJECTID, true).then(function (data) {
            if (data['features'].length === 0) {
                _this.assignment.attributes.dueDate = new Date();
            }
            else {
                var last = data['features'][data['features'].length - 1];
                var dueDate = new Date(last.attributes.dueDate);
                //date.setHours(date.getHours() + i/2);
                dueDate = __WEBPACK_IMPORTED_MODULE_4_moment__(dueDate).add(30, 'm').toDate();
                _this.assignment.attributes.dueDate = dueDate;
            }
            var features = [];
            _this.assignment.attributes.oids.forEach(function (oid) {
                features.push({ attributes: { OBJECTID: oid, dueDate: _this.assignment.attributes.dueDate, workerId: _this.assignment.attributes.workerId } });
            });
            _this.inspections.updateInspections(_this.token, features).then(function (data) {
                _this.navCtrl.pop();
            });
        });
    };
    ReassignPage.prototype.searchEntered = function (event) {
        this.searchtext = event.target.value;
    };
    ReassignPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReassignPage');
    };
    ReassignPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reassign',template:/*ion-inline-start:"/Users/grecoj/inspector-schedule/src/pages/reassign/reassign.html"*/'<!--\n  Generated template for the ReassignPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n      <ion-searchbar (ionInput)="searchEntered($event)"></ion-searchbar>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n      <ion-item *ngFor="let inspector of (inspectors | inspectorName:searchtext)" (click)="reassign(inspector)">\n      <ion-avatar item-start>\n          <img src="{{inspector.attributes.thumbnail}}"/>\n        </ion-avatar>\n        <h1>{{inspector.attributes.name}}</h1>\n      </ion-item>\n    </ion-list>  \n</ion-content>\n'/*ion-inline-end:"/Users/grecoj/inspector-schedule/src/pages/reassign/reassign.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__["a" /* InspectionsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__["a" /* UserinfoProvider */]])
    ], ReassignPage);
    return ReassignPage;
}());

//# sourceMappingURL=reassign.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/reassign/reassign.module": [
		411,
		1
	],
	"../pages/schedule/schedule.module": [
		410,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 160;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(349);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_inspections_inspections__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_login_login__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_schedule_schedule__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_userinfo_userinfo__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_reassign_reassign__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_inspector_inspector__ = __webpack_require__(409);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_reassign_reassign__["a" /* ReassignPage */],
                __WEBPACK_IMPORTED_MODULE_13__pipes_inspector_inspector__["a" /* InspectorPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/schedule/schedule.module#SchedulePageModule', name: 'SchedulePage', segment: 'schedule', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reassign/reassign.module#ReassignPageModule', name: 'ReassignPage', segment: 'reassign', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_reassign_reassign__["a" /* ReassignPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_inspections_inspections__["a" /* InspectionsProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_login_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_userinfo_userinfo__["a" /* UserinfoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 161,
	"./af.js": 161,
	"./ar": 162,
	"./ar-dz": 163,
	"./ar-dz.js": 163,
	"./ar-kw": 164,
	"./ar-kw.js": 164,
	"./ar-ly": 165,
	"./ar-ly.js": 165,
	"./ar-ma": 166,
	"./ar-ma.js": 166,
	"./ar-sa": 167,
	"./ar-sa.js": 167,
	"./ar-tn": 168,
	"./ar-tn.js": 168,
	"./ar.js": 162,
	"./az": 169,
	"./az.js": 169,
	"./be": 170,
	"./be.js": 170,
	"./bg": 171,
	"./bg.js": 171,
	"./bm": 172,
	"./bm.js": 172,
	"./bn": 173,
	"./bn.js": 173,
	"./bo": 174,
	"./bo.js": 174,
	"./br": 175,
	"./br.js": 175,
	"./bs": 176,
	"./bs.js": 176,
	"./ca": 177,
	"./ca.js": 177,
	"./cs": 178,
	"./cs.js": 178,
	"./cv": 179,
	"./cv.js": 179,
	"./cy": 180,
	"./cy.js": 180,
	"./da": 181,
	"./da.js": 181,
	"./de": 182,
	"./de-at": 183,
	"./de-at.js": 183,
	"./de-ch": 184,
	"./de-ch.js": 184,
	"./de.js": 182,
	"./dv": 185,
	"./dv.js": 185,
	"./el": 186,
	"./el.js": 186,
	"./en-au": 187,
	"./en-au.js": 187,
	"./en-ca": 188,
	"./en-ca.js": 188,
	"./en-gb": 189,
	"./en-gb.js": 189,
	"./en-ie": 190,
	"./en-ie.js": 190,
	"./en-il": 191,
	"./en-il.js": 191,
	"./en-nz": 192,
	"./en-nz.js": 192,
	"./eo": 193,
	"./eo.js": 193,
	"./es": 194,
	"./es-do": 195,
	"./es-do.js": 195,
	"./es-us": 196,
	"./es-us.js": 196,
	"./es.js": 194,
	"./et": 197,
	"./et.js": 197,
	"./eu": 198,
	"./eu.js": 198,
	"./fa": 199,
	"./fa.js": 199,
	"./fi": 200,
	"./fi.js": 200,
	"./fo": 201,
	"./fo.js": 201,
	"./fr": 202,
	"./fr-ca": 203,
	"./fr-ca.js": 203,
	"./fr-ch": 204,
	"./fr-ch.js": 204,
	"./fr.js": 202,
	"./fy": 205,
	"./fy.js": 205,
	"./gd": 206,
	"./gd.js": 206,
	"./gl": 207,
	"./gl.js": 207,
	"./gom-latn": 208,
	"./gom-latn.js": 208,
	"./gu": 209,
	"./gu.js": 209,
	"./he": 210,
	"./he.js": 210,
	"./hi": 211,
	"./hi.js": 211,
	"./hr": 212,
	"./hr.js": 212,
	"./hu": 213,
	"./hu.js": 213,
	"./hy-am": 214,
	"./hy-am.js": 214,
	"./id": 215,
	"./id.js": 215,
	"./is": 216,
	"./is.js": 216,
	"./it": 217,
	"./it.js": 217,
	"./ja": 218,
	"./ja.js": 218,
	"./jv": 219,
	"./jv.js": 219,
	"./ka": 220,
	"./ka.js": 220,
	"./kk": 221,
	"./kk.js": 221,
	"./km": 222,
	"./km.js": 222,
	"./kn": 223,
	"./kn.js": 223,
	"./ko": 224,
	"./ko.js": 224,
	"./ky": 225,
	"./ky.js": 225,
	"./lb": 226,
	"./lb.js": 226,
	"./lo": 227,
	"./lo.js": 227,
	"./lt": 228,
	"./lt.js": 228,
	"./lv": 229,
	"./lv.js": 229,
	"./me": 230,
	"./me.js": 230,
	"./mi": 231,
	"./mi.js": 231,
	"./mk": 232,
	"./mk.js": 232,
	"./ml": 233,
	"./ml.js": 233,
	"./mn": 234,
	"./mn.js": 234,
	"./mr": 235,
	"./mr.js": 235,
	"./ms": 236,
	"./ms-my": 237,
	"./ms-my.js": 237,
	"./ms.js": 236,
	"./mt": 238,
	"./mt.js": 238,
	"./my": 239,
	"./my.js": 239,
	"./nb": 240,
	"./nb.js": 240,
	"./ne": 241,
	"./ne.js": 241,
	"./nl": 242,
	"./nl-be": 243,
	"./nl-be.js": 243,
	"./nl.js": 242,
	"./nn": 244,
	"./nn.js": 244,
	"./pa-in": 245,
	"./pa-in.js": 245,
	"./pl": 246,
	"./pl.js": 246,
	"./pt": 247,
	"./pt-br": 248,
	"./pt-br.js": 248,
	"./pt.js": 247,
	"./ro": 249,
	"./ro.js": 249,
	"./ru": 250,
	"./ru.js": 250,
	"./sd": 251,
	"./sd.js": 251,
	"./se": 252,
	"./se.js": 252,
	"./si": 253,
	"./si.js": 253,
	"./sk": 254,
	"./sk.js": 254,
	"./sl": 255,
	"./sl.js": 255,
	"./sq": 256,
	"./sq.js": 256,
	"./sr": 257,
	"./sr-cyrl": 258,
	"./sr-cyrl.js": 258,
	"./sr.js": 257,
	"./ss": 259,
	"./ss.js": 259,
	"./sv": 260,
	"./sv.js": 260,
	"./sw": 261,
	"./sw.js": 261,
	"./ta": 262,
	"./ta.js": 262,
	"./te": 263,
	"./te.js": 263,
	"./tet": 264,
	"./tet.js": 264,
	"./tg": 265,
	"./tg.js": 265,
	"./th": 266,
	"./th.js": 266,
	"./tl-ph": 267,
	"./tl-ph.js": 267,
	"./tlh": 268,
	"./tlh.js": 268,
	"./tr": 269,
	"./tr.js": 269,
	"./tzl": 270,
	"./tzl.js": 270,
	"./tzm": 271,
	"./tzm-latn": 272,
	"./tzm-latn.js": 272,
	"./tzm.js": 271,
	"./ug-cn": 273,
	"./ug-cn.js": 273,
	"./uk": 274,
	"./uk.js": 274,
	"./ur": 275,
	"./ur.js": 275,
	"./uz": 276,
	"./uz-latn": 277,
	"./uz-latn.js": 277,
	"./uz.js": 276,
	"./vi": 278,
	"./vi.js": 278,
	"./x-pseudo": 279,
	"./x-pseudo.js": 279,
	"./yo": 280,
	"./yo.js": 280,
	"./zh-cn": 281,
	"./zh-cn.js": 281,
	"./zh-hk": 282,
	"./zh-hk.js": 282,
	"./zh-tw": 283,
	"./zh-tw.js": 283
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 380;

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/grecoj/inspector-schedule/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/grecoj/inspector-schedule/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoginProvider = (function () {
    function LoginProvider(http) {
        this.http = http;
        console.log('Hello LoginProvider Provider');
    }
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], LoginProvider);
    return LoginProvider;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InspectorPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the InspectorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var InspectorPipe = (function () {
    function InspectorPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    InspectorPipe.prototype.transform = function (inspectors, text) {
        if (!text) {
            return inspectors;
        }
        return inspectors.filter(function (inspector) { return inspector.attributes.name.toLowerCase().indexOf(text.toLowerCase()) != -1; });
    };
    InspectorPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'inspectorName',
        })
    ], InspectorPipe);
    return InspectorPipe;
}());

//# sourceMappingURL=inspector.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserinfoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UserinfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserinfoProvider = (function () {
    function UserinfoProvider(http) {
        this.http = http;
        console.log('Hello UserinfoProvider Provider');
    }
    UserinfoProvider.prototype.getUserInfo = function (token, username) {
        var _this = this;
        return new Promise(function (resolve) {
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
                .set('f', 'json')
                .set('token', token);
            _this.http.get('https://ral.maps.arcgis.com/sharing/rest/community/users/' + username, { params: params })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    UserinfoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UserinfoProvider);
    return UserinfoProvider;
}());

//# sourceMappingURL=userinfo.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InspectionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the InspectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var InspectionsProvider = (function () {
    function InspectionsProvider(http) {
        this.http = http;
        console.log('Hello InspectionsProvider Provider');
    }
    InspectionsProvider.prototype.getWorkerInfo = function (token, username) {
        var _this = this;
        var url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/workers_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
        return new Promise(function (resolve) {
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]().set('f', 'json')
                .set('token', token)
                .set('where', "userId='" + username.replace('%40', '@') + "'")
                .set('outFields', '*');
            _this.http.get(url, { params: params })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    InspectionsProvider.prototype.getInspections = function (token, workerid, reassign) {
        var _this = this;
        var url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/assignments_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
        return new Promise(function (resolve) {
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]().set('f', 'json')
                .set('token', token)
                .set('where', "workerId=" + workerid + " and status <> 3")
                .set('outFields', '*')
                .set('orderByFields', 'location,workOrderId');
            if (reassign) {
                params.set('orderByFields', 'dueDate');
            }
            _this.http.get(url, { params: params })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    InspectionsProvider.prototype.getInspectors = function (token) {
        var _this = this;
        var url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/workers_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
        return new Promise(function (resolve) {
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]().set('f', 'json')
                .set('token', token)
                .set('where', '1=1')
                .set('orderByFields', 'name')
                .set('outFields', '*');
            _this.http.get(url, { params: params })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    InspectionsProvider.prototype.updateInspections = function (token, features) {
        var _this = this;
        var url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/assignments_1542a408cfdd45f49da345d802197905/FeatureServer/0/updateFeatures';
        return new Promise(function (resolve) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/x-www-form-urlencoded');
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
                .set('f', 'json')
                .set('token', token)
                .set('features', JSON.stringify(features));
            _this.http.post(url, params, { headers: headers })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    InspectionsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], InspectionsProvider);
    return InspectionsProvider;
}());

//# sourceMappingURL=inspections.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedule_schedule__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, appCtrl, navParams, toast) {
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.toast = toast;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* URLSearchParams */](window.location.hash);
        var token = params.get('#access_token');
        var username = params.get('username');
        if (this.navParams.get('error')) {
            this.toast.create({
                message: this.navParams.get('error'),
                duration: 3000
            }).present();
        }
        else if (token) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__schedule_schedule__["a" /* SchedulePage */], { token: token, username: username });
        }
    }
    HomePage.prototype.login = function () {
        var clientId = 'X3pxPFIacVjSBAHW';
        var redirectUri = window.location.href;
        window.location.href = 'https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=' + clientId + '&response_type=token&expiration=20160&redirect_uri=' + encodeURIComponent(redirectUri);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/grecoj/inspector-schedule/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      City of Raleigh Inspector Queue\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button (click)="login()">Login</button>\n</ion-content>\n'/*ion-inline-end:"/Users/grecoj/inspector-schedule/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[327]);
//# sourceMappingURL=main.js.map