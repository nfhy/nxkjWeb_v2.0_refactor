/**=========================================================
 * Module: TablexEditableController
 * xEditable Controller for Tables
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('DevEditController', DeviceEditController);
    /* @ngInject */
    DeviceEditController.$inject = ['$rootScope', '$state', 'myHttp', 'localData', '$stateParams', 'sAlert'];
    function DeviceEditController($rootScope, $state, myHttp, localData, $stateParams, sAlert) {
        var vm = this;
        vm.dev = {};
        vm.userInfo = localData.get('user_info');
        var devIndex = parseInt($stateParams['devIndex']);
        vm.addOrEdit = devIndex == -1?'A':'E';
        if (vm.addOrEdit == 'A') {
            vm.rawdevice = {};
        }
        else {
            vm.rawdevice = localData.getRawdeviceByDevIndex(devIndex);
            if (!vm.rawdevice) {
                alert('要修改的数采仪不存在，请返回重新选择');
                $state.go('app.dev.list');
                return;
            }
            _handleData();
        }

        vm.mysubmit = _submit;

        ////rawdevice结构
        //{"devIndex":1001,"devName":"1号数据采集仪",
        // "devLocate":"1号农田","devTypeIndex":6,"devPower":"1","devDesc":"设备描述1",
        // ”channelDevList”:[{“devIndex”:100100,”devTypeIndex”:5,”fieldIndex”:1},
        //  {“devIndex”:100101,”devTypeIndex”:5,”fieldIndex”:2},
        //  {“devIndex”:100103,”devTypeIndex”:5,”fieldIndex”:3}]}
        //需要处理的是channelDevList部分，补全为8个通道设备，无效设备devTypeIndex置0
        function _handleData() {
            var rawdevice = vm.rawdevice;
            var devIndex = parseInt(rawdevice.devIndex);
            var fullChannelDevList = [];
            var channelDevList = rawdevice.channelDevList;
            for (var i = 0; i <= 7; i++) {
                var channelIndex = devIndex*100 + i;
                var found = false;
                for (var j= 0; channelDevList&&(j <= channelDevList.length - 1); j++) {
                    var channelDev = channelDevList[j];
                    if (parseInt(channelDev.devIndex) == channelIndex) {
                        channelDev.rawDevIndex = channelDev.devIndex;
                        channelDev.devIndex = i;
                        channelDev.selectedField = localData.getFieldByFieldIndex(channelDev.fieldIndex);
                        channelDev.selectedDevType = localData.getByCode('devTypeTable', channelDev.devTypeIndex);
                        fullChannelDevList.push(channelDev);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    fullChannelDevList.push({'devIndex':i,'devTypeIndex':0,'fieldIndex':0});
                }
            }
            rawdevice.channelDevList = fullChannelDevList;
            vm.rawdevice = rawdevice;
            _prepareForSelect();
        }

        function _prepareForSelect() {
            vm.fields = localData.get('fields');
            var devTypeTable = localData.get('devTypeTable');
            var devTypes = [];
            for (var devTypeIndex in devTypeTable) {
                if (parseInt(devTypeIndex) == 4) continue;
                devTypes.push(devTypeTable[devTypeIndex]);
            }
            vm.devTypes = devTypes;
        }

        function _submit() {
            if (vm.addOrEdit == 'A') {
                _addSubmit();
            }
            else {
                _editSubmit();
            }
        }

        function _addSubmit() {
            var dev = vm.rawdevice;
            var detail = {
                'userName' : vm.userInfo.username,
                'devIndex' : dev.devIndex,
                'devName' : dev.devName,
                'devTypeIndex' : dev.devTypeIndex,
                'devDesc' : dev.devDesc,
                'devLocate' : dev.devLocate
            }
            var postData = {'msg' : 'devMgr', 'data' : {'token' : vm.userInfo.token,'userName' : vm.userInfo.username, 'cmd' : 1, 'detail' : detail}};
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }
        }
        //{"msg":"devMgr",
        // "data":{"token”:”xxxx” ,”cmd”:1,
        // ”detail”:{ ”userName”:”zhenglei”,”devIndex”:101,”devName”:”设备1”,”devTypeIndex”:2,”devDesc”:”设备描述”,”devLocate”:”位置信息”,
        // ”channelDevList”:[{“devIndex”: 0,”devTypeIndex”:2,”devName”:”PH检测”,”fieldIndex”:1, ”min”:5.5,”max”:8.0},
        // {“devIndex”: 1,”devTypeIndex”:3, ”devName”:”PH检测”,”fieldIndex”:1, ”min”:5.5,”max”:8.0}]}}}

        function _editSubmit() {
            var dev = vm.rawdevice;
            var detail = {
                'userName' : vm.userInfo.username,
                'devIndex' : dev.devIndex,
                'devName' : dev.devName,
                'devTypeIndex' : dev.devTypeIndex,
                'devDesc' : dev.devDesc,
                'devLocate' : dev.devLocate
            }
            var channelDevList = dev.channelDevList;
            var channelDevListToPost = [];
            for (var i = 0; i <= channelDevList.length - 1; i++) {
                var channelDev = channelDevList[i];
                if (channelDev.selectedDevType && channelDev.selectedField) {
                    channelDev.devTypeIndex = channelDev.selectedDevType.devTypeIndex;
                    channelDev.fieldIndex = channelDev.selectedField.fieldIndex;
                    channelDev.devName = channelDev.selectedDevType.devTypeName + '.' + i;
                    delete channelDev.selectedDevType;
                    delete channelDev.selectedField;
                    delete channelDev.rawDevIndex;
                    channelDevListToPost.push(channelDev);
                }
            }
            detail.channelDevList = channelDevListToPost;
            var postData = {'msg' : 'devMgr', 'data' : {'token' : vm.userInfo.token,'userName' : vm.userInfo.username, 'cmd' : 2, 'detail' : detail}};
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess, _onerror);
            }
        }

        function _onsuccess() {
            sAlert.success('保存成功', '').then(function() {
                $state.go('app.dev.list');
            });
        }
    }
})();
