export class SectionsService {
    constructor($q, Common, Switches) {
        'ngInject';

        this.$q = $q;
        this.Switches = Switches;
        this.Common = Common;

        this.key = 'e30.switches.sections';
        this.sections = [];

        this.getSections();
    }

    addSection(sectionName) {
        let p = this.$q.defer();

        this.Switches
            .getSwitches()
            .then((listOfSwitches) => {
                this.sections.push({
                    id: this.Common.generateId(),
                    name: sectionName,
                    state: false,
                    switches: [],
                    availableSwitches: listOfSwitches,
                    showDetails: false
                });

                this.sync(this.sections);

                p.resolve(this.sections);
            }, (error) => {
                console.warn(error);

                p.reject(error);
            });

        return p.promise;
    }
    
    getSections() {
        this.sections = angular.fromJson(window.localStorage.getItem(this.key) || []);

        return this.sections;
    }

    addSwitch(selectedSection, selectedSwitch) {
        this.sections.forEach((section) => {
            if (section.id === selectedSection.id) {
                selectedSwitch.on = false;
                selectedSwitch.off = false;
                section.switches.push(selectedSwitch);
                section.availableSwitches = section.availableSwitches.filter((switchItem) => switchItem.id !== selectedSwitch.id);
            }
        });

        this.sync();
    }

    removeSwitch(selectedSection, selectedSwitch) {
        selectedSection.switches = selectedSection.switches.filter((item) => item.id !== selectedSwitch.id);
        selectedSection.availableSwitches.push(selectedSwitch);
        
        this.sync();
    }
    
    sync(date = null) {
        if (date) {
            this.sections = date;
        }
        window.localStorage.setItem(this.key, angular.toJson(this.sections));
    }
}

SectionsService.$inject = ['$q', 'Common', 'Switches'];