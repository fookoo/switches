angular.module('e30.switches.views', ['js/directives/switch.view.html', 'views/dialog/new.section.html', 'views/index.html', 'views/main.html', 'views/sections.html', 'views/switches.html']);

angular.module("js/directives/switch.view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/directives/switch.view.html",
    "<md-list-item>\n" +
    "    <md-icon md-font-icon=\"power\">power</md-icon>\n" +
    "    <p>Switch #{{ SwitchCtrl.device.id }}</p>\n" +
    "    <md-switch class=\"md-secondary\" ng-model=\"SwitchCtrl.device.state\" ng-change=\"SwitchCtrl.change($event)\"></md-switch>\n" +
    "</md-list-item>");
}]);

angular.module("views/dialog/new.section.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/dialog/new.section.html",
    "<md-dialog aria-label=\"Add new section\"  ng-cloak>\n" +
    "    <div flex layout=\"column\" layout-fill layout-padding>\n" +
    "        <div flex layout=\"row\">\n" +
    "            <md-input-container flex>\n" +
    "                <label>\n" +
    "                    Section name\n" +
    "                </label>\n" +
    "                <input ng-model=\"section.name\">\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <div flex layout=\"row\">\n" +
    "            <div flex=\"50\">\n" +
    "                <md-input-container>\n" +
    "                    <label>Switch</label>\n" +
    "                    <md-select ng-model=\"tmp\">\n" +
    "                        <md-option ng-repeat=\"switch in Switches.getSwitches()\">{{ switch.id }}</md-option>\n" +
    "                    </md-select>\n" +
    "                </md-input-container>\n" +
    "            </div>\n" +
    "            <div flex=\"50\">\n" +
    "                <md-button>\n" +
    "                    add\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-dialog>");
}]);

angular.module("views/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/index.html",
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\" ng-app=\"e30.switches\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Switches</title>\n" +
    "    <link rel=\"stylesheet\" href=\"style/app.css\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
    "</head>\n" +
    "    <body>\n" +
    "        <div layout=\"column\" layout-fill>\n" +
    "            <md-toolbar ng-cloak>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <span>Automation PRO</span>\n" +
    "                    <span flex></span>\n" +
    "                    <md-menu ng-cloak>\n" +
    "                        <md-button ng-click=\"$mdOpenMenu($event)\">\n" +
    "                            <md-icon md-menu-origin md-font-icon=\"menu\">menu</md-icon>\n" +
    "                        </md-button>\n" +
    "                        <md-menu-content width=\"4\">\n" +
    "                            <md-menu-item>\n" +
    "                                <md-button ui-sref=\"main.section\">\n" +
    "                                    <md-icon md-font-icon=\"assignment\" md-menu-align-target>assignment</md-icon>\n" +
    "                                    Sections\n" +
    "                                </md-button>\n" +
    "                            </md-menu-item>\n" +
    "                            <md-menu-item>\n" +
    "                                <md-button ui-sref=\"main.switches\">\n" +
    "                                    <md-icon md-font-icon=\"power\">power</md-icon>\n" +
    "                                    Switches\n" +
    "                                </md-button>\n" +
    "                            </md-menu-item>\n" +
    "                        </md-menu-content>\n" +
    "                    </md-menu>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "\n" +
    "            <md-content flex>\n" +
    "                <ui-view></ui-view>\n" +
    "            </md-content>\n" +
    "        </div>\n" +
    "        <script type=\"application/javascript\" src=\"js/app.js\"></script>\n" +
    "        <script type=\"application/javascript\" src=\"cordova.js\"></script>\n" +
    "    </body>\n" +
    "</html>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<ui-view></ui-view>");
}]);

angular.module("views/sections.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/sections.html",
    "<md-fab-speed-dial>\n" +
    "    <md-fab-trigger>\n" +
    "        <md-button ng-click=\"SectionListCtrl.addNewSection()\" aria-label=\"Add new section\" class=\"md-fab md-warn\">\n" +
    "            <md-icon md-font-icon=\"add\">add</md-icon>\n" +
    "        </md-button>\n" +
    "    </md-fab-trigger>\n" +
    "</md-fab-speed-dial>\n" +
    "\n" +
    "<div flex layout=\"column\" layout-fill layout-padding>\n" +
    "    <div flex>\n" +
    "        <section-list>\n" +
    "            <section-item layout=\"column\" ng-repeat=\"section in SectionListCtrl.sections track by $index\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div class=\"title\" flex=\"90\" ng-click=\"section.showDetails = !section.showDetails\">\n" +
    "                        <md-icon md-font-icon=\"assignment\">assignment</md-icon>\n" +
    "                        {{ section.name }}\n" +
    "                    </div>\n" +
    "                    <div flex=\"10\">\n" +
    "                        <md-switch class=\"md-secondary\" ng-model=\"section.state\" aria-label=\"Toggle section\" ng-change=\"SectionListCtrl.toggle(section)\"></md-switch>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <subsection ng-show=\"section.showDetails\">\n" +
    "                    <list layout=\"column\">\n" +
    "                        <item flex layout=\"row\" ng-repeat=\"switch in section.switches track by $index\">\n" +
    "                            <div flex=\"70\"><md-icon md-font-icon=\"power\">power</md-icon>Switch #{{ switch.id }}</div>\n" +
    "                            <div flex=\"15\"><md-switch class=\"md-secondary\" aria-label=\"OFF state\" ng-model=\"switch.off\" ng-change=\"SectionListCtrl.sync()\"></md-switch></div>\n" +
    "                            <div flex=\"15\"><md-switch class=\"md-secondary\" aria-label=\"ON state\" ng-model=\"switch.on\" ng-change=\"SectionListCtrl.sync()\"></md-switch></div>\n" +
    "                        </item>\n" +
    "                        <item>\n" +
    "                            <md-input-container>\n" +
    "                                <label>Add switch</label>\n" +
    "                                <md-select ng-model=\"selectedSwitch\" ng-change=\"SectionListCtrl.addNewSwitch(section, selectedSwitch)\">\n" +
    "                                    <md-option ng-repeat=\"switch in section.availableSwitches track by $index\" ng-value=\"switch\">\n" +
    "                                        <md-icon md-font-icon=\"power\">power</md-icon>Switch {{ switch.id }}\n" +
    "                                    </md-option>\n" +
    "                                </md-select>\n" +
    "                            </md-input-container>\n" +
    "                        </item>\n" +
    "                    </list>\n" +
    "                </subsection>\n" +
    "            </section-item>\n" +
    "        </section-list>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/switches.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/switches.html",
    "<switch ng-repeat=\"switch in SwitchListCtrl.switches\" device=\"switch\"></switch>\n" +
    "");
}]);
