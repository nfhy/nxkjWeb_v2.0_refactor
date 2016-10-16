/**
 * Created by walulu on 2016/4/8.
 */
(function() {
    'use strict';

    angular
        .module('naut')
        .controller('DevListController', DeviceListController);
    /* @ngInject */
    DeviceListController.$inject = ['$rootScope', 'NgTableParams', '$filter', '$state', 'myHttp', 'localData', 'toaster'];
    function DeviceListController($rootScope, NgTableParams, $filter, $state, myHttp, localData, toaster) {
        var vm = this;
        vm.mydevices = [];//设备列表

        vm.userInfo = localData.get('user_info');
        if (!vm.userInfo) {
            alert('会话过期，请重新登录...');
            $rootScope.initResolve();
            $state.go('login.login');
            return;
        }
        //加载数采仪信息
        vm.loadDevices = _loadDevices;
        vm.editDevice = _editDevice;
        vm.addDevice = _addDevice;
        _loadDevices();
        //ngtable设置，加载数据、排序和过滤
        vm.tableParams = new NgTableParams(
            {
                group : _group
            },
            {
                groupBy : _group,
                getData: function(params) {
                    return vm.mydevices;
                }
            }
        );

        function _group(mydevice) {
            return '数采仪编号:' + mydevice.devIndex + ',(' +( mydevice.devPower?'在线':'离线' ) + ') ' + mydevice.devDesc;
        }

        //获取设备列表，修改、删除、增加后都应该调用该方法并通知ngtable重载
        //{"msg":"webDeviceList","data":{"userName":"zhenglei",”token”:”zhenglei”}}
        function _loadDevices() {
            var data = {'msg' : 'webDeviceList' ,
                'data' : {'userName' : vm.userInfo.username, 'token' : vm.userInfo.token}};
            $rootScope.pendPromise('load-devices');
            var promise = myHttp.post(data);
            if(promise) {
                myHttp.handlePromise(promise, _onsuccess, _onerror);
            }
            function _onsuccess(data) {
                var rawdevices = data.result;
                _handleDevicesData(rawdevices);
                //localData.set('devices', vm.mydevices);
                vm.tableParams.reload();
                $rootScope.pendResolve('load-devices', toaster, 'success', '数采仪列表刷新', '刷新时间:'+new Date().Format('yyyy-MM-dd hh:mm:ss'));
                _promiseResolve();
            }
            function _onerror(data) {
                $rootScope.pendResolve('load-devices', toaster, 'error', '数采仪列表获取失败', '失败原因:'+data);
                _promiseResolve();

            }
        }

        function _promiseResolve() {
            $rootScope.pendResolve('login-success',toaster, 'success', '', '欢迎回来:'+vm.userInfo.username);
            $rootScope.pendResolve('finish-edit-dev',toaster, 'success', '', '设备维护成功');
        }

        function _editDevice(group) {
            var deviceIndex = group.data[0].devIndex;
            $rootScope.pendPromise('init-edit-device');
            $state.go('app.dev.edit' , {devIndex : deviceIndex});
        }

        function _addDevice() {
            $state.go('app.dev.edit', {devIndex : -1});
        }
        //rawdevice结构
        //{"devIndex":1001,"devName":"1号数据采集仪",
        // "devLocate":"1号农田","devTypeIndex":6,"devPower":"1","devDesc":"设备描述1",
        // ”channelDevList”:[{“devIndex”:100100,”devTypeIndex”:5,”fieldIndex”:1},
        //  {“devIndex”:100101,”devTypeIndex”:5,”fieldIndex”:2},
        //  {“devIndex”:100103,”devTypeIndex”:5,”fieldIndex”:3}]}
        function _handleDevicesData(data) {
            vm.mydevices = [];
            for (var i = 0; i <= data.length - 1; i++) {
                var adevice = data[i];
                var devIndex = parseInt(adevice.devIndex);
                var devPower = parseInt(adevice.devPower) == 1;
                var devDesc = adevice.devDesc;
                var channelDevList = adevice.channelDevList;
                for (var j = 0; j <= channelDevList.length - 1; j++) {
                    var mydevice = {
                        'devIndex' : devIndex,
                        'devPower' : devPower,
                        'devDesc' : devDesc
                    }
                    var channel = channelDevList[j];
                    mydevice.channelDevIndex = channel.devIndex;
                    mydevice.channelIndex = parseInt(channel.devIndex)%100+1;
                    mydevice.devTypeIndex = channel.devTypeIndex;
                    var devType = localData.getByCode('devTypeTable', mydevice.devTypeIndex);
                    mydevice.devTypeName = devType?devType.devTypeName : (parseInt(mydevice.devTypeIndex) == 0?'无设备' : '未知设备类型');
                    mydevice.paramName = devType?devType.paramName : '';
                    mydevice.fieldIndex = channel.fieldIndex;
                    var field = localData.getFieldByFieldIndex(mydevice.fieldIndex);
                    mydevice.fieldName = field?field.fieldName:'';
                    vm.mydevices.push(mydevice);
                }
            }
            localData.set('mydevices', vm.mydevices);
            localData.set('rawdevices', data);
        }
    }

})();
