/**
 * Created by Administrator on 2014/9/28.
 */


define(function(){
    var funObj,$functiontree;
    var refresh=function(){
        if($functiontree.tree('getParent',funObj.target)){
            var parentTarget=$functiontree.tree('getParent',funObj.target).target;
            $functiontree.tree('expand', parentTarget);
            $functiontree.tree('reload', parentTarget);
        }else{
            $functiontree.tree('expand', funObj.target);
        }
    }

    return {
        render:function(local,cb){
          var currentroleid;
          if(cb.params.record){
             currentroleid=cb.params.record.roleid;
          }
          oooo=
            $functiontree=local.find('[opt=functiontree]').tree({
                checkbox:true,
                url:'grantmenutree',
                animate:true,
                dnd:true,
                onBeforeLoad:function(node, param){
                    param.roleid=currentroleid
                }
            });

            function getChecked(){
                var nodes = $functiontree.tree('getChecked', ['checked','indeterminate']);;
                var s = [];
                for(var i=0; i<nodes.length; i++){
                    if(vecIndexOf(s,nodes[i].functionid)<0){
                        s.push(nodes[i].functionid);
                    }
                }
              //layer.load();
                $.ajax(
                    {
                        type: "POST",
                        data: { functionids : s.toString() ,roleid:currentroleid},
                        url:'savegrant',
                        success:function(res){
                            local.trigger('MyClose');
                        },
                      complete:function(){
                        //layer.closeAll('loading');
                      }
                    }
                )
            }




            local.find('a[opt=expandAll]').bind('click',function(){
                $functiontree.tree('expandAll');
            })
            local.find('a[opt=collapseAll]').bind('click',function(){
                $functiontree.tree('collapseAll');
            })
            local.find('[action=save]').bind('click',function(){
                getChecked();
            })

        }
    }
})
