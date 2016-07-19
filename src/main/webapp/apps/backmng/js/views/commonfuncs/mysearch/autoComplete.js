/**
 * Created by weipan on 2014/12/19.
 */
define(function(){



    var count=1;



    //接口
    /*
    txtKeyword:元素 default txtKeyword
    ulItems:列表元素 default ulItems
    ajaxOpt:数据来源
    rowFormat:数据格式化
     */

    /*页面上对应的元素如下
     <input id="txtKeyword" type="text"  style="width:200px;" />
     <ul id="ulItems" style="display: none; border:1px solid #cecece; border-top:none; width:200px; padding:2px; margin:0px;position: absolute;">
     */

    var myrender=function(option){
        var currentSelIndex = -1;
        var oldSelIndex = -1;
        var $keyword=$((option.txtKeyword||'#txtKeyword')), $item = $((option.ulItems||'#ulItems'));



        function renderData(opt) {
            $.extend(opt.ajaxOpt.data,{keytext:$keyword.val()})
            var myajaxobj=$.extend({},opt.ajaxOpt,{
                success:function(data){
                    var d=opt.dataFormat(data);
                    var result="";
                    $item.html("");
                    for(var i= 0,len= d.length;i<len;i++) {
                        var a=$('<li opt="autoc">'+d[i]+'</li>');
                        a.bind('click',(function(o){
                            return function(){
                                opt.rowClick.call(o);
                                $item.hide();
                            };
                        })(a));
                        /*(function(d){
                            a.data('record',d)
                        })();*/

                        $item.append(a);
                    }
                    //$item.html(result);
                    $item.find('li[opt=autoc]').hover(function(){
                        $(this).addClass('highlight');
                    },function(){
                        $(this).removeClass('highlight');
                    })

                    var timer;
                    $item.hover(function(){
                        window.clearTimeout(timer);
                    },function(){
                        timer = window.setTimeout(function () {
                            $item.hide();
                        }, 1000);
                    })
                }
            })
            $.ajax(myajaxobj);
        }

        var renderRowStyle=function(currentSelIndex,oldSelIndex){
            if (currentSelIndex != -1) {
                $item.find('li').css({color: '#000000'})
                var $li=$item.find('li').eq(currentSelIndex);
                $li.css({color: 'red'});
                $keyword.val($li.text());
            }
            if (oldSelIndex != -1) {
                var $li=$item.find('li').eq(oldSelIndex);
                $li.css({color: 'green'});
            }
        }


        var mySelectItem=function(event){
            var keyword = $keyword.val();
            console.log(event.keyCode)

            //27 ESC键
            if(keyword==''||event.keyCode==27 ){
                $item.hide();
            }else{
                var liLength=$item.find('li').length;
                if ((event.keyCode == 38 || event.keyCode == 40) && !$item.is(":hidden")){
                    if (liLength > 0) {
                        oldSelIndex = currentSelIndex;
                        //上移
                        if (event.keyCode == 38) {
                            if (currentSelIndex == -1) {
                                currentSelIndex = liLength - 1;
                            }
                            else {
                                currentSelIndex = currentSelIndex - 1;
                                if (currentSelIndex < 0) {
                                    currentSelIndex = liLength - 1;
                                }
                            }
                            renderRowStyle(currentSelIndex, oldSelIndex);

                        }
                        //下移
                        if (event.keyCode == 40) {
                            if (currentSelIndex == liLength - 1) {
                                currentSelIndex = 0;
                            }
                            else {
                                currentSelIndex = currentSelIndex + 1;
                                if (currentSelIndex > liLength - 1) {
                                    currentSelIndex = 0;
                                }
                            }
                            renderRowStyle(currentSelIndex, oldSelIndex);
                        }
                    }
                }else if (event.keyCode == 13) {

                    //暂时不修改
                    if (false && document.getElementById("ulItems").style.display != "none" && liLength > 0 && currentSelIndex != -1) {
                        document.getElementById("txtKeyword").value = document.getElementById("li_" + currentSelIndex).innerText;
                        document.getElementById("ulItems").style.display = "none";
                        currentSelIndex = -1;
                        oldSelIndex = -1;
                    }
                }
                else {
                    renderData(option);
                    $item.show();
                    currentSelIndex = -1;
                    oldSelIndex = -1;
                }
            }
        }



        $keyword.keyup(_.throttle(mySelectItem,3000));

    }



    return {
        render:function(option){
            myrender(option);
        }
    }
})