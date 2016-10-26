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
            // SweetAlert.confirm('确定要退出系统吗？', {
            //     title: '',
            //     confirmButtonText: '确认',
            //     cancelButtonText: '取消'
            // })
            //     .then(function(s) {
            //         alert(1);
            //     },
            //     function(e) {
            //         alert(2);
            //     });
            swal({
                title: "",
                text: "确定要登出系统吗",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "登出",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },
                function(isConfirm){
                    if (isConfirm) {
                        localData.flush();
                        $state.go('login.login');
                    } else {
                    }
            });
        };

        // Adjustment on route changes
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            vm.headerMenuCollapsed = true;
        });

    }
    HeaderNavController.$inject = ['$rootScope', 'localData', '$state', 'SweetAlert'];

})();
