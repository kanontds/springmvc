define(['underscore'],function(_){
var useDefaultTitleArray=[
'manager/Function',
'manager/DivisionUser',
'manager/Role',
'manager/Grant'
];
  return {

    open:function(moduleHtm,moduleJs,options){
      var mngName='TabMng';
      // ptype,1是弹出框，默认是tab
      if(options && options.ptype==1){
        mngName='WindowMng';
      }

      require([mngName],function(js){
        if(_.filter(useDefaultTitleArray,function(item){return item==moduleJs}).length){
          $.extend(options,{useDefaultTitle:true})
        }
        js.open(moduleHtm,moduleJs,options);
      });


    }
  }
})
