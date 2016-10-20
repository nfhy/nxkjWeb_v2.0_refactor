/**=========================================================
 * Module: RoutesConfig.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .config(routesConfig);

    routesConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', 'RouteProvider'];
    function routesConfig($locationProvider, $stateProvider, $urlRouterProvider, Route) {

        // use the HTML5 History API
        $locationProvider.html5Mode(false);

        // Default route
        $urlRouterProvider.otherwise('/login/login');

        // Application Routes States
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: Route.base('app.html'),
                resolve: {
                //    _assets: Route.require('icons', 'animate')//, 'screenfull', 'sparklines', 'slimscroll',
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: "app/login/login.html",
                resolve: {
                //    assets: Route.require('icons', 'animate')
                }
            })
            .state('login.login', {
                url: '/login',
                templateUrl: "app/login/login.login.html"
            })
            .state('login.register', {
                url: '/register',
                templateUrl: "app/login/login.register.html"
            })
            .state('login.recover', {
                url: '/recover',
                templateUrl: "app/login/login.recover.html"
            })
            //用户信息
            .state('app.auser', {
                url : '/auser',
                template : '<div ui-view ng-class="app.views.animation"></div>'
            })
            .state('app.auser.list',{
                url : '/list',
                controller : 'AUserListController',
                controllerAs : 'userListCtrl',
                templateUrl : 'app/adminUser/auser.list.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            })
            .state('app.auser.edit',{
                url : '/edit?userName',
                controller : 'AUserEditController',
                controllerAs : 'userEditCtrl',
                templateUrl : 'app/adminUser/auser.edit.html',
                resolve: {
            //        assets: Route.require('ui.select')
                }
            })

            //园地信息
            .state('app.field', {
                url : '/field',
                template : '<div ui-view ng-class="app.views.animation"></div>'
            })
            .state('app.field.list',{
                url : '/list',
                controller : 'FieldListController',
                controllerAs : 'fieldListCtrl',
                templateUrl : 'app/field/field.list.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            })
            .state('app.field.edit',{
                url : '/edit?fieldIndex',
                controller : 'FieldEditController',
                controllerAs : 'fieldEditCtrl',
                templateUrl : 'app/field/field.edit.html'
            })

            //设备信息
            .state('app.dev', {
                url : '/dev',
                template : '<div ui-view ng-class="app.views.animation"></div>'
            })
            .state('app.dev.list',{
                url : '/list',
                controller : 'DevListController',
                controllerAs : 'devListCtrl',
                templateUrl : 'app/dev/dev.list.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            })
            .state('app.dev.edit',{
                url : '/edit?devIndex',
                controller : 'DevEditController',
                controllerAs : 'devEditCtrl',
                templateUrl : 'app/dev/dev.edit.html',
                resolve: {
            //        assets: Route.require('ui.select')
                }
            })
            .state('app.dev.monitor',{
                url : '/monitor',
                controller : 'devMonitorController',
                controllerAs : 'devMonitorCtrl',
                templateUrl : 'app/devMonitor/dev.monitor.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            })
            .state('app.dev.chart',{
                url : '/chart',//?channelDevIndex',
                controller : 'devChartController',
                controllerAs : 'devChartCtrl',
                templateUrl : 'app/devChart/dev.chart.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            })
            .state('app.dev.chartSetting',{
                url : '/chartSetting?channelDevIndex',
                controller : 'devChartSettingController',
                controllerAs : 'chartSettingCtrl',
                templateUrl : 'app/devChart/dev.chart.setting.html',
                resolve: {
            //        assets: Route.require('ngTable', 'ngTableExport')
                }
            });
    }

})();

