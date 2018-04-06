

angular.module('app', [
	'ui.router',
	'ui.utils.masks',
	'ui.bootstrap',
	'toaster',
	'ngLodash',
	'ngAnimate',
	'client',
	'service',
]);

angular.module('app')
.config(configuration)
.constant('myConfig', {
    dbPath:  __dirname + '/db/',
});

configuration.$inject = ['$urlRouterProvider'];

function configuration($urlRouterProvider) {
    $urlRouterProvider.when('', '/client');
    $urlRouterProvider.otherwise('/client');
}
