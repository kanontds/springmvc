define(['underscore'],function(_){


return {
    createOption:function(me){
        return {
       wait: true,
       error: function(model, response) {
            console.log(model);
            $.messager.alert('提示','操作失败','error');
        },
       success:function(model,resp){
         console.log(model);
         console.log(resp);

         if(me && me.$el){
         $.parser.parse(me.$el);
         }

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
       }}
    }
}

});