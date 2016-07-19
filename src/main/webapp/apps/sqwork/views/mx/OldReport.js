define(['MngCallback','MakeDG','CmPanel','underscore','text!mz/Commoninfo.htm'],
function(MngCallback,MakeDG,CmPanel,_,CommoninfoHtm){
  var tpl=_.template('<div name="<%=areaname%>-area"></div>');
  var tpl_Commoninfo=_.template(CommoninfoHtm);
  var areas=[
  {title:'老年人习惯信息',name:'Habitinfo'},
  {title:'老年人家族遗传史',name:'Heredityinfo'},
  {title:'老年人疾病史',name:'Diseaseinfo'},
  {title:'老年人高血压专项',name:'Hypertensioninfo'},
  {title:'老年人服药信息',name:'Medicineinfo'},
  {title:'老年人健康检查信息',name:'Healthyinfo'},
  {title:'老年人监控数据信息',name:'Monitorinfo'}

  ]

   return {
       render:function(local,cb){



       local.find('a[action=OldInfo]').bind('click',function(){

           CmPanel.open('text!mx/OldReport.htm','mx/OldReport',
      {ptype:0,title:cb.params.originTitle,
      });

       })

     var $mainarea=local.find('div[opt=mainarea]');
     _.each(areas,function(item){
       var areaname=item.name;
       $mainarea.append(tpl($.extend({areaname:areaname},item)));
       require(['text!mz/Commoninfo.htm','mx/'+areaname],function(htm,js){
       var myArea=local.find('div[name='+areaname+'-area]');
                 myArea.append(tpl_Commoninfo({title:item.title}));
                 js.render(myArea,
                 new MngCallback({parentForm:cb.params.parentForm||local.find('form[name=test]')}));
              })
     });

     local.find('a[action=close]').bind('click',function(){
       local.trigger('MyClose');
     });




   }
   }
})
