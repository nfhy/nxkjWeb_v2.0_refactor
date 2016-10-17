/**
 * Created by wangll on 2016/10/17.
 */
(function() {
    'use strict';
    angular.module('naut')
        .service('sAlert', sAlert);
    sAlert.$inject = ['SweetAlert'];

    function sAlert(SweetAlert) {
        return {
            success: _successAlert,
            error: _errorAlert
        };

        function _successAlert(title, message) {
            return _alert(title, message, 'success');
        }
        function _errorAlert(title, message) {
            return _alert(title, message, 'error')
        }
        function _alert(title, message, type) {
            var promise = SweetAlert.confirm(
                message,
                {
                    title: title,
                    type: type,
                    showCancelButton: false,
                    closeOnConfirm: true,
                    confirmButtonText: '好的'
                }
            );
            return promise;
        }
    }
})();