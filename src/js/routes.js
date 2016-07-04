export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html'
        })
        .state('main.section', {
            url: '/sections',
            templateUrl: 'views/sections.html',
            controller: 'SectionListController as SectionListCtrl'


        })
        .state('main.switches', {
            url: '/switches',
            templateUrl: 'views/switches.html',
            controller: 'SwitchListController as SwitchListCtrl'
        });

    $urlRouterProvider.otherwise('/');
}
