/*
 * 样例模板,用于复制
 */
define(function () {
  var mydelete=function(row,datagrid){
    require(['qiangzhen/CommonDelete'],function(cd){
      cd.do({
        url:'qztw/delete/station/'+row.stationid,
        type:'post',
        success:function(){
          datagrid.datagrid('reload');
        }
      })
    })
  }

  var add =function(datagrid){

  }

    var view = function (option, row) {
    }
  var edit = function (record,datagrid) {


    }

    var logout = function (option, row) {
    }

    var module = {
        render: function (local, option) {
            var tb = $(local).find('div[tb]');
          var dg=local.find('.easyui-datagrid-noauto').datagrid({
                url: 'qztw/station?customtag=pagination',
                onLoadSuccess: function (data) {
                    var viewbtns = dg.find('[action=delete]');
                    var editbtns = dg.find('[action=set]');

                    var btns_arr = [viewbtns, editbtns];
                    var rows = data.rows;
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = 0; j < btns_arr.length; j++) {
                            var row = rows[i];
                            (function (index) {
                                $(btns_arr[j][i]).click(function () {
                                    var record = rows[index];
                                    if ($(this).attr("action") == 'delete') {
                                      //mydelete(record,dg);
                                      console.log(record)
                                    } else if ($(this).attr("action") == 'set') {
                                      edit(record,dg);
                                    }
                                });
                            })(i);
                        }

                      //暂时无用处的代码,主要功能是点击链接弹出修改页面
                        (function (index) {
                            local.find('[mylink=workcontent]').eq(index).bind('click', function () {
                              edit(rows[index],dg);
                            })
                        })(i);
                    }
                },
                toolbar: tb,
                striped: true,
              rowStyler: function(index,row){
                  if (row.mystatus=='异常'){
                      return 'background-color:#6293BB;color:red;'; // return inline style
                  }
              }
            });

      tb.find('.easyui-textbox').textbox({
        onChange:function(newValue,oldValue){
           dg.datagrid('reload',{
             intelligentsearch:[
               {name:"stationname",operate:"like",value:"%"+newValue+"%"}
             ]
            });
        }
      })
        }

    };

    return module;
});
