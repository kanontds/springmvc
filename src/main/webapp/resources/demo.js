$(function(){

var demoId=null;

var edit=function(record,dg){
   console.log(record);
   demoId=record.id;
   $('#demoForm').form('clear').form('load',record);
}
//列表
var dg=$('#dg').datagrid({
                url: 'api/demo',
                onLoadSuccess: function (data) {

                    console.log(data)

                    var viewbtns = dg.find('[action=delete]');
                    var editbtns = dg.find('[action=edit]');

                    console.log(viewbtns.length)
                    var btns_arr = [viewbtns, editbtns];
                    var rows = data.rows;
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = 0; j < btns_arr.length; j++) {
                            var row = rows[i];
                            (function (index) {
                                $(btns_arr[j][i]).click(function () {
                                   console.log(1);
                                    var record = rows[index];
                                    if ($(this).attr("action") == 'delete') {
                                      //mydelete(record,dg);
                                      console.log(record)
                                    } else if ($(this).attr("action") == 'edit') {
                                      console.log(2)
                                      edit(record,dg);
                                    }
                                });
                            })(i);
                        }

                      //暂时无用处的代码,主要功能是点击链接弹出修改页面
                        (function (index) {
                            /*local.find('[mylink=workcontent]').eq(index).bind('click', function () {
                              edit(rows[index],dg);
                            })*/
                        })(i);
                    }
                },
                //toolbar: tb,
                striped: true,
                onClickRow:function(index,row){
                   edit(row);
                },
              rowStyler: function(index,row){
                  if (row.mystatus=='异常'){
                      return 'background-color:#6293BB;color:red;'; // return inline style
                  }
              }
            });

$('#submitBtn').linkbutton({
    iconCls: 'icon-save',
    onClick:function(){
    var url='demo';
    if(demoId){
       url='api/demo/update/'+demoId;
    }
       $('#demoForm').form('submit', {
    url:url,
    onSubmit: function(param){
        if(demoId){
          param.id=demoId;
        }
        console.log('submit');
    },
    success:function(data){
         $.messager.alert('OK','保存成功!');
         dg.datagrid('reload');
    }
});




    }
});

$('#addBtn').linkbutton({
    iconCls: 'icon-add',
    onClick:function(){
    var url='api/demo';
       $('#demoForm').form('submit', {
    url:url,
    onSubmit: function(param){
        console.log('submit');
    },
    success:function(data){
         $.messager.alert('OK','保存成功!');
         dg.datagrid('reload');
    }
});




    }
});

$('#deleteBtn').linkbutton({
iconCls: 'icon-remove',
onClick:function(){
   if(demoId){
      $.post('api/demo/delete/'+demoId,function(){
              dg.datagrid('reload');
              demoId=null;
   $('#demoForm').form('clear');
      })
   }else{
   $.messager.alert('ERROR','请先进行选择');
   }

}
});

    $('#putBtn').linkbutton({
        iconCls: 'icon-save',
        onClick:function(){

            var oo={};$.each($('form').serializeArray(),function(index,item){oo[item.name]=item.value;});
            $.ajax({url:'api/demo/'+demoId,data:oo,type:'put',success:function (resp) {
                $.messager.alert('OK',resp);
            }});

        }
    });

    $('#postUpdateBtn').linkbutton({
        iconCls: 'icon-save',
        onClick:function(){
            var url='api/demo/update/'+demoId;
            $('#demoForm').form('submit', {
                url:url,
                onSubmit: function(param){
                    console.log('submit');
                },
                success:function(data){
                    $.messager.alert('OK','保存成功!');
                    dg.datagrid('reload');
                }
            });
        }
    });

})