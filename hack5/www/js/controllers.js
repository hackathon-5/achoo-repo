angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('StartCtrl', function($scope, $rootScope, $state, $stateParams) {
	$scope.address = '';
	$rootScope.figures = {
		address: '',
		roofSize: 0,
		homeSize: 0
	};

	$scope.onAddressChange = function() {
		$rootScope.figures.address = angular.element(document.getElementById('addressField'))[0].value;
		if (/^[a-zA-Z0-9\s,'-]*$/i.test($rootScope.figures.address)) {
			$state.go('app.tilt');
		}
	}
})
.controller('TraceCtrl', function($scope, $stateParams, $ionicLoading) {
	$scope.roofSize = 0;
	$scope.homeSize = 0;
})

.controller('TiltCtrl', function($scope, $stateParams, $cordovaDeviceMotion) {

  console.log('TiltCtrl');

  // document.addEventListener('devicemotion', function(event) {
  //   var x = event.acceleration.x;
  //   var y = event.acceleration.y;
  //   var z = event.acceleration.z;

  //   var ralpha = event.rotationRate.alpha;
  //   var rbeta = event.rotationRate.beta;
  //   var rgamma = event.rotationRate.gamma;

  //   var interval = event.interval;

  //   console.log('event', event);

  // });

  // document.addEventListener("deviceready", function () {

  //   if ($cordovaDeviceMotion) $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
  //     var X = result.x;
  //     var Y = result.y;
  //     var Z = result.z;
  //     var timeStamp = result.timestamp;
  //     console.log('result', result);
  //   }, function(err) {
  //     // An error occurred. Show a message to the user
  //   });

  // }, false);


  // // watch Acceleration
  // var options = { frequency: 20000 };

  // document.addEventListener("deviceready", function () {

  //   // if ($cordovaDeviceMotion)
  //   var watch = $cordovaDeviceMotion.watchAcceleration(options);

  //   watch.then(
  //     null,
  //     function(error) {
  //     // An error occurred
  //       console.log('error2', error);
  //     },
  //     function(result) {
  //       console.log('result2', result);
  //       $scope.result = result;
  //       var X = result.x;
  //       var Y = result.y;
  //       var Z = result.z;
  //       var timeStamp = result.timestamp;
  //   });


  //   watch.clearWatch();
  //   // OR
  //   $cordovaDeviceMotion.clearWatch(watch)
  //     .then(function(result) {
  //       // success
  //       console.log('result3', result);
  //       $scope.result = result;

  //       }, function (error) {
  //       console.log('error3', error);
  //     });

  // }, false);



})
;
