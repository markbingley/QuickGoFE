/**
 * Created by twardell on 07/05/2015.
 */

app.controller('DownloadCtrl', function($scope, $http, $modalInstance, $location, targetDomainAndPort, filteringService,
                                            hardCodedDataService) {

  console.log("download.js");
  $scope.isLoading = 0;
  $scope.selectedLimit=1000;

  $scope.downloadFileFormats=hardCodedDataService.getDownloadFileFormats();
  $scope.selectedFormat = $scope.downloadFileFormats[1] ; //default to gpad

  /**
   * process request and start download
   */
  $scope.submit = function(format,limit) {
    console.log("Download SUBMIT CALLED", format);
    $scope.isLoading = 1;

    //document.location = 'data:Application/octet-stream,' +
    //  encodeURIComponent('blahblah');

    var formattedURL=targetDomainAndPort+'/ws/downloadfiltered?'
    formattedURL=formattedURL+filteringService.createQueryString();
    $scope.isSlim = filteringService.isSlimming();
    if($scope.isSlim) {
      formattedURL = formattedURL + filteringService.createSlimString();
    }

    //Add the limit requested by the user
    formattedURL = formattedURL + '&limit='+ limit;

    //Add requested format to query string --- this prehaps should be in the filtering service,
    //but its only going to be used for download
    formattedURL = formattedURL + '&format='+ format.ext;

    console.log("queryString = ", formattedURL);
    var fileName='download.'+format.ext;

    $http.get(formattedURL).success(function(data) {
      console.log("got the response back ", data);

      downloadFile(fileName, data)

      //Now forward to a URL that is served by the BE the list of result based on the filtering request
      //which of course is supplied as part of the URL
      //$location.path("#/annotations");    //todo - this one?


      $scope.isLoading = 0;

      //Close window
      $scope.close();
    });


  };


    /**
   * Close window
   */
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };

1


  function downloadFile(fileName, data, strMimeType) {
    var D = document;
    var a = D.createElement('a');
    strMimeType = strMimeType || 'application/octet-stream;charset=utf-8';
    var rawFile;

    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], {
        type: strMimeType
      }), fileName);
    }

    //html5 A[download]
    if ('download' in a) {
      var blob = new Blob([data], {
        type: strMimeType
      });
      rawFile = URL.createObjectURL(blob);
      a.setAttribute('download', fileName);
    } else {
      rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(data);
      a.setAttribute('target', '_blank');
    }

    a.href = rawFile;
    a.setAttribute('style', 'display:none;');
    D.body.appendChild(a);
    setTimeout(function() {
      if (a.click) {
        a.click();
        // Workaround for Safari 5
      } else if (document.createEvent) {
        var eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        a.dispatchEvent(eventObj);
      }
      D.body.removeChild(a);

    }, 100);
  }


});
