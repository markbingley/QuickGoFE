/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($scope, $http, $modal, $q, termDataService, basketService) {

  //Initialize data
  //$scope.showTermInformation=true;


  var formattedURL='http://localhost:9080/ws/term/';
  var termId='GO:0003824';

  /**
   * Show basket quantity
   */
  $scope.countBasket = basketService.basketQuantity();


  /**
   * Get Term Data from WS
   */
  $http.get(formattedURL+termId).success(function(data) {
    $scope.termModel = data;
    console.log($scope.termModel);

    setupBasketButton($scope.termModel);

    //Set active show
    if($scope.termModel.active != true){
      $scope.isObsolete = true;
    }


    //Set restrictions show
    if($scope.termModel.usage != 'U' && $scope.termModel.goTerm){
      $scope.showRestrictions = true;
    }


    //Set up statistics for co-occurring page
    $scope.totalTogetherAllStats=0;
    $scope.totalComparedAllStats=0;
    var i=-1;
    for(i=0; i< $scope.termModel.allCoOccurrenceStatsTerms.length; i++){
      $scope.totalTogetherAllStats = $scope.totalTogetherAllStats + $scope.termModel.allCoOccurrenceStatsTerms[i].together;
      $scope.totalComparedAllStats = $scope.totalTogetherAllStats + $scope.termModel.allCoOccurrenceStatsTerms[i].compared;
    }

    $scope.totalTogetherNonIEAStats=0;
    $scope.totalComparedNonIEAStats=0;
    var i=-1;
    for(i=0; i< $scope.termModel.nonIEACOOccurrenceStatistics.length; i++){
      $scope.totalTogetherNonIEAStats = $scope.totalTogetherNonIEAStats + $scope.termModel.nonIEACOOccurrenceStatistics[i].together;
      $scope.totalComparedNonIEAStats = $scope.totalComparedNonIEAStats + $scope.termModel.nonIEACOOccurrenceStatistics[i].compared;
    }


  });


  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket =  basketService.basketQuantity();

    //Stop this item being added to the basket again
    $scope.allowAddToBasket = false;
    $scope.preventAddToBasket = true;
  }

  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/basketModal.html',
      controller: 'BasketCtrl',
      size: 'lg',
      scope: $scope,
      resolve: {
        countBasket: function () {
          return $scope.countBasket;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ', new Date());
    });
  };


  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) {

    console.log("Basket Update event has been called", event);
    console.log("Basket Update event has been called", data);

    $scope.countBasket = data;

    //$http.get(formattedURL+termId).success(function(data) {
    //  $scope.termModel = data;
    //  console.log($scope.termModel);

      //Control if the basket shows
      //if(!basketService.containsItem(termId) && $scope.termModel.active == true){
      //  $scope.allowAddToBasket = true;
      //  $scope.preventAddToBasket = false;
      //  console.log("display add to basket");
      //}else{
      //  $scope.allowAddToBasket = false;
      //  $scope.preventAddToBasket = true;
      //  console.log("already in basket or obsolete");
      //}

      setupBasketButton($scope.termModel);

    //});
  });


  function setupBasketButton(termModel){
    console.log("setup basket");

      //Control if the basket shows
      if(!basketService.containsItem(termId) && termModel.active == true){
        $scope.allowAddToBasket = true;
        $scope.preventAddToBasket = false;
        console.log("display add to basket");
      }else{
        $scope.allowAddToBasket = false;
        $scope.preventAddToBasket = true;
        console.log("already in basket or obsolete");
      }
  }


});