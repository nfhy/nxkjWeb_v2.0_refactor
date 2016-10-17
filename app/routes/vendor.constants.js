/**=========================================================
 * Module: VendorAssetsConstant.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .constant('VENDOR_ASSETS', {
            // jQuery based and standalone scripts
            scripts: {
              'animate':            ['vendor/animate.css/animate.min.css'],
              'icons':              ['vendor/font-awesome/css/font-awesome.min.css',
                                     'vendor/weather-icons/css/weather-icons.min.css',
                                     'vendor/feather/webfont/feather-webfont/feather.css']
            },
            modules: [
              {name: 'toaster',           files: ['vendor/angularjs-toaster/toaster.js',
                                                  'vendor/angularjs-toaster/toaster.css']},
              {name: 'ngTable',           files: ['vendor/ng-table/dist/ng-table.min.js',
                                                  'vendor/ng-table/dist/ng-table.min.css']},
              {name: 'ngTableExport',     files: ['vendor/ng-table-export/ng-table-export.js']},
              {name: 'ui.calendar',       files: ['vendor/fullcalendar/dist/fullcalendar.min.js',
                                                  'vendor/fullcalendar/dist/fullcalendar.css',
                                                  'vendor/angular-ui-calendar/src/calendar.js']},
              {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                          'vendor/angular-ui-select/dist/select.css']},
              {name: 'vr.directives.slider',      files: ['vendor/venturocket-angular-slider/build/angular-slider.min.js']}
            ]

        });

})();

