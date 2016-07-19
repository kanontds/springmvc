/**
 * Created by Administrator on 2015/3/1.
 */

requirejs.config({

    baseUrl: 'apps/backmng/js/views',
    urlArgs: "dc_=0705" +  (new Date()).getTime()

});
require(['init','Route'], function(init,Route){

 Route.init({opt:{}});

});
