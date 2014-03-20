angular.module( 'myApp', [
  'templates-app',
  'templates-common',
  'ui.router.state',
  'ui.bootstrap'
])

.config( ['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise( '/' );
}])

.run( function run () {
})

.controller( 'AppCtrl', ['$scope', '$location', '$state', '$modal', function AppCtrl ( $scope, $location, $state, $modal) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.currentSelection = $scope.items[1];
  
  $scope.openModal = function () {
  
    $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        },
        selected: function() {
          return { item: $scope.currentSelection };
        }
      }
    }).result.then(function (selectedItem) {
      $scope.currentSelection = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
  
  var ModalInstanceCtrl = function ($scope, $modalInstance, items, selected) {
  
    $scope.items = items;
    $scope.selected = selected;
  
    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  
}])

;
