/**
 * Created by walulu on 2016/4/21.
 */
(function() {
    'use strict';
    angular
        .module('naut')
        .controller('AUserListController', auserListController);
    auserListController.$inject = ['NgTableParams', '$filter', '$state', 'myHttp', 'localData', 'sAlert'];

    function auserListController(NgTableParams, $filter, $state, myHttp, localData, sAlert) {
        var vm = this;
        vm.ausers = [];
        vm.userInfo = localData.get('user_info');
        vm.loadUser = _loadUser;
        vm.addUser = _addUser;
        vm.editUser = _editUser;
        vm.suspendOrResume = _suspendOrResume;
        vm.resetPwd = _resetPwd;
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
            var postData = {'msg':'webUserList',
                'data':{'token':vm.userInfo.token,'userName' : vm.userInfo.username, 'role':2}};
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }
            function _onsuccess(data) {
                vm.ausers = data.result;
                localData.set('ausers', data.result);
                vm.tableParams.reload();
            }
        }


        function _addUser() {
            $state.go('app.auser.edit' , {userName : '-1'});
        }

        function _editUser(auser) {
            $state.go('app.auser.edit' , {userName : auser.userName});
        }

        function _suspendOrResume(auser) {
            var promise;
            if (auser.enable === 0){
                promise = _resume(auser);
            }
            else {
                promise = _suspend(auser);
            }
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }

            //{"msg”:"userEdit",
            // "data":{"token”:”xxxx” ,”cmd”:1,
            // ”detail”:{ “userId”:1,”name”:”zhenglei”,”nickName”:”zhenglei”,”role”:1,”tel”:”13333333”,”recvWarn”:”1”,”enable”:1,fieldList:’1,2'}}}
            //
            function _suspend(auser) {
                // var tmp = angular.copy(auser);
                // tmp.enable = 0;
                auser.enable = 0;
                var postData = {
                    'msg':'userMgr','data':{'token':vm.userInfo.token , 'userName' : vm.userInfo.username, 'cmd':2,
                        'detail': auser }
                };
                return myHttp.post(postData);
            }

            function _resume(auser) {
                // var tmp = angular.copy(auser);
                // tmp.enable = 1;
                auser.enable = 1;
                var postData = {
                    'msg':'userMgr','data':{'token':vm.userInfo.token, 'userName' : vm.userInfo.username, 'cmd':2,
                        'detail': auser }
                };
                return myHttp.post(postData);
            }

            function _onsuccess(data) {
                sAlert.success('操作成功', '');
                //     .then(function() {
                //     _loadUser();
                // });
            }

        }

        function _resetPwd(auser) {
            swal({
                    title: "重置用户密码",
                    text: "重置后，用户密码变为666666",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "重置",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        confirmReset(auser);
                    }
                });
            //{"msg”:"resetPwd",
            // "data":{"token”:”xxxx” ,
            // ”detail”:{ “userId”:1,”name”:”zhenglei”,”nickName”:”zhenglei”,”role”:1,”tel”:”13333333”,”recvWarn”:”1”,”enable”:1,fieldList:’1,2'}}}
            //
            function confirmReset(auser) {
                var postData = {
                    'msg':'resetPwd','data':{'token':vm.userInfo.token , 'userName' : vm.userInfo.username,
                        'detail': auser }
                };
                var promise = myHttp.post(postData);
                if (promise) {
                    myHttp.handlePromise(promise, _onsuccess1);
                }

                function _onsuccess1(data) {
                    swal({
                        title: "重置用户密码成功",
                        text: "用户密码变为666666",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "好的",
                        closeOnConfirm: true
                    });
                }
            }
        }

    }
})();