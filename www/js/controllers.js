// Angular Services
angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Layers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var layers = [
    {webmap_id: 'df8bcc10430f48878b01c96e907a1fc3', name: 'US Wildfire Map'},
    {webmap_id: '4778fee6371d4e83a22786029f30c7e1', name: 'Esri Tapestry Map'},
    {webmap_id: '2f5a28f82f4d41ec8dbe6cf96375a970', name: 'Hurricane and Cycle Web Map'},
    {webmap_id: '72c523c47ae241f0821f21773eb20709', name: 'Current Ocean Conditions'},
    {webmap_id: 'd16d53126f1243a3a7a7f1d0dff39662', name: 'Severe Weather Web Map'}
  ];

  return {
    all: function() {
      return layers;
    },
    get: function(layerId) {
      // Simple index lookup
      return layers[layerId];
    }
  }
});
// End Angular Services


// Angular Controllers
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Layers) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/search.html', {
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


  // Nested Menu using angularui router
  $scope.layers = Layers.all();


})

.controller('MenuCtrl', function($scope, $stateParams, Layers){})

.controller('MapCtrl', function($scope, $stateParams, Layers) {

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
        "esri/dijit/PopupMobile",
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
        Scalebar,
        PopupMobile,
        domConstruct
      ) {
        ready(function(){

        var webmap;

        parser.parse();

        var webmap = '';
        if ($stateParams['mapId'] == '' || typeof $stateParams['mapId'] === 'undefined') {
          console.log('No webmap specified. Loading default map.');
          webmap = $scope.layers[0].webmap_id;
        }
        else {
          webmap = $stateParams['mapId'];
        }

        arcgisUtils.arcgisUrl = arcgisUtils.arcgisUrl.replace("file:", "http:");

        var popup = new PopupMobile(null, document.createElement("div"));

        arcgisUtils.createMap(webmap,"map", {
            mapOptions: {
        //        center: [-119.8481, 34.4125],
        //        zoom: 11
                  infoWindow: popup
              }
        })
        .then(function(response){
          //update the app
          //dom.byId("title").innerHTML = response.itemInfo.item.title;
          //dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

          var map = response.map;

          //add the scalebar
          var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "english"
          });

          //add the legend. Note that we use the utility method getLegendLayers to get
          //the layers to display in the legend from the createMap response.
          //var legendLayers = arcgisUtils.getLegendLayers(response);
          //var legendDijit = new Legend({
          //  map: map,
          //  layerInfos: legendLayers
          //},"legend");
          //legendDijit.startup();


        });


        });

      });
});
