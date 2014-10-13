// Angular Services
angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Layers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var layers = [
    { name: 'Esri Tapestry', webmap_id: '4778fee6371d4e83a22786029f30c7e1' },
    { name: 'US Wildfire Map', webmap_id: 'df8bcc10430f48878b01c96e907a1fc3' }
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
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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




  // Nested Menu
  // Based on Codepen: http://codepen.io/anon/pen/fpCyl?editors=101
  $scope.hideSidemenuBackButton = true;
  var topLevelCategories;

  topLevelCategories = $scope.categories = [
    {id: 1, name: 'Layers', taxons: [
      {id: '4778fee6371d4e83a22786029f30c7e1', name: 'Esri Tapestry Map', taxons: [], is_first_level: false},
      {id: 'df8bcc10430f48878b01c96e907a1fc3', name: 'US Wildfire Map', taxons: [], is_first_level: false},
      {id: '8a567ebac15748d39a747649a2e86cf4', name: 'True Geography of London Underground', taxons: [], is_first_level: false},
      {id: '3d355e34cbd3405dbb3f031286f7b39b', name: 'LANDSAT8 Daily Planet Imagery', taxons: [], is_first_level: false},
      {id: '2f5a28f82f4d41ec8dbe6cf96375a970', name: 'Hurricane and Cycle Web Map', taxons: [], is_first_level: false},
      {id: '72c523c47ae241f0821f21773eb20709', name: 'Current Ocean Conditions', taxons: [], is_first_level: false},
      {id: 'd16d53126f1243a3a7a7f1d0dff39662', name: 'Severe Weather Web Map', taxons: [], is_first_level: false},
      {id: '29d59c8a3536471da8233471a92116ad', name: 'Subscription Required', taxons: [], is_first_level: false},
      {id: '8483d89e59904728b54f187b462a442c', name: 'Subscription Required', taxons: [], is_first_level: false}
    ], is_first_level: true},
    {id: 2, name: 'Find Parking', taxons: [
      {id: 7, name: '1. Child of Second: 2st level', taxons: [], is_first_level: false},
      {id: 8, name: '2. Child of Second: 2st level', taxons: [], is_first_level: false}
    ], is_first_level: true},
    {id: 3, name: 'Explore Sustainability', taxons: [
      {id: 9, name: '2. Child of Third: 2st level', taxons: [], is_first_level: false}
    ], is_first_level: true}
  ];

  var getByParentId = function(id) {
    for (var i in topLevelCategories) {
      if (topLevelCategories[i].id == id) {
        return topLevelCategories[i].taxons;
      }
    }
  }

  $scope.toggleCategories = function() {
      $scope.sideMenuController.toggleLeft();
  };

  $scope.showSubcategories = function(category) {
      $scope.categories = getByParentId(category.id);
      $scope.hideSidemenuBackButton = false;
  };

  $scope.showTopLevelCategories = function () {
      $scope.categories = topLevelCategories;
      $scope.hideSidemenuBackButton = true;
  };
})

.controller('PlaylistsCtrl', function($scope) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $stateParams, Layers) {

    $scope.layers = Layers.all();

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
          webmap = $scope.layers['0'].webmap_id;
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
