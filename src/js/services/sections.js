export class SectionsService {
    constructor() {
        'ngInject';

        this.key = 'e30.switches.sections';
        this.sections = [];

    }

    getSections() {
        this.sections = angular.fromJson(window.localStorage.getItem(this.key) || []);

        return this.sections;
    }

    addSwitch(selectedSection, selectedSwitch) {
        console.info (arguments);
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

    sync(date = null) {
        if (date) {
            this.sections = date;
        }
        window.localStorage.setItem(this.key, angular.toJson(this.sections));
    }


}

SectionsService.$inject = [];