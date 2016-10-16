/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('HeaderNavController', HeaderNavController);
    /* @ngInject */
    function HeaderNavController($rootScope, localData, $state) {
        var vm = this;
        vm.headerMenuCollapsed = true;

        vm.toggleHeaderMenu = function() {
            vm.headerMenuCollapsed = !vm.headerMenuCollapsed;
        };

        vm.logout = function() {
            localData.flush();
            $state.go('login.login');
        }

        // Adjustment on route changes
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            vm.headerMenuCollapsed = true;
        });

    }
    HeaderNavController.$inject = ['$rootScope', 'localData', '$state'];

})();
