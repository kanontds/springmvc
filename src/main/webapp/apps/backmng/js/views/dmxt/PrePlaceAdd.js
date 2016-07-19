define([],function(){


    var render=function(local,option){

        localDataGrid=
            local.find('.easyui-datagrid-noauto').datagrid({
                url:'auth/proxy?url=http://www.jeasyui.com/demo/main/datagrid2_getdata.php',
                fit:true,
                queryParams: {
                    intelligentsp:null,
                    userid:option.queryParams?option.queryParams.userid:null
                },
                onLoadSuccess:function(data){
                    var viewbtns=local.find('[action=view]');
                    var deletebtns=local.find('[action=delete]');
                    var grantbtns=local.find('[action=grant]');
                    var btns_arr=[viewbtns,deletebtns,grantbtns];
                    var rows=data.rows;
                    for(var i=0;i<rows.length;i++){
                        for(var j=0;j<btns_arr.length;j++){
                            (function(index){
                                var record=rows[index];
                                $(btns_arr[j][i]).click(function(){


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


    }


    return {
        render:render
    }
})