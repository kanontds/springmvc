/*
 * 触发点击事件,创建panel,传递panel给相应的js
 */
define(['TabPanel','MngCallback'],function(TabPanel,MngCallback){
  return {
     //放弃使用
      render:function(panel,node){
         var module=node.location.replace(".","/")//+'?v='+new Date().getTime();
         if(exist(node.title)){
            TabPanel.showPanelByTitle(node.title);
            return;
         }
         titles.push(node.title);
         require(['text!'+module+'.htm',module,'ResizeBottomPanel'],function(htm,js,resizeBottomPanel){
            panel.append(htm);
            $.parser.parse(panel);
            resizeBottomPanel.resize(panel);
            js.render(panel);
         })
      },open:function(moduleHtm,moduleJs,options){
        var title=options.title;
        if(TabPanel.existPanel(title)){
          TabPanel.changeOrderNumber(title);//设置为第一位
            TabPanel.showPanelByTitle(title);
            return;
         }
         require([moduleHtm,moduleJs,'ResizeBottomPanel'],function(htm,js,resizeBottomPanel){
            var panel=TabPanel.add({title:title,groupname:options.groupname,useDefaultTitle:options.useDefaultTitle});
            panel.append(htm);
            $.parser.parse(panel);
            resizeBottomPanel.resize(panel);
            js.render(panel,new MngCallback(options));
         })
      }
  }
})
