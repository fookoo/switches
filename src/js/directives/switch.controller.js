export class SwitchController {
    constructor(Switches) {
        'ngInject';
        
        this.Switches = Switches;
    }

    change() {
        this.Switches
            .setSwitch(this.device.id, this.device.state);
    }
}

SwitchController.$inject = ['Switches'];