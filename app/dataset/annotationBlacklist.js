/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, $modal, basketService, term, annotationBlacklist) {

  $scope.annotationBlacklist ={};
  $scope.myPromise = annotationBlacklist.query({});
  $scope.isLoading = true;

  $scope.myPromise.$promise.then(function (data) {
    $scope.annotationBlacklist = data;
    $scope.isLoading = false;

  });


  /**
   *  Basket Functionality -------------------------------------------------------------------------------------------/
   */

  /**
   * Load basket quantity on page load.
   */

  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;

  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });

  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'basket/basketModal.html',
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
      console.log('Modal dismissed at: ' + new Date());
    });
  };



  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId){

    $scope.isLoading = true;

    //Look up the full termInformation to add it to the basket
    term.query({termId : termId}, function(termData){

      var savedTermId = termData.termId;
      var savedName = termData.name;
      var basketItem = {termId: savedTermId, name: savedName};

      basketService.addBasketItem(basketItem);

      //Tell all listeners the number of basket items needs updating
      $scope.$emit('basketUpdate', basketService.basketQuantity());

      //reload basketItems list
      $scope.countBasket = basketService.basketQuantity();
      $scope.isLoading = false;

    });

  };

});

