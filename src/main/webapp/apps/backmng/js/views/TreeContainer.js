/**
 * Created by Administrator on 2015/3/1.
 */
define(['Route','Tabs'],function(Route,Tabs){



/*左侧菜单为多个菜单但是只显示其中一个，菜单类型目前统一为树，以后打算可以为其他非树类型
* 多个菜单在一个容器中
* */

    var $TreeContainer=$('#TreeContainer');
    $TreeContainer.bind('treeclick',function(e,params){
        hisnav("task/"+params.parent+"/"+params.functionid)
    })

    function filter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i=0, l=childNodes.length; i<l; i++) {
            childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        }
        return childNodes;
    }

  var localformat=
        function (node) {
                var htmlfile, jsfile;
                var nodelocaltion = node.location;
                if (nodelocaltion) {
                    var widget = nodelocaltion.replace(/\./g, '/');
                    htmlfile = 'text!' + widget + '.htm';
                    jsfile = widget;
                }
                var title = node.text;
                return $.extend({}, node, {
                    htmfile: htmlfile,
                    jsfile: jsfile,
                    title: title,
                    location: nodelocaltion,
                    functionid: node.functionid
                })
            }


  function zTreeOnClick(event, treeId, treeNode,p) {

                        require(['Tabs'], function (js) {
                        //js.add(p, c);

                          var c=treeNode.functionid;
                        js.currentHeader('#task/businessmenu/l');
                        var option = {jsfile: 'mz/testA', htmfile: 'text!mz/testA.htm', title: 'AAAA'}
                        var node = js.getconf(c);


                          console.log(node);
                        if (node) {
                            option = localformat(node);

                          console.log(option);
                            js.ShowContent($.extend({}, option));
                        } else {
                            $.get("getFunctionById", {node: c},
                                function (data) {
                                    if (data) {
                                        js.addconf(data);
                                      option = localformat(data);
                                      var config=$.extend({}, option);
                                      console.log(config);
                                        js.ShowContent(config);
                                    }
                                });
                        }

                    })

        if(!treeNode.isParent){
            //$TreeContainer.trigger('treeclick', {parent:p,functionid:treeNode.functionid});
        }

    };
    function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
        var a = $.evalJSON(msg);
        if($.isArray(a)){
            for(var i in a){
                Tabs.addconf(a[i]);
            }
        }


        //console.log(Tabs.getconf('pcARGpfb9DvboMP55FBg'));
    };



    return {
        render:function(p){

            var setting = {
                async: {
                    enable: true,
                    //url:"auth/proxy",
                    url:"menutree",
                    autoParam:["id", "name=n", "level=lv"],
                    otherParam:{"iddefault":p,url:'http://weipan/wp/ztree/demo/cn/asyncData/getNodes.php'},
                    dataFilter: filter

                },
                callback: {
                    onClick: (function(){
                        return function(event, treeId, treeNode){
                            zTreeOnClick(event, treeId, treeNode,p)
                        }
                    })(),
                    onAsyncSuccess: zTreeOnAsyncSuccess
                }
            };


            if(!$('#'+p).length){
                $TreeContainer.append('<ul id="'+p+'" class="ztree" opt="treepanel"></ul>');
                $.fn.zTree.init($("#"+p), setting);
            }
            $TreeContainer.children().hide();
            $("#" + p).show();

        }
    }
})
