/**
 * Created by 农夫与花园 on 16/2/22.
 */
(function() {
    'use strict';

    angular.module('naut')
        .directive('pageInput', pageInput);

    function pageInput() {
        return {
            restrict: 'E',
            priority: 101,
            scope: {myinput: '='},
            templateUrl: 'page/page.input.html',
            link: link,

        }
        function link(scope, element, attr) {
            if(attr.valRequired === 'true'){
                attr.$set('ngRequired', 'true');
            } else {
                attr.$set('ngRequired', 'false');
            }
        }
    }
})();