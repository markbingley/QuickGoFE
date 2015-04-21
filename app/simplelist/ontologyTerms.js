/**
 * Created by twardell on 21/04/2015.
 */
app.controller('OntologyTermsCtrl', function($scope, $location, targetDomainAndPort, ontologies) {

  /*Parse the url to get the ontology letter (P,F,C)*/
  var pathVals =$location.path().split("/");
  var ontology=pathVals[(pathVals.length-1)];

  ontologies.query({ontology : ontology}, function(ontologyList){
    console.log("found ontologyList data ", ontologyList);
    $scope.ontology = ontologyList;
  });

});
