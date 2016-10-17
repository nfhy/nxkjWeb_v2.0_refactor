/**
 * Created by Administrator on 2016/4/16.
 */
(function() {
    'use strict';
    angular
        .module('naut')
        .controller('devChartController', devChartController);
    devChartController.$inject = ['myHttp', 'localData', '$q', 'sAlert'];

    function devChartController(myHttp, localData, $q, sAlert) {
        var vm = this;
        vm.userInfo = localData.get('user_info');
        vm.chartSetting = localData.get('chartSetting');
        vm.d = $q.defer();
        vm.busyPromise = vm.d.promise;
        _loadData();
        //获取历史数据
        //{"msg":"webHistory","data":{"devIndex":100100,"startTime":"2016-01-26 16:20:10","endTime":"",”space”:1,”token”:”zhenglei”}}
        function _loadData() {
            var postMsg = {'msg' : 'webHistory',
                'data' : {'devIndex' : vm.chartSetting.devIndex, 'startTime' : vm.chartSetting.startTime, 'endTime' : vm.chartSetting.endTime, 'space' : vm.chartSetting.space, 'token' : vm.userInfo.token}};
            var promise = myHttp.post(postMsg);

            promise.then(function(){vm.d.resolve();});

            if (promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }
        }

        function _onsuccess(data) {
            _handleData(data.result);
        }
        //{"msg":"webHistory","data":{"resCode":"0","desc":"操作完成",”cmdToken”:”xxxxx”,"devIndex":100100,
        // "result":[{"average":10.0 , “min”:9.0,”max”:11.0,"time":"2016-01-26 16:20:00"} space = 2 | 3
        //":[{"val":10.0 ,”warn”:0,"time":"2016-01-26 16:20:00"} space = 1
        var _handleData = function(result) {
            if (!result) {
                sAlert.error('当前设置下没有设备读数', '');
            }
            vm.channelDev = localData.getMyDeviceByDevIndex(vm.chartSetting.devIndex);
            var date = [];
            if (vm.chartSetting.space == '1') {
                var data = [];
                for (var i = 0; i <= result.length-1; i++) {
                    data.push(result[i].val);
                    date.push(result[i].time);
                }
                vm.option = myoption(date, ['读数'], [myseries('读数',0,data)]);
            }
            else {
                var dataMax = [];
                var dataMin = [];
                var dataAve = [];
                for (var j = 0; j <= result.length-1; j++) {
                    dataMax.push(result[j].max);
                    dataMin.push(result[j].min);
                    dataAve.push(result[j].average);
                    date.push(result[j].time);
                }
                vm.option = myoption(date, ['最大值', '最小值', '平均值'], [myseries('最大值', 0, dataMax), myseries('最小值', 1, dataMin), myseries('平均值', 2, dataAve)]);
            }
        };

        function myoption(date, legend, series) {
            return {
                tooltip: {
                    trigger: 'axis'
                },
                title: {
                    left: 'center',
                    text: vm.channelDev.devTypeName
                },
                legend: {
                    x: 'left',
                    data: legend
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 10
                }, {
                    start: 0,
                    end: 10
                }],
                series: series
            };
        }
        function myseries(name,colorIndex, data) {
            var colors = ['rgb(0, 200, 255)', 'rgb(200, 0, 255)', 'rgb(255, 200, 0)'];
            return {
                name:name,
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        color: colors[colorIndex]
                    }
                },
                data: data
            };
        }
    };
})();