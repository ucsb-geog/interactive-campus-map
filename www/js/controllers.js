angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.search = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 },
    { title: 'Ukulele', id:7 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $stateParams) {

      var map;

      require([
        "dojo/parser",
        "dojo/ready",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dojo/dom",
        "esri/map",
        "esri/urlUtils",
        "esri/arcgis/utils",
        "esri/dijit/Legend",
        "esri/dijit/Scalebar",
        "dojo/domReady!"
      ], function(
        parser,
        ready,
        BorderContainer,
        ContentPane,
        dom,
        Map,
        urlUtils,
        arcgisUtils,
        Legend,
        Scalebar
      ) {
        ready(function(){

        parser.parse();


        arcgisUtils.createMap("4778fee6371d4e83a22786029f30c7e1","map").then(function(response){
          //update the app
          dom.byId("title").innerHTML = response.itemInfo.item.title;
          dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

          var map = response.map;



          //add the scalebar
          var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "english"
          });

          //add the legend. Note that we use the utility method getLegendLayers to get
          //the layers to display in the legend from the createMap response.
          var legendLayers = arcgisUtils.getLegendLayers(response);
          var legendDijit = new Legend({
            map: map,
            layerInfos: legendLayers
          },"legend");
          legendDijit.startup();


        });


        });

      });
});
