/**=========================================================
 * Module: TablexEditableController
 * xEditable Controller for Tables
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .controller('DeviceListController', DeviceListController);
    /* @ngInject */
    DeviceListController.$inject = ['$scope', 'NgTableParams', '$filter', '$state', 'myHttp', 'localData'];
    function DeviceListController($scope, NgTableParams, $filter, $state, myHttp, localData) {
        var vm = this;
        //mydevice结构
        //{"devIndex":1001,"devName":"1号数据采集仪",
        // "devLocate":"1号农田","devTypeIndex":6,"devPower":"1","devDesc":"设备描述1",
        // ”channelDevList”:[{“devIndex”:100100,”devTypeIndex”:5,”fieldIndex”:1},
        //  {“devIndex”:100101,”devTypeIndex”:5,”fieldIndex”:2},
        //  {“devIndex”:100103,”devTypeIndex”:5,”fieldIndex”:3}]}
        vm.mydevices = [];//设备列表

        vm.userInfo = localData.get('user_info');

        //ngtable设置，加载数据、排序和过滤
        vm.tableParams = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: vm.mydevices.length,
            getData: function (params) {
                var filteredData = params.filter() ?
                    $filter('filter')(vm.mydevices, params.filter()) :
                    data;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;

                params.total(orderedData.length);
                var slicedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return slicedData;
            }
        });

        //获取设备列表，修改、删除、增加后都应该调用该方法并通知ngtable重载
        //{"msg":"webDeviceList","data":{"userName":"zhenglei",”token”:”zhenglei”}}
        function _loadDevices() {
            console.log('loadDevice');
            var data = {'msg' : 'webDeviceList' ,
                'data' : {'userName' : vm.userInfo.username, 'token' : vm.userInfo.token}};
            var promise = myHttp.post(data);
            if(promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }
            function _onsuccess(data) {
                vm.mydevices = data.result;
                localData.set('devices', vm.mydevices);
                vm.tableParams.reload();
            }
        }

        function _editDevice(device) {
            $state.go('app.device.edit' , {deviceIndex : device.deviceIndex});
        }

        //#################################old
        vm.showChannel = function(device) {
            var selected = [];
            if(device.channel) {
                selected = $filter('filter')(vm.channels, {code: device.channel});
            }
            return selected.length ? selected[0].name : '空';
        };
        vm.showType = function(device) {
            var selected = [];
            if(device.type) {
                selected = $filter('filter')(vm.types, {code: device.type});
            }
            return selected.length ? selected[0].name : '空';
        };
        vm.showField = function(device) {
            var selected = [];
            if(device.fields) {
                selected = $filter('filter')(vm.fields, function(inputArray) {
                    var arr = new Array();
                    for (var field in inputArray) {
                        if (devices.fields.indexOf()) {
                            if (device.fields.indexOf(field.code) >= 0) {
                                arr.push(field);
                            }
                        }
                    }
                    return arr;
                });
                var result = '';
                for (var field in selected) {
                    result += ' ' + field.name;
                }
                return result;
            }
            return selected.length ? selected[0].name : '空';
        };
    }

})();
