//date extended
/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "日",
        "1" : "一",
        "2" : "二",
        "3" : "三",
        "4" : "四",
        "5" : "五",
        "6" : "六"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

String.prototype.getBytes = function () {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}
//****************************************************************************************
if(!window.console){
    window.console={
        log:function(){

        }
    }
}
//****************************************************************************************

/**
 * Created by weipan on 3/31/14.
 */
var cjEnum={};//和cj中的Enums一样，只是便于调试，在代码中不用
var cj=(function(){
    var pz=15;
    var dataGridAttr={ pageSize:pz, pageList: [pz, 30,50]}
    var Enums={};

    function  indexOf(a,p,v){
        for(var i in a){
            if(a[i][p]==v){
                return a[i];
            }
        }
    }

    var getLoader=function() {

    };
      var parseStringDate=function(strDate) {
        if(strDate==null){
            return new Date(null);
        }
        var arr=strDate.replace(/T/g,'-').replace(/\ /,'-').replace(/:/g,'-').replace(/\.000Z/,'').replace(/Z/,'').split('-');
        var d=new Date();
        var i=0;
        d.setFullYear(arr[i++]);
        d.setMonth(arr[i++]);
        d.setDate(arr[i++]);
        d.setHours(arr[i++]);
        d.setMinutes(arr[i++]);
        d.setSeconds(arr[i++]);
        return new Date(d.getTime()+3600*1000*8)
    };

    var getLoader2 = function(type,param,success,error){
        //项目没有用到select元素，所以这里就注解了，提高性能
        return function(param,success,error){
            param.q="10000";
            $.ajax({
                url: 'getenumbytype',
                dataType: 'jsonp',
                data: {
                    type:type
                },
                success: function(data){
                    var items = $.map(data, function(item){
                        return {
                            id: item.enumeratevalue,
                            text: item.enumeratelabel
                        };
                    });
                    //console.log(items)
                    if(Enums[type]){
                        cjEnum[type]=Enums[type]=items;
                    }
                    success(items);
                },
                error: function(){
                    error.apply(this, arguments);
                }
            });
        }
    }

    var getUrl=function(filepath,action,costomPreFixUrl){
        var u=filepath.replace(/\//g,'@');
        var myu=indexOf(urls,'name',u);
        var a=myu?myu.url:[];
        for(var i in a){
            for(var p in a[i]){
                if(p==action){
                    var result= (costomPreFixUrl||preFixUrl)+a[i][p];
                    return result;
                }
            }
        }
        return 'noactionfound'
    }
//***************************

    var singleFun=function(){
        /*if(cbdata){
            var d=cbdata;
            Enums= d.rows
            cjEnum= d.rows;
            return Enums;  //一次性全部加载过来
        }
        $.ajax({
            url:'jsondata/cb.json',
            type:'post',
            data:{searchtype:'no1'},
            success:function(res){
                var d = eval('(' + res + ')');
                if (!!d && (d.success == true || d.success == 'true')) {
                    Enums= d.rows
                    cjEnum= d.rows;
                    return Enums;  //一次性全部加载过来
                }
            }
         }) */
      return;
        $.ajax({
            url:'getenumbytype',
            dataType: 'jsonp',
            data:{skeyword:'',type:''},
            success: function(data){
                var obj={};
                var items = $.map(data, function(item){
                    if(obj[item.enumeratetype]){
                        obj[item.enumeratetype].push({
                            id: item.enumeratevalue,
                            text: item.enumeratelabel
                        })
                    }else{
                        obj[item.enumeratetype]=[{
                            id: item.enumeratevalue,
                            text: item.enumeratelabel
                        }]
                    }
                });
                Enums= obj;
                cjEnum= obj;
            }
        })
    }
    window.setTimeout(singleFun,1000);

    var getEnumlower=function(searchtype){
        return Enums[searchtype];
    }
    var enfmt=function(ef){
        return function(value,recode,index){
            if(ef){
                for (var i = 0; i < ef.length; i++) {
                    if (ef[i].id == value) {
                        return ef[i].text;
                    }
                }
                return value;
            }
        }
    }
    var commonj = {
        version: '1.0',
        defaultTitle: '提示',
        ajaxaSynchronous: false,
        calert: function (res,addontext) {
            var d = eval('(' + res + ')');
            if (!!d && (d.success == true || d.success == 'true')) {
                $.messager.alert(cj.defaultTitle, '操作成功!', 'info');
            } else {
                $.messager.alert(cj.defaultTitle, '操作失败!'+(addontext||''), 'info');
            }
        },
        question: function (info, fun, title) {
            var boxtitle = cj.defaultTitle;
            if (title) {
                boxtitle = title;
            }
            $.messager.confirm(boxtitle, info, function (r) {
                if (r) {
                    fun()
                }
            });
        },

        ifSuccQest: function (res, info, fun, title) {
            var d = eval('(' + res + ')');
            if (!d||d.success == true || d.success == 'true') {
                cj.question(info, fun, title)
            }
        },
        csumbitQest:function(res,info,fun,title){
            var d= $.evalJSON(res);
            if(d){
                if(d.success == true || d.success == 'true'){
                    cj.question((d.message||info||'操作成功')+',是否关闭', fun,title)
                }else{
                    cj.question(( d.message||'操作失败')+',是否关闭', fun,title)
                }
            }else{
                $.messager.alert(cj.defaultTitle, '操作失败!', 'info');
            }
        },
        slideShow:function(message,title){
            $.messager.show({
                title:title||'温馨提示',
                msg:message||'',
                timeout:3000,
                showType:'slide'
            });
        },
        getByteLen: function (val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                if (val[i].match(/[^x00-xff]/ig) != null) //全角
                    len += 2;
                else
                    len += 1;
            }
            ;
            return len;
        },
        getDataGridAttr:function(name){
            return dataGridAttr[name]
        },
        enumFormatter:function(ename,f){
            return enfmt(getEnumlower(ename.toLowerCase()))
        },
        getEnum:function(ename){
            return getEnumlower(ename.toLowerCase())
        },
        getSelected:function(){
            require(['commonfuncs/TreeClickEvent'],function(js){
                return js.getSelected();
            })
        },
        showContent:function(option){
            var f=function(show){
                if(option.forceclose==true){
                    show.closeTabByTitle(option.title);
                }

                show.ShowContent(option)
            }
            require(['commonfuncs/TreeClickEvent'],f)
        },
        showHtmlIframe:function(value){
            var f=function(show){
                show.ShowHtmlIframe(value)
            }
            require(['commonfuncs/TreeClickEvent'],f)
        },
        showIframe:function(value,jsfile,title,customparam){
            var f=function(show){
                show.ShowIframe(value,jsfile,title,customparam)
            }
            require(['commonfuncs/TreeClickEvent'],f)
        },
        showHtml:function(title,texthtml){
            require(['commonfuncs/TreeClickEvent'],function(js){
                js.closeTabByTitle(title);
                js.showHtml(title,texthtml);
            })
        },
        searchLog:function(functionid,isAuditLog){
            require(['commonfuncs/TreeClickEvent'],function(js){
                var location='log.do?method='+functionid;
                if(isAuditLog){
                    location+='&isAuditLog='+isAuditLog
                }
                var title='操作日志';
                js.closeTabByTitle(title)
                js.ShowIframe(location,'',title)
            })
        },
        getCurrTab:function(){
            return $('#tabs').tabs('getSelected');
        } ,
        rowStyler:function(index,row){
            if(index%2==1){
                return 'background:#e7ffe7';
            }
        },dateFormatter:function(fmt){
            return function(v,r,i){
                var d=v;
                if(!d){return}
                d= new Date(d.replace(/-/g,'/'));
                return d.pattern(fmt||'yyyy-MM-dd hh:mm')
            }

        },getUrl:getUrl,
        ajaxdata:function(url,data,success,type){
            var atype=type;
            if(!type){
                atype='post';
            }
            $.ajax({
                url:url,data:data,type:atype,success:success
            })
        },getLoader:getLoader,
        dataGridLoadMsg:function(){return ''},
      parseStringDate:parseStringDate,
        /**
         * 生成工具条
         * @param btns
         */
        getFormToolBar:function(btns){
            var $btnarea=$('<div class="form-foot-btns"><ul></ul></div>');
            var $ul = $btnarea.find('ul');
            for( var i in btns){
                var btn = btns[i];
                var $li=$('<li><a>'+btn.text+'</a></li>');
                var $a = $li.find('a');
                for(var p in btn) {
                    $a.attr(p,btn[p]);
                }
                $ul.append($li);
            }
            return $btnarea;
        },getUserMsg:function(){
            return usermsg;
//            return "";
        }
    }


    return commonj;
})()


