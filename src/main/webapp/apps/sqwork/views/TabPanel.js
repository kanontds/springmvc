/*
 * 在一个panel中放置多个penel,来模拟table,以便将来定制自己的标签功能
 */
define(['Test','underscore','backbone'],function(Test,_,Backbone){
  var _idName="_tablePanelId";
  var count=1;
  var $maintab=null;
  var MyPanel = Backbone.Model.extend({
    inc:function(){
      this.set({orderNumber:(1+(this.get('orderNumber')||0))});
    },
    dec:function(){
      this.set({orderNumber:((this.get('orderNumber')||0)-1)});
    },
    promptColor: function() {
      var cssColor = prompt("Please enter a CSS color:");
      this.set({color: cssColor});
    }
  });
  var MyPanelColl =Backbone.Collection.extend({
    model: MyPanel
  });
  myPanelColl=new MyPanelColl();
  myPanelColl.comparator='orderNumber';
  myPanelColl.on({
    'add':function(theItem){
      this.each(function(item){
        item.inc();
      });
      theItem.set({orderNumber:0});
    },'remove':function(){
      this.each(function(item){
        item.dec();
      });
    }});
  var init=function(){
    $maintab=$('#maintab').panel({fit:true,border:0})
  }
  var getSed=function(){return ++count;}
  init();//初始化
  var getTabByTitle=function(title){
    var p=myPanelColl.findWhere({title:title});
    if(p){
      return p.toJSON();
    }
  }
  var closeOthers=function(){

  }
  var hideAll=function(){
    myPanelColl.each(function(p){
      $('#'+p.id).panel('close');
    });
  }
  var showPanelByTitle=function(title){
    hideAll();
    var p=getTabByTitle(title);

    return $('#'+p.id).panel('open');
  }
  var existPanel=function(title){
    return getTabByTitle(title);
  }
  var closePanelByTitle=function(title){
    $('#'+getTabByTitle(title).id).panel('close');
  }
  var addDefault={
    title: 'new tab',
    selected: false,
    index: 2
  }
  var add=function(options){
    var t=options.title;
    if(getTabByTitle(t)){
      var p=showPanelByTitle(t);
      p.panel('resize');
      return p;
    }else{
      var id=_idName+getSed()+(options.id||'');
      //id，可以允许多个相同的title同时出现
      //$maintab.append('<div id="'+id+'" data-options="fit:true" title="'+t+'" ></div>');
      $maintab.append('<div id="'+id+'" data-options="fit:true" ></div>');
      hideAll();
      var groupname=options.groupname||options.title||new Date().getTime();
      myPanelColl.add(new MyPanel($.extend({id:id,groupname:groupname},options)));
      //myPanelColl.each(function(item){console.log(item.toJSON())});
      $maintab.panel('resize');
      var titleOption={};
      if(options.useDefaultTitle){
          titleOption={title:options.title}
      }
      var $panel= $('#'+id).panel($.extend({
        border:0,
        tools:[
          {
            iconCls:'panel-tool-close',
            handler:function(){
              $panel.trigger('MyClose');
            }
          }
        ],
        onDestroy:function(){
        },onClose:function(){
      }},titleOption)).bind('MyClose',function(){
        //console.log('触发我的close');
        //myPanelColl.remove(id);
        //$(this).panel('destroy');
        closeList=myPanelColl.where({groupname:groupname});
        _.each(myPanelColl.where({groupname:groupname}),
        function(item){
        var id=item.id;
        myPanelColl.remove(id);
        $('#'+id).panel('destroy');
        });
        myPanelColl.sort();

        var firstPanel=myPanelColl.first();
        if(firstPanel){
          $('#'+firstPanel.id).panel('open').panel('resize');
        }
      });
      $panel.find('.panel-tool-close').off('close');
      return $panel;
    }
  }

  var changeOrderNumber=function(title){

         myPanelColl.each(function(item){
        item.inc();
         });
    var item=getTabByTitle(title);
    if(item){
      myPanelColl.get(item.id).set({orderNumber:0});
    }
  }
  Gpl=myPanelColl;
  return {
    add:add,
    existPanel:existPanel,
    showPanelByTitle:showPanelByTitle,
    changeOrderNumber:changeOrderNumber
  }
})
