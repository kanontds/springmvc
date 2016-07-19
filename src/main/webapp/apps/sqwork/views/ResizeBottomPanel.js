define([],function(){
  return {
    /*老版本，采用两个panel分别设置高度，并设置resize事件*/
    resize1:function(panel){
      var cs=panel.children();
      if(cs.length==2 && $(cs[1]).hasClass('form-bottom-bar')){
        var HEIGHT=40;
        var footerPanel=$(cs[1]).panel({height:HEIGHT,border:0});
        var headerPanel=$(cs[0]).panel({height:panel.height()-HEIGHT});
        panel.panel({onResize:function(width, height){
           headerPanel.panel('resize',{height:panel.height()-HEIGHT});
        }})
      }
    },
    /*新版本，使用panel自带的功能*/
    resize:function(panel){
      var cs=panel.children();
      var HEIGHT=30;
      var $bottom=$(cs[1]);
      if(cs.length==2 && $bottom.hasClass('form-bottom-bar')){
        $(cs[1]).height(HEIGHT).css('border-top','1px solid white');
        $(cs[0]).panel({
           fit:true,
          border:0,
           footer:$(cs[1])
        })

        var btns=eval($bottom.attr('btns'));
        $bottom.append(btns);
        $bottom.find('ul.pretty-buttons').css({'line-height':HEIGHT+'px',height:HEIGHT});
        $bottom.find('[action=close]').bind('click',function(){
          panel.trigger('MyClose');
        })
      }


    }
  }
})
