/**
 * Created by walulu on 2016/4/15.
 */
(function(){
    'use strict';
    angular
        .module('naut')
        .controller('devChartSettingController', devChartSettingController);

    devChartSettingController.$inject = ['$rootScope', '$stateParams', 'localData', '$state'];

    function devChartSettingController($rootScope, $stateParams, localData, $state) {
        var vm = this;

        vm.userInfo = localData.get('user_info');
        if (!vm.userInfo) {
            alert('会话过期，请重新登录...');
            $state.go('login.login');
            return;
        }
        vm.channelDevIndex = parseInt($stateParams['channelDevIndex']);
        vm.space = '';
        vm.dt1str = new Date().Format('yyyy-MM-dd hh:mm:ss');
        vm.dt2str = new Date().Format('yyyy-MM-dd hh:mm:ss');
        vm.settingMsgStr = '';
        vm.generateChart = function() {
            var chartSetting = {
                'devIndex' : vm.channelDevIndex,
                'startTime' : vm.dt1str,
                'endTime' : vm.dt2str,
                'space' : vm.space
            }
            localData.set('chartSetting', chartSetting);
            $rootScope.pendPromise('generate-chart');
            $state.go('app.dev.chart');
        }
        //space
        vm.spaceChange = function() {
            if (vm.space == '1') {
                vm.spaceMsg = '数据采样精确到每分钟，显示每分钟监测数据，选择起始时间即可生成折线图';
            }
            else if (vm.space == '2') {
                vm.spaceMsg = '数据采样精确到小时，显示每小时的最大值、最小值和平均值数据,选择起始时间和截止时间即可生成折线图';
            }
            else if (vm.space == '3') {
                vm.spaceMsg = '数据采样精确到天，显示每天最大值、最小值和平均值数据，选择起始时间和截止时间即可生成折线图';
            }
            vm.settingMsg();
        }
        //date picker
        vm.today = function() {
            vm.dt1 = new Date();
            vm.dt2 = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt1 = null;
        };
        vm.open1 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened1 = true;
        };
        vm.open2 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened2 = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.initDate = new Date();
        vm.formats = ['yyyy-MM-dd', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];

        vm.dt1Change = function () {
            vm.dt1.setHours(vm.mytime1.getHours());
            vm.dt1.setMinutes(vm.mytime1.getMinutes());
            vm.dt1.setSeconds(vm.mytime1.getSeconds());
            vm.dt1str = vm.dt1.Format('yyyy-MM-dd hh:mm:ss');
            vm.settingMsg();
        }
        vm.dt2Change = function () {
            vm.dt2.setHours(vm.mytime2.getHours());
            vm.dt2.setMinutes(vm.mytime2.getMinutes());
            vm.dt2.setSeconds(vm.mytime2.getSeconds());
            vm.dt2str = vm.dt2.Format('yyyy-MM-dd hh:mm:ss');
            vm.settingMsg();
        }
        // Timepicker
        // -----------------------------------
        vm.mytime1 = new Date();
        vm.mytime2 = new Date();

        vm.hstep = 1;
        vm.mstep = 15;
        vm.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        vm.ismeridian = true;
        vm.toggleMode = function() {
            vm.ismeridian = ! vm.ismeridian;
        };
        vm.time1Change = function () {
            if (!vm.dt1) return;
            vm.dt1.setHours(vm.mytime1.getHours());
            vm.dt1.setMinutes(vm.mytime1.getMinutes());
            vm.dt1.setSeconds(vm.mytime1.getSeconds());
            vm.dt1str = vm.dt1.Format('yyyy-MM-dd hh:mm:ss');
            vm.settingMsg();
        };
        vm.time2Change = function () {
            if (!vm.dt2) return;
            vm.dt2.setHours(vm.mytime2.getHours());
            vm.dt2.setMinutes(vm.mytime2.getMinutes());
            vm.dt2.setSeconds(vm.mytime2.getSeconds());
            vm.dt2str = vm.dt2.Format('yyyy-MM-dd hh:mm:ss');
            vm.settingMsg();
        };

        vm.settingMsg = function() {
            var msg = '';
            if (vm.space) {
                if (vm.space == '1') {
                    msg = '数据采样精确到分钟，显示设备每分钟读数.';
                    if (vm.dt1str) {
                        msg += '采样时间开始于' + vm.dt1str;
                    }
                }
                else if (vm.space == '2') {
                    msg = '数据采样精确到小时，显示设备每小时读数的最大值、最小值和平均值.';
                    if (vm.dt1str && vm.dt2str) {
                        msg +='采样时间从 ' + vm.dt1str + ' 到 ' + vm.dt2str;
                    }
                }
                else if (vm.space == '3') {
                    msg = '数据采样精确到天，显示设备每天读数的最大值、最小值和平均值.';
                    if (vm.dt1str && vm.dt2str) {
                        msg += '采样时间从 ' + vm.dt1str + ' 到 ' + vm.dt2str;
                    }
                }
            }
            vm.settingMsgStr = msg;
        }
    }

})();
