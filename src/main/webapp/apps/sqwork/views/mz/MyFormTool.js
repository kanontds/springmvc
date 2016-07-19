define(['underscore'],function(_){

  var tpl=_.template(
  '<% _.each(children,function(item,index){ %>'+
  '<input type="checkbox" name="mycolumn" value="<%= item.column_name%>" id=<%="oook"+index%> /><label for=<%="oook"+index%>><%= index+(item.comment||item.column_name)%></label>'+
  '<% }) %>');

  var tplHideInput=_.template('<input type="hidden" name="<%=column_name%>" <%=myTemplate%> >');
  var tplTdInput=_.template('<td class="my-form-label"><%=comment%></td>\n'+
  '<td><input class="my-form-input <%=validateboxClass%><%=dateboxClass%><%=comboboxClass%>" '+
  '<%=myTemplate%>'+
  ' name="<%=column_name%>" data-options="<%=dataOptions%>" ></td>');
   return {
       render:function(local){


       var data=null;
       local.find('[action=ok]').bind('click',function(){
         $.get('eers/my-table-columns/'+local.find('input[name=table-name]').val(),function(resp){
             console.log(resp)
             //select-hide
             data=resp;
             local.find('div[opt=select-hide]').append(tpl({children:resp}));
         })
       });

      //FLOAT,NUMBER,CHAR,DATE,VARCHAR2
       local.find('[action=finish]').bind('click',function(){
            var hideArray=[];
            local.find('input[type=checkbox]:checked').each(function(){
                return hideArray.push($(this).val())
            })
           var hideInputs=[];
           var normalInputs=[];

           for(var i in data){
             var d=data[i];

             if(_.indexOf(hideArray,d.column_name)>-1){
                hideInputs.push(tplHideInput($.extend(
                {myTemplate:local.find('input[name=template]:checked').val()?'value="<%='+d.column_name+'%>"':''},d)));
             }else{

                var validTypes={};
                //{isNumeric:[],maxLength:[22]}
                var comboboxdata='';
                var dateboxClass='';
                var comboboxClass='';
                var validateboxClass='';
                if(d.data_type=='float'||d.data_type=='number'){
                     //validTypes="['isNumeric','maxLength["+d.data_length+"]']";
                     $.extend(validTypes,{isNumeric:[],maxLength:[d.data_length]})
                     validateboxClass='easyui-validatebox';
                }
                else if(d.data_type=='date'){
                     dateboxClass='easyui-datebox';
                }
                else if(d.data_type=='varchar2' && d.data_length==2){
                    comboboxClass='easyui-combobox';
                    comboboxdata="data:cj.getEnum('"+d.column_name+"'),panelHeight:'auto'";
                    var my_enum=cj.getEnum(d.column_name);
                    if(my_enum && my_enum.length>10){
                       comboboxdata="data:cj.getEnum('"+d.column_name+"'),panelHeight:200";
                    }
                }
                else if (d.data_type=='varchar2' && d.data_length!=2){
                    //validTypes="['maxLength["+d.data_length+"]']"
                    $.extend(validTypes,{maxLength:[d.data_length]})
                    validateboxClass='easyui-validatebox';
                }

                var isValid=false;
                for(var p in validTypes){
                  isValid=true;
                }
                var dataOptions=(d.nullable=='n'?'required:true':'required:false')+
                (comboboxdata?','+comboboxdata:'')+
                (isValid ?',validType:'+(JSON.stringify(validTypes).replace(/"/g,"'")):'');

                normalInputs.push(tplTdInput($.extend({
                validateboxClass:validateboxClass,
                dataOptions:dataOptions,
                myTemplate:local.find('input[name=template]:checked').val()?'value="<%='+d.column_name+'%>"':'',
                comboboxClass:comboboxClass,
                dateboxClass:dateboxClass},d)));

             }


           }
                        var result='';
             for(var i in hideInputs){
               result+=hideInputs[i]+'\n';
             }

             result+='<table  cellpadding="2" cellspacing="1" class="form-table">';

             var rowSize=3;
             for(var i in normalInputs){
               if(i%rowSize==0){
                 result+='\n<tr>\n'
               }
               result+=normalInputs[i]+'\n';
               if(i%rowSize==rowSize-1){
                 result+='</tr>\n'
               }
             }

             result+='</table>';



             console.log(result);

       })

   }
   }
})