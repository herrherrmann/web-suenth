angular.module('webSuenth', [
  'templates-app',
  'ui.bootstrap',
  'ngAnimate',
  'ngResource',
  'webSuenth.suenth',
  'webSuenth.about',
  'ui.router'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/suenth');
  $locationProvider.html5Mode(true);
})

.run(function run() {})

.controller('AppCtrl', function($scope, $location) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | webSuenth';
    }
  });

})

;
