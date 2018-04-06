
angular.module('client', []).config(states);

states.$inject = ['$stateProvider'];

function states($stateProvider) {
    $stateProvider
    .state('client', {
        url: '/client',
        views: {
            body: {
                templateUrl: 'app/modules/client/home.html',
                controller: 'ClientController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    })
    .state('clientAdd', {
        url: '/add',
        views: {
            body: {
                templateUrl: 'app/modules/client/form.html',
                controller: 'ClientController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    })
    .state('clientDetails', {
        url: '/details/:id',
        views: {
            body: {
                templateUrl: 'app/modules/client/details.html',
                controller: 'ClientController',
                controllerAs: 'vm',
            },
            nav: {
                templateUrl: 'app/templates/nav.template.html',
                controller: 'NavController',
                controllerAs: 'vm',
            },
        },
    })
    .state('clientEdit', {
        url: '/edit/:id',
        views: {
            body: {
                templateUrl: 'app/modules/client/form.html',
                controller: 'ClientController',
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
