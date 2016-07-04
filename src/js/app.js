import {routerConfig} from './routes'

import {SwitchDirective} from './directives/switch.directive'
import {SwitchListController} from './controllers/switchList.controller'

angular
    .module('e30.switches', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        
        'e30.switches.views'
    ])
    .directive('switch', () => new SwitchDirective)
    .controller('SwitchListController', SwitchListController)

    .config(routerConfig);
