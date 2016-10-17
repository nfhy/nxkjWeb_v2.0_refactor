/**=========================================================
 * Module: TablexEditableController
 * xEditable Controller for Tables
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('FieldEditController', FieldEditController);
    /* @ngInject */
    FieldEditController.$inject = ['$rootScope', '$state', 'myHttp', 'localData', '$stateParams', 'sAlert'];
    function FieldEditController($rootScope, $state, myHttp, localData, $stateParams , sAlert) {
        var vm = this;

        vm.userInfo = localData.get('user_info');

        //根据fieldIndex获取field
        var fieldIndex = parseInt($stateParams['fieldIndex']);
        vm.addOrEdit = fieldIndex == '-1' ? 'A' : 'E';
        if (vm.addOrEdit == 'A') {
            vm.field = {};
        }
        else {
            /*
            var fields = localData.get('fields');
            if (fields) {
                for (var index in fields) {
                    var field = fields[index];
                    if (field.fieldIndex == fieldIndex) {
                        vm.field = field;
                        break;
                    }
                }
            }*/
            vm.field = localData.getFieldByFieldIndex(fieldIndex);
            if (!vm.field) {
                sAlert.error('要修改的园地不存在，请返回重新选择','')
                    .then(function() {
                        $state.go('app.field.list');
                    })
                return;
            }
        }

        vm.mysubmit = _submit;

        /*园地信息
         * {"fieldIndex":1,"fieldName":"甲鱼塘1","fieldDesc":"区域1描述",
         "devList":[{"devIndex":100100,"devName":"设备1","devTpeIndex":4,"min":5.0,"max":8.0 },
         {"devIndex":100101, "devName":"设备2","devTypeIndex":4,"min":5.0,"max":8.0 }]}
         * */
        /*设备类型信息
         {“devTypeIndex”:1,”devTypeName”:”DO”,”paramName”:”mg/L”,”min”:-40,”max”:100}
         */
        //修改页面时，处理要显示的设备列表
        vm.devList = vm.field.devList;
        var devTypeTable = localData.get('devTypeTable');
        if (vm.devList) {
            for (var index in vm.devList) {
                var devInfo = vm.devList[index];
                var devTypeIndex = devInfo.devTypeIndex + '';
                var devType = devTypeTable[devTypeIndex];
                if (devType) {
                    devInfo.devTypeName = devType.devTypeName;
                    devInfo.paramName = devType.paramName;
                    devInfo.xmin = devType.min;
                    devInfo.xmax = devType.max;
                }
                vm.devList[index] = devInfo;
            }
        }
        if (!vm.devList) {
            vm.devList = [];
        }
        //1、新增，2、修改 ,修改时，需要带上fieldIndex
        function _submit() {
            var isAdd = vm.addOrEdit == 'A';
            if (isAdd) {
                _addSubmit();
            }
            else {
                _editSubmit();
            }
            //{"msg":"fieldMgr","data":{"token”:”xxxx” ,”cmd”:1,
            // ”detail”:{ ”userName”:”zhenglei”,”fieldIndex”:1,”fieldName”:”区域1”,”fieldDesc”:”区域描述”}}}
            //新增
            function _addSubmit() {
                var data = {};
                data.token = vm.userInfo.token;
                data.userName = vm.userInfo.username;
                data.cmd = 1;
                data.detail = {
                    'userName': vm.userInfo.username,
                    'fieldName': vm.field.fieldName, 'fieldDesc': vm.field.fieldDesc
                };
                var postMsg = {'msg': 'fieldMgr', 'data': data};
                var promise = myHttp.post(postMsg);
                if (promise) {
                    myHttp.handlePromise(promise, _onsuccess, _onerror);
                }
            }

            //{"msg":"webModifyField",
            // ”data”:
            // {"fieldIndex":1,"fieldName":"甲鱼塘1",”fieldDesc”:”区域描述”, ”userName”:”zhenglei”, ”token”:”zhenglei”,
            // "devList":[{"devIndex":10100,”min”:5.5,”max”:8.0 },{"devIndex":10101,”min”:5.5,”max”:8.0 }]}}
            //修改或新增园地
            function _editSubmit() {
                vm.field.userName = vm.userInfo.username;
                vm.field.token = vm.userInfo.token;
                vm.field.devList = vm.devList;
                var postMsg = {'msg': 'webModifyField', 'data': vm.field};
                var promise = myHttp.post(postMsg);
                if (promise) {
                    myHttp.handlePromise(promise, _onsuccess, _onerror);
                }
            }

            function _onsuccess() {
                sAlert.success('保存成功', '').then(function() {
                    $state.go('app.field.list');
                });
            }

            function _onerror(data) {
                sAlert.error('提交失败：' + data, '').then(function() {
                });
            }
        }
    }
})();