export class SwitchController {
    constructor($mdDialog, Switches) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.Switches = Switches;
    }

    changeName() {
        let name = this.$mdDialog.prompt()
            .title('Rename')
            .textContent('Change switch name')
            .placeholder('Name')
            .ariaLabel('Name')
            .initialValue(this.device.name)
            .ok('Okay!')
            .cancel('Cancel');

        this.$mdDialog
            .show(name)
            .then((newName) => {
                this.device.name = newName;
                window.localStorage.setItem(`e30.switches.names.${this.device.id}`, newName);
            });
    }
    
    change() {
        this.Switches
            .setSwitch(this.device.id, this.device.state);
    }
}

SwitchController.$inject = ['$mdDialog', 'Switches'];