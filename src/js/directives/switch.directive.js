import {SwitchController} from './switch.controller';

export class SwitchDirective {
    constructor() {
        this.templateUrl = 'js/directives/switch.view.html';
        this.restrict = 'E';
        this.controller = SwitchController;
        this.controllerAs = 'SwitchCtrl';
        this.bindToController = true;

        this.scope = {
            "device": "=device"
        };
    }
}
