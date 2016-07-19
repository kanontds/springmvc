define(['text!MakeButtonTemplates.htm','underscore','backbone'],function(htm,_,Backbone){
  var buttons=_.rest(htm.split('@@'));
  var tpls=new Backbone.Collection();

  _.each(buttons,function(item){
    //把第一组数据分成两组，一个为名字，一个为模板实现
    var separatorIndex=item.indexOf('\n');
    tpls.add({name:item.substr(0,separatorIndex),tpl:_.template(item.substr(separatorIndex))});
  });

  var buttonObj={};

  //转换数据[['add','添加','add'],['delete','添加','delete']]
  //[{"action":"add","text":"添加","icon":"add"},{"action":"delete","text":"删除","icon":"delete"}]
  var parse2tplData=function(btns){
    var result=[];
    for(var i in btns){
      var b=btns[i];
      var o={};
      if(b.length==1){
        o.action=b[0];
        o.text=b[0];
      }else if(b.length==2){
        o.action=b[0];
        o.text=b[1];
      }else if(b.length==3){
        o.action=b[0];
        o.text=b[1];
        o.icon=b[2];
      }
      result.push(o);
    }
    return result;
  }


  tpls.each(function(item){
    buttonObj[item.get('name')]=function(){
      return item.get('tpl')({children:parse2tplData(arguments)});
    };
    buttonObj[item.get('name')+'Formatter']=function(){
      var args=arguments;
      return function(v,r,i)
      {
        var tplData={children:parse2tplData(args)};
        var bts= item.get('tpl')(tplData);
        var str='<div></div>';
        //str=$(str).append(bts);
        return bts;
      }
    }

  });
  return buttonObj;
})
