angular.module('webSuenth')

.config(function config($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data: {
        pageTitle: 'Home'
      }
    })
    .state('about', {
      url: '/about',
      views: {
        "main": {
          controller: 'AboutCtrl',
          templateUrl: 'about/about.tpl.html'
        }
      },
      data: {
        pageTitle: 'About'
      }
    });

});
