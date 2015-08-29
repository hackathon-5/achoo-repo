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

.controller('StartCtrl', function($scope, $rootScope, $state, $stateParams) {
    $rootScope.figures = {
        address: '',
        roofSize: 0,
        homeSize: 0
    };

    $scope.onAddressChange = function() {
        var address = angular.element(document.getElementById('addressField'))[0].value;
        $scope.address = address;
        if (address && /^[a-zA-Z0-9\s,'-]*$/i.test(address)) {
            $rootScope.figures.address = address;
            $scope.address = null;

            $state.go('app.trace');
        }
    }

  // $timeout(function() {
  //     $scope.$parent.hideHeader();
  // }, 0);
})

.controller('TraceCtrl', function($scope, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
    $scope.roofSize = 0;
    $scope.homeSize = 0;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.saveAndContinue = function() {
    $state.go('app.tilt');
  }
    function initialize() {
      var myLatlng = new google.maps.LatLng(33.053513, -80.136530);
      var geocoder = new google.maps.Geocoder;
      var mapOptions = {
        center: myLatlng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 0
      };
      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);
      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";

      var infowindow = new google.maps.InfoWindow({
        content: $compile(contentString)($scope)[0]
      });

      var marker;

      geocoder.geocode({'address': $rootScope.figures.address },
       function(results, status) {

        console.log('results', results);
        if (status == google.maps.GeocoderStatus.OK) {


          var coords = results[0].geometry.location;
          console.log('coords', coords)
          map.setCenter(coords);
          $rootScope.figures.latLan = Object.keys(coords).map(function(k){ return coords[k] }) + '';

          marker = new google.maps.Marker({
            position: myLa$rootScope.figures.latLan,
            map: map
          });
        } else {
          // add alert
        }
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      $scope.map = map;
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    $scope.clickTest = function() {
      return function() {};
    };

    console.log($rootScope)
})

.controller('TiltCtrl', function($scope, $stateParams, $ionicHistory, $state, $ionicPlatform, $cordovaDeviceMotion) {

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

  // var show = function() {
  //    console.log("Orientation type is " + screen.orientation.type);
  //    console.log("Orientation angle is " + screen.orientation.angle);
  // }

  // screen.orientation.addEventListener("change", show);


  $ionicPlatform.ready(function() {
  // function onDeviceReady() {
    console.log('navigator.accelerometer', navigator, navigator.accelerometer);

  //   navigator.accelerometer.getCurrentAcceleration(function(result) {
  //     var X = result.x;
  //     var Y = result.y;
  //     var Z = result.z;
  //     var timeStamp = result.timestamp;
  //     console.log('getCurrentAcceleration result', result);
  //   }, function(err) {
  //     // An error occurred. Show a message to the user
  //     console.log('getCurrentAcceleration error', result);
  //   });

  //     // if ($cordovaDeviceMotion)
  //   var watch = navigator.accelerometer.watchAcceleration(function(result) {
  //     console.log('watchAcceleration result', result);
  //     $scope.result = result;
  //     var X = result.x;
  //     var Y = result.y;
  //     var Z = result.z;
  //     var timeStamp = result.timestamp;
  //   }, function() {
  //     console.log('watchAcceleration error', error);        
  //   }, { frequency: 20000 });
 
  // }
  });

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

.controller('ResultsCtrl', function($scope, $stateParams, $ionicHistory, $state, $timeout, $http, $rootScope) {
  $scope.roofSize = 1000;
  $scope.homeSize = 0;

  $scope.rangeMin = 0;
  $scope.rangeMax = 100;  

  $scope.rangeVal = null;

  $timeout(function() {
    $scope.rangeVal = ($scope.rangeMax-$scope.rangeMin)/2;
  }, 50);

  function calcKWh(roofSize, percentCoverage) {
    // percentCoverage (1-100)
    var 
      wattsPerPanel = 230,
      sizeOfPanel = 10.7639, // sq ft
      panelSize = roofSize * (percentCoverage/100),
      hoursPerDay = 5,
      daysInYear = 365;

    return Math.round((wattsPerPanel * (panelSize/sizeOfPanel) * hoursPerDay * daysInYear) / 1000);
  }

  $scope.$watch("rangeVal", function(newValue, oldValue) {
    console.log('rangeVal', newValue)
    $scope.kwhPerYear = calcKWh($scope.roofSize, newValue);
    // calcCost();
  });

  $scope.updateCalc = function(val) {
    console.log('updateCalc', val, $scope.roofSize, $scope.rangeVal)
    // console.log('updateCalc', calcKWh($scope.roofSize, $scope.rangeVal))
    // $scope.kwhPerYear = 0;
    $scope.rangeVal = val;
    // $scope.kwhPerYear = calcKWh($scope.roofSize, parseInt(val));
  };

  $scope.calcCost = function() {
    var
      lat = $rootScope.latLan ? $rootScope.latLan.split(',')[0] : 32.90011,
      lon = $rootScope.latLan ? $rootScope.latLan.split(',')[1] : -79.915778

    $http.get('http://developer.nrel.gov/api/utility_rates/v3.json?api_key=u3VTRy4t0XAHd2ceXWB5Cn75LO55FAQtxkdecMPj&lat='+lat+'&lon='+lon).
      success(function(data, status, headers, config) {
        $scope.energyCostKWh = data.outputs.residential;
        $scope.cost = Math.round(data.outputs.residential * $scope.kwhPerYear);
      }).
      error(function(data, status, headers, config) {
        // log error
      });
  }


  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});


