export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'SwitchListController as SwitchListCtrl'
        });

    $urlRouterProvider.otherwise('/');
}
