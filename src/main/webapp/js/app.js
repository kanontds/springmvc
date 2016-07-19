/**
 * Created by Administrator on 2015/3/1.
 */



requirejs.config({

    baseUrl: 'js/ylapp',
    urlArgs: "dc_=" +  (new Date()).getTime(),
    paths: {//路径配置
        jquery:'../../js/libs/jquery-1.9.1.min',
        jqueryui:'../../js/jqueryplugin/jquery-ui-1.11.4/jquery-ui',
        ztree:'../../js/jqueryplugin/zTree_v3/js/jquery.ztree.all-3.5.min',
        'jquery.dataTable':'http://weipan/wp/datatables/media/js/jquery.dataTables',
        underscore:'../../js/libs/underscore',
        backbone:'../../js/libs/backbone',


        mousewheel:'../../js/jqueryplugin/jquery.mousewheel',
        jscrollpane:'../../js/jqueryplugin/jquery.jscrollpane.min',

        marionette: '../../js/libs/backboneplugin/backbone.marionette',
        paginator:'../../js/libs/backboneplugin/backbone.paginator',
        bootstrap:'../../js/jqueryplugin/bootstrap/js/bootstrap.min',
        fuelux: '../../js/libs/fuelux.min',
        moment: '../../js/libs/moment-with-locales.min',

        backgrid:'../../js/libs/backboneplugin/backgrid',
        backgridselectall:'../../js/libs/backboneplugin/backgrid-ext/backgrid-select-all',
        backgridtextcell:'../../js/libs/backboneplugin/backgrid-ext/backgrid-text-cell',
        backgridpaginator:'../../js/libs/backboneplugin/backgrid-ext/backgrid-paginator'
    },
    shim: {//非AMD规范库如backbone等库的配置,deps是依赖库

        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ["underscore", "jquery"],
            exports: 'Backbone'
        },

        marionette: {
            exports: 'Marionette'
        },
        leanmodal: {
            deps:   ["jquery"]//, "css!/medias/css/dataTable.css"
        },
        'backbone.paginator': {
            deps:   ["underscore", "backbone"]
        },
        backgrid: {
            deps:   ["underscore", "backbone"]
        },
        paginator: {
            deps:   ["underscore", "backbone"]
        },
        backgridtextcell: {
            deps:   ["underscore", "backgrid"]
        },
        backgridpaginator: {
            deps:   ["underscore", "backgrid","backbone","paginator"]
        },
        backgridselectall: {
            deps:   ["backbone", "backgrid", "underscore"]
        },
        bootstrap: { deps: ["jquery"]},
        ztree: { deps: ["jquery"]}
    }

});
require(['jquery','init','Route','underscore','backbone'], function($,init,route,_,Backbone){

    //扩展
    Backbone.YlModel = Backbone.Model.extend({
        set: function(attributes, options) {
            var newAttributes={};
            for(var p in attributes) {
                var _v=attributes[p];
                newAttributes[p]=$.isNumeric(_v)?(_v+''):_v;
            }
            return Backbone.Model.prototype.set.apply(this, [newAttributes,options]);
        }
    });



    init.init();

});
