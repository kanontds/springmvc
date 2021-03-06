/**
 * Created by Administrator on 2014/9/28.
 */


define(['MakeDG','CmPanel'],function(MakeDG,CmPanel){
    return {
        render:function(local,option){

var currentNode=null;

            var localDataGrid,mynode;
            var refreshGrid=function() {
                localDataGrid.datagrid('reload');
            };
            var deleteUserInfo=function(record) {
                $.post('deluserbyid', {id:record.userid}, function (data) {
                    refreshGrid();
                }, 'json');
            };
            var viewUserInfo=function(record){
              CmPanel.open('text!manager/DivisionUserForm.htm','manager/DivisionUserForm',
                         {title:'用户详细信息',ptype:1,
                         record:$.extend({regionid:currentNode.dvcode,
                         totalname:currentNode.totalname},record)});
            }

            var addRole=function(record){
            CmPanel.open('text!manager/Role.htm','manager/RoleForm',
                         {title:'角色信息',ptype:1,
                         record:record});
            }


            var $menu=$('#mm');
            var $mytree=$('#Depttree').tree({
                lines:true,
                url:'getdivisiontree',
                animate:true,
                onClick:function(node){
                    var dvcode=node.id;
                    mynode=node;
                    var len=dvcode.length;
                    //dvcode=dvcode.substr(len-2,len-1)=="00"?dvcode.substr(0,len-2):dvcode;
                    localDataGrid.datagrid('load',{
                        node: dvcode
                    });
                    currentNode=node;
                    $('#user-division-totalname').text('区域：'+node.totalname);
                },onLoadSuccess:function(node, data){
                    if(!mynode){
                        mynode = data[0];
                        $mytree.tree('expand', $mytree.tree('getRoot').target);
                    }
                }
            });

var localDataGrid=MakeDG.make(local.find('.easyui-datagrid-noauto'),
                             {delete:deleteUserInfo,addrole:addRole,view:viewUserInfo},
                             {url:'getuserbyregionid',
                             method:'post',
                    queryParams: {
                        keytext:null,
                        intelligentsp:null
                    },
                              toolbar: local.find('div[tb]')}
                            );
            local.find('.easyui-searchbox').searchbox({
                searcher:function(value){
                    localDataGrid.datagrid('load',{
                        keytext:value,
                        node:mynode.id
                    });
                }
            });

            //添加用户的弹出表单
            local.find('[opt=adduser]').bind('click',function(){
                viewUserInfo();
            })
        }
    }
})
