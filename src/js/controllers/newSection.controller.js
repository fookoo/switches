export class NewSectionController {
    constructor($mdDialog, Sections) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.Sections = Sections;
    }

    validate() {
        this.Sections
            .addSection(this.newSectionName)
            .then((sections) => {
                this.$mdDialog.hide();
                this.sections = sections
            });

    }
}

NewSectionController.$inject = ['$mdDialog', 'Sections'];