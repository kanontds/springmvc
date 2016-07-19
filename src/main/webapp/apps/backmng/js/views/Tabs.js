/**
 * Created by Administrator on 2015/3/1.
 */
define([],function(){

    var tabs=$('.easyui-tabs-delay');
    var mainTab=tabs;
    var tabInitFlag=true;
    var tabInit=function(){

        tabs.tabs();
    }

     var xtfunctions=[];

    var normals=[];

    var $headers=$('.test> ul');
    $headers.children().bind('click',function(){
        $(this).parent().children().removeClass('HeaderTabCurrent');
        $(this).addClass('HeaderTabCurrent');
    })

    return {
        add:function(p,c){
            tabs.tabs('add',{
                title:p+c,content:'kkkkk'
            });
            $('.test> ul').children().each(function(){
                if($(this).find('a').attr('href').indexOf(p)>-1){
                    $(this).trigger('click');
                }
            })
        },

        currentHeader:function(task){
            $headers.find("a[href^='#" + task + "']").parent().trigger('click');
        },
        remove:function(){

        },

        addconf:function(ff){
            xtfunctions.push(ff);
        },

        getconf:function(fid){

            for(var i in xtfunctions){
                if(fid==xtfunctions[i].functionid){
                    return xtfunctions[i]
                }
            }
            return null;
        },

        ShowNormalContent:function(option){
            $normalcontent = $('#normalcontent');

            var f=function(){
                require([option.htmfile,option.jsfile],function(htm,js){

                    $normalcontent.children().hide();

                    var local = $('<div>'+htm+'</div>');
                    //local.attr('optid',option.optid)
                    $normalcontent.append(local);


                    var panelopt={
                        width:$normalcontent.css('width').substr(0,$normalcontent.css('width').length-2),
                        height:$normalcontent.css('height').substr(0,$normalcontent.css('height').length-2),
                        border:false
                    }
                    local.panel(panelopt);
                    local.attr('optid',option.optid)
                    js.render(local);

                    normals.push(option.optid);


                })
            }
            if(option.optid=='index'){
                normals=_.without(normals,'index');
                $normalcontent.find('[optid=index]').parent().remove();
            };
            if(vecIndexOf(normals,option.optid)>-1){

                $normalcontent.children().hide();
                $normalcontent.children().each(function(){
                    if($(this).children().attr('optid')==option.optid) {
                        //console.log($(this).children().attr('optid'));
                        //$(this).fadeIn(100);
                        $(this).show();
                    }
                })
            }else{
                f();
            }



        },

        ShowContent:function(option){
            if(tabInitFlag){
                tabInitFlag=!tabInitFlag;
                console.log('init.................................')
                tabInit();
            }
            var myjsfile=option.jsfile;
            require([option.htmfile,myjsfile],function(htm,js){
                var title=option.title;
                if(mainTab.tabs('exists',title)){
                    mainTab.tabs('select', title);
                    return;
                }
                var getLocaltab = function () {
                    return mainTab.tabs('add', {
                        title: title,
                        content: htm,
                        closable: true
                    }).tabs('getTab', title);
                }

                var localtab;
                if(option.act&&option.act.length>0){
                    localtab=getLocaltab();
                    if(js&&js.render){
                        js.render(localtab,option)
                    }
                }else{
                    localtab=getLocaltab();

                    if(option.title=='Main'){
                        $(localtab).hide();
                        $(localtab).fadeIn();
                    }

                    if(js&&js.render){
                        option.act='c';
                        js.render(localtab,option)
                    }
                }

                localtab.data('task', option.task);

                var closeCurrent=function(){
                    mainTab.tabs('close',option.title)
                }
                localtab.find('div[opt=pensionbutton] a[opt=close]').bind('click',closeCurrent);
                localtab.bind('close',closeCurrent);



            })
        },
        ShowHtmlIframe:function(value){
            var record = value.queryParams.record;

            var require_render=function(){
                if(mainTab.tabs('exists',value.title)){
                    mainTab.tabs('select', value.title);
                    return;
                }
                var myurl = value;
                /*if(value.indexOf(functionid)==-1){
                 myurl=value+"&="+functionid
                 }*/
                mainTab.tabs('add', {
                    title: value.title,
                    content:'<iframe src="gethtmliframe?name='+value.htmfile+'&data='+record.jja_id+'" width="100%" height="100%" frameborder="0"></iframe>',
//                    content:'<iframe src="gethtmliframe?name='+value.htmfile+'" width="100%" height="100%" frameborder="0"><form method="post" action="getData?data=1"></form></iframe>',
                    closable: true
                });
            };
            require_render();
        },
        ShowIframe:function(value,jsfile,title,functionid){
            var require_render=function(){
                if(mainTab.tabs('exists',title)){
                    mainTab.tabs('select', title);
                    return;
                }
                var myurl = value;
                if(value.indexOf(functionid)==-1){
                    myurl=value+"&="+functionid
                }
                mainTab.tabs('add', {
                    title: title,
                    content: '<iframe src="' + value + '" width="100%" height="100%" frameborder="0"></iframe>',
                    closable: true
                });
            };
            require_render();
        },
        closeCurrentTab:function(){
            var pp = mainTab.tabs('getSelected');
            var index = mainTab.tabs('getTabIndex',pp);
            mainTab.tabs('close',index);
        },
        getSelected:function(){
            return mainTab.tabs('getSelected');
        },
        closeTabByTitle:function(t){
            mainTab.tabs('close',t);
        },
        test:function(t){
            alert(t+'lllll')
        },
        showHtml:function(title,texthtml){
            var logpage=mainTab.tabs('add',{
                title:title,
                content:"<div></div>",
                closable:true
            })
            logpage.tabs('getTab', title).find('div').append(texthtml)
        }
    }
})
