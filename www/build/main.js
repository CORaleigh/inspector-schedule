webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReassignPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__ = __webpack_require__(157);
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
            var last = data['features'][data['features'].length - 1];
            var dueDate = new Date(last.attributes.dueDate);
            dueDate.setHours(dueDate.getHours() + 1);
            _this.assignment.attributes.dueDate = dueDate;
            _this.inspections.updateInspections(_this.token, [_this.assignment]).then(function (data) {
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__["a" /* InspectionsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_inspections_inspections__["a" /* InspectionsProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__["a" /* UserinfoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_userinfo_userinfo__["a" /* UserinfoProvider */]) === "function" && _d || Object])
    ], ReassignPage);
    return ReassignPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=reassign.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reassign_reassign__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(202);
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
        this.token = navParams.get('token');
        this.username = navParams.get('username');
        this.user.thumbnail = 'assets/imgs/contact.png';
    }
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
                        data['features'].forEach(function (assignment) {
                            _this.assignments.push(assignment);
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
        this.assignments.forEach(function (assignment, i) {
            var date = new Date();
            console.log(date);
            date.setHours(date.getHours() + i);
            console.log(date);
            assignment.attributes.dueDate = date;
        });
        this.inspections.updateInspections(this.token, this.assignments);
    };
    SchedulePage.prototype.reassign = function (assignment) {
        debugger;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__reassign_reassign__["a" /* ReassignPage */], { assignment: assignment, token: this.token });
    };
    SchedulePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad SchedulePage');
        this.getUserInfo(this.token, this.username);
    };
    SchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-schedule',template:/*ion-inline-start:"/Users/grecoj/inspector-schedule/src/pages/schedule/schedule.html"*/'<!--\n  Generated template for the SchedulePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n      <ion-item no-lines class="item-trns">\n          <ion-avatar item-start>\n            <img src="{{user.thumbnail}}"/>\n  \n          </ion-avatar>\n          <h1>{{user.fullName}}</h1>\n        </ion-item>    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-list reorder="true" (ionItemReorder)="reorderItems($event)">\n    <ion-item-sliding #item  *ngFor="let assignment of assignments">\n      <ion-item><ion-label><h2>{{ assignment.attributes.location }}</h2><p>{{ getCodedValue(assignment.attributes.assignmentType, \'assignmentType\') }}</p><p>Permit #{{ assignment.attributes.workOrderId }}</p></ion-label></ion-item>\n      <ion-item-options side="right">\n          <button ion-button (click)="reassign(assignment)">\n              <ion-icon name="reassign"></ion-icon>            \n            Reassign\n          </button>\n        </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>  \n  \n</ion-content>\n<ion-footer>\n    <ion-toolbar>\n      <button ion-button full (click)="setSchedule()">Save</button>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/Users/grecoj/inspector-schedule/src/pages/schedule/schedule.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__["a" /* UserinfoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_userinfo_userinfo__["a" /* UserinfoProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__["a" /* InspectionsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_inspections_inspections__["a" /* InspectionsProvider */]) === "function" && _d || Object])
    ], SchedulePage);
    return SchedulePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/reassign/reassign.module": [
		283,
		1
	],
	"../pages/schedule/schedule.module": [
		284,
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
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 157:
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

/***/ 158:
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
                .set('orderByFields', 'dueDate');
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], InspectionsProvider);
    return InspectionsProvider;
    var _a;
}());

//# sourceMappingURL=inspections.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedule_schedule__ = __webpack_require__(101);
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ToastController */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_inspections_inspections__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_login_login__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_schedule_schedule__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_userinfo_userinfo__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_reassign_reassign__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_inspector_inspector__ = __webpack_require__(285);
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

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
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

/***/ 285:
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

/***/ })

},[203]);
//# sourceMappingURL=main.js.map