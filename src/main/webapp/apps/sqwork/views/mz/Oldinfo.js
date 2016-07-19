define(['MngCallback','MakeDG','CmPanel','text!mz/ContactsinfoMng.htm'],function(MngCallback,MakeDG,CmPanel,CommoninfoHtm){
var tpl_Commoninfo=_.template(CommoninfoHtm);
var tpl_PositionMap=_.template('<div id="<%=timeid%>" class="position-map" style="position:absolute;top:<%=top%>px;left:<%=left%>px;z-index:10;">'+
'<iframe frameborder=0 src ="oldinfomap?lat=<%=lat%>&lng=<%=lng%>&timeid=<%=timeid%>" width="<%=width%>" height="<%=height%>"></iframe> </div>');

   return {
       render:function(local,cb){
       var myform=local.find('form[name=oldinfo]');
       var record=null;

       //初始化入库时间
       myform.form('load',{oldtime:new Date().pattern('yyyy-MM-dd HH:mm:ss')});

       if(cb.params.record){
          record=cb.params.record;
          myform.form('load',record);
          myform.find('input[opt=oldcardnum]').validatebox({validType:{'maxLength':['18'],
          oldcardnum_exist:[record.oldid,record.oldcardnum],isCardNum:[]}});
       }
       local.find('a.tool-save[action=save]').bind('click',function(){
        var oldid=myform.find('input[name=oldid]').val();
      myform.form('submit',{
        url:oldid?'eers/update/oldinfo/'+oldid:'eers/oldinfo',
        onSubmit: function (param) {
          var isValid = $(this).form('validate');
          if(!isValid){
            $.messager.alert('提示','<p>表单验证失败</p><p>请核实数据再进行提交操作</p>','info');
          }
          return isValid;
        },
        success: function (resp,a,c) {
           var data=resp;
          if(typeof(resp)=='string'){
             data=JSON.parse(resp)
          }
          if(oldid){
               if(data.success){
              $.messager.alert('提示','地震信息更新成功','info');
              if(cb.params.dg){
              cb.params.dg.datagrid('reload');
              }


          }else{
              $.messager.alert('提示','地震信息更新失败','info');
          }
          }else{
              if(data.result && data.result.oldid){
              $(this).find('input[name=oldid]').val(data.result.oldid)
              $(this).find('input[name=oldcardnum]').validatebox('disable');

              $.messager.alert('提示','地震信息保存成功','info');

          }else{
              $.messager.alert('提示','地震信息保存失败','info');
          }
          }
        }
      })
       });


       var contactsinfoArea=local.find('div[name=contactsinfo-area]');
       require(['text!mz/ContactsinfoMng.htm','mz/ContactsinfoMng'],function(htm,js){
          contactsinfoArea.append(htm);
          js.render(contactsinfoArea,new MngCallback({parentForm:local.find('form[name=oldinfo]')}));
       })


       local.find('a[action=OldReport]').bind('click',function(){
       var oldid=myform.find('input[name=oldid]').val();
           if(oldid){
              CmPanel.open('text!mx/OldReport.htm','mx/OldReport',
      {ptype:0,title:'查看报表: '+myform.find('input[name=oldname]').val(),
      originTitle:cb.params.title,
      parentForm:local.find('form[name=oldinfo]'),
      groupname:cb.params.title});
           }

       })


      //家庭地址
//--330800
//--330881
//--330881001
//--330881001001
      var dvInit=[true,true,true,true];

      var $division=local.find('td[opt=division]');
      var $d1=$division.find('input[opt=d1]');
      var $d2=$division.find('input[opt=d2]');
      var $d3=$division.find('input[opt=d3]');
      var $d4=$division.find('input[opt=d4]');
      var ds=[$d1,$d2,$d3,$d4];
      var cmbbopt={
         valueField: 'id',
        textField: 'text'
      }
      _.each(ds,function(item,index){
          var options={};
          $.extend(options,cmbbopt)
          if(0==index){
              $.extend(options,{url: 'getdivisiontree?node=330000'})
          }
          var nextItem=ds[index+1];
          item.combobox($.extend(options,{
        onSelect: function(rec){

            var url = 'getdivisiontree?node='+rec.id;
            if(nextItem){
              if(!dvInit[index])return;
              $.get(url,function(resp){
               if(resp.length){
               nextItem.combobox('loadData',resp).combobox('select',resp[0].id);
               }
            })
            }
            local.find('input[name=dvcode]').val(rec.id);
        }
          }))
      });
      if(cb.params.record){
         dvInit=[false,false,false,false];
         var dvcode=cb.params.record.dvcode;
         $.get('getdivisiontree?node=330000',function(resp){
            if(!dvcode){
            dvInit=[true,true,true,true];return;
            }
            var id=dvcode.substr(0,4)+'00';
            $d1.combobox('loadData',resp).combobox('select',id);
            dvInit[0]=true;
                     $.get('getdivisiontree?node='+id,function(resp){
                     var id=dvcode.substr(0,6);
            $d2.combobox('loadData',resp).combobox('select',id);
            dvInit[1]=true;
                     $.get('getdivisiontree?node='+id,function(resp){
                     var id=dvcode.substr(0,9);
            $d3.combobox('loadData',resp).combobox('select',id);
            dvInit[2]=true;
                     $.get('getdivisiontree?node='+id,function(resp){
            $d4.combobox('loadData',resp).combobox('select',dvcode);
            dvInit[3]=true;
         })
         })
         })
         })
      }

     $division.find('a[action=caiyong]').bind('click',function(){
        var address='';
        _.each(ds,function(item){
            address+=item.combobox('getText');
        });
        local.find('input[name=oldaddress]').val(address);
     });

     local.find('a[opt=ditu-position]').bind('click',function(){
         var id='position'+new Date().getTime();
         global.positionList.add({timeid:id,
         latDom:myform.find('input[name=lat]'),
         lngDom:myform.find('input[name=lon]'),
         lat:myform.find('input[name=lat]').val(),
         lng:myform.find('input[name=lon]').val()
         })
         $('body').append(tpl_PositionMap({timeid:id,
         width:700,
         height:400,
         top:($(window).height()-400)/2,
         left:($(window).width()-700)/2,
         lat:myform.find('input[name=lat]').val(),
         lng:myform.find('input[name=lon]').val()}));
     });


     require(['common/BirthGenderAge'],function(js){
     local.find('input[opt=oldcardnum]').bind('keyup',function(){
            var o=js.validate($(this).val());
            myform.form('load',{oldsex:o.gender,oldbirthday:o.birthdate});
     });
     });

     local.find('a[action=close]').bind('click',function(){
       local.trigger('MyClose');
     });

   }
   }
})