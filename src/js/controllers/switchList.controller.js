export class SwitchListController {
    constructor($http) {
        'ngInject';
        
        $http
            .get('http://fuku.noip.me:8080/relays')
            .then((relays) => {
                relays.data.forEach((switchElement) => {
                    switchElement.state = switchElement.state == 1;
                });

                this.switches = relays.data;
        });
    }
}

SwitchListController.$inject = ['$http'];