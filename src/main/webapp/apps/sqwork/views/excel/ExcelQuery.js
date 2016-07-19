define(['MakeDG','CmPanel','backbone'],function (MakeDG,CmPanel,Backbone) {
var tpl_upload=_.template('<div id="<%=timeid%>"  style="position:absolute;top:<%=top%>px;left:<%=left%>px;z-index:10;">'+
'<iframe frameborder=0 src ="uploadexcel?timeid=<%=timeid%>" width="<%=width%>" height="<%=height%>"></iframe> </div>');

  var OldinfoModel =Backbone.Model.extend({
    urlRoot : 'eers/excel-data',
    idAttribute: "xxxid"
  });
  var mydelete=function(row,datagrid){
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
 var gdUrl=null;

  var view = function (record, dg) {
    $.messager.alert('检查不合格信息',record.validatemessage,'warning');
  }
  var edit = function (record,datagrid) {
  }

  var logout = function (option, row) {
  }

  var module = {
    render: function (local, option) {
      var tb = $(local).find('div[tb]');
      var dg=MakeDG.make(local.find('.easyui-datagrid-noauto'),
                         {delete:mydelete,update:view,view:view},
                         {
                         //url: 'eers/excel-data?customtag=nopagination',
                         queryParams:{_dc:new Date().getTime()},
                         url:'eers/excel-validate-bfinsert/201605YMc5175a34c8a94b9ea8e4dccfd8a2d481tmp_numbers.xls',
                          toolbar: tb,
                          onBeforeCheck:function(index,row){
                              if(row.exestOldcardnum || (row.validatemessage && row.validatemessage.length)){
                                //return false;
                              }
                              return true;
                          },
                          rowStyler: function(index,row){
		if (row.validatemessage && row.validatemessage.length){

			return 'color:red;'; // return inline style
		}
	}}
                        );
                        gdUrl=dg.datagrid('options').url;
                        //='eers/'+params.replace('attachment/','excel-validate-bfinsert/');


     tb.find('a[action=new]').bind('click',function(){

var id='position'+new Date().getTime();
         global.positionList.add({timeid:id,
         myCallBack:function(params){
           dg.datagrid('options').url='eers/'+params.replace('attachment/','excel-validate-bfinsert/');
           dg.datagrid('reload');
         }});
         $('body').append(tpl_upload({timeid:id,
         width:700,
         height:200,
         top:($(window).height()-200)/2,
         left:($(window).width()-700)/2

      }));

    })

    tb.find('a[action=save]').bind('click',function(){
       $.get('eers/excel-oldinfo-save/'+gdUrl.replace('eers/excel-validate-bfinsert/',''),function(resp){
             $.messager.alert('信息','操作完成情况:'+resp.message,'info');
       });
    });


       tb.find('a[action=close]').bind('click',function(){
                     local.trigger('MyClose');
                });

//end

    }

  };

  return module;
});
