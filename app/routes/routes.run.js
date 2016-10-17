/**=========================================================
 * Module: RoutesRun
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .run(appRun);
    /* @ngInject */   
    function appRun($rootScope, $window, $state, localData) {

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });

      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          // success here
          // display new view from top
            var userInfo = localData.get('user_info');
            if (userInfo && userInfo.role) {
                $rootScope.role = userInfo.role;
            }
          $window.scrollTo(0, 0);
        });

    }
    appRun.$inject = ['$rootScope', '$window', '$state', 'localData'];

})();

