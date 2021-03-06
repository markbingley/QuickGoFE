'use strict';

/**
 * @ngdoc overview
 * @name quickGoFeApp
 * @description
 * # quickGoFeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('quickGoFeApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'cgBusy',
    'quickGoFeApp.wsService',
    'app.quickGo.filters',
    'quickGoFeApp.BasketModule',
    'quickGoFeApp.HardCodedDataModule',
    'quickGoFeApp.FilteringModule',
    'quickGoFeApp.ServicesModule',
    'quickGoFeApp.errorHandling',
    "ui.bootstrap",
    'duScroll',
    'config'
  ]);

  app.run(function($rootScope, dbXrefService, $window){
    $rootScope.followLinkToGeneric = function(database) {
      dbXrefService.getDbXrefs().then(function(xrefs) {
        $window.open(dbXrefService.getGenericLink(database, xrefs.data));
      });
    }

    $rootScope.followLinkToEntry = function(database, id) {
      dbXrefService.getDbXrefs().then(function(xrefs) {
        $window.open(dbXrefService.getLinkforId(database, id, xrefs.data));
      });
    }
  });


  app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('httpErrorResponseInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'main/start.html',
        controller: 'StartCtrl'
      })
      .when('/annotations', {
        templateUrl: 'annotationsList/annotations.html',
        controller: 'Annotations'
      })
      .when('/webservices', {
        templateUrl: 'nav/webservices.html',
        controller: 'WebServicesCtrl'
      })
      .when('/dataset', {
        templateUrl: 'dataset/dataset.html',
        controller: 'DataSetCtrl'
      })
      .when('/dataset/goTermHistory', {
        templateUrl: 'dataset/goTermHistory.html',
        controller: 'GoTermHistoryCtrl'
      })
      .when('/dataset/taxonConstraints', {
        templateUrl: 'dataset/taxonConstraints.html',
        controller: 'TaxonConstraintsCtrl'
      })
      .when('/dataset/annotationBlacklist', {
        templateUrl: 'dataset/annotationBlacklist.html',
        controller: 'AnnotationBlacklistCtrl'
      })
      .when('/help', {
        templateUrl: 'help/help.html',
        controller: 'HelpCtrl'
      })
      .when('/help/searching', {
        templateUrl: 'help/searching.html',
        controller: 'HelpCtrl'
      })
      .when('/help/slims', {
        templateUrl: 'help/slims.html',
        controller: 'HelpCtrl'
      })
      .when('/help/faq', {
        templateUrl: 'help/faq.html',
        controller: 'HelpCtrl'
      })
      .when('/term/:goId', {
        templateUrl: 'term/term.html',
        controller: 'TermCtrl'
      })
      .when('/slimming', {
        templateUrl: 'slimming/slimming.html',
        controller: 'GOSlimCtrl'
      })
      .when('/terms/P', {
        templateUrl: 'simplelist/ontologyTerms.html',
        controller: 'OntologyTermsCtrl'
      })
      .when('/terms/F', {
        templateUrl: 'simplelist/molecularfunction.html',
        controller: 'MolecularFunctionListCtrl'
      })
      .when('/terms/C', {
        templateUrl: 'simplelist/cellularcomponent.html',
        controller: 'CellularComponentListCtrl'
      })
      .when('/annotations/filter', {
        templateUrl: 'annotationsList/annotationList.html',
        controller: 'BookmarkCtrl'
      })
      .when('/annotationExtensionRelations', {
        templateUrl: 'views/annotationExtensionRelations.html',
        controller: 'AnnotationExtensionRelationsCtrl'
      })
      .when('/feedback', {
        templateUrl: 'nav/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .when('/search/:searchTerm', {
        templateUrl: 'search/search.html',
        controller: 'SearchCtrl'
      })
      .when('/searchterms/:searchTerm', {
        templateUrl: 'searchterms/searchTerms.html',
        controller: 'FacetSearchCtrl'
      })
      .when('/searchproducts/:searchTerm', {
        templateUrl: 'searchproducts/searchProducts.html',
        controller: 'FacetSearchCtrl'
      })
      .when('/other', {
        templateUrl: 'other/other.html',
        controller: 'OtherCtrl'
      })
      .when('/404', {
        templateUrl: 'errors/404.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
