/**
 * Created by walulu on 2016/3/7.
 */
(function(){
    'use strict';

    angular.module('naut')
        .controller('LoginRegisterController', LoginRegisterController);

    LoginRegisterController.$inject = ['$scope', '$cookieStore', 'httpService'];

    function LoginRegisterController($scope, $cookieStore, httpService) {
        var vm = this;

        vm.userInfo = $cookieStore.get('user_info');
        vm.register = _register;

        if(userInfo) {
          httpService.post('login', userInfo);
        } else {
            $scope.userInfo = {};
        }

        function _register(userInfo) {
            httpService.post('register', userInfo);
        }

        function validateID(id) {

        }
    }

})();