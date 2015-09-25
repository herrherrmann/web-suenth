angular.module('webSuenth')

.config(function config($stateProvider) {

  $stateProvider
    .state('suenth', {
      url: '/suenth',
      views: {
        "main": {
          controller: 'SuenthCtrl',
          templateUrl: 'suenth/suenth.tpl.html'
        }
      },
      data: {
        pageTitle: 'Suenth'
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
