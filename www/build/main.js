webpackJsonp([2],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReassignPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__ = __webpack_require__(79);
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
        this.inspections.getInspections(this.token, inspector.attributes.OBJECTID).then(function (data) {
            if (data['features'].length === 0) {
                _this.assignment.attributes.dueDate = new Date();
            }
            else {
                var last = data['features'][data['features'].length - 1];
                var dueDate = new Date(last.attributes.dueDate);
                dueDate.setHours(dueDate.getHours() + 0.5);
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

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reassign_reassign__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(286);
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__["a" /* UserinfoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__["a" /* UserinfoProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__["a" /* InspectionsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__["a" /* InspectionsProvider */]) === "function" && _d || Object])
    ], SchedulePage);
    return SchedulePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 117:
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
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/reassign/reassign.module": [
		284,
		1
	],
	"../pages/schedule/schedule.module": [
		285,
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
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_inspections_inspections__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_login_login__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_schedule_schedule__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_userinfo_userinfo__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_reassign_reassign__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_inspector_inspector__ = __webpack_require__(283);
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
                        { loadChildren: '../pages/reassign/reassign.module#ReassignPageModule', name: 'ReassignPage', segment: 'reassign', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/schedule/schedule.module#SchedulePageModule', name: 'SchedulePage', segment: 'schedule', priority: 'low', defaultHistory: [] }
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

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(80);
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

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
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

/***/ 283:
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

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 287,
	"./af.js": 287,
	"./ar": 288,
	"./ar-dz": 289,
	"./ar-dz.js": 289,
	"./ar-kw": 290,
	"./ar-kw.js": 290,
	"./ar-ly": 291,
	"./ar-ly.js": 291,
	"./ar-ma": 292,
	"./ar-ma.js": 292,
	"./ar-sa": 293,
	"./ar-sa.js": 293,
	"./ar-tn": 294,
	"./ar-tn.js": 294,
	"./ar.js": 288,
	"./az": 295,
	"./az.js": 295,
	"./be": 296,
	"./be.js": 296,
	"./bg": 297,
	"./bg.js": 297,
	"./bm": 298,
	"./bm.js": 298,
	"./bn": 299,
	"./bn.js": 299,
	"./bo": 300,
	"./bo.js": 300,
	"./br": 301,
	"./br.js": 301,
	"./bs": 302,
	"./bs.js": 302,
	"./ca": 303,
	"./ca.js": 303,
	"./cs": 304,
	"./cs.js": 304,
	"./cv": 305,
	"./cv.js": 305,
	"./cy": 306,
	"./cy.js": 306,
	"./da": 307,
	"./da.js": 307,
	"./de": 308,
	"./de-at": 309,
	"./de-at.js": 309,
	"./de-ch": 310,
	"./de-ch.js": 310,
	"./de.js": 308,
	"./dv": 311,
	"./dv.js": 311,
	"./el": 312,
	"./el.js": 312,
	"./en-au": 313,
	"./en-au.js": 313,
	"./en-ca": 314,
	"./en-ca.js": 314,
	"./en-gb": 315,
	"./en-gb.js": 315,
	"./en-ie": 316,
	"./en-ie.js": 316,
	"./en-il": 317,
	"./en-il.js": 317,
	"./en-nz": 318,
	"./en-nz.js": 318,
	"./eo": 319,
	"./eo.js": 319,
	"./es": 320,
	"./es-do": 321,
	"./es-do.js": 321,
	"./es-us": 322,
	"./es-us.js": 322,
	"./es.js": 320,
	"./et": 323,
	"./et.js": 323,
	"./eu": 324,
	"./eu.js": 324,
	"./fa": 325,
	"./fa.js": 325,
	"./fi": 326,
	"./fi.js": 326,
	"./fo": 327,
	"./fo.js": 327,
	"./fr": 328,
	"./fr-ca": 329,
	"./fr-ca.js": 329,
	"./fr-ch": 330,
	"./fr-ch.js": 330,
	"./fr.js": 328,
	"./fy": 331,
	"./fy.js": 331,
	"./gd": 332,
	"./gd.js": 332,
	"./gl": 333,
	"./gl.js": 333,
	"./gom-latn": 334,
	"./gom-latn.js": 334,
	"./gu": 335,
	"./gu.js": 335,
	"./he": 336,
	"./he.js": 336,
	"./hi": 337,
	"./hi.js": 337,
	"./hr": 338,
	"./hr.js": 338,
	"./hu": 339,
	"./hu.js": 339,
	"./hy-am": 340,
	"./hy-am.js": 340,
	"./id": 341,
	"./id.js": 341,
	"./is": 342,
	"./is.js": 342,
	"./it": 343,
	"./it.js": 343,
	"./ja": 344,
	"./ja.js": 344,
	"./jv": 345,
	"./jv.js": 345,
	"./ka": 346,
	"./ka.js": 346,
	"./kk": 347,
	"./kk.js": 347,
	"./km": 348,
	"./km.js": 348,
	"./kn": 349,
	"./kn.js": 349,
	"./ko": 350,
	"./ko.js": 350,
	"./ky": 351,
	"./ky.js": 351,
	"./lb": 352,
	"./lb.js": 352,
	"./lo": 353,
	"./lo.js": 353,
	"./lt": 354,
	"./lt.js": 354,
	"./lv": 355,
	"./lv.js": 355,
	"./me": 356,
	"./me.js": 356,
	"./mi": 357,
	"./mi.js": 357,
	"./mk": 358,
	"./mk.js": 358,
	"./ml": 359,
	"./ml.js": 359,
	"./mn": 360,
	"./mn.js": 360,
	"./mr": 361,
	"./mr.js": 361,
	"./ms": 362,
	"./ms-my": 363,
	"./ms-my.js": 363,
	"./ms.js": 362,
	"./mt": 364,
	"./mt.js": 364,
	"./my": 365,
	"./my.js": 365,
	"./nb": 366,
	"./nb.js": 366,
	"./ne": 367,
	"./ne.js": 367,
	"./nl": 368,
	"./nl-be": 369,
	"./nl-be.js": 369,
	"./nl.js": 368,
	"./nn": 370,
	"./nn.js": 370,
	"./pa-in": 371,
	"./pa-in.js": 371,
	"./pl": 372,
	"./pl.js": 372,
	"./pt": 373,
	"./pt-br": 374,
	"./pt-br.js": 374,
	"./pt.js": 373,
	"./ro": 375,
	"./ro.js": 375,
	"./ru": 376,
	"./ru.js": 376,
	"./sd": 377,
	"./sd.js": 377,
	"./se": 378,
	"./se.js": 378,
	"./si": 379,
	"./si.js": 379,
	"./sk": 380,
	"./sk.js": 380,
	"./sl": 381,
	"./sl.js": 381,
	"./sq": 382,
	"./sq.js": 382,
	"./sr": 383,
	"./sr-cyrl": 384,
	"./sr-cyrl.js": 384,
	"./sr.js": 383,
	"./ss": 385,
	"./ss.js": 385,
	"./sv": 386,
	"./sv.js": 386,
	"./sw": 387,
	"./sw.js": 387,
	"./ta": 388,
	"./ta.js": 388,
	"./te": 389,
	"./te.js": 389,
	"./tet": 390,
	"./tet.js": 390,
	"./tg": 391,
	"./tg.js": 391,
	"./th": 392,
	"./th.js": 392,
	"./tl-ph": 393,
	"./tl-ph.js": 393,
	"./tlh": 394,
	"./tlh.js": 394,
	"./tr": 395,
	"./tr.js": 395,
	"./tzl": 396,
	"./tzl.js": 396,
	"./tzm": 397,
	"./tzm-latn": 398,
	"./tzm-latn.js": 398,
	"./tzm.js": 397,
	"./ug-cn": 399,
	"./ug-cn.js": 399,
	"./uk": 400,
	"./uk.js": 400,
	"./ur": 401,
	"./ur.js": 401,
	"./uz": 402,
	"./uz-latn": 403,
	"./uz-latn.js": 403,
	"./uz.js": 402,
	"./vi": 404,
	"./vi.js": 404,
	"./x-pseudo": 405,
	"./x-pseudo.js": 405,
	"./yo": 406,
	"./yo.js": 406,
	"./zh-cn": 407,
	"./zh-cn.js": 407,
	"./zh-hk": 408,
	"./zh-hk.js": 408,
	"./zh-tw": 409,
	"./zh-tw.js": 409
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
webpackContext.id = 411;

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InspectionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
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
    InspectionsProvider.prototype.getInspections = function (token, workerid) {
        var _this = this;
        var url = 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/assignments_1542a408cfdd45f49da345d802197905/FeatureServer/0/query';
        return new Promise(function (resolve) {
            var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]().set('f', 'json')
                .set('token', token)
                .set('where', "workerId=" + workerid + " and status <> 3")
                .set('outFields', '*')
                .set('orderByFields', 'location,workOrderId');
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

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserinfoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(46);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
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

},[203]);
//# sourceMappingURL=main.js.map