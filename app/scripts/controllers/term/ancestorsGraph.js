/**
 * Created by twardell on 02/02/2015.
 */
app.controller('AncestorsGraphCtrl', function($scope, $http) {


  var formattedURL='http://localhost:9080/ws/ontologyGraph/';
  var termId='GO:0003824';

  /**
   * Get Term Data from WS
   */
  //$http.get(formattedURL+termId).success(function(data) {
  //  $scope.termGraphImageSrc = data;
  //  console.log("termGraphImageSrc",$scope.termGraphImageSrc);
  //
  //});

});