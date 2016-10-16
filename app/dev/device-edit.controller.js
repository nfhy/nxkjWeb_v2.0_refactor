/**=========================================================
 * Module: TablexEditableController
 * xEditable Controller for Tables
 =========================================================*/

(function() {
  'use strict';

  angular
      .module('naut')
      .controller('DeviceEditController', DeviceEditController);
  /* @ngInject */
  DeviceEditController.$inject = ['$filter', '$http', '$q', 'localData'];
  function DeviceEditController($filter, $http, $q, localData) {
    var vm = this;
    vm.device = {};
    vm.device.filedIndex = localData.get('device.edit.index');
    vm.channels = [
      {
        code : 'A0',
        name : 'A0'
      },
      {
        code : 'A1',
        name : 'A1'
      },
      {
        code : 'A2',
        name : 'A2'
      },
      {
        code : 'A3',
        name : 'A3'
      },
      {
        code : 'A4',
        name : 'A4'
      },
      {
        code : 'A5',
        name : 'A5'
      },
      {
        code : 'A6',
        name : 'A6'
      },
      {
        code : 'A7',
        name : 'A7'
      }
    ];
    vm.fields = [
      {
        code : '1',
        name : '1号园地'
      },
      {
        code : '2',
        name : '2号园地'
      },
      {
        code : '3',
        name : '3号园地'
      }
    ];
    vm.types = [
      {
        code : '1',
        name : 'PH值'
      },
      {
        code : '2',
        name : '溶解氧'
      },
      {
        code : '3',
        name : '温度'
      }
    ];
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
