import {routerConfig} from './routes'

import {SwitchDirective} from './directives/switch.directive'

import {SwitchListController} from './controllers/switchList.controller'
import {SectionListController} from './controllers/sectionList.controller'

import {SwitchesService} from './services/switches'
import {SectionsService} from './services/sections'
import {CommonService} from './services/common.service'

angular
    .module('e30.switches', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        
        'e30.switches.views'
    ])
    .directive('switch', () => new SwitchDirective)
    
    .controller('SwitchListController', SwitchListController)
    .controller('SectionListController', SectionListController)
    
    .service('Switches', SwitchesService)
    .service('Sections', SectionsService)
    .service('Common', CommonService)

    .config(routerConfig);
