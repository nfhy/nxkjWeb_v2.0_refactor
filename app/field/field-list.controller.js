/**
 * Created by walulu on 2016/4/8.
 */
(function() {
    'use strict';

    angular
        .module('naut')
        .controller('FieldListController', FieldListController);
    /* @ngInject */
    FieldListController.$inject = ['$rootScope', '$scope', 'NgTableParams', '$filter', '$state', 'myHttp', 'localData'];
    function FieldListController($rootScope, $scope, NgTableParams, $filter, $state, myHttp, localData) {
        var vm = this;

        vm.userInfo = localData.get('user_info');
        vm.fields = [];
        //start
        /*
        vm.fields = [
            {"fieldIndex":1,"fieldName":"甲鱼塘1","fieldDesc":"区域1描述",
                "devList":[{"devIndex":100100,"devName":"设备1","devTpeIndex":4,"min":5.0,"max":8.0 },
                {"devIndex":100101, "devName":"设备2","devTypeIndex":4,"min":5.0,"max":8.0 }]}
                ,{"fieldIndex":2,"fieldName":"甲鱼塘2","fieldDesc":"区域2描述","devList":[{"devIndex":100102, "devName":"设备3","devTpeIndex":4,"min":5.0,"max":8.0 },{"devIndex":100103, "devName":"设备4","devTypeIndex":4,"min":5.0,"max":8.0 }]},{"fieldIndex":3,"fieldName":"甲鱼塘3","fieldDesc":"区域3描述","devList":[{"devIndex":100104, "devName":"设备5","devTpeIndex":4,"min":5.0,"max":8.0 },{"devIndex":100105, "devName":"设备6","devTypeIndex":4,"min":5.0,"max":8.0 }]}]
        ;
        localData.set('fields', vm.fields);*/
        //end
        vm.addField = _addField;
        vm.editField = _editField;
        vm.loadFields = _loadFileds;

        //数据初始化
        _loadFileds();

        //接受重载数据消息
        $scope.$on('reloadField', _loadFileds);

        //ngtable设置，加载数据、排序和过滤
        vm.tableParams = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: vm.fields.length,
            getData: function (params) {
                var filteredData = params.filter() ?
                    $filter('filter')(vm.fields, params.filter()) :
                    data;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;

                params.total(orderedData.length);
                var slicedData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return slicedData;
            }
        });

        //获取区域列表，修改、删除、增加后都应该调用该方法并通知ngtable重载
        //{"msg":"webField","data":{"fieldIndex":0,”userName”:”zhenglei” ,”token”:”zhenglei”}}
        function _loadFileds() {
            /*var promise = $rootScope.promiseTracker.createPromise();
            $rootScope.pendingPromises['loadFields'] = promise;*/
            var data = {'msg' : 'webField' ,
                'data' : {'fieldIndex' : 0, 'userName' : vm.userInfo.username, 'token' : vm.userInfo.token}};
            var promise = myHttp.post(data);
            if(promise) {
                myHttp.handlePromise(promise, _onsuccess);
            }
            function _onsuccess(data) {
                vm.fields = data.result;
                localData.set('fields', vm.fields);
                vm.tableParams.reload();
            }
        }

        //跳转修改油箱
        function _editField(field) {
            $state.go('app.field.edit' , {fieldIndex : field.fieldIndex});
        }

        //跳转新增油箱
        function _addField() {
            $state.go('app.field.edit' , {fieldIndex : -1});
        }

    }
})();
