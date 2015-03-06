/**
 * Created by twardell on 04/03/2015.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $modalInstance, basketService, evidencetypes, withDBs ) {

  /**
   * Basket items are used by the go identifer tab
   */
  $scope.basketItems = basketService.getItems();

  /**
   * Get Evidence Types
   */
  var resultET = evidencetypes.query();
  resultET.$promise.then(function(data){
    $scope.evidenceTypes = data;
    console.log("Got Evidence Types", $scope.evidenceTypes);
  });

  /**
   * Get With DBs
   */
  var resultWDB = withDBs.query();
  resultWDB.$promise.then(function(data){
    $scope.withDBs = data;
    console.log("Got With DBs", $scope.withDBs);
  });

  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };
});

