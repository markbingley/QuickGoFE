var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);


wsService.factory('PreDefinedSlimSets', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/predefinedslims', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
  }]);

wsService.factory('PreDefinedSlimSetDetail', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/predefinedSetTerms/:setId', {setId: '@id'}, {
    query: {method:'GET', isArray:true}
  });
}]);

wsService.factory('termService', ['$http', 'ENV', function($http, ENV){
  return {
      getTerm : function(termId) {
        return $http.get(ENV.apiEndpoint+'/term/' + termId);
      },
      getTerms : function(ids) {
        return $http.get(ENV.apiEndpoint+'/terms', {params: {ids: ids}});
      },
      getStats : function(termId) {
        return $http.get(ENV.apiEndpoint+'/term/' + termId + '/costats');
      },
      getBlacklist : function(termId) {
      return $http.get(ENV.apiEndpoint+'/term/' + termId + '/blacklist');
    }
  }
}]);


wsService.factory('stringService', [function(){
  return {
    getTextareaItemsAsArray : function(str) {
      return _.uniq(str.replace( /\n/g, " " ).split(/[\s,]+/));
    }
  }
}])

wsService.factory('searchService', ['$http', 'ENV', function($http, ENV){
  return {
      findTerms: function(searchTerm, limit, page, facet, filters) {
        return $http.get(ENV.apiEndpoint + '/search/ontology',
          {
            params: {
              query : searchTerm,
              limit : limit,
              page : page ? page : 1,
              facet : facet ? facet : '',
              filterQuery : filters ? filters : ''
            }
          });
      },
      findGeneProducts: function(searchTerm, limit, page, facet, filters) {
        return $http.get(ENV.apiEndpoint + '/search/geneproduct',
          {
            params: {
              query : searchTerm,
              limit : limit,
              page : page ? page : 1,
              facet : facet ? facet : '',
              filterQuery : filters ? filters : ''
            }
          });
      },
      findPublications: function(searchTerm, limit) {
        //TODO
      },
      findAnnotationsForTerm: function(searchTerm) {
        var request = {
          method: 'POST',
          url: ENV.apiEndpoint + '/annotationPostNewNamesNotSpring',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            list: [{
              type: "goID",
              value: searchTerm
            }]
          }
        };
        return $http(request);
      },
      findAnnotationsForECO: function(searchTerm) {
        var request = {
          method: 'POST',
          url: ENV.apiEndpoint + '/annotationPostNewNamesNotSpring',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            list: [{
              type: "ecoID",
              value: searchTerm
            }]
          }
        };
        return $http(request);
      },
      findAnnotationsForProduct: function(searchTerm) {
        var request = {
          method: 'POST',
          url: ENV.apiEndpoint + '/annotationPostNewNamesNotSpring',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            list: [{
              type: "gpID",
              value: searchTerm
            }]
          }
        };
        return $http(request);
      }
  }
}]);

wsService.factory('dbXrefService', ['$http', function($http){
  return {
    getDbXrefs: function() {
      return $http.get('https://s3.amazonaws.com/go-public/metadata/db-xrefs.json', {cache: true});
    },
    getGenericLink: function(name, xrefs) {
      var match = _.find(xrefs, function(xref){
        return xref.database === name || _.contains(xref.synonyms, name);
      });
      return match.generic_urls[0];
    },
    getLinkforId: function(name, id, xrefs) {
      var match = _.find(xrefs, function(xref){
        return xref.database === name || _.contains(xref.synonyms, name);
      });
      return match.entity_types[0].url_syntax.replace('[example_id]', id);
    }
  };
}])

wsService.factory('annotationUpdates', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset', {}, {
    query: {method:'GET', isArray:true, Cache:true}
  });
}]);

wsService.factory('goTermHistory', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset/goTermHistory', {from:'@from', to:'@to', limit:'@limit'}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('taxonConstraints', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/dataset/taxonConstraints', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
}]);

wsService.factory('annotationPostProRules', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/other/annotationPostProRules', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('annotationBlacklist', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset/annotationBlacklist', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('evidencetypes', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/evidencetypes', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('withDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/withdbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('assignDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/assigneddbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('ontologies', ['$resource', 'ENV', function($resource, ENV) {
  return $resource(ENV.apiEndpoint + '/terms/:ontology', {ontology: '@ontology'}, {
    query: {method: 'GET', Cache: true}
  });
}]);

wsService.factory('search', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/search', {query: '@query', format:'JSON'}, {
    query: {method:'GET'}
  });
}]);

//@deprecated
wsService.factory('searchfull', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/searchfull', {text: '@text',format:'JSON', page:'@page', row:'@rows', viewBy:'@viewBy'}, {
    query: {method:'GET'}
  });
}]);
