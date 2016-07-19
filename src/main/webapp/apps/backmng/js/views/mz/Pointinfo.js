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
          var deletePointinfoInfo=function(record) {
            $.messager.confirm('确认','您真的要删除此采集的信息吗?',function(r){
              if (r){
                $.post('eers/delete/pointinfo/'+record.pointid,{},function(result){
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
           var addPointinfoInfo=function(record){
                require(['commonfuncs/popwin/win','text!mz/PointinfoForm.htm'],
                    function(win,htmfile){
                        win.render({
                          title:'新增采集信息',
                            width:750,
                            height:550,
                            html:$(htmfile).eq(0),
                            buttons:[
                                {text:'取消',handler:function(html,parent){
                                    parent.trigger('close');
                                }},
                                {text:'保存',handler:function(html,parent){ }}
                            ],
                          renderHtml:function(poplocal,submitbtn,parent){
                            var url='eers/pointinfo';
                            if(record){
                              url='eers/update/pointinfo/'+record.pointid;

                              $.get('eers/pointinfo/'+record.pointid,function(data){
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

            var viewPointinfoInfo=function(record){
                require(['commonfuncs/popwin/win','text!mz/PointinfoFormNew.htm'],
                    function(win,htmfile){
                        win.render({
                          title:'采集信息('+record.username+' : '+new Date().pattern('yyyy-MM-dd HH:mm')+')',
                            width:750,
                            height:420,
                            html:$(htmfile).eq(0),
                            buttons22:[
                                {text:'取消',handler:function(html,parent){
                                    parent.trigger('close');
                                }},
                                {text:'保存',handler:function(html,parent){ }}
                            ],
                          renderHtml:function(poplocal,submitbtn,parent){
                            var url='eers/pointinfo';
                            if(record){
                              url='eers/update/pointinfo/'+record.pointid;

                              $.get('eers/pointinfo/'+record.pointid,function(data){
                                poplocal.find('form').form('load', data);//加载数据到表单
                              },'json')

                              require(['mz/PointinfoFormNew'],function(js){
                                js.render(poplocal,record,parent)
                              })

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
                    url:'eers/pointinfo',
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
                                            viewPointinfoInfo(record);
                                        }else if($(this).attr("action")=='delete'){
                                            deletePointinfoInfo(record);
                                        }else if($(this).attr("action")=='edit'){
                                            viewPointinfoInfo(record);
                                        }
                                    });
                                })(i);
                            }

                            //check
                            if(rows[i].pointidxxxx) {
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
                      intelligentsearch:[{name:'address',operate:'like',value:'%'+value+'%'}]
                    });
                }
            });

          local.find('a[opt=addpointinfo]').bind('click',function(){
            addPointinfoInfo();
          })




        }
    }
})
