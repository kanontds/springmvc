define(['MakeDG','CmPanel','backbone'],function (MakeDG,CmPanel,Backbone) {
var OldinfoModel =Backbone.Model.extend({
         urlRoot : 'eers/oldinfo',
         idAttribute: "oldid"
    });
  var mydelete1=function(row,datagrid){
    var oldinfo=new OldinfoModel(row);

    require(['common/RespMessage'],function(RespMessage){
    $.messager.confirm('确认','您真的要删除此用户吗?',function(r){
                   if (r){
                     oldinfo.destroy({success:function(){
  datagrid.datagrid('reload');
                     }})
                  }
                });

    })

  }
  var mydelete=function(record,datagrid){
  $.messager.confirm('确认','您真的要删除此用户吗?',function(r){
                   if (r){
                     $.ajax({
                       url:'eers/delete/oldinfo/'+record.oldid,
                       type:'post',
                       success:function(){
$.messager.show({
                         title:'提示',
                         msg:'操作成功',
                         showType:'show',
                         timeout:500,
                         style:{
                             right:'',
                             //top:document.body.scrollTop+document.documentElement.scrollTop,
                             bottom:''
                         }
                     });
                       },error:function(){
                       $.messager.alert('错误','操作失败','error');
                       }
                     })
                  }
                });

  }
  var mydelete2=function(record){
    CmPanel.open('text!mz/Oldinfo.htm','mz/Oldinfo',{ptype:1,title:'OK',cacheFn:function(){return "helloworld";}});
}

    var view = function (record, dg) {
      CmPanel.open('text!mz/Oldinfo.htm','mz/Oldinfo',
      {ptype:0,title:'查看: '+record.oldname,
       record:record,
       dg:dg,
      cacheFn:function(){return "helloworld";}});
    }
  var edit = function (record,datagrid) {


    }

    var logout = function (option, row) {
    }

    var module = {
        render: function (local, option) {
            var tb = $(local).find('div[tb]');
          var dg=MakeDG.make(local.find('.easyui-datagrid-noauto'),
                             {mydelete:mydelete,update:view,view:view},
                             {url: 'eers/oldinfo?customtag=pagination',
                              toolbar: tb}
                            );


      _.each(['oldname','oldcardnum','oldtelnum'],function(item){
         tb.find('.easyui-textbox[opt='+item+']').textbox({
                 onChange:function(newValue,oldValue){
                    /*dg.datagrid('reload',{
                      intelligentsearch:[
                        {name:item,operate:"like",value:"%"+newValue+"%"}
                      ]
                     });*/
                     tb.find('a[action=search]').trigger('click');
                 }
               })
      })


      var getSearchParams=function(){
        var searchParams=[];
                 var oldname=tb.find('[opt=oldname]').textbox('getValue');
                 var oldcardnum=tb.find('[opt=oldcardnum]').textbox('getValue');
                 var oldtelnum=tb.find('[opt=oldtelnum]').textbox('getValue');
                 var oldsex=tb.find('[opt=oldsex]').combobox('getValue');
                 var oldtype=tb.find('[opt=oldtype]').combobox('getValue');
                 if(oldname){
                    searchParams.push({name:'oldname',operate:"like",value:"%"+oldname+"%"});
                 }
                 if(oldcardnum){
                                     searchParams.push({name:'oldcardnum',operate:"like",value:"%"+oldcardnum+"%"});
                                  }
                                  if(oldtelnum){ searchParams.push({name:'oldtelnum',operate:"like",value:"%"+oldtelnum+"%"});
                                   }
                                   if(oldsex){ searchParams.push({name:'oldsex',operate:"=",value:oldsex});}
                                   if(oldtype){ searchParams.push({name:'oldtype',operate:"=",value:oldtype});}
                                   return searchParams;
      }
      tb.find('a[action=search]').bind('click',function(){

                 dg.datagrid('reload',{
                                       intelligentsearch:getSearchParams()
                                      });
            });

      tb.find('a[action=new]').bind('click',function(){
           CmPanel.open('text!mz/Oldinfo.htm','mz/Oldinfo',
      {ptype:0,title:'新增客户信息',
       dg:dg});
      })


      tb.find('a[action=close]').bind('click',function(){
                 local.trigger('MyClose');
            });
            tb.find('a[action=excel-data]').bind('click',function(){
                 //CmPanel.open('text!excel/ExcelQuery.htm','excel/ExcelQuery',{ptype:0,title:'OK'});
                 var ooo=getSearchParams();
                 var href='eers/oldinfo-export?'+$.param({customtag:'nopagination',intelligentsearch:ooo,version:new Date().getTime()});
                 document.location.href=href;
            });
            //

        }

    };

    return module;
});
