define(['underscore','MngCallback','backbone'],function(_,MngCallback,Backbone){
  var tpl=_.template('<div id="<%=id%>" title="<%=title%>" style="width:<%=w%>px;height:<%=h%>px;"></div>');
  var count=1;
  var getSed=function(){return ++count;}
  var titles=new Backbone.Collection();
  var PREFIXID='windowmng_';
  var generateWindow=function(option,cache){
    w=option.width||500;
    h=option.height||400;
    var id=cache?cache:(PREFIXID+getSed());
    $('body').append(tpl($.extend({id:id},option)));
    return $('#'+id).window({
      border:'thin',
      top:($(window).height()-h)>0?($(window).height()-h)/2:5,
      tools:[
        {
          iconCls:'panel-tool-close',
          handler:function(){
            $('#'+id).trigger('MyClose');
          }
        }
      ],
      closable:false}).bind('MyClose',function(){
      if(cache){
        $(this).window('close');
      }else{
        $(this).window('destroy');
      }
    });
  }
  var exist=function(c){
    return titles.findWhere({cache:c});
  }

  var cachePrefix=function(p){return PREFIXID+p.replace(/[ \/\'\"\.\,]/g,'');}
  /*
   * options参数
   * cacheFn 是否要设置，返回值为要进行缓存的window
   */
  return {
    open:function(moduleHtm,moduleJs,options){
      var title=options.title;
      var cache;
      if((typeof options.cacheFn)=='function'){
        cache=cachePrefix(moduleJs+options.cacheFn());
      }
      titles.each(function(item){console.log(item.toJSON())});
      if(cache &&  exist(cache)){
        $('#'+titles.findWhere({cache:cache}).id).window('open');
        return;
      }
      require([moduleHtm,moduleJs,'ResizeBottomPanel'],function(htm,js,resizeBottomPanel){
        var panel=generateWindow(options,cache);
        if(cache){
          titles.add({cache:cache,title:title,id:cache});
        }
        panel.append(htm);
        $.parser.parse(panel);
        resizeBottomPanel.resize(panel);
        js.render(panel,new MngCallback(options));
      })
    }
  }
})
