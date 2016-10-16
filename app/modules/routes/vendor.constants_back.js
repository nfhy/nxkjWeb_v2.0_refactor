/**=========================================================
 * Module: VendorAssetsConstant.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('naut')
        .constant('http://www.sznxkj.cn/nxkjWeb/bendor_ASSETS', {
            // jQuery based and standalone scripts
            scripts: {
              'animate':            ['http://www.sznxkj.cn/nxkjWeb/bendor/animate.css/animate.min.css'],
              'icons':              ['http://www.sznxkj.cn/nxkjWeb/bendor/font-awesome/css/font-awesome.min.css',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/weather-icons/css/weather-icons.min.css',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/feather/webfont/feather-webfont/feather.css'],
              'sparklines':         ['http://www.sznxkj.cn/nxkjWeb/app/plugins/sparklines/jquery.sparkline.min.js'],
              'slimscroll':         ['http://www.sznxkj.cn/nxkjWeb/bendor/slimscroll/jquery.slimscroll.min.js'],
              'screenfull':         ['http://www.sznxkj.cn/nxkjWeb/bendor/screenfull/dist/screenfull.js'],
              'vectormap':          ['http://www.sznxkj.cn/nxkjWeb/bendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
              'vectormap-maps':      ['http://www.sznxkj.cn/nxkjWeb/bendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
              'loadGoogleMapsJS':   ['http://www.sznxkj.cn/nxkjWeb/app/plugins/gmap/load-google-maps.js'],
              'flot-chart':         ['http://www.sznxkj.cn/nxkjWeb/bendor/flot/jquery.flot.js'],
              'flot-chart-plugins': ['http://www.sznxkj.cn/nxkjWeb/bendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/flot/jquery.flot.resize.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/flot/jquery.flot.pie.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/flot/jquery.flot.time.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/flot/jquery.flot.categories.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/flot-spline/js/jquery.flot.spline.min.js'],
              'jquery-ui':          ['http://www.sznxkj.cn/nxkjWeb/bendor/jquery-ui/jquery-ui.min.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
              'moment' :            ['http://www.sznxkj.cn/nxkjWeb/bendor/moment/min/moment-with-locales.min.js'],
              'gcal':               ['http://www.sznxkj.cn/nxkjWeb/bendor/fullcalendar/dist/gcal.js'],
              'blueimp-gallery':    ['http://www.sznxkj.cn/nxkjWeb/bendor/blueimp-gallery/js/jquery.blueimp-gallery.min.js',
                                     'http://www.sznxkj.cn/nxkjWeb/bendor/blueimp-gallery/css/blueimp-gallery.min.css'],
              'filestyle':          ['http://www.sznxkj.cn/nxkjWeb/bendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
              'nestable':           ['http://www.sznxkj.cn/nxkjWeb/bendor/nestable/jquery.nestable.js']
            },
            // Angular modules scripts (name is module name to be injected)
            modules: [
              {name: 'toaster',           files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angularjs-toaster/toaster.js',
                                                  'http://www.sznxkj.cn/nxkjWeb/bendor/angularjs-toaster/toaster.css']},
              {name: 'ui.knob',           files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-knob/src/angular-knob.js',
                                                  'http://www.sznxkj.cn/nxkjWeb/bendor/jquery-knob/dist/jquery.knob.min.js']},
              {name: 'easypiechart',      files:  ['http://www.sznxkj.cn/nxkjWeb/bendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
              {name: 'angularFileUpload', files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-file-upload/dist/angular-file-upload.min.js']},
              {name: 'ngTable',           files: ['http://www.sznxkj.cn/nxkjWeb/bendor/ng-table/dist/ng-table.min.js',
                                                  'http://www.sznxkj.cn/nxkjWeb/bendor/ng-table/dist/ng-table.min.css']},
              {name: 'ngTableExport',     files: ['http://www.sznxkj.cn/nxkjWeb/bendor/ng-table-export/ng-table-export.js']},
              {name: 'ui.map',            files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-ui-map/ui-map.min.js']},
              {name: 'ui.calendar',       files: ['http://www.sznxkj.cn/nxkjWeb/bendor/fullcalendar/dist/fullcalendar.min.js',
                                                  'http://www.sznxkj.cn/nxkjWeb/bendor/fullcalendar/dist/fullcalendar.css',
                                                  'http://www.sznxkj.cn/nxkjWeb/bendor/angular-ui-calendar/src/calendar.js']},
              {name: 'angularBootstrapNavTree',   files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
              {name: 'htmlSortable',              files: ['http://www.sznxkj.cn/nxkjWeb/bendor/html.sortable/dist/html.sortable.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/html.sortable/dist/html.sortable.angular.js']},
              {name: 'xeditable',                 files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-xeditable/dist/js/xeditable.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/angular-xeditable/dist/css/xeditable.css']},
              {name: 'angularFileUpload',         files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-file-upload/angular-file-upload.js']},
              {name: 'ngImgCrop',                 files: ['http://www.sznxkj.cn/nxkjWeb/bendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
              {name: 'ui.select',                 files: ['http://www.sznxkj.cn/nxkjWeb/bendor/angular-ui-select/dist/select.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/angular-ui-select/dist/select.css']},
              {name: 'summernote',                files: ['http://www.sznxkj.cn/nxkjWeb/bendor/bootstrap/js/tooltip.js',
                                                         'http://www.sznxkj.cn/nxkjWeb/bendor/summernote/dist/summernote.css',
                                                         'http://www.sznxkj.cn/nxkjWeb/bendor/summernote/dist/summernote.js',
                                                         'http://www.sznxkj.cn/nxkjWeb/bendor/angular-summernote/dist/angular-summernote.js'
                                                         ], serie: true, insertBefore: '#mainstyles' },
              {name: 'vr.directives.slider',      files: ['http://www.sznxkj.cn/nxkjWeb/bendor/venturocket-angular-slider/build/angular-slider.min.js']},
              {name: 'datatables',                files: ['http://www.sznxkj.cn/nxkjWeb/bendor/datatables/media/css/jquery.dataTables.min.css',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/datatables/media/js/jquery.dataTables.min.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/angular-datatables/dist/angular-datatables.min.js']},
              {name: 'oitozero.ngSweetAlert',     files: ['http://www.sznxkj.cn/nxkjWeb/bendor/sweetalert/dist/sweetalert.css',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/sweetalert/dist/sweetalert.min.js',
                                                          'http://www.sznxkj.cn/nxkjWeb/bendor/angular-sweetalert/SweetAlert.js']}
            ]

        });

})();

