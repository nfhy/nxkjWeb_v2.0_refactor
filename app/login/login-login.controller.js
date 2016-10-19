/**
 * Created by walulu on 2016/3/8.
 */
(function(){
    'use strict';

    angular
        .module('naut')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', 'localData', 'myHttp', 'sAlert'];

    function LoginController($rootScope, $state, localData, myHttp, sAlert) {
        var vm = this;
        vm.userInfo = localData.get('user_info');
        vm.isLoading = false;

        vm.login = _login;
        vm.userInfo = localData.checkUserInfo();
        if(vm.userInfo) {
            _login();
        }else {
            vm.userInfo = {};
        }
        //登录
        function _login() {
            if (vm.isLoading) return;//防止多次点击多次提交
            vm.isLoading = true;
            vm.isError = false;
            vm.errorMsg = '';
            var data = {};
            data.userName = vm.userInfo.username;
            data.passWord = vm.userInfo.password;
            var promise = myHttp.post({'msg' : 'login', 'data' : data});
            myHttp.handlePromise(promise, onsuccess, onerror, onfail);
            //{"resCode":"0","desc":"",”role”:2,”bRecvWarn”:1,”token”:”zhenglei”}}
            function onsuccess(data) {
                var role = data.role;
                var bRecvWarn = data.bRecvWarn;
                var token = data.token;
                vm.userInfo.role = role;
                $rootScope.role = role;
                vm.userInfo.bRecvWarn = bRecvWarn;
                vm.userInfo.token = token;
                //存入本地缓存
                localData.set('user_info', vm.userInfo);
                _loadDevTypeList();
            }
        }

        //{"msg":"webGetDevTypeList",”data”:{“userName”:”zhenglei”,”token”:”zhenglei”}}
        //获取设备类型列表，同时获得设备类型读数理论最大值和最小值
        function _loadDevTypeList() {
            var postData = {'msg' : 'webGetDevTypeList',
                'data' : {'userName': vm.userInfo.username, 'token' : vm.userInfo.token}};
            var promise = myHttp.post(postData);
            if(promise) {
                myHttp.handlePromise(promise, _onsuccess, onerror, onfail);
            }
            //{"resCode":"0","desc":"操作完成",”cmdToken”:”xxxxx”,
            // "devTypeList":
            // [{“devTypeIndex”:1,”devTypeName”:”DO”,”paramName”:”mg/L”,”min”:-40,”max”:100},
            // {“devTypeIndex”:2,”devTypeName”:”PH” ,”paramName”:””,”min”:0,”max”:14}]}
            function _onsuccess(data) {
                var devTypeList = data.devTypeList;
                if (!devTypeList) {
                    vm.isLoading = false;
                    vm.isError = true;
                    vm.errorMsg = '出错了...';
                    return;
                }
                var devTypeTable = {};
                for(var index in devTypeList) {
                    var devTypeInfo = devTypeList[index];
                    var devTypeIndex = ''+devTypeInfo.devTypeIndex;
                    devTypeTable[devTypeIndex] = devTypeInfo;
                }
                localData.set('devTypeTable', devTypeTable);
                vm.isLoading = false;
                sAlert.success('登陆成功','').then(
                    function() {
                        $state.go('app.field.list');
                    }
                );
            }
        }

        function onfail(data) {
            vm.isLoading = false;
            vm.isError = true;
            vm.errorMsg = data;
        }

        function onerror(data) {
            console.log('err:'+data);
            vm.isLoading = false;
            vm.isError = true;
            vm.errorMsg = '出错了...';
        }
    }
})();