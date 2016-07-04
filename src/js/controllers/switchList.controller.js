export class SwitchListController {
    constructor(Switches) {
        'ngInject';

        Switches
            .getSwitches()
            .then((switches) => {
                this.switches = switches;
            }, (error) => {
                console.warn('something goes wrong', error);
            });
    }
}

SwitchListController.$inject = ['Switches'];