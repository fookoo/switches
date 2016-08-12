export class SwitchesService {
    constructor($q, $http) {
        'ngInject';
        
        this.$q = $q;
        this.$http = $http;
        
        this.backendUrl = 'http://192.168.1.10:8080';
    }

    /**
     * Return all available switches 
     * @returns {Promise}
     */
    getSwitches() {
        let p = this.$q.defer();
        
        this.$http
            .get(`${this.backendUrl}/relays`)
            .then((relays) => {
                relays.data.forEach((switchElement) => {
                    switchElement.deviceId = switchElement.id;
                    switchElement.icon = 'swap_horiz';
                    switchElement.name = this.getNameById(switchElement.deviceId);
                    switchElement.type = 'direct';
                    switchElement.state = switchElement.state === "1";
                });
                p.resolve(relays.data);

            }, p.reject);
        
        return p.promise;
    }

    /**
     * Set switch on/off
     * @param id - Device id
     * @param value {Boolean} - switch state
     * @returns {Promise}
     */
    setSwitch(id, value) {
        return this.$http({
            method: 'POST',
            url: `${this.backendUrl}/relay/${id}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: `value=${value ? 1 : 0}`
        });
    }

    getNameById(id) {
        return window.localStorage.getItem(`e30.switches.names.${id}`) || 'Switch';
    }
    
    setSwitches(switchesArray) {
        return this.$http({
            method: 'POST',
            url: `${this.backendUrl}/relays`,
            headers: {
                "Content-Type": "application/json"
            },
            data: switchesArray
        });
    }
    
    pulse(switchesArray) {
        return this.$http({
            method: 'POST',
            url: `${this.backendUrl}/pulses`,
            headers: {
                "Content-Type": "application/json"
            },
            data: switchesArray
        });  
    }
}

SwitchesService.$inject = ['$q', '$http'];