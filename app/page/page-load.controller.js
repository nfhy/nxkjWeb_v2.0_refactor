/**
 * Created by 农夫与花园 on 16/2/22.
 */
(function() {
    'use strict';

    angular.module('naut')
        .controller('pageLoadController', pageLoadController);

    pageLoadController.$inject = ['dataService'];

    function pageLoadController(dataService) {

        var vm = this;
        vm.pageInfo = {
            title : '',
            desc : '',
            inputs : [
                {
                    title : '示例1',
                    type : 'input',
                    require : '',
                    name : 'shili1',
                    placeholder : '随意输入',
                    desc : '随意输入',
                    model : '123'
                }
            ]
        };

        //pageInit();

        /**
         * get pageInfo from server through $http.get
         * @returns {*}
         */
        function loadPageInfo() {
            return dataService.getPageInfo()
                .then(function(data) {
                    vm.pageInfo = data;
                }
            );
        }

        /**
         * do things after get pageInfo
         * @returns {*}
         */
        function pageInit() {
            return loadPageInfo()
                .then(
            );
        }

    }
})();