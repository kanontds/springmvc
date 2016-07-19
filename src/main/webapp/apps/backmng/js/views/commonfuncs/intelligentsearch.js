/**
 * User: weipan
 * Date: 7/16/14
 * Time: 1:22 PM
 * desc:pop intelligent search window and send form ,maybe close the window if user needed
 */


define(['commonfuncs/popwin/win'],function(win){
   var htms=(function(){
       var a=[
            'FileMngInfo','FmlMemInfo'
       ]
       var o={};
       for(var i in a){
           o[a[i]]='text!intelligent/'+a[i]+'_.htm';
       }
       return o;
   })()

  var operater={
      eq:'=',like:'like',ge:'>=',le:'<='
  }
   var optexam={
       local:$('test'),
       title:'ttttt',
       width:300,
       height:300,
       onClose:function(){},
       jsfile:'test',
       htmfile:'text',
       getIntelligentsp:function(params){}
   }
   var pop=function(option){
       require([option.htmfile,option.js],function(htmfile,js){

           win.render({
               title:' 高级查询-查询条件',
               width:option.width||524,
               height:option.height||300,
               html:$(htmfile),
               buttons:[
                   {text:'取消',handler:function(html,parent){
                       parent.trigger('close');
                   }},
                   {text:'查询',icon:'icon-search',handler222:function(html,parent){ }}
               ],
               renderHtml:function(localpop,submitbtn,parent,btns){
                   var callbackopt={
                       localpop:pop,parent:parent,btns:btns
                   }
                   if(js){
                       //js.poprender($(id),localpop)
                   }
                   $(btns[1]).bind('click',function(){
                       var a=(function($form){
                           var arr=[];
                           $form.find('input').each(function(){
                               if($(this).attr('name')){
                                   if($(this).val()){
                                       var op=operater[$(this).attr('operate')]||operater[$form.find('input[comboname='+$(this).attr('name')+']').attr('operate')];
                                       var val=$(this).val();
                                       if(op==operater.like){
                                           val='%'+val+'%';
                                       }
                                       arr.push({
                                           name:$(this).attr('name'),
                                           operate:op,
                                           value:val,
                                           logic:'and'
                                       })
                                   }

                               }

                           })
                           return arr;
                       })($(localpop.find('form')[0]));
                       if(option.getIntelligentsp){
                           option.getIntelligentsp({
                               intelligentsp: JSON.stringify(a),
                               rows: 10,
                               page: 1
                           }, callbackopt);
                       }

                   })

               }
           })
       })
   }

    return {pop:pop,htms:htms}
})
