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
        this.sections.push({
            id: this.Common.generateId(),
            name: sectionName,
            state: false,
            switches: [],
            showDetails: false
        });

        this.sync(this.sections);
    }
    
    getSections() {
        this.sections = angular.fromJson(window.localStorage.getItem(this.key) || []);

        this.sections.forEach((section) => {
            section.switches.forEach((switchItem) => {
                switchItem.name = this.Switches.getNameById(switchItem.deviceId);
            });
        });
        
        return this.sections;
    }

    addSwitch(selectedSection, selectedSwitch) {
        this.sections
            .filter((section) => section.id === selectedSection.id)
            .map((section) => {
                selectedSwitch.id = this.Common.generateId();
                selectedSwitch.type = 'switch';
                selectedSwitch.on = false;
                selectedSwitch.off = false;

                section.switches.push(selectedSwitch);
            });

        this.sync();
    }

    removeSwitch(selectedSection, selectedSwitch) {
        selectedSection.switches = selectedSection.switches.filter((item) => item.id !== selectedSwitch.id);

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