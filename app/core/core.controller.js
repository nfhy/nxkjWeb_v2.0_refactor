/**=========================================================
 * Module: CoreController.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('CoreController', CoreController);

    /* @ngInject */
    function CoreController($rootScope ) {
        // Get title for each page
        $rootScope.pageTitle = function() {
            return $rootScope.app.name + ' - ' + $rootScope.app.description;
        };

        // Cancel events from templates
        // -----------------------------------
        $rootScope.cancel = function($event){
            $event.preventDefault();
            $event.stopPropagation();
        };

        /*
        //全局promise跟踪器，主要负责控制加载页面的展示和隐藏
        $rootScope.pendingPromises = {};//延时用promise，主要在异步请求中使用
        //开始跟踪延时promise
        $rootScope.pendPromise = function(pendingKey) {
            var promise = $rootScope.promiseTracker.createPromise();
            $rootScope.pendingPromises[pendingKey] = promise;
        }
        //结束跟踪延时promise并弹出提示框
        $rootScope.pendResolve = function(pendingKey,toaster, type, title, text) {
            var promise = $rootScope.pendingPromises[pendingKey];
            if (promise) {
                promise.resolve();
                delete $rootScope.pendingPromises[pendingKey];
                //if (toaster) toaster.pop(type, title, text);
            }
        }
        $rootScope.initResolve = function() {
            for (var key in $rootScope.pendingPromises) {
                $rootScope.pendResolve(key, null, null, '', '');
            }
        }

        $rootScope.promiseTracker = promiseTracker();
        $rootScope.$watch($rootScope.promiseTracker.active, function(isActive) {
            if (isActive) {
                $rootScope.loading = false;
                $rootScope.$broadcast('loadingStart');
            }
            else {
                $rootScope.loading = false;
                $rootScope.$broadcast('loadingEnd');
            }
        });
        */

    }
    CoreController.$inject = ['$rootScope'];

})();