jQuery.fn.cssRadioOnly = function (){
    var me = ($(this))
    var selectRadio = ":input[type=radio] + label";
    me.find(selectRadio).each(function () {
        if ($(this).prev()[0].checked)
            $(this).addClass("checked");
    }).prev().hide();
}
jQuery.fn.cssCheckBoxOnly = function () {
    var me = ($(this))
    var selectCheck = ":input[type=checkbox] + label";
    me.find(selectCheck).each(function () {
        if ($(this).prev()[0].checked) {
            $(this).addClass("checked");
        }
    }).prev().hide();
}
jQuery.fn.cssRadio = function (toggle) {
    var me = ($(this))
    var selectRadio = ":input[type=radio] + label";
    me.find(selectRadio).each(function () {
        if ($(this).prev()[0].checked)
            $(this).addClass("checked"); //初始化,如果已经checked了则添加新打勾样式
    }).click(function () {               //为第个元素注册点击事件
            var s = $($(this).prev()[0]).attr('name')
            s = ":input[name=" + s + "]+label"
            var isChecked=$(this).prev()[0].checked;
            me.find(s).each(function (i) {
                $(this).prev()[0].checked = false;
                $(this).prev().removeAttr("checked");
                $(this).removeClass("checked");
            });
            if(isChecked&&toggle){
                //如果单选已经为选中状态并且参数为true,则什么都不做
            }else{
                $(this).prev()[0].checked = true;
                $(this).prev().attr("checked","checked");
                $(this).addClass("checked");
            }

        })
        .prev().hide();     //原来的圆点样式设置为不可见


};
jQuery.fn.cssCheckBox = function () {
    var me = ($(this))
    me.find(":input[type=checkbox] + label").each(function () {
        if ($(this).prev()[0].checked) {
            $(this).addClass("checked");
        }
    }).toggle(function () {
            $(this).prev()[0].checked = true;
            $(this).addClass("checked");
            $($(this).prev()[0]).attr("checked","checked");

        },
        function () {
            $(this).prev()[0].checked = false;
            $(this).removeClass("checked");
            $($(this).prev()[0]).removeAttr("checked");
        }).prev().hide();
}

var lr=(function(){
    return {
        url:function(option,eventName){
           var en='';
            if(eventName){
                en='&eventName='+eventName
            }
           return 'lr.do?model='+option.location+en+'&functionid='+option.functionid;
        }
    }
})() ;



