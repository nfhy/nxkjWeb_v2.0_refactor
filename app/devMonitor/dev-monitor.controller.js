/**
 * Created by walulu on 2016/4/15.
 */
(function() {
    'use strict';
    angular
        .module('naut')
        .controller('devMonitorController', devMonitorController);

    devMonitorController.$inject = ['$rootScope', 'NgTableParams', '$filter',
        '$state', 'myHttp', 'localData', '$timeout'];
    function devMonitorController($rootScope, NgTableParams, $filter, $state, myHttp, localData, $timeout) {
        var vm = this;
        vm.looping = false;
        vm.userInfo = localData.get('user_info');
        vm.datasToShow = [];
        //ngtable设置，加载数据、排序和过滤
        vm.tableParams = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: vm.datasToShow.length,
            getData: function (params) {
                var filteredData = params.filter() ?
                    $filter('filter')(vm.datasToShow, params.filter()) :
                    data;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;

                params.total(orderedData.length);
                var slicedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return slicedData;
            }
        });

        vm.showChart = _showChart;

        _loadData();//初始化数据
        _loopLoadData();//每分钟刷新数据

        function _loopLoadData() {
            if (vm.needLoop) {
                $timeout(function () {
                    console.log('flush data');
                    vm.looping = true;
                    _loadData();
                }, 1000 * 10).then(function () {
                    console.log('flushed');
                    _loopLoadData();
                });
            }
        }

        //发送请求，获取实时数据
        //{"msg":"webDevData","data":{"userName":"zhenglei",”token”:”zhenglei”}}
        function _loadData() {
            var postData = {'msg' : 'webDevData', 'data' : {'userName' : vm.userInfo.username, 'token' : vm.userInfo.token} };
            var promise = myHttp.post(postData);
            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }

        }

        function _onsuccess(data) {
            _handleData(data);
            vm.datasToShow = vm.datasToShow||[];
            if (vm.datasToShow.length >= 1)
                vm.tableParams.reload();
            if (vm.looping) {
                vm.looping = false;
            }

        }
        //处理收到的监控数据
        //{"msg":"webDevice",
        // "data":{"resCode":"0","desc":"操作完成",”cmdToken”:”xxxxx”,
        // "result":[
        // {“fieldIndex”:1,
        // ”devList”:[{ ”devIndex”:100100, "val":5.0,”warn”:0,"time":"2016-01-14 15:30:30"}
        // ,{ ”devIndex”:100101,"val":55, ”warn”:1,"time":"2016-01-14 15:30:30"}]}
        //
        // ,{“fieldIndex”:2,”devList”:[{ ”devIndex”:100103,"val":5.0, ”warn”:0,"time":"2016-01-14 15:30:30"},{ ”devIndex”:100104,"val":55, ”warn”:0,"time":"2016-01-14 15:30:30"}]},{“fieldIndex”:3,”devList”:[{ ”devIndex”:100105,"val":5.0, ”warn”:0,"time":"2016-01-14 15:30:30"},{ ”devIndex”:100106,"val":55, ”warn”:0,"time":"2016-01-14 15:30:30"}]},{“fieldIndex”:4,”devList”:[{ ”devIndex”:100107,"val":5.0, ”warn”:0,"time":"2016-01-14 15:30:30"},{ ”devIndex”:100102,"val":55, ”warn”:0,"time":"2016-01-14 15:30:30"}]}]}}
        function _handleData(data) {
            var result = data.result;
            if (result) {
                var datasToShow = [];
                for (var i = 0; i <= result.length - 1; i++) {
                    var fieldResult = result[i];
                    var fieldIndex = fieldResult.fieldIndex;
                    var field = localData.getFieldByFieldIndex(fieldIndex);
                    var devList = fieldResult.devList || [];
                    for (var j = 0; j <= devList.length - 1; j++) {
                        var dataToShow = {};
                        dataToShow.fieldName = field.fieldName;//油箱
                        var devResult = devList[j];
                        var channelDevIndex = devResult.devIndex;
                        var mydevice = localData.getMyDeviceByDevIndex(channelDevIndex);
                        dataToShow.parentDevIndex = mydevice.devIndex;//数采仪编号
                        dataToShow.devIndex = mydevice.channelDevIndex;//设备编号
                        dataToShow.devTypeName = mydevice.devTypeName;//设备类型
                        var val = devResult.val;
                        var paramName = mydevice.paramName;
                        dataToShow.val = val + ' ' + paramName;//设备读数
                        dataToShow.warn = (parseInt(devResult.warn) == 1);//是否报警
                        dataToShow.time = devResult.time;//读数时间

                        datasToShow.push(dataToShow);
                    }
                }
                vm.datasToShow = datasToShow;
            }
        }

        function _showChart(dataToShow) {
            var channelDevIndex = dataToShow.devIndex;
            $state.go('app.dev.chartSetting', {'channelDevIndex' : channelDevIndex});
        }
    }


})();