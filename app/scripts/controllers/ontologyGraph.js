/**
 * Created by twardell on 07/04/2015.
 */
app.controller('OntologyGraphCtrl', function($scope, $http, $modalInstance, targetDomainAndPort, graphModel, feDomainAndPort) {

  $scope.isLoading = 1;
  $scope.graphModel = graphModel;
  $scope.imageSource="";
  $scope.feDomainAndPort=feDomainAndPort;
  $scope.targetDomainAndPort=targetDomainAndPort;

  var formattedURL=targetDomainAndPort+'/ws/chartfull?ids='+graphModel.id + "&scope=" + graphModel.scope;
  var chartURL=targetDomainAndPort;

  console.log("Chart Full url", formattedURL);


  $http.get(formattedURL).success(function(data) {
    //console.log("got the response back ", data);
    $scope.isLoading=0;
    $scope.graphImage = data;


    //Now get the image data
    //chartURL=chartURL+'/'+$scope.graphImage.graphImageSrc;
    //$http.get(chartURL).success(function(imgdata) {
    //  //console.log("got the response back ", data);
    //  //$scope.graphImageRaw = imgdata;
    //});

    $scope.imageSource=targetDomainAndPort+$scope.graphImage.graphImageSrc;

  });

  /**
   * Create the text for the legend popover
   */


  $scope.formattedTooltip = function (element)  {
    //console.log("formatted Too tip", element);

    var content = element;
    if (element == 'is_a') {
      content = "Term A <strong>is_a</strong> term B means that term A is a subtype of term B.<br/>For example, 'transcription' is a type of 'nucleic acid metabolic process'.";
    } else if (element == 'part_of') {
      content = "Term A <strong>part_of</strong> term B means that term A is always a part of term B.<br/>For example, 'transcription' is always a part of 'gene expression'.";
    } else if (element == 'regulates') {
      content = "Term A <strong>regulates</strong> term B means that term A regulates term B, but term B may not always be regulated by term A.";
    } else if (element == 'positively_regulates') {
      content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>positively_regulates</strong> term B means that term B is positively regulated by term A.";
    } else if (element == 'negatively_regulates') {
      content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>negatively_regulates</strong> term B means that term B is negatively regulated by term A.";
    } else if (element == 'has_part') {
      content = "<strong>has_part</strong> means that term B always has as part of it term A, but term A may exist independently of term B.<br/>For example, 'protein binding trancription factor activity' always has as a part of it 'protein binding' but 'protein binding' may occur independently of transcription factor activity.<br/>Note that has_part is not a transitive relationship, meaning there is NO implication that gene products annotated to term A could also be correctly associated with term B or any of its parent terms.<br/>Has_part should be read in the opposite direction to the other relationships.";
    } else if (element == 'occurs_in') {
      content = "This relation is used for inter-ontology links between the Biological Process ontology and the Cellular Component ontology, for example 'mitochondrial translation' occurs_in 'mitochondrion'.";
    } else if (element == 'used_in'){
      content = "Documentation coming shortly...";
    }

    $scope.tooltip= content;

  }


  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

  /**
   * End
   */
});
