angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
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

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('TiltCtrl', function($scope, $stateParams, $cordovaDeviceMotion) {

  console.log('TiltCtrl')

  document.addEventListener("deviceready", function () {

    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      var X = result.x;
      var Y = result.y;
      var Z = result.z;
      var timeStamp = result.timestamp;
      console.log('result', result);
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  }, false);


  // watch Acceleration
  var options = { frequency: 20000 };

  document.addEventListener("deviceready", function () {

    var watch = $cordovaDeviceMotion.watchAcceleration(options);
    if (watch) watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {
        console.log('result2', result);
        $scope.result = result;
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
    });


    if (watch) watch.clearWatch();
    // OR
    if (watch) $cordovaDeviceMotion.clearWatch(watch)
      .then(function(result) {
        // success
        console.log('result3', result);
        $scope.result = result;

        }, function (error) {
        // error
      });

  }, false);



})
;
