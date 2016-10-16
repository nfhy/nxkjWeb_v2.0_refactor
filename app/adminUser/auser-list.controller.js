/**
 * Created by walulu on 2016/4/21.
 */
(function() {
    'use strict';
    angular
        .module('naut')
        .controller('AUserListController', auserListController);
    auserListController.$inject = ['$rootScope', 'NgTableParams', '$filter', '$state', 'myHttp', 'localData', 'toaster'];

    function auserListController($rootScope, NgTableParams, $filter, $state, myHttp, localData, toaster) {
        var vm = this;
        vm.ausers = [];
        vm.userInfo = localData.get('user_info');
        if (!vm.userInfo) {
            alert('会话过期，请重新登录...');
            $rootScope.initResolve();
            $state.go('login.login');
            return;
        }
        vm.loadUser = _loadUser;
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.suspendOrResume = _suspendOrResume;

        _loadUser();

        vm.tableParams = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: vm.ausers.length,
            getData: function (params) {
                var filteredData = params.filter() ?
                    $filter('filter')(vm.ausers, params.filter()) :
                    vm.ausers;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    vm.ausers;

                params.total(orderedData.length);
                var slicedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return slicedData;
            }
        });
        //{"msg”:"webUserList",
        // "data":{"resCode":"0","desc":"操作完成",”cmdToken”:”xxxxx”,
        // "result":[{“userId":1,”name”:"admin”,"nickName”:"admin”,”role”:1,”tel":"1333333333”,"recvWarn”:”1”,“enable”:1,"fieldList":[1,2]]}
        function _loadUser() {
            $rootScope.pendPromise('load-users');
            var postData = {'msg':'webUserList',
                'data':{'token':vm.userInfo.token,'userName' : vm.userInfo.username, 'role':2}};
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess, _onerror);
            }
            function _onsuccess(data) {
                vm.ausers = data.result;
                localData.set('ausers', vm.ausers);
                console.log(localData.get('ausers'));
                vm.tableParams.reload();
                $rootScope.pendResolve('load-users', toaster, 'success', '用户列表刷新', '刷新时间：'+ new Date().Format('yyyy-MM-dd hh:mm:ss'));
                _promiseResolve();
            }

            function _onerror(data) {
                $rootScope.pendResolve('load-users', toaster, 'error', '', '用户列表刷新失败：'+ data);
                _promiseResolve();
            }
            function _promiseResolve() {
                $rootScope.pendResolve('login-success',toaster, 'success', '', '欢迎回来:'+vm.userInfo.username);
                $rootScope.pendResolve('finish-edit-user',toaster, 'success', '', '用户维护成功');
            }
        }


        function _addUser() {
            $state.go('app.auser.edit' , {userName : '-1'});
        }

        function _editUser(auser) {
            $state.go('app.auser.edit' , {userName : auser.userName});
        }

        function _suspendOrResume(auser) {
            $rootScope.pendPromise('finish-edit-user');
            var promise;
            if (auser.suspend){
                promise = _resume(auser);
            }
            else {
                promise = _suspend(auser);
            }
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess, _onerror);
            }

            //{"msg”:"userEdit",
            // "data":{"token”:”xxxx” ,”cmd”:1,
            // ”detail”:{ “userId”:1,”name”:”zhenglei”,”nickName”:”zhenglei”,”role”:1,”tel”:”13333333”,”recvWarn”:”1”,”enable”:1,fieldList:’1,2'}}}
            //
            function _suspend(auser) {
                auser.enable = 0;
                var postData = {
                    'msg':'userMgr','data':{'token':vm.userInfo.token , 'userName' : vm.userInfo.username, 'cmd':2,
                        'detail': auser }
                };
                return myHttp.post(postData);
            }

            function _resume(auser) {
                auser.enable = 1;
                var postData = {
                    'msg':'userMgr','data':{'token':vm.userInfo.token ,'cmd':2,
                        'detail': auser }
                };
                return myHttp.post(postData);
            }

            function _onsuccess(data) {
                $rootScope.pendResolve('finish-edit-user',toaster, 'success', '', '用户维护成功');
                _loadUser();
            }

            function _onerror(data) {
                $rootScope.pendResolve('finish-edit-user',toaster, 'error', '', '用户维护失败'+ data);
            }

        }

    }
})();