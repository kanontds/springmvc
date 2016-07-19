/**
 * Created by Administrator on 2015/3/1.
 */
define(function () {
    var maincontentLayoutFlg = true;
    return {

        init: function (option) {
            var opt = option.opt;
            var app;//路由实例,提前声明,以供引用



            function GetRequest(url) {
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }


            function localformat(node) {
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

            //启动路由功能
            var AppRouter = Backbone.Router.extend({
                routes: {
                    "": "index",
                    "#": "index",
                    "task/:p/:c": "task",
                    "task?:params": "task",
                    "tasksimple?:params": "tasksimple",
                    "tasksimple2?:params": "tasksimple2",
                    "keyword?:params": "keyword",
                    "search?q=:query&p=:page": "search",   // #search/q=kiwis&p=7
                    "search2?:params": "search2",
                    "mytest2": "mytest2"
                },
                index: function (p,c) {

                    var task = 'task/' + p + '/' + c;
                  $('#maincontent').layout({fit:true,border:false});
/*
                    $('#maincontent').show();
                    $('#normalcontent').hide();
*/
                    require(['TreeContainer'], function (js) {
                        js.render(p, c);
                    })
                    require(['Tabs'], function (js) {
                        //js.add(p, c);

                        js.currentHeader('#task/businessmenu/l');

                        var option = {jsfile: 'mz/testA', htmfile: 'text!mz/testA.htm', title: 'AAAA'}

                        var node = js.getconf(c);

                        if (node) {
                            option = localformat(node);

                            js.ShowContent($.extend({task: task}, option));
                        } else {
                            $.get("getFunctionById", {node: c},
                                function (data) {
                                    if (data) {
                                        js.addconf(data);
                                        option = localformat(data);
                                        js.ShowContent($.extend({task: task}, option));
                                    }
                                });
                        }

                    })
                },

                task: function (p, c) {
                  var task = 'task/' + p + '/' + c;


                },
                tasksimple: function (params) {
                    IMap.singlelaydis({params: GetRequest("?" + params)});
                },
                tasksimple2: function (params) {
                    var o = GetRequest("?" + params);
                    global.istasksimple2 = true;
                    global.istasksimple2params = params;
                    //indexAction(o);
                },
                keyword: function (params) {
                    var o = GetRequest("?" + params);
                    $('#keywordTxt').val(o.keyword);

                },
                search: function (query, page) {
                    $('#myleft').append(query + page)
                },
                search2: function (params) {
                    $('#myleft').append(params)
                },
                mytest2: function () {
                    alert(222)
                }
            });

            app = new AppRouter();
            global.route = app;
            Backbone.history.start();

        }
    }
})
