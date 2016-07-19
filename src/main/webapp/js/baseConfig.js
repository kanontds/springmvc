baseConfig={
  paths: {//路径配置
    jquery:'js/libs/jquery-1.9.1.min',
    jqueryui:'js/jqueryplugin/jquery-ui-1.11.4/jquery-ui',
    ztree:'js/jqueryplugin/zTree_v3/js/jquery.ztree.all-3.5.min',
    'jquery.dataTable':'http://weipan/wp/datatables/media/js/jquery.dataTables',
    jeasyui:'http://120.55.65.150/wp/jquery-easyui-1.4.5/jquery.easyui.min',
    jeasyui_zh_CN:'http://120.55.65.150/wp/jquery-easyui-1.4.5/locale/easyui-lang-zh_CN',
    underscore:'js/libs/underscore',
    backbone:'js/libs/backbone',
    localStorage:'http://backbonejs.org/examples/backbone.localStorage',
    text:'js/libs/text',


    mousewheel:'js/jqueryplugin/jquery.mousewheel',
    jscrollpane:'js/jqueryplugin/jquery.jscrollpane.min',

    'backbone.wreqr':'js/libs/backboneplugin/backbone.wreqr',
    'backbone.babysitter':'js/libs/backboneplugin/backbone.babysitter',
    marionette: 'js/libs/backboneplugin/backbone.marionette',
    paginator:'js/libs/backboneplugin/backbone.paginator',
    bootstrap:'js/jqueryplugin/bootstrap/js/bootstrap.min',
    fuelux: 'js/libs/fuelux.min',
    moment: 'js/libs/moment-with-locales.min',

    'backbone.mutators':'js/libs/backboneplugin/backbone.mutators',
    backgrid:'js/libs/backboneplugin/backgrid',
    backgridselectall:'js/libs/backboneplugin/backgrid-ext/backgrid-select-all',
    backgridtextcell:'js/libs/backboneplugin/backgrid-ext/backgrid-text-cell',
    backgridpaginator:'js/libs/backboneplugin/backgrid-ext/backgrid-paginator',

    jqueryLayout:'js/libs/jquery.layout-latest',
    wdatepicker:'js/libs/My97DatePicker/WdatePicker',

    cj:'apps/cj',
    Iconfig:'apps/common/Iconfig',

    d3:'js/libs/d3.v3.min',
    hzlx:'apps/hzlx/Hzlx',
    hzlxTpl:'apps/hzlx/Hzlx-tpl.htm',
    hzlxblank:'apps/hzlx/blank.htm',
    poptpl:'apps/_01/ylwgt/popwin/win2.htm',
    highcharts:'js/libs/highchart',
    highcharts_data:'js/libs/data',
    highcharts_exporting:'js/libs/exporting',
    highcharts_drilldown:'js/libs/drilldown',
    highcharts_stock:'js/libs/stock'
  },
  shim: {//非AMD规范库如backbone等库的配置,deps是依赖库

    jqueryLayout:{
      deps: ["jquery"]
    },
    /*
     这样子是没有用的
     如果打算同时使用easyui,backbone,还是修改一下backbone的代码
     
     */
    jeasyui:{
      deps: ["jquery"]
    },
    jeasyui_zh_CN:{
      deps: ["jquery","jeasyui"]
    },

    cj:{
      deps: ["jquery"],
      exports: 'cj'
    },

    highcharts: {
      deps: ['jquery'],
      exports: 'Highcharts'
    },
    highcharts_stock: {
      deps: ['jquery']
      
    },
    hzlx:{
      deps: ["underscore", "jquery","backbone","backbone.mutators","paginator","marionette","backgrid",
      "ztree","backgridpaginator","bootstrap"],
      exports:'Hzlx'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore"],//deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },

    marionette: {
      deps:["backbone"],
      exports: 'Marionette'
    },
    leanmodal: {
      deps:   ["jquery"]//, "css!/medias/css/dataTable.css"
    },
    'backbone.paginator': {
      deps:   ["underscore", "backbone"]
    },
    'backbone.mutators': {
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

}

