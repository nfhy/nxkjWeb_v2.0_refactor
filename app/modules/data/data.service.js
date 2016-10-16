/**
 * Created by 农夫与花园 on 16/2/22.
 */
(function() {
    'use strict';

    angular.module('naut')
        .service('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
        var se = this;
        var url = 'http://localhost:3000';
        return {
            getPageInfo : getPageInfo
        }

        function getPageInfo(pageId) {
            return $http.get(url + '/page/' + pageId)
                .then(onSuccess)
                .catch(onError);
        }

        function onSuccess(response) {
            return response.data.results;
        }

        function onError(error) {
            console.log("error");
        }
    }
})();