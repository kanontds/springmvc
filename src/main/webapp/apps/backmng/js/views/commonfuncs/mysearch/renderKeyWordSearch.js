/**
 * Created by Administrator on 2014/12/19.
 */
define(['mz/Filemng-preview'],function(Previewjs){
    var preview=function(opt,r){
        Previewjs.render(opt, r);
    }

    return {
        init:function(){
            require(['commonfuncs/mysearch/autoComplete'],function(js){
                js.render({
                    txtKeyword:'#keywordTxt',
                    ulItems:'#ulItems',
                    ajaxOpt:{
                        url:'mzfile/keysearch',
                        data:{a:"好"}
                    },
                    dataFormat:function(data){
                        var d=data;
                        var a=[];
                        for(var i in d) {
                            a.push('<a><a>'+(" "||d[i]['docketno'])+'</a><b>'+d[i]['filepath']+'</b></a>');
                        }
                        return a;
                    },
                    rowClick:function(){
                        preview(null,{filepath:$(this).text().trim()})
                    }
                });
            })
        }
    }
})