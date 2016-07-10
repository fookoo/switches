export class SectionListController {
    constructor($scope, $mdMedia, $mdDialog, Switches, Sections) {
        'ngInject';

        this.$scope = $scope;
        this.$mdMedia = $mdMedia;
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

    changeSwitchType(type, section, selectedSwitch) {
        console.info (arguments);
        this.sections.forEach((sectionItem) => {
            console.info('ddd', sectionItem);
            if (sectionItem.id == section.id) {
                console.info('ccc', sectionItem);
                sectionItem.switches.forEach((item) => {
                    console.info('bbb', item);
                    if (item.id == selectedSwitch.id) {
                        console.info('aaaa', type);
                        switch (type) {
                            case 'pulse':
                                item.icon = 'flare';
                                break;
                            case 'switch':
                                item.icon = 'swap_horiz';
                                break;
                        }
                        item.type = type;
                    }
                })
            }
        });

        this.sync();
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
                 type: sw.type,
                 state: parseInt(section.state ? (sw.on ? 1 : 0) : (sw.off ? 1 : 0))
             });
        });

        this.Switches.setSwitches(switchesArray);

        this.sync();
        
    }

    addNewSection() {
        let name = this.$mdDialog.prompt()
            .title('New section')
            .textContent('Section name')
            .placeholder('Name')
            .ariaLabel('Name')
            .ok('Add')
            .cancel('Cancel');

        this.$mdDialog
            .show(name)
            .then((newSectionName) => {
                this.Sections
                    .addSection(newSectionName)
                    .then((sections) => {
                        this.sections = sections
                    });
            });
    }

    changeName(section) {
        let name = this.$mdDialog.prompt()
            .title('Rename')
            .textContent('Change section name')
            .placeholder('Name')
            .ariaLabel('Name')
            .initialValue(section.name)
            .ok('Okay!')
            .cancel('Cancel');

        this.$mdDialog
            .show(name)
            .then((newName) => {
                section.name = newName;
                this.sync();
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

SectionListController.$inject = ['$scope', '$mdMedia', '$mdDialog', 'Switches', 'Sections'];