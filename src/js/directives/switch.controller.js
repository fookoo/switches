export class SwitchController {
    constructor($http) {
        'ngInject';
        
        this.$http = $http;
    }

    change() {
        this.$http({
            method: 'POST',
            url: `http://fuku.noip.me:8080/relay/${this.device.id}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: `value=${this.device.state ? 1 : 0}`
        });
    }
}

SwitchController.$inject = ['$http'];