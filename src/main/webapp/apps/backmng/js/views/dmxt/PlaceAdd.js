/**
 * Created by Administrator on 2014/10/10.
 */

define(function(){
    return {
        render:function(local,option){
            localDataGrid=
                local.find('.easyui-datagrid-noauto').datagrid({
                    url:'auth/proxy?url=http://www.jeasyui.com/demo/main/datagrid2_getdata.php',
                    fit:true,
                    queryParams: {
                        intelligentsp:null,
                        userid:option.queryParams?option.queryParams.userid:null
                    },
                    onLoadSuccess:function(data){
                        localDataGrid.datagrid('resize');
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


            local.find('a').bind('click',function(){
                require(['commonfuncs/popwin/win','text!dmxt/PrePlaceAdd.htm','dmxt/PrePlaceAdd'],
                    function(win,htmfile,jsfile){
                    win.render({
                        title:'新增地名',
                        width:724,
                        html:$(htmfile).eq(0),
                        buttons:[
                            {text:'取消',handler:function(html,parent){
                                parent.trigger('close');
                            }},
                            {text:'保存',handler:function(html,parent){ }}
                        ],
                        renderHtml:function(local,submitbtn,parent){
                            jsfile.render(local,{
                                submitbtn:submitbtn,
                                act:'c',
                                parent:parent,
                                onCreateSuccess:function(data){
                                    parent.trigger('close');
                                    localDataGrid.datagrid('reload');
                                }
                            })
                        }
                    })
                })
            })
        }
    }
})