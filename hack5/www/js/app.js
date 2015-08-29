// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'google.places'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeSuccess", console.log.bind(console));
  $rootScope.$on("$stateChangeError", console.log.bind(console));
})

.config(function($compileProvider, $stateProvider, $urlRouterProvider) {
  $compileProvider.debugInfoEnabled(true);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.trace', {
    url: '/trace',
    views: {
      'menuContent': {
        templateUrl: 'templates/trace.html',
        controller: 'TraceCtrl'
      }
    }
  })
  .state('app.start', {
    url: '/start',
    views: {
      'menuContent': {
        templateUrl: 'templates/start.html',
        controller: 'StartCtrl'
      }
    }
  })
  .state('app.tilt', {
    url: '/tilt',
    views: {
      'menuContent': {
        templateUrl: 'templates/tilt.html',
        controller: 'TiltCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/start');
});
