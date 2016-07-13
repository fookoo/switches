export class SwitchListController {
    constructor($mdToast, Switches) {
        'ngInject';
        this.$mdToast = $mdToast;
        this.Switches = Switches;

        this.toast = $mdToast.simple()
            .textContent('Fetching switches list goes wrong!')
            .action('Retry')
            .highlightAction(false);

        this.getList();
    }

    getList() {
        this.loader = true;

        this.Switches
            .getSwitches()
            .then((switches) => {
                this.switches = switches;
                this.loader = false;
            }, () => {
                this.loader = false;
                this.$mdToast
                    .show(this.toast)
                    .then((response) => {
                        if ( response == 'ok' ) {
                            this.getList();
                        }
                    });
            });
    }
}

SwitchListController.$inject = ['$mdToast', 'Switches'];