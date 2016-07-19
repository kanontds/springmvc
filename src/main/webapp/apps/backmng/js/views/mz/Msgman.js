/**
 * Created by wp on 2015年11月29日
 */


define(function(){
    return {
        render:function(local,option){

            var localDataGrid,mynode;
            var refreshGrid=function() {
                localDataGrid.datagrid('reload');
            };
          var deleteMsgmanInfo=function(record) {
            $.messager.confirm('确认','您真的要删除此短信用户的信息吗?',function(r){
              if (r){
                $.post('eers/delete/msgman/'+record.msgmanid,{},function(result){
                  if (result.success){
                    refreshGrid();
                  } else {
                    $.messager.show({       // show error message
                      title: 'Error',
                      msg: '删除失败'
                    });
                  }
                },'json');
              }
            });
          };
            var viewMsgmanInfo=function(record){
                require(['commonfuncs/popwin/win','text!mz/MsgmanForm.htm'],
                    function(win,htmfile){
                        win.render({
                            title:'短信用户信息',
                            width:500,
                            height:200,
                            html:$(htmfile).eq(0),
                            buttons:[
                                {text:'取消',handler:function(html,parent){
                                    parent.trigger('close');
                                }},
                                {text:'保存',handler:function(html,parent){ }}
                            ],
                          renderHtml:function(poplocal,submitbtn,parent){
                            var url='eers/msgman';
                            if(record){
                              url='eers/update/msgman/'+record.msgmanid;
                              $.get('eers/msgman/'+record.msgmanid,function(data){
                                poplocal.find('form').form('load', data);//加载数据到表单
                              },'json')
                            }
                                if(true){
                                    $(submitbtn).bind('click', function () {
                                        poplocal.find('form').form('submit', {
                                          url: url,
                                            onSubmit: function (param) {
                                                var isValid = $(this).form('validate');
                                                if (!isValid) {
                                                    $.messager.progress('close');
                                                }
                                                return isValid;
                                            },
                                            success: function (data) {
                                                var obj = $.evalJSON(data);
                                                if(obj.success) {
                                                    parent.trigger('close');
                                                    refreshGrid();
                                                }
                                            }
                                        })
                                    });
                                }

                            }
                        })
                    })
            }

            localDataGrid=
                local.find('.easyui-datagrid-noauto').datagrid({
                    url:'eers/msgman',
                  fit:true,
                  method:'get',
                  queryParams: {
                    customtag:'pagination'
                    },
                    onLoadSuccess:function(data){
                        var viewbtns=local.find('[action=view]');
                        var deletebtns=local.find('[action=delete]');
                        var editbtns=local.find('[action=edit]');
                        var btns_arr=[viewbtns,deletebtns,editbtns];
                        var rows=data.rows;
                        for(var i=0;i<rows.length;i++){
                            for(var j=0;j<btns_arr.length;j++){
                                (function(index){
                                    var record=rows[index];
                                    $(btns_arr[j][i]).click(function(){

                                        if($(this).attr("action")=='view'){
                                            viewMsgmanInfo(record);
                                        }else if($(this).attr("action")=='delete'){
                                            deleteMsgmanInfo(record);
                                        }else if($(this).attr("action")=='edit'){
                                            viewMsgmanInfo(record);
                                        }
                                    });
                                })(i);
                            }

                            //check
                            if(rows[i].userid) {
                                localDataGrid.datagrid('checkRow', i);
                            }
                        }
                    },
                    striped:true,
                    toolbar:local.find('div[tb]')
                })

            local.find('.easyui-searchbox').searchbox({
                searcher:function(value){
                  localDataGrid.datagrid('load',{
                    customtag:'pagination',
                      intelligentsearch:[{name:'nickname',operate:'like',value:'%'+value+'%'}]
                    });
                }
            });

          local.find('a[opt=addmsgman]').bind('click',function(){
            viewMsgmanInfo();
          })


        }
    }
})
