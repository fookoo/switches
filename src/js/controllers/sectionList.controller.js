export class SectionListController {
    constructor($scope, $mdDialog, Switches, Sections) {
        'ngInject';
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.Switches = Switches;
        this.Sections = Sections;

        this.sections = Sections.getSections();
    }

    /**
     * Add Switch to section
     * @param section
     * @param selectedSwitch
     */
    addNewSwitch(section, selectedSwitch) {
        this.Sections.addSwitch(section, selectedSwitch);
        this.sections = this.Sections.getSections();
    }

    /**
     * Turn on/off section
     * @param section
     */
    toggle(section) {
        let switchesArray = [];
        section.switches.forEach((sw) => {
             switchesArray.push({
                 id: parseInt(sw.id),
                 state: parseInt(section.state ? (sw.on ? 1 : 0) : (sw.off ? 1 : 0))
             });
        });

        this.Switches.setSwitches(switchesArray);

        this.sync();
        
    }

    addNewSection() {
        this.$mdDialog.show({
            templateUrl: 'views/dialog/new.section.html',
            controller: 'NewSectionController as ctrl'
        });
    }

    deleteSection(selectedSection) {
        let confirmDialog = this.$mdDialog.confirm()
            .title(`Would you like to delete your section ${selectedSection.name}?`)
            .ok('Yes')
            .cancel('Ups...');

        this.$mdDialog
            .show(confirmDialog)
            .then(() => {
                this.sections = this.sections.filter((section) => {
                    return section.id !== selectedSection.id
                });
                this.sync();
            });
    }

    openSwitchMenu($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    }

    deleteSwitch(selectedSwitch, selectedSection) {
        let confirmDialog = this.$mdDialog.confirm()
            .title(`Would you like to delete your switch ${selectedSwitch.id} from ${selectedSection.name}?`)
            .ok('Yes')
            .cancel('Ups...');

        this.$mdDialog
            .show(confirmDialog)
            .then(() => {
                this.Sections.removeSwitch(selectedSection, selectedSwitch);
                this.sync();
            });
    }

    /**
     * sync with localstorage
     */
    sync() {
        this.Sections.sync(this.sections);
    }
}

SectionListController.$inject = ['$scope', '$mdDialog', 'Switches', 'Sections'];