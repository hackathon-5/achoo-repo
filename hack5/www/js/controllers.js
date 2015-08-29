angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
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
.controller('StartCtrl', function($scope, $stateParams, $timeout) {
  // $timeout(function() {
  //     $scope.$parent.hideHeader();
  // }, 0);
})

.controller('TraceCtrl', function($scope, $stateParams, $ionicHistory) {
	$scope.roofSize = 0;
	$scope.homeSize = 0;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.saveAndContinue = function() {
    $state.go('app.tilt');
  }
})

.controller('TiltCtrl', function($scope, $stateParams, $ionicHistory, $state, $cordovaDeviceMotion) {

  console.log('TiltCtrl');

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.saveAndContinue = function() {
    $state.go('app.results');
  }

  // if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    // document.addEventListener("deviceready", onDeviceReady, false);
  // } else {
    // document.addEventListener("deviceready", onDeviceReady, false);
    // onDeviceReady();
  // }

  var show = function() {
     console.log("Orientation type is " + screen.orientation.type);
     console.log("Orientation angle is " + screen.orientation.angle);
  }

  screen.orientation.addEventListener("change", show);


  function onDeviceReady() {
    console.log('navigator.accelerometer', navigator, navigator.accelerometer);

    navigator.accelerometer.getCurrentAcceleration(function(result) {
      var X = result.x;
      var Y = result.y;
      var Z = result.z;
      var timeStamp = result.timestamp;
      console.log('getCurrentAcceleration result', result);
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log('getCurrentAcceleration error', result);
    });

      // if ($cordovaDeviceMotion)
    var watch = navigator.accelerometer.watchAcceleration(function(result) {
      console.log('watchAcceleration result', result);
      $scope.result = result;
      var X = result.x;
      var Y = result.y;
      var Z = result.z;
      var timeStamp = result.timestamp;
    }, function() {
      console.log('watchAcceleration error', error);        
    }, { frequency: 20000 });
 
  }

  // document.addEventListener('devicemotion', function(event) {
  //   var x = event.acceleration.x;
  //   var y = event.acceleration.y;
  //   var z = event.acceleration.z;

  //   var ralpha = event.rotationRate.alpha;
  //   var rbeta = event.rotationRate.beta;
  //   var rgamma = event.rotationRate.gamma;

  //   var interval = event.interval;

  //   console.log('devicemotion event', event);

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

.controller('ResultsCtrl', function($scope, $stateParams, $ionicHistory) {
  $scope.roofSize = 0;
  $scope.homeSize = 0;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});
;
