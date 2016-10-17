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
    function HeaderNavController($rootScope, localData, $state, SweetAlert) {
        var vm = this;
        vm.headerMenuCollapsed = true;

        vm.toggleHeaderMenu = function() {
            vm.headerMenuCollapsed = !vm.headerMenuCollapsed;
        };

        vm.logout = function() {
            SweetAlert.confirm('确定要退出系统吗？', {
                title: '',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            })
                .then(function() {
                    localData.flush();
                    $state.go('login.login');
                });
        };

        // Adjustment on route changes
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            vm.headerMenuCollapsed = true;
        });

    }
    HeaderNavController.$inject = ['$rootScope', 'localData', '$state', 'SweetAlert'];

})();
