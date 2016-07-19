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
          var deleteVoiceinfoInfo=function(record) {
            $.messager.confirm('确认','您真的要删除此语音的信息吗?',function(r){
              if (r){
                $.post('eers/update/voiceinfo/'+record.voiceid,{status:-1},function(result){
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
          var playVoiceinfoInfo=function(record) {
            local.find('audio').attr('src','eers/'+record.voicepath).get(0).play();
          };


            localDataGrid=
                local.find('.easyui-datagrid-noauto').datagrid({
                    url:'eers/voiceinfo',
                  fit:true,
                  method:'get',
                  queryParams: {
                    customtag:'pagination'
                    },
                    onLoadSuccess:function(data){
                        var viewbtns=local.find('[action=view]');
                        var deletebtns=local.find('[action=delete]');
                        var playbtns=local.find('[action=play]');
                        var btns_arr=[viewbtns,deletebtns,playbtns];
                        var rows=data.rows;
                        for(var i=0;i<rows.length;i++){
                            for(var j=0;j<btns_arr.length;j++){
                                (function(index){
                                    var record=rows[index];
                                    $(btns_arr[j][i]).click(function(){

                                        if($(this).attr("action")=='view'){
                                            //viewVoiceinfoInfo(record);
                                        }else if($(this).attr("action")=='delete'){
                                            deleteVoiceinfoInfo(record);
                                        }else if($(this).attr("action")=='play'){
                                            playVoiceinfoInfo(record);
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
                      intelligentsearch:[{name:'address',operate:'like',value:'%'+value+'%'}]
                    });
                }
            });

          local.find('a[opt=addvoiceinfo]').bind('click',function(){
            viewVoiceinfoInfo();
          })


        }
    }
})
