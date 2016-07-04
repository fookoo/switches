(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routes = require('./routes');

var _switch = require('./directives/switch.directive');

var _switchList = require('./controllers/switchList.controller');

var _sectionList = require('./controllers/sectionList.controller');

var _switches = require('./services/switches');

var _sections = require('./services/sections');

angular.module('e30.switches', ['ngAnimate', 'ngMaterial', 'ui.router', 'e30.switches.views']).directive('switch', function () {
    return new _switch.SwitchDirective();
}).controller('SwitchListController', _switchList.SwitchListController).controller('SectionListController', _sectionList.SectionListController).service('Switches', _switches.SwitchesService).service('Sections', _sections.SectionsService).config(_routes.routerConfig);

},{"./controllers/sectionList.controller":2,"./controllers/switchList.controller":3,"./directives/switch.directive":5,"./routes":6,"./services/sections":7,"./services/switches":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SectionListController = exports.SectionListController = function () {
    SectionListController.$inject = ["Switches", "Sections"];
    function SectionListController(Switches, Sections) {
        'ngInject';

        _classCallCheck(this, SectionListController);

        this.Switches = Switches;
        this.Sections = Sections;

        this.sections = Sections.getSections();
    }

    _createClass(SectionListController, [{
        key: 'addNewSwitch',
        value: function addNewSwitch(section, selectedSwitch) {
            this.Sections.addSwitch(section, selectedSwitch);
            this.sections = this.Sections.getSections();
        }
    }, {
        key: 'toggle',
        value: function toggle(section) {
            var switchesArray = [];
            section.switches.forEach(function (sw) {
                switchesArray.push({
                    id: sw.id,
                    value: section.state ? sw.on ? 1 : 0 : sw.off ? 1 : 0
                });
            });

            this.Switches.setSwitches(switchesArray);

            this.sync();
        }
    }, {
        key: 'sync',
        value: function sync() {
            this.Sections.sync(this.sections);
        }
    }]);

    return SectionListController;
}();

SectionListController.$inject = ['Switches', 'Sections'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchListController = exports.SwitchListController = ["Switches", function SwitchListController(Switches) {
    'ngInject';

    var _this = this;

    _classCallCheck(this, SwitchListController);

    Switches.getSwitches().then(function (switches) {
        _this.switches = switches;
    }, function (error) {
        console.warn('something goes wrong', error);
    });
}];

SwitchListController.$inject = ['Switches'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchController = exports.SwitchController = function () {
    SwitchController.$inject = ["Switches"];
    function SwitchController(Switches) {
        'ngInject';

        _classCallCheck(this, SwitchController);

        this.Switches = Switches;
    }

    _createClass(SwitchController, [{
        key: 'change',
        value: function change() {
            this.Switches.setSwitch(this.device.id, this.device.state);
        }
    }]);

    return SwitchController;
}();

SwitchController.$inject = ['Switches'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwitchDirective = undefined;

var _switch = require('./switch.controller');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchDirective = exports.SwitchDirective = function SwitchDirective() {
    _classCallCheck(this, SwitchDirective);

    this.templateUrl = 'js/directives/switch.view.html';
    this.restrict = 'E';
    this.controller = _switch.SwitchController;
    this.controllerAs = 'SwitchCtrl';
    this.bindToController = true;

    this.scope = {
        "device": "=device"
    };
};

},{"./switch.controller":4}],6:[function(require,module,exports){
'use strict';

routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routerConfig = routerConfig;
function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/main.html'
    }).state('main.section', {
        url: '/sections',
        templateUrl: 'views/sections.html',
        controller: 'SectionListController as SectionListCtrl'

    }).state('main.switches', {
        url: '/switches',
        templateUrl: 'views/switches.html',
        controller: 'SwitchListController as SwitchListCtrl'
    });

    $urlRouterProvider.otherwise('/');
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SectionsService = exports.SectionsService = function () {
    function SectionsService() {
        'ngInject';

        _classCallCheck(this, SectionsService);

        this.key = 'e30.switches.sections';
        this.sections = [];
    }

    _createClass(SectionsService, [{
        key: 'getSections',
        value: function getSections() {
            this.sections = angular.fromJson(window.localStorage.getItem(this.key) || []);

            return this.sections;
        }
    }, {
        key: 'addSwitch',
        value: function addSwitch(selectedSection, selectedSwitch) {
            console.info(arguments);
            this.sections.forEach(function (section) {
                if (section.id === selectedSection.id) {
                    selectedSwitch.on = false;
                    selectedSwitch.off = false;
                    section.switches.push(selectedSwitch);
                    section.availableSwitches = section.availableSwitches.filter(function (switchItem) {
                        return switchItem.id !== selectedSwitch.id;
                    });
                }
            });

            this.sync();
        }
    }, {
        key: 'sync',
        value: function sync() {
            var date = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (date) {
                this.sections = date;
            }
            window.localStorage.setItem(this.key, angular.toJson(this.sections));
        }
    }]);

    return SectionsService;
}();

SectionsService.$inject = [];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchesService = exports.SwitchesService = function () {
    SwitchesService.$inject = ["$q", "$http"];
    function SwitchesService($q, $http) {
        'ngInject';

        _classCallCheck(this, SwitchesService);

        this.$q = $q;
        this.$http = $http;

        this.backendUrl = 'http://fuku.noip.me:8080';
    }

    /**
     * Return all available switches 
     * @returns {Promise}
     */


    _createClass(SwitchesService, [{
        key: 'getSwitches',
        value: function getSwitches() {
            var p = this.$q.defer();

            this.$http.get(this.backendUrl + '/relays').then(function (relays) {
                relays.data.forEach(function (switchElement) {
                    switchElement.state = switchElement.state == 1;
                });

                p.resolve(relays.data);
            }, p.reject);

            return p.promise;
        }

        /**
         * Set switch on/off
         * @param id - Device id
         * @param value {Boolean} - switch state
         * @returns {Promise}
         */

    }, {
        key: 'setSwitch',
        value: function setSwitch(id, value) {
            return this.$http({
                method: 'POST',
                url: this.backendUrl + '/relay/' + id,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'value=' + (value ? 1 : 0)
            });
        }
    }, {
        key: 'setSwitches',
        value: function setSwitches(switchesArray) {
            return this.$http({
                method: 'POST',
                url: this.backendUrl + '/relays',
                headers: {
                    "Content-Type": "application/json"
                },
                data: switchesArray
            });
        }
    }]);

    return SwitchesService;
}();

SwitchesService.$inject = ['$q', '$http'];

},{}]},{},[1]);
