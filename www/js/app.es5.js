(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routes = require('./routes');

var _switch = require('./directives/switch.directive');

var _switchList = require('./controllers/switchList.controller');

angular.module('e30.switches', ['ngAnimate', 'ngMaterial', 'ui.router', 'e30.switches.views']).directive('switch', function () {
    return new _switch.SwitchDirective();
}).controller('SwitchListController', _switchList.SwitchListController).config(_routes.routerConfig);

},{"./controllers/switchList.controller":2,"./directives/switch.directive":4,"./routes":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchListController = exports.SwitchListController = ["$http", function SwitchListController($http) {
    'ngInject';

    var _this = this;

    _classCallCheck(this, SwitchListController);

    $http.get('http://fuku.noip.me:8080/relays').then(function (relays) {
        relays.data.forEach(function (switchElement) {
            switchElement.state = switchElement.state == 1;
        });

        _this.switches = relays.data;
    });
}];

SwitchListController.$inject = ['$http'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwitchController = exports.SwitchController = function () {
    SwitchController.$inject = ["$http"];
    function SwitchController($http) {
        'ngInject';

        _classCallCheck(this, SwitchController);

        this.$http = $http;
    }

    _createClass(SwitchController, [{
        key: 'change',
        value: function change() {
            this.$http({
                method: 'POST',
                url: 'http://fuku.noip.me:8080/relay/' + this.device.id,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: 'value=' + (this.device.state ? 1 : 0)
            });
        }
    }]);

    return SwitchController;
}();

SwitchController.$inject = ['$http'];

},{}],4:[function(require,module,exports){
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

},{"./switch.controller":3}],5:[function(require,module,exports){
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
        templateUrl: 'views/main.html',
        controller: 'SwitchListController as SwitchListCtrl'
    });

    $urlRouterProvider.otherwise('/');
}

},{}]},{},[1]);
