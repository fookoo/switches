angular.module('e30.switches.views', ['js/directives/switch.view.html', 'views/index.html', 'views/main.html']);

angular.module("js/directives/switch.view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/directives/switch.view.html",
    "<md-list-item>\n" +
    "    <md-icon md-font-icon=\"power\">power</md-icon>\n" +
    "    <p>Switch #{{ SwitchCtrl.device.id }}</p>\n" +
    "    <md-switch class=\"md-secondary\" ng-model=\"SwitchCtrl.device.state\" ng-change=\"SwitchCtrl.change($event)\"></md-switch>\n" +
    "</md-list-item>");
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
    "            <md-toolbar>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <span>Switches</span>\n" +
    "                    <span flex></span>\n" +
    "                    <md-button>\n" +
    "                        <md-icon md-font-icon=\"menu\">menu</md-icon>\n" +
    "                    </md-button>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "            <md-content flex>\n" +
    "                <ui-view></ui-view>\n" +
    "            </md-content>\n" +
    "        </div>\n" +
    "        <script type=\"application/javascript\" src=\"js/app.js.gz\"></script>\n" +
    "        <script type=\"application/javascript\" src=\"js/cordova.js\"></script>\n" +
    "    </body>\n" +
    "</html>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<switch ng-repeat=\"switch in SwitchListCtrl.switches\" device=\"switch\"></switch>\n" +
    "");
}]);
