/**
 * Created by walulu on 2016/4/21.
 */
(function() {
    'use strict';

    angular
        .module('naut')
        .controller('AUserEditController', AuserEditController);
    /* @ngInject */
    AuserEditController.$inject = ['$state', 'myHttp', 'localData', '$stateParams', 'sAlert'];
    function AuserEditController($state, myHttp, localData, $stateParams, sAlert) {
        var vm = this;

        vm.userInfo = localData.get('user_info');

        //根据fieldIndex获取field
        var username = $stateParams['userName'];
        vm.addOrEdit = username == '-1' ? 'A' : 'E';
        if (vm.addOrEdit == 'A') {
            vm.auser = {};
        }
        else {
            vm.auser = localData.getAuserByUsername(username);
            if (!vm.auser) {
                alert('要修改的用户不存在，请返回重新选择');
                $state.go('app.field.list');
                return;
            }
        }
        vm.mysubmit = _submit;
        _initSelect();


        function _initSelect() {
            vm.selectedFields = [];
            vm.fields = localData.get('fields');
            for (var index in vm.auser.fieldList) {
                var fieldIndex = vm.auser.fieldList[index];
                if (!isNaN(fieldIndex)) {
                    var field = localData.getFieldByFieldIndex(fieldIndex);
                    if (field) {
                        vm.selectedFields.push(field);
                    }
                }
            }
        }

        //{"msg”:"userEdit",
        // "data":{"token”:”xxxx” ,”cmd”:1,
        // ”detail”:{ “userId”:1,”name”:”zhenglei”,”nickName”:”zhenglei”,”role”:1,”tel”:”13333333”,”recvWarn”:”1”,”enable”:1,fieldList:’1,2'}}}
        //
        function _submit() {
            vm.auser.fieldList = [];
            for (var index in vm.selectedFields) {
                var field = vm.selectedFields[index];
                vm.auser.fieldList.push(field.fieldIndex);
            }
            if (vm.addOrEdit == 'A') {
                vm.auser.role = 1;
                vm.auser.enable = 1;
                vm.auser.recvWarn = 1;
            }
            var postData = {
                'msg':'userMgr','data':{'token':vm.userInfo.token ,'userName' : vm.userInfo.username, 'cmd' : (vm.addOrEdit == 'A'? 1 : 2),
                    'detail': vm.auser }
            };
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }

            function _onsuccess() {
                sAlert.success('成功保存用户信息', '').then(
                    function() {
                    $state.go('app.auser.list');
                });
            }
        }
    }
})();