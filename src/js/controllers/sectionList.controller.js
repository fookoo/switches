export class SectionListController {
    constructor(Switches, Sections) {
        'ngInject';

        this.Switches = Switches;
        this.Sections = Sections;

        this.sections = Sections.getSections();
    }

    addNewSwitch(section, selectedSwitch) {
        this.Sections.addSwitch(section, selectedSwitch);
        this.sections = this.Sections.getSections();
    }
    
    toggle(section) {
        let switchesArray = [];
        section.switches.forEach((sw) => {
             switchesArray.push({
                 id: sw.id,
                 value: section.state ? (sw.on ? 1 : 0) : (sw.off ? 1 : 0)
             });
        });

        this.Switches.setSwitches(switchesArray);

        this.sync();
        
    }

    sync() {
        this.Sections.sync(this.sections);
    }
}

SectionListController.$inject = ['Switches', 'Sections'];