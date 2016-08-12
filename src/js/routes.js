export function routerConfig($stateProvider, $urlRouterProvider, $compileProvider) {
    'ngInject';

    $compileProvider.debugInfoEnabled(false);

    $stateProvider
        .state('sections', {
            url: '/sections',
            templateUrl: 'views/sections.html',
            controller: 'SectionListController as SectionListCtrl'
        })
        .state('switches', {
            url: '/switches',
            templateUrl: 'views/switches.html',
            controller: 'SwitchListController as SwitchListCtrl'
        });

    $urlRouterProvider.otherwise('/sections');
}
