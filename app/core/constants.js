/**=========================================================
 * Module: ColorsConstant.js
 =========================================================*/

(function() {
  'use strict';

  // Same MQ as defined in the css
  angular
      .module('naut')
      .constant('MEDIA_QUERY', {
        'desktopLG': 1200,
        'desktop':   992,
        'tablet':    768,
        'mobile':    480
      })
      .value('cgBusyDefaults',{//cgbusy default
        message:'正在加载数据，请稍候',
        minDuration: 700
      });;

})();
