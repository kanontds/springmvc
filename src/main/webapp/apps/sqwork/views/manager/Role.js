/**
 * Created by Administrator on 2014/9/28.
 */


define(['MakeDG','CmPanel'],function(MakeDG,CmPanel){
    return {
        render:function(local,option){

            var localDataGrid,mynode;
            var refreshGrid=function() {
                localDataGrid.datagrid('reload');
            };
          var deleteRoleInfo=function(record) {
            $.messager.confirm('确认','您真的要删除此角色吗?',function(r){
              if (r){
                $.post('delrolebyid', {id:record.roleid}, function (data) {
                  refreshGrid();
                }, 'json');
              }
            });
          };

            var viewRoleInfo=function(record){
            CmPanel.open('text!manager/RoleForm.htm','manager/RoleForm',
                         {title:'角色信息',ptype:1,
                         height:200,
                         record:record});

            }
            var grant=function(record){
            CmPanel.open('text!manager/Grant.htm','manager/Grant',
                         {title:'授权',ptype:1,
                         height:400,
                         record:record});
            }

var localDataGrid=MakeDG.make(local.find('.easyui-datagrid-noauto'),
                             {delete:deleteRoleInfo,grant:grant,view:viewRoleInfo},
                             { url:'getrole',
                             method:'post',
                             fit:true,
                    queryParams: {
                        intelligentsp:null,
                        userid:option.queryParams?option.queryParams.userid:null
                    },
                    rowLoadCallBack:function(r,i){
                          if(r.userid) {
                                localDataGrid.datagrid('checkRow', i);
                            }
                    },
                              toolbar: local.find('div[tb]')}
                            );


            local.find('.easyui-searchbox').searchbox({
                searcher:function(value){
                    localDataGrid.datagrid('load',{
                        keytext:value
                    });
                }
            });

            local.find('[opt=addrole]').bind('click',function(){
                viewRoleInfo();
            })

            local.find('[action=save]').bind('click',function(){
                    var checkedrows=localDataGrid.datagrid('getChecked');
                    var ids=""
                    for(var i= 0,len=checkedrows.length;i<len;i++) {
                        if (ids != '') ids += ',';
                        ids += checkedrows[i].roleid;
                    }
                    $.post('saveroleuser', {userid:option.queryParams.userid,roleids:ids}, function (data) {
                        local.trigger('MyClose');
                    }, 'json');
                })
        }
    }
})
