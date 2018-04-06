
angular.module('service', []).config(states);

states.$inject = ['$stateProvider'];

function states($stateProvider) {
    $stateProvider
    .state('service', {
        url: '/service',
        views: {
            body: {
                templateUrl: 'app/modules/service/home.html',
                controller: 'ServiceController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    })
    .state('serviceAdd', {
        url: '/serviceAdd',
        views: {
            body: {
                templateUrl: 'app/modules/service/form.html',
                controller: 'ServiceController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    })
    .state('serviceEdit', {
        url: '/editService/:id',
        views: {
            body: {
                templateUrl: 'app/modules/service/form.html',
                controller: 'ServiceController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    });

}
