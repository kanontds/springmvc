/**
 * 完成一个通用的列表功能的一部分,主要是工作是创建第一行上面的按钮
 */
define([],function(){
  //二维的按钮集合
  //dg,要渲染的table元素
  //buttonActions,按钮选择器和对应的回调函数 {delete:function(){},update:function(){}}
  var make2wButtonArray=function(dgParent,buttonActions){
    var btns_arr=[];
    for(var p in buttonActions){
      btns_arr.push(dgParent.find('[action='+p+']'));
    }
    return btns_arr;
  }
  return {
    make:function(dg,buttonActions,options){

      var resultDG= dg.datagrid($.extend({
        rownumbers:true,
        method:'get',
        onLoadSuccess: function (data) {
          var btns_arr = make2wButtonArray(dg.parent(),buttonActions);
          var rows = data.rows;
          for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < btns_arr.length; j++) {
              var row = rows[i];
              (function (index) {
                $(btns_arr[j][i]).click(function () {
                  var record = rows[index];
                  for(var p in buttonActions){
                    if ($(this).attr("action") == p) {
                      buttonActions[p](record,dg);
                      break;
                    }
                  }

                });
              })(i);
            }

            if(options.rowLoadCallBack){
              options.rowLoadCallBack(rows[i],i);
            }
          }
        },
        striped: true
      },options));
      return resultDG;
    }
  }
})
